// Every URL of the site. Pages live in src/pages (one slice each), the rental request in
// src/processes/rental-request, and the text files (sitemap, robots, llms) in ./resources.
// All page URLs end with a slash (workers/app.ts redirects the ones without).
// Unknown URLs, drafts in a normal deployment and /account/ without a Stripe portal all end in
// the 404 page (the root error boundary).
import { type RouteConfig, index, route } from "@react-router/dev/routes";

const page = (name: string) => `../pages/${name}/index.ts`;
const step = (name: string) => `../processes/rental-request/routes/${name}.ts`;

export default [
  index(page("home"), { id: "home" }),
  route("areas", page("areas"), { id: "areas" }),
  route("toronto/:district", page("district"), { id: "district" }),
  route("machines", page("machines"), { id: "machines" }),
  route("machines/:slug", page("machine"), { id: "machine" }),
  route("landlords", page("landlords"), { id: "landlords" }),
  route("landlords/quote", page("landlord-quote"), { id: "landlord-quote" }),
  route("faq", page("faq"), { id: "faq" }),
  route("about", page("about"), { id: "about" }),
  route("contact", page("contact"), { id: "contact" }),
  route("repair", page("repair"), { id: "repair" }),
  route("account", page("account"), { id: "account" }),
  route("guides", page("guides"), { id: "guides" }),
  route("guides/:slug", page("guide"), { id: "guide" }),
  route("privacy", page("legal"), { id: "privacy" }),
  route("terms", page("legal"), { id: "terms" }),
  route("es", page("language"), { id: "language-es" }),
  route("ru", page("language"), { id: "language-ru" }),
  route("start", step("machine"), { id: "start" }),
  route("start/details", step("details"), { id: "start-details" }),
  route("start/contact", step("contact"), { id: "start-contact" }),
  route("start/done", step("done"), { id: "start-done" }),
  route("sitemap.xml", "resources/sitemap.ts", { id: "sitemap" }),
  route("robots.txt", "resources/robots.ts", { id: "robots" }),
  route("llms.txt", "resources/llms.ts", { id: "llms" }),
  // A city page (/toronto/, /mississauga/, ...): any other one-segment URL is a 404.
  route(":city", page("city"), { id: "city" }),
  route("*", "../pages/not-found/route.tsx", { id: "not-found" }),
] satisfies RouteConfig;
