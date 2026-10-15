// The guides at /guides/<slug>/, in the order the /guides/ page lists them.
// Each guide's `draft` flag decides whether it is built (src/content/drafts.js). Keep the
// `includeDrafts || !guide.draft ? guide : null` form for every entry: it lets the bundler
// drop a draft's text from a normal build.
import { includeDrafts } from "../drafts";
import measure from "./measure-your-laundry-space";
import outlet from "./3-prong-vs-4-prong-dryer-outlet";
import stackableVsCentre from "./stackable-vs-laundry-centre";
import condo from "./condo-laundry-checklist";
import included from "./whats-included-when-you-rent";

export const guides = [
  includeDrafts || !measure.draft ? measure : null,
  includeDrafts || !outlet.draft ? outlet : null,
  includeDrafts || !stackableVsCentre.draft ? stackableVsCentre : null,
  includeDrafts || !condo.draft ? condo : null,
  includeDrafts || !included.draft ? included : null,
].filter(Boolean);

// Every guide, drafts included. Only for the build check (src/content/draftMarkers.js);
// importing this into a page would put draft text in the browser bundle.
export const allGuides = [measure, outlet, stackableVsCentre, condo, included];
