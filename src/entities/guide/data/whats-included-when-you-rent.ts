// Guide. `draft: true` until the owner approves it (shown only with PREVIEW_DRAFTS=1).
// Every statement here is one of the business facts in shared/config and entities/offer
// (the current offers are filled in by the page, so they follow the offer dates).
import { siteConfig } from "~/shared/config";
import type { Guide } from "../model";

const { phone, prices } = siteConfig;

const guide: Guide = {
  slug: "whats-included-when-you-rent",
  draft: true,
  published: "2026-10-15",
  updated: "2026-10-15",
  metaTitle: "What's Included When You Rent a Washer and Dryer From Us",
  metaDescription:
    "What the weekly rent covers, what you pay separately, and how a rental runs: repairs, haul-away, the deposit, delivery, the minimum term and ending it.",
  title: "What's included when you rent from us",
  summary:
    "A plain list of what the weekly price covers, what you pay separately, and how a rental runs from the first week to the pickup.",
  sections: [
    {
      heading: "The weekly price",
      blocks: [
        {
          list: [
            `$${prices.setText} a week for a washer and dryer set`,
            `$${prices.singleText} a week for one machine: just a washer or just a dryer`,
          ],
        },
        "Rent is charged every week on the same weekday. All our prices are weekly, in Canadian dollars.",
        "We don't charge HST. The weekly price is what you pay.",
      ],
    },
    {
      heading: "Included in the price",
      blocks: [
        {
          list: [
            "Repairs. If the machine breaks while you rent it, we repair it or give you a replacement machine, at no charge.",
            "Haul-away. We take your old machine away when we deliver ours, at no charge.",
            "A checked machine. Our machines are pre-owned. Each one is checked before it goes out and is in good working order. The brand and model depend on what's available.",
            "Help in your language. We speak English, Spanish and Russian.",
          ],
        },
      ],
    },
    {
      heading: "Paid separately",
      blocks: [
        {
          list: [
            "Delivery and installation. We quote it per job, before you pay. It depends on the distance, the floor, stairs or elevator, and the hookups.",
            `A $${prices.deposit} refundable deposit. You get it back when the machine comes back in working condition.`,
            "Damage beyond normal wear. Repairs from normal use are on us; damage beyond normal wear is the renter's responsibility.",
          ],
        },
      ],
    },
    {
      heading: "Getting started",
      blocks: [
        "Tell us your area, whether you need a set or one machine, and the size of your laundry space. A photo of the space helps. We reply with the machine, the total and the start date.",
        "Delivery is usually the same week. We confirm the date when we send the quote.",
      ],
    },
    {
      heading: "Installation",
      blocks: [
        "We deliver the machine, connect the water, drain, power and vent, and run a test cycle before we leave.",
        "Your space needs the right hookups: hot and cold water, a drain, the right outlet, and a vent to the outside for a vented dryer. If you live in a condo, book the service elevator for the delivery.",
        { link: { href: "/guides/measure-your-laundry-space/", label: "How to measure your laundry space" } },
      ],
    },
    {
      heading: "If something goes wrong",
      blocks: [
        `Call or text ${phone.display}, or send the repair form with your address and what the machine is doing. We repair it or bring a replacement machine, at no charge.`,
        "If water is leaking, turn off the water taps behind the washer if you can reach them safely, then call us.",
        { link: { href: "/repair/", label: "Request a repair" } },
      ],
    },
    {
      heading: "How long you rent",
      blocks: [
        "The minimum is 52 weeks. After that, the rental continues week to week.",
        `Once the minimum is over, either side can end the rental with 30 days' notice. To end it, text us at ${phone.display}, and we pick the machine up.`,
      ],
    },
    {
      heading: "Paying",
      blocks: [
        "Pay by Interac e-Transfer or credit card. For a card, we send a payment link with your quote. There's no credit check.",
      ],
    },
    {
      heading: "Current offers",
      blocks: [
        // Filled in per request: the first-week-free line drops out once the offer ends.
        { offer: "first-week-free" },
        { offer: "referral" },
      ],
    },
    {
      heading: "What we don't do",
      blocks: [
        "We only rent washers and dryers. We don't sell machines, and we don't rent other appliances.",
      ],
    },
    {
      heading: "Before you sign",
      blocks: [
        "You get the full written rental agreement to read before you sign it. If anything on this page isn't clear, ask us first.",
        { link: { href: "/faq/", label: "More questions and answers" } },
      ],
    },
  ],
};

export default guide;
