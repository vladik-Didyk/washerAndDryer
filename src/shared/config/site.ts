// Business facts used across the site. Change them here, not in the components.
// Only verified facts belong in this file: no invented numbers, claims or reviews.
// Words live in shared/i18n (one dictionary per language); prices and promotions in
// ./pricing.ts. Secrets and per-deployment settings (the session secret, the analytics token,
// search-engine verification codes) come from the environment instead: see ./env.ts and
// README.md.
import type { Dictionary } from "../i18n";

export const siteConfig = {
  // The business's name, as written everywhere (text uses it as {company}).
  companyName: "GTA Washer & Dryer Rentals",
  siteUrl: "https://washerrent.com", // no trailing slash
  // The picture shown when a page is shared (Facebook, WhatsApp...) and in JSON-LD. It shows
  // the weekly price, so remake public/og-image.jpg when a price changes, and change `v`:
  // Facebook keeps the old picture for a URL it has already seen.
  ogImage: "https://washerrent.com/og-image.jpg?v=2026-10-15b",
  // The date the page content last changed; used as <lastmod> in the generated sitemap.xml.
  lastUpdated: "2026-10-15",
  phone: {
    display: "(437) 907-6955",
    e164: "+1-437-907-6955",
    tel: "tel:+14379076955",
    sms: "sms:+14379076955",
  },
  // Opening hours (Toronto time). The words around them are in the dictionary.
  hours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "19:00",
  },
  facebook: "https://www.facebook.com/profile.php?id=61588384887072",
  // The Stripe customer portal's sign-in page (card, invoices): linked from /account/. Here,
  // not in the environment, because the pages are built ahead of time (react-router.config.ts).
  stripePortalUrl: "https://billing.stripe.com/p/login/8x24gyfyRaszdBB3DW2Ji00",
  // Visit statistics behind the cookie banner (shared/lib/analytics, widgets/cookie-consent):
  // public IDs, safe in the page. An empty one turns that tool off; all three empty, no banner.
  // Here, not in the environment, for the same reason as the portal link above.
  analytics: {
    ga4Id: "G-QHW9RPN2C1" as string,
    clarityId: "" as string,
    posthogKey: "" as string,
    posthogHost: "https://us.i.posthog.com",
  },
  // Languages we answer calls in (ISO codes, for JSON-LD).
  spokenLanguages: ["en", "es", "ru"],
  // Where we deliver, in this order: the cities (one page each, entities/area) and Toronto's
  // districts. Names and local text are in the dictionary (areas.cities, areas.districts).
  serviceAreas: {
    cities: ["toronto", "mississauga", "brampton", "vaughan", "markham", "richmond-hill"],
    torontoDistricts: ["north-york", "etobicoke", "scarborough", "east-york", "york"],
  } satisfies {
    cities: Array<keyof Dictionary["areas"]["cities"]>;
    torontoDistricts: Array<keyof Dictionary["areas"]["districts"]>;
  },
  // Main menu: the label is nav.<key> in the dictionary. Secondary links are in widgets/header.
  navigation: [
    { key: "machines", href: "/machines/" },
    { key: "prices", href: "/#prices" },
    { key: "areas", href: "/areas/" },
    { key: "landlords", href: "/landlords/" },
    { key: "faq", href: "/faq/" },
  ] satisfies Array<{ key: keyof Dictionary["nav"]; href: string }>,
} as const;

export type SiteConfig = typeof siteConfig;

// The fixed pages' paths. Their titles and descriptions are in the dictionary (pages.<key>).
export const pagePaths = {
  home: "/",
  areas: "/areas/",
  machines: "/machines/",
  landlords: "/landlords/",
  landlordQuote: "/landlords/quote/",
  buildings: "/buildings/",
  faq: "/faq/",
  about: "/about/",
  contact: "/contact/",
  repair: "/repair/",
  account: "/account/",
  start: "/start/",
  guides: "/guides/",
  notFound: "/404/",
} as const;

export type FixedPage = keyof typeof pagePaths;

// Pages that exist in English only (the policies): the Spanish and Russian pages link to the
// English version, with a short note (shared/ui LangLink). /es/privacy/ is a 404.
export const englishOnlyPaths: readonly string[] = ["/privacy/", "/terms/"];
