// Every page of the site. The prerender script writes one dist/<path>index.html per route,
// the sitemap lists them, and App.jsx picks the page component from the path.
// URLs always end with a slash.
import { cities } from "./cities";
import { machineTypes } from "./machines";
import { languagePages } from "./languages";

export const routes = [
  {
    path: "/",
    kind: "home",
    lang: "en",
    metaTitle: "Washer & Dryer Rental Toronto & GTA | $12.50/week",
    metaDescription:
      "Washer & dryer rental in Toronto and the GTA: $12.50 a week for a set, $6.25 for one machine. Repairs included. Call or text (437) 907-6955.",
  },
  ...cities.map((city) => ({
    path: `/${city.slug}/`,
    kind: "city",
    lang: "en",
    city,
    metaTitle: city.metaTitle,
    metaDescription: city.metaDescription,
  })),
  ...machineTypes.map((machine) => ({
    path: `/machines/${machine.slug}/`,
    kind: "machine",
    lang: "en",
    machine,
    metaTitle: machine.page.metaTitle,
    metaDescription: machine.page.metaDescription,
  })),
  ...languagePages.map((content) => ({
    path: content.path,
    kind: "language",
    lang: content.lang,
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

export const cityPath = (city) => `/${city.slug}/`;
export const machinePath = (machine) => `/machines/${machine.slug}/`;
