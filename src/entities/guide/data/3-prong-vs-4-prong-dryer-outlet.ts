// Guide. `draft: true` until the owner approves it (shown only with PREVIEW_DRAFTS=1).
// Electrical advice stays general: no adapters, and outlet or cord changes go to a licensed
// electrician or another qualified person.
import { siteConfig } from "~/shared/config";
import type { Guide } from "../model";

const { phone, prices } = siteConfig;

const guide: Guide = {
  slug: "3-prong-vs-4-prong-dryer-outlet",
  draft: true,
  published: "2026-10-15",
  updated: "2026-10-15",
  metaTitle: "3-Prong vs 4-Prong Dryer Outlet: How to Tell Which You Have",
  metaDescription:
    "How to tell a 3-prong dryer outlet from a 4-prong one, why it matters for a rental dryer, and why outlet or cord changes are a job for an electrician.",
  title: "3-prong vs 4-prong dryer outlet",
  summary:
    "Most electric dryers plug into a large 240-volt outlet with either three or four slots. Here is how to tell which one you have, why we ask, and what not to do if the plug and the outlet don't match.",
  sections: [
    {
      heading: "Why we ask about your outlet",
      blocks: [
        "An electric dryer doesn't use a regular wall outlet. Its heater needs far more power than a lamp or a phone charger, so it plugs into a larger 240-volt outlet, and the plug on the dryer's power cord has to match that outlet.",
        "There are two common kinds of dryer outlet: one with three slots and one with four. Your home could have either. When you ask for a quote, we ask which one you have so the dryer can be connected properly on delivery day.",
      ],
    },
    {
      heading: "How to tell which one you have",
      blocks: [
        {
          steps: [
            "Find the outlet behind or beside the spot where the dryer goes. It's noticeably bigger than a regular outlet. If an old dryer is still plugged in, look at its plug rather than pulling it out.",
            "Count the slots. Three slots means a 3-prong outlet. Four slots means a 4-prong outlet.",
            "On a 4-prong outlet, one of the slots is usually rounded or U-shaped. That's the ground. A 3-prong dryer outlet has no separate ground slot.",
            "Take a photo, straight on and close enough to see every slot, and text it to us. It's the quickest way to be sure.",
          ],
        },
      ],
    },
    {
      heading: "The washer is different",
      blocks: [
        "A washer plugs into a regular household outlet. Check that there's one near the water taps, within reach of where the washer will stand.",
        "A one-piece laundry centre with an electric dryer needs the same kind of 240-volt dryer outlet, so check it the same way.",
      ],
    },
    {
      heading: "If the plug doesn't match the outlet",
      blocks: [
        {
          note: "Don't force a plug into an outlet it doesn't fit, and don't use an adapter or an extension cord to make it fit. A dryer draws a lot of power, and a poor connection can overheat.",
        },
        "There are two proper fixes: change the dryer's power cord to one that matches the outlet, or change the outlet to match the cord.",
        {
          list: [
            "Changing the outlet means working on your home's wiring. That should be done by a licensed electrician.",
            "Changing the cord on the dryer should be done by a licensed electrician or another qualified person, following the dryer maker's instructions.",
          ],
        },
        "Tell us about your outlet when you ask for a quote, so any mismatch is known well before delivery day.",
      ],
    },
    {
      heading: "No 240-volt outlet at all?",
      blocks: [
        "Some laundry spaces have water and a drain but no dryer outlet. Adding one means a new circuit from the electrical panel, which is also a job for a licensed electrician. If you rent your home, that's a question for your landlord first, and in a condo, for the building's management as well.",
        `Until then, you can still rent just a washer, for $${prices.singleText} a week.`,
        { link: { href: "/machines/single-machine/", label: "Washer or dryer only" } },
      ],
    },
    {
      heading: "Quick checklist",
      blocks: [
        {
          list: [
            "Count the slots on the dryer outlet: 3 or 4",
            "Find the regular outlet for the washer",
            "Take a clear photo of both",
            `Text the photos to ${phone.display} with your quote request`,
          ],
        },
        "With those photos, we can plan the electrical side of the installation.",
        { link: { href: "/guides/measure-your-laundry-space/", label: "How to measure your laundry space" } },
      ],
    },
  ],
};

export default guide;
