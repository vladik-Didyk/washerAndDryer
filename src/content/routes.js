// Every page of the site. The prerender script writes one dist/<path>index.html per route,
// the sitemap and llms.txt list them, and App.jsx picks the page component from the path.
// URLs always end with a slash.
//
// A route with `draft: true` exists only in preview builds (src/content/drafts.js); it gets a
// "Draft — not published" ribbon and is never listed in the sitemap.
// `breadcrumbs` feed both the visible trail and the BreadcrumbList JSON-LD.
import { cities } from "./cities";
import { districts } from "./districts";
import { machineTypes } from "./machines";
import { languagePages } from "./languages";

export const cityPath = (city) => `/${city.slug}/`;
export const districtPath = (district) => `/toronto/${district.slug}/`;
export const machinePath = (machine) => `/machines/${machine.slug}/`;

// Where "Check availability" goes on pages without the request form.
export const requestFormHref = "/#request";

const HOME = { name: "Home", path: "/" };
const MACHINES = { name: "Machines", path: "/machines/" };
const AREAS = { name: "Areas", path: "/areas/" };
const LANDLORDS = { name: "Landlords", path: "/landlords/" };
const TORONTO = { name: "Toronto", path: "/toronto/" };

const cityRoute = (city) => ({
  path: cityPath(city),
  kind: "city",
  lang: "en",
  city,
  metaTitle: city.metaTitle,
  metaDescription: city.metaDescription,
  breadcrumbs: [HOME, AREAS, { name: city.name, path: cityPath(city) }],
});

const districtRoute = (district) => ({
  path: districtPath(district),
  kind: "district",
  lang: "en",
  district,
  metaTitle: district.metaTitle,
  metaDescription: district.metaDescription,
  breadcrumbs: [HOME, AREAS, TORONTO, { name: district.name, path: districtPath(district) }],
});

export const routes = [
  {
    path: "/",
    kind: "home",
    lang: "en",
    name: "Home",
    llmsNote: "offer, machine types, prices, how it works, FAQ, request form",
    metaTitle: "Washer & Dryer Rental Toronto & GTA | $12.50/week",
    metaDescription:
      "Washer & dryer rental in Toronto and the GTA: $12.50 a week for a set, $6.25 for one machine. Repairs included. Call or text (437) 907-6955.",
  },
  {
    path: "/areas/",
    kind: "areas",
    lang: "en",
    llmsNote: "every city and Toronto district we deliver to, with a postal-code check",
    metaTitle: "Washer & Dryer Rental Service Area | Toronto & the GTA",
    metaDescription:
      "Where we deliver rental washers and dryers: Toronto and its districts, Mississauga, Brampton, Vaughan, Markham and Richmond Hill. Check your postal code.",
    breadcrumbs: [HOME, AREAS],
  },
  // Each city, with Toronto's districts right after Toronto.
  ...cities.flatMap((city) =>
    city.slug === "toronto" ? [cityRoute(city), ...districts.map(districtRoute)] : [cityRoute(city)],
  ),
  {
    path: "/machines/",
    kind: "machines",
    lang: "en",
    llmsNote: "all five machine types compared, with prices",
    metaTitle: "Washer & Dryer Types for Rent | Toronto, from $6.25/week",
    metaDescription:
      "Compare the washer and dryer types we rent in Toronto and the GTA: stackable, laundry centre, side-by-side front-load or top-load, or one machine.",
    breadcrumbs: [HOME, MACHINES],
  },
  ...machineTypes.map((machine) => ({
    path: machinePath(machine),
    kind: "machine",
    lang: "en",
    machine,
    metaTitle: machine.page.metaTitle,
    metaDescription: machine.page.metaDescription,
    breadcrumbs: [HOME, MACHINES, { name: machine.title, path: machinePath(machine) }],
  })),
  {
    path: "/landlords/",
    kind: "landlords",
    lang: "en",
    llmsNote: "two options: tenants rent directly, or the landlord rents machines for the units",
    metaTitle: "Washer & Dryer Rental for Landlords | Toronto & the GTA",
    metaDescription:
      "Laundry for rental units in Toronto and the GTA: tenants rent from us directly, or you rent machines for your units. Repairs included either way.",
    breadcrumbs: [HOME, LANDLORDS],
  },
  {
    path: "/landlords/quote/",
    kind: "landlord-quote",
    lang: "en",
    llmsNote: "quote request form for landlords",
    metaTitle: "Landlord Quote: Washers & Dryers for Rental Units",
    metaDescription:
      "Ask for a quote for washers and dryers in your rental units in Toronto and the GTA. For 3 or more units, we quote per building after seeing it.",
    breadcrumbs: [HOME, LANDLORDS, { name: "Get a quote", path: "/landlords/quote/" }],
  },
  {
    path: "/faq/",
    kind: "faq",
    lang: "en",
    llmsNote: "renting, prices and payment, delivery and installation, repairs, landlords, current offers",
    metaTitle: "Washer & Dryer Rental FAQ | GTA Washer & Dryer Rentals",
    metaDescription:
      "Answers about renting a washer and dryer in Toronto and the GTA: prices, the deposit, payment, delivery, installation, repairs and landlords.",
    breadcrumbs: [HOME, { name: "FAQ", path: "/faq/" }],
  },
  ...languagePages.map((content) => ({
    path: content.path,
    kind: "language",
    lang: content.lang,
    name: content.languageName,
    content,
    metaTitle: content.metaTitle,
    metaDescription: content.metaDescription,
  })),
];

export const notFoundRoute = {
  path: "/404/",
  kind: "not-found",
  lang: "en",
  metaTitle: "Page not found | GTA Washer & Dryer Rentals",
  metaDescription:
    "This page doesn't exist. Washer & dryer rental in Toronto and the GTA: $12.50 a week for a set. Call or text (437) 907-6955.",
};

// "/toronto" and "/toronto/index.html" both mean "/toronto/".
export function normalizePath(path = "/") {
  let clean = path.split(/[?#]/)[0] || "/";
  clean = clean.replace(/index\.html$/, "");
  if (!clean.startsWith("/")) clean = `/${clean}`;
  if (!clean.endsWith("/")) clean = `${clean}/`;
  return clean;
}

export function findRoute(path) {
  const clean = normalizePath(path);
  return routes.find((route) => route.path === clean) ?? notFoundRoute;
}

// Whether a page is part of this build: links to pages that may be missing (drafts, /account/)
// check this first, so a build never links to a page it doesn't have.
export const hasRoute = (path) => routes.some((route) => route.path === path);
