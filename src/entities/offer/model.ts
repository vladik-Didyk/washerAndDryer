// Prices and offers, decided per request: the weekly prices after any running promotion, the
// promotions themselves, and the facts every text needs ({setPrice}, {deposit}, ...).
// The numbers are in shared/config/pricing.ts; the words in shared/i18n.
//
// Everything here is decided on the server from the request time (the root loader and each
// page loader, from requestTimeOf), never from the visitor's clock: the HTML and the hydrated
// page always agree, and a promotion appears and disappears on its own, with no rebuild.
import type { AppLoadContext } from "react-router";
import {
  experienceYears,
  pricing,
  promotions,
  requestTimeOf,
  siteConfig,
  type PriceItem,
  type Promotion,
} from "~/shared/config";
import { langFromPath, loadI18n, type Fact, type Facts, type I18n, type Lang } from "~/shared/i18n";

export type { PriceItem, Promotion };

const time = (iso: string | undefined, fallback: number) => (iso ? Date.parse(iso) : fallback);

// `now` is a millisecond timestamp (the request time).
export const isPromotionActive = (promotion: Promotion, now: number) =>
  now >= time(promotion.startsAt, -Infinity) && now < time(promotion.endsAt, Infinity);

export const activePromotions = (now: number, list: Promotion[] = promotions): Promotion[] =>
  list.filter((promotion) => isPromotionActive(promotion, now));

export interface PriceInfo {
  /** The list price per week. */
  base: number;
  /** What a new customer pays per week now: lower than `base` while a promotion cuts it. */
  current: number;
  /** The running promotions that apply to this item (a free week included). */
  activePromotions: Promotion[];
}

const cents = (amount: number) => Math.round(amount * 100) / 100;

function applyPromotion(price: number, promotion: Promotion): number {
  switch (promotion.kind) {
    case "percentOff":
      return cents(price * (1 - promotion.value / 100));
    case "amountOff":
      return Math.max(0, cents(price - promotion.value));
    case "fixedPrice":
      return promotion.value;
    case "freeWeeks":
      return price;
  }
}

export function getPrice(item: PriceItem, now: number, list: Promotion[] = promotions): PriceInfo {
  const base = pricing.weekly[item];
  const applying = activePromotions(now, list).filter((promotion) => promotion.appliesTo.includes(item));
  return { base, current: applying.reduce(applyPromotion, base), activePromotions: applying };
}

export const isDiscounted = (price: PriceInfo) => price.current < price.base;

// The first-week-free offer still runs (FAQ group, terms section, the /es/ and /ru/ line).
export const isFirstWeekFreeActive = (now: number) =>
  activePromotions(now).some((promotion) => promotion.id === "first-week-free");

const camel = (id: string) => id.replace(/-(\w)/g, (_, letter: string) => letter.toUpperCase());

// The last day of a promotion: the moment before it ends.
const lastMoment = (promotion: Promotion) => (promotion.endsAt ? Date.parse(promotion.endsAt) - 1 : null);

// The facts every text can use as {name} (shared/i18n Fact), for this moment.
export function offerFacts(now: number, list: Promotion[] = promotions): Facts {
  const set = getPrice("set", now, list);
  const single = getPrice("single", now, list);
  const facts: Facts = {
    company: { text: siteConfig.companyName },
    phone: { text: siteConfig.phone.display },
    setPrice: { money: set.current },
    singlePrice: { money: single.current },
    setBasePrice: { money: set.base },
    singleBasePrice: { money: single.base },
    deposit: { money: pricing.deposit },
    referralAmount: { money: pricing.referral.amount },
    referralMonths: { number: pricing.referral.minMonths },
    minWeeks: { number: pricing.minimumWeeks },
    noticeDays: { number: pricing.noticeDays },
    quoteUnits: { number: pricing.buildingQuoteUnits },
    experienceYears: { number: experienceYears },
    opens: { time: siteConfig.hours.opens },
    closes: { time: siteConfig.hours.closes },
  };
  // Each promotion's own values, named after its id (first-week-free -> firstWeekFree...):
  // {firstWeekFreeStart} {firstWeekFreeEnd} "November 30, 2026" (its last day)
  // {firstWeekFreeEndShort} "Nov 30", and by kind {...Percent} {...Amount} {...Price} {...Weeks}.
  for (const promotion of list) {
    const name = camel(promotion.id);
    const end = lastMoment(promotion);
    if (promotion.startsAt) facts[`${name}Start`] = { date: Date.parse(promotion.startsAt), format: "long" };
    if (end !== null) {
      facts[`${name}End`] = { date: end, format: "long" };
      facts[`${name}EndShort`] = { date: end, format: "short" };
    }
    const value: Record<Promotion["kind"], [string, Fact]> = {
      percentOff: ["Percent", { number: promotion.value }],
      amountOff: ["Amount", { money: promotion.value }],
      fixedPrice: ["Price", { money: promotion.value }],
      freeWeeks: ["Weeks", { number: promotion.value }],
    };
    const [suffix, fact] = value[promotion.kind];
    facts[`${name}${suffix}`] = fact;
  }
  return facts;
}

// A promotion's wording (offers.promotions.<id>; its values are facts, already filled in).
export function promotionText(promotion: Promotion, { d }: I18n) {
  return d.offers.promotions[promotion.id];
}

// The text of a request: its language (from the URL) and the facts of its moment. Every
// loader of one request gets the same object (cached by language and facts).
export function requestI18n({ request, context }: { request: Request; context: AppLoadContext }): Promise<I18n> {
  return i18nAt(langFromPath(new URL(request.url).pathname), requestTimeOf(context));
}

export const i18nAt = (lang: Lang, now: number): Promise<I18n> => loadI18n(lang, offerFacts(now));
