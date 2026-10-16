import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig, type Plugin } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "node:url";
import { findPhotos } from "./scripts/photo-sizes.mjs";

// Photos present at build time (public/photos/<folder>/*.jpg): pixel sizes, and the WebP and
// smaller versions made by scripts/make-photo-versions.mjs (src/shared/lib/photos.ts). The
// server and the browser read the same constant, so the rendered HTML always matches.
export const photosDefine = {
  __PHOTOS__: JSON.stringify(findPhotos(fileURLToPath(new URL("./public", import.meta.url)))),
};

// `define` is read once, when `pnpm dev` starts, so a photo added later would be missing from
// the page until a restart. This restarts the dev server when a photo is added or removed.
const photosDir = fileURLToPath(new URL("./public/photos", import.meta.url));
function restartOnNewPhotos(): Plugin {
  return {
    name: "restart-on-new-photos",
    apply: "serve",
    configureServer(server) {
      server.watcher.add(photosDir);
      let timer: ReturnType<typeof setTimeout> | undefined;
      const onChange = (file: string) => {
        if (!file.startsWith(photosDir) || !/\.(jpg|webp)$/.test(file)) return;
        // `pnpm photos` writes many files at once: restart once, after the last one.
        clearTimeout(timer);
        timer = setTimeout(() => void server.restart(), 500);
      };
      server.watcher.on("add", onChange);
      server.watcher.on("unlink", onChange);
    },
  };
}

export default defineConfig(({ mode }) => ({
  define: photosDefine,
  plugins:
    mode === "test"
      ? [tsconfigPaths()]
      : [cloudflare({ viteEnvironment: { name: "ssr" } }), reactRouter(), tsconfigPaths(), restartOnNewPhotos()],
  server: { port: 8790, strictPort: true },
  preview: { port: 8791, strictPort: true },
  test: {
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    environment: "node",
  },
}));
