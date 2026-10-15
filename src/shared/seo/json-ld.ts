// Schema.org JSON-LD pieces shared by the pages. Facts come from shared/config; nothing here
// invents a claim. No reviews or ratings: there are none yet.
import { siteConfig } from "../config/site";
import type { Crumb, JsonLd } from "./types";

const SITE = siteConfig.siteUrl;
const BUSINESS_ID = `${SITE}/#business`;
export const PHONE_E164 = "+1-437-907-6955";

const absolute = (path: string) => `${SITE}${path}`;

export const areaServed = () =>
  siteConfig.serviceAreas.map((area) => ({ "@type": "City", name: area.name }));

// Short reference to the business, for nodes on pages other than the home page.
export const providerRef = () => ({
  "@type": "LocalBusiness",
  "@id": BUSINESS_ID,
  name: siteConfig.companyName,
  url: `${SITE}/`,
  telephone: PHONE_E164,
});

export function weeklyOffer(name: string, price: number, description: string): JsonLd {
  return {
    "@type": "Offer",
    name,
    description,
    price: price.toFixed(2),
    priceCurrency: "CAD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: price.toFixed(2),
      priceCurrency: "CAD",
      unitText: "WEEK",
      unitCode: "WEE",
    },
    itemOffered: { "@type": "Service", name },
  };
}

export const setOffer = () =>
  weeklyOffer(
    "Washer and dryer set rental",
    siteConfig.prices.set,
    "A washer and dryer set, per week. Repairs and old-machine haul-away included.",
  );

export const singleOffer = () =>
  weeklyOffer(
    "Single washer or dryer rental",
    siteConfig.prices.single,
    "One washer or one dryer, per week. Repairs and old-machine haul-away included.",
  );

export function localBusiness(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: siteConfig.companyName,
    description:
      "Washer and dryer rental in Toronto and the GTA. $12.50 a week for a washer and dryer set, $6.25 a week for one machine. Repairs and old-machine haul-away included. English, Spanish and Russian spoken.",
    url: `${SITE}/`,
    telephone: PHONE_E164,
    logo: `${SITE}/brand/logo.png`,
    image: `${SITE}/og-image.jpg`,
    priceRange: "$",
    currenciesAccepted: "CAD",
    paymentAccepted: "Interac e-Transfer, Credit Card",
    knowsLanguage: ["en", "es", "ru"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    areaServed: areaServed(),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Washer and dryer rentals",
      itemListElement: [setOffer(), singleOffer()],
    },
    sameAs: [siteConfig.facebook],
  };
}

export function breadcrumbList(items: Crumb[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

// A "Service" node for a page: washer and dryer rental, somewhere, at the weekly prices.
export function serviceNode(input: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  areaServed?: unknown;
  offers?: unknown;
  extra?: JsonLd;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.serviceType ?? "Washer and dryer rental",
    description: input.description,
    url: absolute(input.path),
    provider: providerRef(),
    areaServed: input.areaServed ?? areaServed(),
    ...input.extra,
    offers: input.offers ?? [setOffer(), singleOffer()],
  };
}

export function itemList(name: string, path: string, items: Array<{ name: string; path: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: absolute(path),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absolute(item.path),
    })),
  };
}

export const torontoPlace = (name: string) => ({
  "@type": "Place",
  name: `${name}, Toronto`,
  containedInPlace: { "@type": "City", name: "Toronto" },
});

export { absolute as absoluteSiteUrl, BUSINESS_ID };
