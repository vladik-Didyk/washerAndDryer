// Guide. `draft: true` until the owner approves it (shown only with PREVIEW_DRAFTS=1).
// Condo rules differ by building: the guide sends readers to management and never states a
// building's rules as fact.
import { siteConfig } from "~/shared/config";
import type { Guide } from "../model";

const { phone } = siteConfig;

const guide: Guide = {
  slug: "condo-laundry-checklist",
  draft: true,
  published: "2026-10-15",
  updated: "2026-10-15",
  metaTitle: "Condo Laundry Checklist: Before You Rent a Washer & Dryer",
  metaDescription:
    "Before a washer and dryer goes into your condo: building rules, the service elevator, closet size, hookups and delivery day, as a checklist.",
  title: "Condo laundry checklist",
  summary:
    "A washer and dryer delivery to a condo has a few extra steps: building rules, the service elevator and a narrow closet. Work through this list before delivery day.",
  sections: [
    {
      heading: "1. Check your building's rules",
      blocks: [
        "Rules differ from one building to the next, so don't assume yours match a friend's. Before you book, ask management or the concierge:",
        {
          list: [
            "Whether there are rules about in-suite washers and dryers",
            "Which days and hours deliveries are allowed",
            "What they need for a delivery, such as a form, a booking or a deposit for the elevator",
            "Where a delivery can park and unload: a loading dock, a driveway or the street",
            "Whether there are rules about leak protection, such as a drip tray under the washer",
          ],
        },
        "If you rent your condo, check with the owner as well. They may want to approve the machines.",
      ],
    },
    {
      heading: "2. Book the service elevator",
      blocks: [
        "Most condo buildings ask you to book the service elevator for a delivery. Book a slot with your building, then tell us the date and time.",
        "Ask how long the slot is, so the delivery and the installation both fit inside it.",
        "If your building has no service elevator, tell us the floor and describe the stairs, so we can plan how the machines come up.",
      ],
    },
    {
      heading: "3. Measure the closet",
      blocks: [
        "Condo laundry closets are usually narrow, so measure carefully:",
        {
          list: [
            "The width at the narrowest point",
            "The depth, with the closet door closed if it has one",
            "The height to the lowest shelf or the top of the opening",
            "The width of the closet opening and of your suite's front door",
          ],
        },
        "Leave a few inches behind the machines for the hoses, the power cord and the dryer vent.",
        { link: { href: "/guides/measure-your-laundry-space/", label: "How to measure your laundry space" } },
      ],
    },
    {
      heading: "4. Look at the hookups",
      blocks: [
        "Open the closet and look at the back wall. You should see:",
        {
          list: [
            "Hot and cold water taps",
            "A drain: a standpipe or a drain box in the wall",
            "The dryer outlet, 3-prong or 4-prong",
            "A regular outlet for the washer",
            "A dryer vent connection, if the closet has one",
          ],
        },
        "Take one photo of the whole back wall and send it to us. If something is missing or looks damaged, ask management about it before delivery day.",
        "Note where the water taps are. They shut off the water to the washer, so they should be easy to reach.",
        "If the closet has a dryer vent, we check the duct when we install: a crushed or blocked duct is a fire risk.",
        { link: { href: "/guides/3-prong-vs-4-prong-dryer-outlet/", label: "3-prong or 4-prong dryer outlet?" } },
      ],
    },
    {
      heading: "5. Choose the machine type",
      blocks: [
        "In most condo closets, the choice is between two types:",
        {
          list: [
            "A stackable pair: a front-load washer with the dryer on top",
            "A one-piece laundry centre: the washer and dryer in one cabinet, 24 or 27 inches wide",
          ],
        },
        "If the closet already has a laundry centre, one of the same width usually fits again.",
        { link: { href: "/guides/stackable-vs-laundry-centre/", label: "Stackable pair or laundry centre?" } },
      ],
    },
    {
      heading: "6. Get ready for delivery day",
      blocks: [
        {
          list: [
            "Someone at home for the whole delivery",
            "The elevator booked, and the concierge expecting us",
            "A clear path from the suite door to the closet",
            "The closet emptied, with room to work",
            "The old machine empty, if we're taking it away (haul-away is at no charge)",
          ],
        },
        "On the day, we connect the water, drain, power and vent, and run a test cycle before we leave.",
        `Questions about your building? Call or text ${phone.display}.`,
      ],
    },
  ],
};

export default guide;
