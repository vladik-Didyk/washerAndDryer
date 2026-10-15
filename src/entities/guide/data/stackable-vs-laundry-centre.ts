// Guide. `draft: true` until the owner approves it (shown only with PREVIEW_DRAFTS=1).
import { siteConfig } from "~/shared/config";
import type { Guide } from "../model";

const { phone, prices } = siteConfig;

const guide: Guide = {
  slug: "stackable-vs-laundry-centre",
  draft: true,
  published: "2026-10-15",
  updated: "2026-10-15",
  metaTitle: "Stackable Washer & Dryer vs Laundry Centre: Which Fits?",
  metaDescription:
    "Stackable pair or one-piece laundry centre? How the two compare on space, loading, controls and delivery, and how to tell which one suits your closet.",
  title: "Stackable pair or laundry centre: which fits your closet?",
  summary:
    "Both put a washer and a dryer in the floor space of one machine. They are built differently, though, and the difference matters for your closet, your laundry and your delivery.",
  sections: [
    {
      heading: "The short version",
      blocks: [
        {
          list: [
            "A stackable pair is a front-load washer with a separate dryer mounted on top of it. Two machines, two sets of controls.",
            "A laundry centre is one appliance: a top-load washer at the bottom and a dryer above it, built into one cabinet with one control panel.",
            `With us, both cost the same: $${prices.setText} a week as a set.`,
          ],
        },
      ],
    },
    {
      heading: "Loading the washer",
      blocks: [
        "A stackable pair has a front-load washer, so you bend down to load it and to take the wet laundry out. Front-load washers tumble the laundry through a small amount of water, which suits bulky things like towels and bedding.",
        "A laundry centre's washer loads from the top, through a lid below the dryer, so there is less bending than with a front-loader. Its controls are simple, and the wide opening makes heavy, wet laundry easy to lift out.",
      ],
    },
    {
      heading: "Controls and the dryer",
      blocks: [
        "On a stackable pair, the washer and the dryer each have their own controls. On a laundry centre, the controls for both sit on one panel at the top.",
        "In both, the dryer is the upper machine. Check that whoever does the laundry can reach into it comfortably.",
      ],
    },
    {
      heading: "Size and height",
      blocks: [
        "Laundry centres come 24 or 27 inches wide. A 24-inch unit is about 70 inches tall.",
        "A stackable pair is as wide as one machine: usually about 24 inches for compact machines and about 27 inches for full-size ones. Its height depends on the two machines and the stacking kit, so measure the height under any shelf above the space and send it to us with the width.",
        "Both need a few inches behind them for the hoses, the power cord and the dryer vent.",
      ],
    },
    {
      heading: "Getting it in",
      blocks: [
        "A laundry centre is one tall unit, so it has to fit through every door, corner and elevator on the way in as a single piece.",
        "A stackable pair arrives as two machines and a stacking kit. Each piece is smaller, which can help in tight halls and stairwells. The two are stacked and connected once they are in place.",
      ],
    },
    {
      heading: "When something needs fixing",
      blocks: [
        "In a stackable pair, the washer and the dryer are separate machines. In a laundry centre they share one cabinet.",
        "Either way, repairs are included while you rent from us: we repair the machine or replace it at no charge.",
      ],
    },
    {
      heading: "Which one fits your closet?",
      blocks: [
        {
          list: [
            "Look at what's there now. Many condo closets were built around a one-piece laundry centre. If yours has one, another laundry centre of the same width is usually the simplest swap.",
            "Choose a stackable pair if you prefer a front-load washer, if the closet is tall enough for two machines, or if the way in is tight.",
            "Choose a laundry centre if you would rather load the washer from the top, or if your closet was built for one.",
          ],
        },
        `Not sure? Measure the width, depth and height, take a photo of the space and the hookups, and text it to ${phone.display}. We'll tell you which type fits.`,
      ],
    },
    {
      heading: "Both need the same hookups",
      blocks: [
        "Hot and cold water, a drain, and the right outlets. An electric dryer, on its own or in a laundry centre, needs a 240-volt outlet, 3- or 4-prong. A vented dryer also needs a vent to the outside.",
        { link: { href: "/machines/stackable/", label: "Stackable pair rental" } },
        { link: { href: "/machines/laundry-centre/", label: "Laundry centre rental" } },
      ],
    },
  ],
};

export default guide;
