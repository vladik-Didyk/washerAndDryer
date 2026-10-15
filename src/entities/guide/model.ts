import type { ArticleSection } from "~/shared/lib/article";

// A guide at /guides/<slug>/. `draft: true` until the owner approves it: drafts exist only
// in preview deployments (PREVIEW_DRAFTS=1), with a Draft ribbon and noindex.
export interface Guide {
  slug: string;
  draft: boolean;
  published: string;
  updated: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  summary: string;
  sections: ArticleSection[];
}

export const guidePath = (guide: { slug: string }) => `/guides/${guide.slug}/`;

// The /guides/ list page's own facts.
export const guidesIndex = {
  path: "/guides/",
  metaTitle: "Washer & Dryer Rental Guides | GTA Washer & Dryer Rentals",
  metaDescription:
    "Practical guides for renting a washer and dryer in Toronto and the GTA: what to measure, check and ask before delivery day.",
} as const;
