// Current offers, worded once for the offer bar, FAQ, terms, price cards and llms.txt.
// Facts (dates, amounts) live in shared/config.
//
// Whether the first-week-free offer still shows is decided on the server for every request
// (the root loader, from the request time), never by the visitor's clock: the HTML and the
// hydrated page always agree, and the offer disappears on its own at the end of
// November 30, 2026 in Toronto, with no rebuild.
import { siteConfig } from "~/shared/config";

const { prices } = siteConfig;
const { firstWeekFree, referral } = siteConfig.offers;

export const firstWeekFreeEnd = Date.parse(firstWeekFree.endsAt);

// `time` is a millisecond timestamp, e.g. Date.now().
export const isFirstWeekFreeOver = (time: number) => time >= firstWeekFreeEnd;
export const isFirstWeekFreeActive = (time: number) => !isFirstWeekFreeOver(time);

export const firstWeekFreeOffer = {
  short: `First week free until ${firstWeekFree.lastDayShort}`,
  title: "First week free",
  text: `New customers who start a rental by ${firstWeekFree.lastDay} pay no rent for the first week. It applies to washer and dryer sets and to single machines.`,
  stillPaid: `The $${prices.deposit} deposit and the delivery are still paid.`,
  // Beside a price (machine type pages): the rent only.
  note: `New customers who start by ${firstWeekFree.lastDay} pay no rent for the first week. The deposit and delivery are still paid.`,
};

export const referralOffer = {
  short: `Refer a friend, get $${referral.amount}`,
  title: "Refer a friend",
  text: `You get $${referral.amount} when a friend you refer signs up for ${referral.minMonths} months or more.`,
};
