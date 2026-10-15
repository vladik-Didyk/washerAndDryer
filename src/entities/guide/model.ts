import type { ArticleSection } from "~/shared/lib/article";

// A guide at /guides/<slug>/. `draft: true` until the owner approves it: drafts exist only
// in preview deployments (PREVIEW_DRAFTS=1), with a Draft ribbon and noindex.
export interface GuideFacts {
  slug: string;
  draft: boolean;
  published: string;
  updated: string;
}

// With its words (shared/i18n locales/en.server.ts guides.<slug>).
export interface Guide extends GuideFacts {
  metaTitle: string;
  metaDescription: string;
  title: string;
  summary: string;
  sections: ArticleSection[];
}

export const guidePath = (guide: { slug: string }) => `/guides/${guide.slug}/`;
