// The blocks of a long-form page (guides, the privacy policy, the rental terms):
// a string is a paragraph; the objects are a bulleted list, numbered steps, a highlighted
// note, a link (left out while its page doesn't exist), or one of the current offers
// (filled in per request by the page, so it follows the offer dates).
export type ArticleBlock =
  | string
  | { list: string[] }
  | { steps: string[] }
  | { note: string }
  | { link: { href: string; label: string } }
  | { offer: "first-week-free" | "referral" };

// What reaches the page after the offers are filled in.
export type RenderedBlock = Exclude<ArticleBlock, { offer: string }>;

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
