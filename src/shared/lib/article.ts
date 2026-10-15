// The blocks of a long-form page (guides, the privacy policy, the rental terms):
// a string is a paragraph; the objects are a bulleted list, numbered steps, a highlighted
// note, or a link (left out while its page doesn't exist). The text itself is in shared/i18n
// (locales/en.server.ts), where two more kinds are filled in per request before the page gets
// them: { include } (a shared list or text) and { offer } (the running offers).
export type RenderedBlock =
  | string
  | { list: string[] }
  | { steps: string[] }
  | { note: string }
  | { link: { href: string; label: string } };

export type ArticleBlock = RenderedBlock | { include: string } | { offer: string };

export interface ArticleSection<Block = ArticleBlock> {
  /** The section's anchor; defaults to the heading in lower-case words joined by dashes. */
  id?: string;
  heading: string;
  blocks: Block[];
}

// A section's anchor: its `id`, or its heading in lower-case words joined by dashes.
export const sectionId = (section: { id?: string; heading: string }) =>
  section.id ??
  section.heading
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
