// Per-route <head> tags and JSON-LD, inserted into each prerendered page by
// scripts/prerender.mjs. Facts come from src/content/; nothing here invents a claim.
// No reviews or ratings: there are none yet.
import { siteConfig } from "../content/config";
import { faqs } from "../content/faqs";
import { cities } from "../content/cities";
import { languagePages } from "../content/languages";
import { routes } from "../content/routes";

const SITE = siteConfig.siteUrl;
const BUSINESS_ID = `${SITE}/#business`;
const PHONE = "+1-437-907-6955";
const OG_LOCALES = { en: "en_CA" };
for (const page of languagePages) OG_LOCALES[page.lang] = page.locale;

const absolute = (path) => `${SITE}${path}`;

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// JSON inside <script>: "<" is escaped so no string can close the tag.
const jsonLdScript = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

const areaServed = () =>
  cities.map((city) => ({ "@type": "City", name: city.name }));

// Short reference to the business, for nodes on pages other than the home page.
const providerRef = () => ({
  "@type": "LocalBusiness",
  "@id": BUSINESS_ID,
  name: siteConfig.companyName,
  url: `${SITE}/`,
  telephone: PHONE,
});

function monthlyOffer(name, price, description) {
  return {
    "@type": "Offer",
    name,
    description,
    price: String(price),
    priceCurrency: "CAD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: String(price),
      priceCurrency: "CAD",
      unitText: "MONTH",
      unitCode: "MON",
    },
    itemOffered: { "@type": "Service", name },
  };
}

const setOffer = () =>
  monthlyOffer(
    "Washer and dryer set rental",
    siteConfig.prices.set,
    "A washer and dryer set, per month. Repairs and old-machine haul-away included.",
  );
const singleOffer = () =>
  monthlyOffer(
    "Single washer or dryer rental",
    siteConfig.prices.single,
    "One washer or one dryer, per month. Repairs and old-machine haul-away included.",
  );

function localBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: siteConfig.companyName,
    description:
      "Washer and dryer rental in Toronto and the GTA. $50 a month for a washer and dryer set, $25 a month for one machine. Repairs and old-machine haul-away included. English, Spanish and Russian spoken.",
    url: `${SITE}/`,
    telephone: PHONE,
    logo: `${SITE}/brand/logo.png`,
    image: `${SITE}/og-image.jpg`,
    priceRange: "$",
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

function faqPage() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

function breadcrumbs(items) {
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

function cityService(route) {
  const { city } = route;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Washer and dryer rental in ${city.name}`,
    serviceType: "Washer and dryer rental",
    description: route.metaDescription,
    url: absolute(route.path),
    provider: providerRef(),
    areaServed: { "@type": "City", name: city.name },
    offers: [setOffer(), singleOffer()],
  };
}

function machineService(route) {
  const { machine } = route;
  const offer =
    machine.price === siteConfig.prices.set
      ? monthlyOffer(`${machine.title} rental`, machine.price, `${machine.title}, per month. Repairs and old-machine haul-away included.`)
      : singleOffer();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: machine.page.h1,
    serviceType: "Washer and dryer rental",
    description: route.metaDescription,
    url: absolute(route.path),
    provider: providerRef(),
    areaServed: areaServed(),
    offers: offer,
  };
}

function languageService(route) {
  const { content } = route;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.h1,
    description: content.metaDescription,
    url: absolute(route.path),
    provider: providerRef(),
    areaServed: areaServed(),
    availableLanguage: content.lang,
    offers: [setOffer(), singleOffer()],
  };
}

function jsonLdFor(route) {
  switch (route.kind) {
    case "home":
      return [localBusiness(), faqPage()];
    case "city":
      return [
        cityService(route),
        breadcrumbs([
          { name: "Home", path: "/" },
          { name: route.city.name, path: route.path },
        ]),
      ];
    case "machine":
      return [
        machineService(route),
        breadcrumbs([
          { name: "Home", path: "/" },
          { name: route.machine.title, path: route.path },
        ]),
      ];
    case "language":
      return [languageService(route)];
    default:
      return [];
  }
}

// The home page and the Spanish and Russian pages are language versions of each other.
const languageAlternates = [
  { lang: "en", path: "/" },
  ...languagePages.map((page) => ({ lang: page.lang, path: page.path })),
];

export function renderHead(route) {
  const isIndexed = route.kind !== "not-found";
  const url = absolute(route.path);
  const tags = [
    `<title>${escapeAttr(route.metaTitle)}</title>`,
    `<meta name="description" content="${escapeAttr(route.metaDescription)}" />`,
  ];

  if (isIndexed) {
    tags.push(`<link rel="canonical" href="${url}" />`);
    tags.push(`<meta property="og:url" content="${url}" />`);
  } else {
    tags.push(`<meta name="robots" content="noindex" />`);
  }

  tags.push(
    `<meta property="og:locale" content="${OG_LOCALES[route.lang] ?? "en_CA"}" />`,
    `<meta property="og:title" content="${escapeAttr(route.metaTitle)}" />`,
    `<meta property="og:description" content="${escapeAttr(route.metaDescription)}" />`,
    `<meta name="twitter:title" content="${escapeAttr(route.metaTitle)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(route.metaDescription)}" />`,
  );

  if (languageAlternates.some((alt) => alt.path === route.path)) {
    for (const alt of languageAlternates) {
      tags.push(`<link rel="alternate" hreflang="${alt.lang}" href="${absolute(alt.path)}" />`);
    }
    tags.push(`<link rel="alternate" hreflang="x-default" href="${SITE}/" />`);
  }

  if (siteConfig.googleSiteVerification) {
    tags.push(
      `<meta name="google-site-verification" content="${escapeAttr(siteConfig.googleSiteVerification)}" />`,
    );
  }
  if (siteConfig.bingSiteVerification) {
    tags.push(`<meta name="msvalidate.01" content="${escapeAttr(siteConfig.bingSiteVerification)}" />`);
  }

  for (const data of jsonLdFor(route)) tags.push(jsonLdScript(data));
  return tags.join("\n    ");
}

export function sitemapXml() {
  const urls = routes
    .map(
      (route) =>
        `  <url>\n    <loc>${absolute(route.path)}</loc>\n    <lastmod>${siteConfig.lastUpdated}</lastmod>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
