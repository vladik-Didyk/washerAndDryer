// Every guide, in the order the /guides/ page lists them. Server only: a guide reaches the
// browser only through a loader, so a draft's text never ships to a normal deployment.
import measure from "./data/measure-your-laundry-space";
import outlet from "./data/3-prong-vs-4-prong-dryer-outlet";
import stackableVsCentre from "./data/stackable-vs-laundry-centre";
import condo from "./data/condo-laundry-checklist";
import included from "./data/whats-included-when-you-rent";
import type { Guide } from "./model";

export const allGuides: Guide[] = [measure, outlet, stackableVsCentre, condo, included];

// The guides this deployment shows: published ones, plus drafts in a preview deployment.
export const visibleGuides = (previewDrafts: boolean): Guide[] =>
  allGuides.filter((guide) => previewDrafts || !guide.draft);

export const findGuide = (slug: string, previewDrafts: boolean): Guide | undefined =>
  visibleGuides(previewDrafts).find((guide) => guide.slug === slug);
