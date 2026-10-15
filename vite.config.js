import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { findMachinePhotos } from "./scripts/photo-sizes.mjs";

export default defineConfig({
  plugins: [react()],
  base: "/",
  // Machine photos present at build time (public/photos/types/*.jpg) with their pixel sizes.
  // The client and the prerender build read the same list, so their HTML always matches.
  define: {
    __MACHINE_PHOTOS__: JSON.stringify(findMachinePhotos(fileURLToPath(new URL("./public", import.meta.url)))),
  },
  server: {
    port: 3000,
    open: true,
  },
});
