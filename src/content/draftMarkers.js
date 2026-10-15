// For the build check in scripts/prerender.mjs only: imported by src/entry-server.jsx, never by
// a page, so it stays out of the browser bundle. A normal build fails if the bundle contains
// a draft page's description, which would mean its text slipped into the bundle.
import { allGuides } from "./guides";
import { allLegalPages } from "./legal";

export const draftMarkers = [
  ...allGuides.map((guide) => ({ ...guide, path: `/guides/${guide.slug}/` })),
  ...allLegalPages,
]
  .filter((page) => page.draft)
  .map((page) => ({ path: page.path, text: page.metaDescription }));
