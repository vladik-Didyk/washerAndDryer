// Guide. `draft: true` until the owner approves it (shown only with PREVIEW_DRAFTS=1).
// Section blocks: a string is a paragraph; { list }, { steps }, { note } and { link } are the
// other kinds (rendered by widgets/article-body).
import { siteConfig } from "~/shared/config";
import type { Guide } from "../model";
import { hookupChecklist } from "~/shared/config";

const { phone } = siteConfig;

const guide: Guide = {
  slug: "measure-your-laundry-space",
  draft: true,
  published: "2026-10-15",
  updated: "2026-10-15",
  metaTitle: "How to Measure Your Laundry Space for a Washer & Dryer",
  metaDescription:
    "What to measure before you rent a washer and dryer: the space, the room hookups and doors need, and the way in. Plus what to send us for a quote.",
  title: "How to measure your laundry space",
  summary:
    "Ten minutes with a tape measure can save a wasted delivery. Here is what to measure, where a machine needs extra room, and what to send us before you rent.",
  sections: [
    {
      heading: "What you need",
      blocks: [
        "A tape measure, your phone and something to write on. A second person helps with the tall measurements and with holding the tape straight.",
        "Measure in inches. Washer and dryer sizes are usually given in inches, so you won't have to convert anything later.",
      ],
    },
    {
      heading: "Measure the space",
      blocks: [
        "Take each measurement at the narrowest point. Walls are rarely perfectly straight, and a door frame, a pipe or a baseboard can take away an inch you were counting on.",
        {
          list: [
            "Width: from wall to wall, or to the edge of the closet opening, wherever it is narrowest.",
            "Depth: from the back wall to the front edge of the closet frame, or to where a door would close.",
            "Height: from the floor to the lowest thing above the space, such as a shelf, a cabinet, a pipe or the top of the opening.",
          ],
        },
        "Write the three numbers down as width, depth and height, and note which one you are least sure of.",
      ],
    },
    {
      heading: "Leave room for hookups and doors",
      blocks: [
        "A washer or dryer can't sit flat against the back wall. The water hoses, the drain hose, the power cord and the dryer vent all connect at the back, so leave a few inches behind the machines.",
        "Leave a little space at the sides as well, so the machines don't rub against the walls or each other while they run.",
        "Then think about doors. A front-load machine needs room in front for its door to swing open, and you need room to stand there and load it. A top-load washer needs clear space above it for the lid. If the laundry closet has its own doors, check that they will still close in front of the machines.",
      ],
    },
    {
      heading: "Measure the way in",
      blocks: [
        "The machine has to reach the space before it can fit in it. Walk the route from the front door to the laundry space and find the narrowest point along the way:",
        {
          list: [
            "The front door and any inside doors, measured with the door open",
            "Hallways and tight corners",
            "Stairs: how many steps, how wide, and whether there's a turn or a landing",
            "In a condo or apartment building: the service elevator, and the booking you'll need for it",
          ],
        },
        "A stackable pair arrives as two separate machines, so each piece is smaller to carry. A one-piece laundry centre comes as one tall unit.",
      ],
    },
    {
      heading: "Typical sizes",
      blocks: [
        "Sizes vary by brand and model, so treat these as a starting point, not a promise:",
        {
          list: [
            "Compact machines are usually about 24 inches wide.",
            "Full-size machines are usually about 27 inches wide each. A side-by-side pair needs roughly 55 inches of width, plus a little space between and around them.",
            "One-piece laundry centres come 24 or 27 inches wide. A 24-inch unit is about 70 inches tall.",
            "A stackable pair is one machine wide and two machines tall, so check the height under any shelf above the space.",
          ],
        },
        "If your space is close to one of these sizes, send us the exact numbers. We check them against the machine we have for you before delivery day.",
      ],
    },
    {
      heading: "Check the hookups while you're there",
      blocks: [
        "While the tape measure is out, look at what's on the wall behind the space:",
        { list: hookupChecklist },
        "If you're not sure what something is, a photo is enough. We'll tell you what we see.",
        {
          link: {
            href: "/guides/3-prong-vs-4-prong-dryer-outlet/",
            label: "How to tell a 3-prong dryer outlet from a 4-prong one",
          },
        },
      ],
    },
    {
      heading: "What to send us",
      blocks: [
        `Text these to ${phone.display} when you ask for a quote:`,
        {
          list: [
            "The width, depth and height of the space",
            "The narrowest door or turn on the way in, and the number of stairs",
            "A photo of the space with the hookups visible",
            "A close photo of the dryer outlet",
          ],
        },
        "With that, we can tell you which machine type fits, and quote the delivery and installation before you pay anything.",
        { link: { href: "/machines/", label: "Compare the machine types" } },
      ],
    },
  ],
};

export default guide;
