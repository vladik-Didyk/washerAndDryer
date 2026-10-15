// Pages the owner hasn't approved yet are marked `draft: true` in their content: the guides,
// the privacy policy and the rental terms. To publish one, change its flag to `draft: false`.
//
// `pnpm build` leaves drafts out entirely: no page, no links to it, not in sitemap.xml or
// llms.txt, and not in the JavaScript bundle either. `pnpm build:preview` (PREVIEW_DRAFTS=1)
// builds them with a "Draft — not published" ribbon (and noindex) so they can be read first.
//
// __INCLUDE_DRAFTS__ is set in vite.config.js. A list of pages that may hold drafts must test
// each page in this exact form:
//   includeDrafts || !page.draft ? page : null
// The bundler works that out at build time and drops a draft's text from the bundle. A helper
// function or .filter() would still work on the page, but would leave the text in the bundle.
export const includeDrafts = __INCLUDE_DRAFTS__;
