// Questions and answers, in groups. The /faq/ page shows them all and is the only page with
// FAQPage JSON-LD; the home page shows a few (homeFaqIds) and links to /faq/.
// `id` is the anchor on /faq/ (the offer bar links to /faq/#first-week-free and /faq/#referral)
// and the key of the words in the dictionary (shared/i18n faq.items, faq.groups). Answers are
// plain text so the same words work in JSON-LD. `href` adds a link under the answer on the
// page; it's left out while the page it points to doesn't exist (a draft).
// The offer wording comes from entities/offer and is passed in (faqGroupsFor): the
// first-week-free group exists only while the offer runs.
import type { Dictionary, I18n } from "~/shared/i18n";

type ItemId = keyof Dictionary["faq"]["items"];
type GroupId = keyof Dictionary["faq"]["groups"];

export interface Faq {
  id: string;
  question: string;
  answer: string;
  link?: { href: string; label: string };
}

export interface FaqGroup {
  id: string;
  title: string;
  items: Faq[];
}

// The current offers' wording; `firstWeekFree` is null once that offer is over.
export interface FaqOffers {
  firstWeekFree: string | null;
  referral: string;
}

type GroupFacts = { id: GroupId; items: Array<{ id: ItemId; href?: string }> };

const standingGroups: GroupFacts[] = [
  {
    id: "renting",
    items: [
      { id: "minimum-term" },
      { id: "ending" },
      { id: "machine-types", href: "/machines/" },
      { id: "new-machines" },
      { id: "brands" },
      { id: "credit-check" },
      { id: "other-appliances" },
      { id: "languages" },
    ],
  },
  {
    id: "prices-and-payment",
    items: [{ id: "price" }, { id: "tax" }, { id: "deposit" }, { id: "payment" }, { id: "referral" }],
  },
  {
    id: "delivery-and-installation",
    items: [
      { id: "space-needs", href: "/guides/measure-your-laundry-space/" },
      { id: "delivery-cost" },
      { id: "delivery-time" },
      { id: "installation" },
      { id: "condo", href: "/guides/condo-laundry-checklist/" },
      { id: "haul-away" },
      { id: "areas", href: "/areas/" },
    ],
  },
  {
    id: "repairs",
    items: [{ id: "breaks" }, { id: "repair-request", href: "/repair/" }, { id: "damage" }],
  },
  {
    id: "for-landlords",
    items: [
      { id: "landlord-options", href: "/landlords/" },
      { id: "landlord-quote", href: "/landlords/quote/" },
    ],
  },
];

// Shown only while the offer runs (decided per request, see entities/offer).
const firstWeekFreeGroup: GroupFacts = {
  id: "first-week-free-offer",
  items: [{ id: "first-week-free" }, { id: "first-week-free-costs" }],
};

function buildGroup({ d, format }: I18n, group: GroupFacts, offers: FaqOffers): FaqGroup {
  return {
    id: group.id,
    title: d.faq.groups[group.id],
    items: group.items.map(({ id, href }) => {
      const text: { question: string; answer: string; link?: string } = d.faq.items[id];
      return {
        id,
        question: text.question,
        answer: format(text.answer, { referralText: offers.referral, promotionText: offers.firstWeekFree ?? "" }),
        ...(href && text.link ? { link: { href, label: text.link } } : {}),
      };
    }),
  };
}

export const faqGroupsFor = (i18n: I18n, offers: FaqOffers): FaqGroup[] =>
  [...standingGroups, ...(offers.firstWeekFree ? [firstWeekFreeGroup] : [])].map((group) =>
    buildGroup(i18n, group, offers),
  );

export const faqsFor = (i18n: I18n, offers: FaqOffers): Faq[] =>
  faqGroupsFor(i18n, offers).flatMap((group) => group.items);

// The short list on the home page, which links to /faq/ for the rest (none of these
// mention an offer).
const homeFaqIds = ["minimum-term", "deposit", "delivery-cost"];

export function homeFaqs(i18n: I18n): Faq[] {
  const all = faqsFor(i18n, { firstWeekFree: null, referral: "" });
  return homeFaqIds.map((id) => all.find((faq) => faq.id === id)!);
}
