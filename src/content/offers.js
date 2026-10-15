// Current offers, worded once for the offer bar, FAQ, terms, price cards and llms.txt.
// Facts (dates, amounts) live in config.js.
//
// Whether the first-week-free offer still shows is decided by the build date (__BUILD_TIME__,
// from vite.config.js), not the visitor's clock, so the prerendered HTML and the page the
// browser hydrates always agree. The offer bar re-checks the real date after hydration, in case
// the site isn't rebuilt when the offer ends.
import { siteConfig } from "./config";

const { prices } = siteConfig;
const { firstWeekFree, referral } = siteConfig.offers;

const firstWeekFreeEnd = Date.parse(firstWeekFree.endsAt);

// `time` is a millisecond timestamp, e.g. Date.now().
export const isFirstWeekFreeOver = (time) => time >= firstWeekFreeEnd;

// True when this build was made before the offer ended.
export const firstWeekFreeActive = !isFirstWeekFreeOver(Date.parse(__BUILD_TIME__));

export const firstWeekFreeOffer = {
  short: `First week free until ${firstWeekFree.lastDayShort}`,
  title: "First week free",
  text: `New customers who start a rental by ${firstWeekFree.lastDay} pay no rent for the first week. It applies to washer and dryer sets and to single machines.`,
  stillPaid: `The $${prices.deposit} deposit and the delivery are still paid.`,
};

export const referralOffer = {
  short: `Refer a friend, get $${referral.amount}`,
  title: "Refer a friend",
  text: `You get $${referral.amount} when a friend you refer signs up for ${referral.minMonths} months or more.`,
};
