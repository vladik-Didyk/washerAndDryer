// Every URL of the site. Pages live in src/pages (one slice each), the rental request in
// src/processes/rental-request, and the text files (sitemap, robots, llms) in ./resources.
// All page URLs end with a slash (workers/app.ts redirects the ones without).
//
// Every page exists in every language of the registry (shared/i18n LANGUAGES), at the same
// slug: English at the root (/faq/), the others under their code (/es/faq/, /ru/faq/). The
// list below is written once and registered per language; route ids get the language code
// (`faq`, `faq.es`, `faq.ru`). The policies are English-only, and so are the text files.
// Unknown URLs, drafts in a normal deployment and /account/ without a Stripe portal all end in
// the 404 page (the root error boundary), in the language of the URL.
import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { DEFAULT_LANG, LANGUAGES } from "../shared/i18n";

const page = (name: string) => `../pages/${name}/index.ts`;
const step = (name: string) => `../processes/rental-request/routes/${name}.ts`;

// [path, id, module]: "" is the language's home page.
const PAGES: Array<[path: string, id: string, file: string]> = [
  ["", "home", page("home")],
  ["areas", "areas", page("areas")],
  ["toronto/:district", "district", page("district")],
  ["machines", "machines", page("machines")],
  ["machines/:slug", "machine", page("machine")],
  ["landlords", "landlords", page("landlords")],
  ["landlords/quote", "landlord-quote", page("landlord-quote")],
  ["buildings", "buildings", page("buildings")],
  ["faq", "faq", page("faq")],
  ["about", "about", page("about")],
  ["contact", "contact", page("contact")],
  ["repair", "repair", page("repair")],
  ["account", "account", page("account")],
  ["guides", "guides", page("guides")],
  ["guides/:slug", "guide", page("guide")],
  ["start", "start", step("machine")],
  ["start/details", "start-details", step("details")],
  ["start/contact", "start-contact", step("contact")],
  ["start/done", "start-done", step("done")],
  // A city page (/toronto/, /es/mississauga/, ...): any other one-segment URL is a 404.
  [":city", "city", page("city")],
];

// The pages of one language: `es/faq` with the id `faq.es`; English keeps the plain ones.
export const languageRoutes = (code: string) =>
  PAGES.map(([path, id, file]) => {
    const prefix = code === DEFAULT_LANG ? "" : code;
    const full = [prefix, path].filter(Boolean).join("/");
    const routeId = code === DEFAULT_LANG ? id : `${id}.${code}`;
    return full ? route(full, file, { id: routeId }) : index(file, { id: routeId });
  });

export default [
  ...LANGUAGES.flatMap((language) => languageRoutes(language.code)),
  // English only.
  route("privacy", page("legal"), { id: "privacy" }),
  route("terms", page("legal"), { id: "terms" }),
  route("sitemap.xml", "resources/sitemap.ts", { id: "sitemap" }),
  route("robots.txt", "resources/robots.ts", { id: "robots" }),
  route("llms.txt", "resources/llms.ts", { id: "llms" }),
  route("*", "../pages/not-found/route.tsx", { id: "not-found" }),
] satisfies RouteConfig;
