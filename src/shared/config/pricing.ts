// Prices, promotions and the business numbers the text quotes. Change them here: every page,
// meta title, JSON-LD offer and llms.txt follows on the next request, with no other edit.
// Amounts are in Canadian dollars. No HST is charged.
//
// Promotions run between `startsAt` and `endsAt` (ISO timestamps; leave one out for "from
// now on" or "until further notice"), decided on the server for every request, so one
// appears and disappears on its own. Kinds:
//   percentOff  `value` % off the weekly price          (the price cards show the old price struck through)
//   amountOff   `value` dollars off the weekly price    (the same)
//   fixedPrice  the weekly price becomes `value`        (the same)
//   freeWeeks   the first `value` weeks are free        (the weekly price itself stays)
// Each promotion's wording is in the dictionary under offers.promotions.<id> (shared/i18n):
// add it there in English (and in a translation, if any) before adding the promotion here.
// Its numbers and dates are filled in from here, as {<id in camelCase>Percent}, ...End, etc.
//
// Example: 10% off sets in January 2027 (Toronto time), for new customers:
//   { id: "january-sets", kind: "percentOff", value: 10, appliesTo: ["set"],
//     startsAt: "2027-01-01T05:00:00Z", endsAt: "2027-02-01T05:00:00Z", newCustomersOnly: true },
import type { Dictionary } from "../i18n";

export type PriceItem = "set" | "single";

export interface Promotion {
  /** Also the anchor on /faq/ and /terms/ and the dictionary key of its wording. */
  id: keyof Dictionary["offers"]["promotions"];
  kind: "percentOff" | "amountOff" | "freeWeeks" | "fixedPrice";
  value: number;
  appliesTo: PriceItem[];
  startsAt?: string;
  endsAt?: string;
  newCustomersOnly?: boolean;
}

export const pricing = {
  // Weekly rent: a washer + dryer set, or one machine.
  weekly: { set: 13.99, single: 7.99 } satisfies Record<PriceItem, number>,
  // Refundable deposit.
  deposit: 200,
  // A friend you refer signs up for `minMonths` months or more: you get `amount`.
  referral: { amount: 100, minMonths: 12 },
  // Minimum term in weeks, then week to week with `noticeDays` days' notice.
  minimumWeeks: 52,
  noticeDays: 30,
  // From this many units, a landlord's quote is made per building after seeing it.
  buildingQuoteUnits: 3,
} as const;

export const promotions: Promotion[] = [
  // First week's rent free for new customers who start a rental by Nov 30, 2026: sets and
  // single machines. The deposit and the delivery are still paid.
  {
    id: "first-week-free",
    kind: "freeWeeks",
    value: 1,
    appliesTo: ["set", "single"],
    endsAt: "2026-12-01T05:00:00Z", // the end of Nov 30, 2026 in Toronto (EST, UTC-5)
    newCustomersOnly: true,
  },
];

// Years of hands-on experience installing and fixing washers and dryers (About).
export const experienceYears = 3;
