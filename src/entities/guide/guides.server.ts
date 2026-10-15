// Every guide, in the order the /guides/ page lists them. Server only: a guide reaches the
// browser only through a loader, so a draft's text never ships to a normal deployment.
// The words are in shared/i18n (locales/en.server.ts guides.<slug>). Electrical advice stays
// general (no adapters; outlet or cord changes go to a licensed electrician or another
// qualified person), and condo rules are never stated as a building's rules.
import type { I18n } from "~/shared/i18n";
import { serverText, type ServerText } from "~/shared/i18n/index.server";
import type { Guide, GuideFacts } from "./model";

type GuideSlug = keyof ServerText["guides"];

const guideFacts: Array<GuideFacts & { slug: GuideSlug }> = [
  { slug: "measure-your-laundry-space", draft: true, published: "2026-10-15", updated: "2026-10-15" },
  { slug: "3-prong-vs-4-prong-dryer-outlet", draft: true, published: "2026-10-15", updated: "2026-10-15" },
  { slug: "stackable-vs-laundry-centre", draft: true, published: "2026-10-15", updated: "2026-10-15" },
  { slug: "condo-laundry-checklist", draft: true, published: "2026-10-15", updated: "2026-10-15" },
  { slug: "whats-included-when-you-rent", draft: true, published: "2026-10-15", updated: "2026-10-15" },
];

export const guideSlugs: string[] = guideFacts.map((guide) => guide.slug);

export const allGuides = (i18n: I18n): Guide[] => {
  const { guides } = serverText(i18n);
  return guideFacts.map((facts) => ({ ...guides[facts.slug], ...facts }) as Guide);
};

// The guides this deployment shows: published ones, plus drafts in a preview deployment.
export const visibleGuides = (i18n: I18n, previewDrafts: boolean): Guide[] =>
  allGuides(i18n).filter((guide) => previewDrafts || !guide.draft);

export const findGuide = (i18n: I18n, slug: string, previewDrafts: boolean): Guide | undefined =>
  visibleGuides(i18n, previewDrafts).find((guide) => guide.slug === slug);
