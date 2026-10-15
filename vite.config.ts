import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "node:url";
import { findPhotos } from "./scripts/photo-sizes.mjs";

// Photos present at build time (public/photos/<folder>/*.jpg): pixel sizes, and the WebP and
// smaller versions made by scripts/make-photo-versions.mjs (src/shared/lib/photos.ts). The
// server and the browser read the same constant, so the rendered HTML always matches.
export const photosDefine = {
  __PHOTOS__: JSON.stringify(findPhotos(fileURLToPath(new URL("./public", import.meta.url)))),
};

export default defineConfig(({ mode }) => ({
  define: photosDefine,
  plugins:
    mode === "test"
      ? [tsconfigPaths()]
      : [cloudflare({ viteEnvironment: { name: "ssr" } }), reactRouter(), tsconfigPaths()],
  server: { port: 8790, strictPort: true },
  preview: { port: 8790, strictPort: true },
  test: {
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    environment: "node",
  },
}));
