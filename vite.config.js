import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { findPhotos } from "./scripts/photo-sizes.mjs";

// PREVIEW_DRAFTS=1 (pnpm build:preview) also builds the pages marked `draft: true`, each with a
// "Draft — not published" ribbon. A normal build leaves them out entirely (src/content/drafts.js).
const includeDrafts = ["1", "true"].includes(process.env.PREVIEW_DRAFTS ?? "");

// The build date decides whether a time-limited offer still shows (src/content/offers.js).
// SITE_BUILD_DATE overrides it, to check the site as it will look later:
//   SITE_BUILD_DATE=2026-12-02T12:00:00Z pnpm build
const buildDate = process.env.SITE_BUILD_DATE ? new Date(process.env.SITE_BUILD_DATE) : new Date();
if (Number.isNaN(buildDate.getTime())) {
  throw new Error(`SITE_BUILD_DATE is not a date: ${process.env.SITE_BUILD_DATE}`);
}

export default defineConfig({
  plugins: [react()],
  base: "/",
  // Build-time constants. The client and the prerender build read the same values, so the
  // prerendered HTML always matches what the browser hydrates.
  define: {
    // Photos present at build time (public/photos/<folder>/*.jpg): pixel sizes, and the WebP
    // and smaller versions made by scripts/make-photo-versions.mjs (src/content/photos.js).
    __PHOTOS__: JSON.stringify(findPhotos(fileURLToPath(new URL("./public", import.meta.url)))),
    __INCLUDE_DRAFTS__: JSON.stringify(includeDrafts),
    __BUILD_TIME__: JSON.stringify(buildDate.toISOString()),
  },
  server: {
    port: 3000,
    open: true,
  },
});
