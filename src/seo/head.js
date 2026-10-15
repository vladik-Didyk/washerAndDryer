// Per-route <head> tags and JSON-LD, inserted into each prerendered page by
// scripts/prerender.mjs. Facts come from src/content/; nothing here invents a claim.
// No reviews or ratings: there are none yet.
import { siteConfig } from "../content/config";
import { faqs } from "../content/faqs";
import { cities } from "../content/cities";
import { districts } from "../content/districts";
import { languagePages } from "../content/languages";
import { machineTypes } from "../content/machines";
import { guides } from "../content/guides";
import { heroPhoto, photoFiles } from "../content/photos";
import { guidePath, machinePath, routes } from "../content/routes";

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

function weeklyOffer(name, price, description) {
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

const setOffer = () =>
  weeklyOffer(
    "Washer and dryer set rental",
    siteConfig.prices.set,
    "A washer and dryer set, per week. Repairs and old-machine haul-away included.",
  );
const singleOffer = () =>
  weeklyOffer(
    "Single washer or dryer rental",
    siteConfig.prices.single,
    "One washer or one dryer, per week. Repairs and old-machine haul-away included.",
  );

function localBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: siteConfig.companyName,
    description:
      "Washer and dryer rental in Toronto and the GTA. $12.50 a week for a washer and dryer set, $6.25 a week for one machine. Repairs and old-machine haul-away included. English, Spanish and Russian spoken.",
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

function districtService(route) {
  const { district } = route;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Washer and dryer rental in ${district.name}, Toronto`,
    serviceType: "Washer and dryer rental",
    description: route.metaDescription,
    url: absolute(route.path),
    provider: providerRef(),
    areaServed: {
      "@type": "Place",
      name: `${district.name}, Toronto`,
      containedInPlace: { "@type": "City", name: "Toronto" },
    },
    offers: [setOffer(), singleOffer()],
  };
}

// The /areas/ page: one service, every city and Toronto district.
function areasService(route) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Washer and dryer rental in Toronto and the GTA",
    serviceType: "Washer and dryer rental",
    description: route.metaDescription,
    url: absolute(route.path),
    provider: providerRef(),
    areaServed: [
      ...areaServed(),
      ...districts.map((district) => ({
        "@type": "Place",
        name: `${district.name}, Toronto`,
        containedInPlace: { "@type": "City", name: "Toronto" },
      })),
    ],
    offers: [setOffer(), singleOffer()],
  };
}

// The /machines/ page: the five types as a list, and the two weekly prices.
function machinesJsonLd(route) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Washer and dryer types for rent",
      url: absolute(route.path),
      itemListElement: machineTypes.map((machine, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: machine.title,
        url: absolute(machinePath(machine)),
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Washer and dryer rental",
      serviceType: "Washer and dryer rental",
      description: route.metaDescription,
      url: absolute(route.path),
      provider: providerRef(),
      areaServed: areaServed(),
      offers: [setOffer(), singleOffer()],
    },
  ];
}

function landlordService(route) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Washer and dryer rental for landlords",
    serviceType: "Washer and dryer rental for rental units",
    description: route.metaDescription,
    url: absolute(route.path),
    provider: providerRef(),
    areaServed: areaServed(),
    audience: { "@type": "Audience", audienceType: "Landlords" },
    offers: weeklyOffer(
      "Washer and dryer set for a rental unit",
      siteConfig.prices.set,
      "List price per washer and dryer set, per week. For 3 or more units, quoted per building after seeing it. Repairs included.",
    ),
  };
}

function aboutPage(route) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: route.metaTitle,
    description: route.metaDescription,
    url: absolute(route.path),
    about: providerRef(),
  };
}

function contactPage(route) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: route.metaTitle,
    description: route.metaDescription,
    url: absolute(route.path),
    about: {
      ...providerRef(),
      contactPoint: {
        "@type": "ContactPoint",
        telephone: PHONE,
        contactType: "customer service",
        areaServed: "CA-ON",
        availableLanguage: ["English", "Spanish", "Russian"],
      },
    },
  };
}

// A guide. The author and publisher are the business itself: no author bios.
function guideArticle(route) {
  const { guide } = route;
  const url = absolute(route.path);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: route.metaDescription,
    url,
    mainEntityOfPage: url,
    datePublished: guide.published,
    dateModified: guide.updated,
    inLanguage: "en-CA",
    image: `${SITE}/og-image.jpg`,
    author: providerRef(),
    publisher: {
      ...providerRef(),
      logo: { "@type": "ImageObject", url: `${SITE}/brand/logo.png` },
    },
  };
}

function guidesList(route) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Guides for renting a washer and dryer",
    url: absolute(route.path),
    itemListElement: guides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.title,
      url: absolute(guidePath(guide)),
    })),
  };
}

function machineService(route) {
  const { machine } = route;
  const offer =
    machine.price === siteConfig.prices.set
      ? weeklyOffer(`${machine.title} rental`, machine.price, `${machine.title}, per week. Repairs and old-machine haul-away included.`)
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

function mainJsonLd(route) {
  switch (route.kind) {
    case "home":
      return [localBusiness()];
    case "faq":
      // The only page with FAQPage markup: every question on the site lives on /faq/.
      return [faqPage()];
    case "areas":
      return [areasService(route)];
    case "city":
      return [cityService(route)];
    case "district":
      return [districtService(route)];
    case "machines":
      return machinesJsonLd(route);
    case "machine":
      return [machineService(route)];
    case "landlords":
      return [landlordService(route)];
    case "about":
      return [aboutPage(route)];
    case "guides":
      return [guidesList(route)];
    case "guide":
      return [guideArticle(route)];
    case "contact":
      return [contactPage(route)];
    case "language":
      return [languageService(route)];
    default:
      return [];
  }
}

// The page's own nodes, then its BreadcrumbList (every inner page has one).
function jsonLdFor(route) {
  const nodes = mainJsonLd(route);
  if (route.breadcrumbs) nodes.push(breadcrumbs(route.breadcrumbs));
  return nodes;
}

// Preload for the photo at the top of a page, with the same files and `sizes` as its <picture>,
// so the browser fetches it while still reading the <head>. WebP when there is one.
function photoPreload({ src, sizes, media }) {
  const files = photoFiles(src);
  if (!files) return null;
  const srcSet = files.webpSrcSet ?? files.jpegSrcSet;
  return [
    `<link rel="preload" as="image"`,
    files.webpSrcSet ? ` type="image/webp"` : "",
    ` imagesrcset="${escapeAttr(srcSet)}" imagesizes="${escapeAttr(sizes)}"`,
    media ? ` media="${escapeAttr(media)}"` : "",
    ` fetchpriority="high" />`,
  ].join("");
}

function photoPreloads(route) {
  if (route.kind === "home") return [photoPreload(heroPhoto.narrow), photoPreload(heroPhoto.wide)];
  return [];
}

// The home page and the Spanish and Russian pages are language versions of each other.
const languageAlternates = [
  { lang: "en", path: "/" },
  ...languagePages.map((page) => ({ lang: page.lang, path: page.path })),
];

// Cloudflare Web Analytics: cookie-free visit counts, only once a token is set in config.js.
function analyticsTag() {
  const token = siteConfig.cloudflareAnalyticsToken;
  if (!token) return null;
  if (!/^[\w-]+$/.test(token)) throw new Error("cloudflareAnalyticsToken has unexpected characters");
  return `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${token}"}'></script>`;
}

export function renderHead(route) {
  // Drafts (preview builds only) and the 404 page stay out of search results.
  const isIndexed = route.kind !== "not-found" && !route.draft;
  const url = absolute(route.path);
  const tags = [
    `<title>${escapeAttr(route.metaTitle)}</title>`,
    `<meta name="description" content="${escapeAttr(route.metaDescription)}" />`,
    ...photoPreloads(route).filter(Boolean),
  ];

  if (route.kind !== "not-found") {
    tags.push(`<link rel="canonical" href="${url}" />`);
    tags.push(`<meta property="og:url" content="${url}" />`);
  }
  if (!isIndexed) tags.push(`<meta name="robots" content="noindex" />`);

  tags.push(
    `<meta property="og:type" content="${route.kind === "guide" ? "article" : "website"}" />`,
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

  const analytics = analyticsTag();
  if (analytics) tags.push(analytics);
  return tags.join("\n    ");
}

// Published pages only: drafts are never listed, even in a preview build.
export function sitemapXml() {
  const urls = routes
    .filter((route) => !route.draft)
    .map(
      (route) =>
        `  <url>\n    <loc>${absolute(route.path)}</loc>\n    <lastmod>${siteConfig.lastUpdated}</lastmod>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
