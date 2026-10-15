// Schema.org JSON-LD pieces shared by the pages. Facts come from shared/config and the
// request's prices (the i18n facts, entities/offer); words from the dictionary. Nothing here
// invents a claim. No reviews or ratings: there are none yet.
import { siteConfig } from "../config/site";
import type { I18n } from "../i18n";
import type { Crumb, JsonLd } from "./types";

const SITE = siteConfig.siteUrl;
const BUSINESS_ID = `${SITE}/#business`;
export const PHONE_E164 = siteConfig.phone.e164;

const absolute = (path: string) => `${SITE}${path}`;

// Every city we deliver to.
export const areaServed = ({ d }: I18n) =>
  siteConfig.serviceAreas.cities.map((slug) => ({ "@type": "City", name: d.areas.cities[slug].name }));

// Short reference to the business, for nodes on pages other than the home page.
export const providerRef = () => ({
  "@type": "LocalBusiness",
  "@id": BUSINESS_ID,
  name: siteConfig.companyName,
  url: `${SITE}/`,
  telephone: PHONE_E164,
});

// A weekly price, as schema.org wants it: "12.50".
const schemaPrice = (amount: number) => amount.toFixed(2);

export function weeklyOffer(name: string, price: number, description: string): JsonLd {
  return {
    "@type": "Offer",
    name,
    description,
    price: schemaPrice(price),
    priceCurrency: "CAD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: schemaPrice(price),
      priceCurrency: "CAD",
      unitText: "WEEK",
      unitCode: "WEE",
    },
    itemOffered: { "@type": "Service", name },
  };
}

export const setOffer = (i18n: I18n) =>
  weeklyOffer(i18n.d.jsonLd.setOffer.name, i18n.amount("setPrice"), i18n.d.jsonLd.setOffer.description);

export const singleOffer = (i18n: I18n) =>
  weeklyOffer(i18n.d.jsonLd.singleOffer.name, i18n.amount("singlePrice"), i18n.d.jsonLd.singleOffer.description);

export function localBusiness(i18n: I18n): JsonLd {
  const { business } = i18n.d.jsonLd;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: siteConfig.companyName,
    description: business.description,
    url: `${SITE}/`,
    telephone: PHONE_E164,
    logo: `${SITE}/brand/logo.png`,
    image: `${SITE}/og-image.jpg`,
    priceRange: "$",
    currenciesAccepted: "CAD",
    paymentAccepted: business.paymentAccepted,
    knowsLanguage: [...siteConfig.spokenLanguages],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    areaServed: areaServed(i18n),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...siteConfig.hours.days],
        opens: siteConfig.hours.opens,
        closes: siteConfig.hours.closes,
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: business.catalog,
      itemListElement: [setOffer(i18n), singleOffer(i18n)],
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
export function serviceNode(
  i18n: I18n,
  input: {
    name: string;
    description: string;
    path: string;
    serviceType?: string;
    areaServed?: unknown;
    offers?: unknown;
    extra?: JsonLd;
  },
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.serviceType ?? i18n.d.jsonLd.serviceType,
    description: input.description,
    url: absolute(input.path),
    provider: providerRef(),
    areaServed: input.areaServed ?? areaServed(i18n),
    ...input.extra,
    offers: input.offers ?? [setOffer(i18n), singleOffer(i18n)],
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

// A Toronto district as a place inside the city.
export const torontoPlace = (i18n: I18n, place: string) => ({
  "@type": "Place",
  name: i18n.format(i18n.d.jsonLd.torontoPlace, { place }),
  containedInPlace: { "@type": "City", name: i18n.d.areas.cities.toronto.name },
});

export { absolute as absoluteSiteUrl, BUSINESS_ID };
