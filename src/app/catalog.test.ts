import { describe, expect, it } from "vitest";
import { loadAllDictionaries } from "~/shared/i18n";
import { TEST_NOW, testI18n } from "~/test/context";
import { LANGUAGES } from "~/shared/i18n";
import { headMeta, pageHead } from "~/shared/seo";
import { siteCatalog, optionalPages as optionalPagesOf, type CatalogOptions } from "./catalog";
import routes from "./routes";
import { sitemapXml } from "./resources/sitemap";
import { llmsTxt as llmsTxtOf } from "./resources/llms.server";

await loadAllDictionaries();
const i18n = await testI18n();
const AFTER_OFFER = Date.parse("2026-12-01T05:00:00Z");

const live: CatalogOptions = { previewDrafts: false, stripePortalUrl: null, now: TEST_NOW, analyticsOn: false };
const preview: CatalogOptions = { ...live, previewDrafts: true, stripePortalUrl: "https://billing.stripe.com/p/login/test" };

const catalog = (options: CatalogOptions) => siteCatalog(options, i18n);
const optionalPages = (options: CatalogOptions) => optionalPagesOf(options, i18n);
const llmsTxt = async (entries: ReturnType<typeof catalog>, now: number) => llmsTxtOf(entries, await testI18n("en", now), now);

describe("site catalog", () => {
  it("keeps titles to 60 characters and descriptions to 155", () => {
    for (const entry of catalog(preview)) {
      expect(entry.title.length, entry.path).toBeLessThanOrEqual(60);
      expect(entry.description.length, entry.path).toBeLessThanOrEqual(155);
    }
  });

  it("gives every page its own title and description", () => {
    const entries = catalog(preview);
    expect(new Set(entries.map((entry) => entry.title)).size).toBe(entries.length);
    expect(new Set(entries.map((entry) => entry.description)).size).toBe(entries.length);
  });

  it("leaves drafts and /account/ out of a normal deployment", () => {
    const paths = catalog(live).map((entry) => entry.path);
    expect(paths).not.toContain("/account/");
    expect(paths.filter((path) => path.startsWith("/guides/"))).toEqual([]);
    expect(optionalPages(live).optionalPages["/guides/"]).toBe(false);
  });

  it("publishes the privacy policy and the rental terms (approved 2026-10-16)", () => {
    const entries = catalog(live).filter((entry) => entry.path === "/privacy/" || entry.path === "/terms/");
    expect(entries.map((entry) => [entry.path, entry.draft, entry.languages])).toEqual([
      ["/privacy/", false, ["en"]],
      ["/terms/", false, ["en"]],
    ]);
  });

  it("shows drafts (marked) and /account/ when switched on", () => {
    const entries = catalog(preview);
    expect(entries.find((entry) => entry.path === "/guides/")?.draft).toBe(true);
    expect(entries.some((entry) => entry.path === "/account/")).toBe(true);
    expect(optionalPages(preview).draftPages).toContain("/guides/");
  });

  it("never lists drafts in the sitemap", () => {
    const xml = sitemapXml(catalog(preview));
    expect(xml).not.toContain("/guides/");
    expect(xml).toContain("<loc>https://washerrent.com/terms/</loc>");
    // The customer sign-in exists here (preview) but is noindex: never in the sitemap.
    expect(xml).not.toContain("/account/");
    expect(xml).toContain("<loc>https://washerrent.com/toronto/north-york/</loc>");
  });

  it("lists the offer in llms.txt only while it runs", async () => {
    expect(await llmsTxt(catalog(live), TEST_NOW)).toContain("- First week free:");
    expect(await llmsTxt(catalog(live), AFTER_OFFER)).not.toContain("- First week free:");
    expect(await llmsTxt(catalog(live), TEST_NOW)).not.toMatch(/draft/);
  });

  it("drops the first-week section from the terms once the offer ends", async () => {
    const terms = (now: number) => catalog({ ...preview, now }).find((entry) => entry.path === "/terms/");
    expect(terms(TEST_NOW)).toBeTruthy();
    const { allLegalPages } = await import("~/pages/legal/index.server");
    const ids = (now: number) =>
      allLegalPages(i18n, { now, analyticsOn: false })[1].sections.map((section) => section.id);
    expect(ids(TEST_NOW)).toContain("first-week-free");
    expect(ids(AFTER_OFFER)).not.toContain("first-week-free");
  });
});

describe("languages", () => {
  // Every route path, as React Router matches it ("es/faq", "" for the English home page).
  const paths = new Set(routes.map((entry) => entry.path ?? ""));

  it("registers every page for every language, and the policies in English only", () => {
    const english = routes.filter((entry) => !entry.id?.includes(".")).map((entry) => entry.path ?? "");
    const perLanguage = english.filter((path) => !["privacy", "terms", "sitemap.xml", "robots.txt", "llms.txt", "*"].includes(path));
    expect(perLanguage).toContain("start/details");
    for (const { code } of LANGUAGES.filter((language) => language.code !== "en")) {
      for (const path of perLanguage) expect(paths, `${code}/${path}`).toContain([code, path].filter(Boolean).join("/"));
      expect(paths).not.toContain(`${code}/privacy`);
    }
  });

  it("has a route for every page of the catalog, in each of its languages", () => {
    const routeOf = (path: string) =>
      [...paths].some((route) => {
        const parts = route.split("/").filter(Boolean);
        const wanted = path.split("/").filter(Boolean);
        return parts.length === wanted.length && parts.every((part, index) => part.startsWith(":") || part === wanted[index]);
      });
    for (const entry of catalog(preview)) {
      for (const lang of entry.languages) {
        const localized = lang === "en" ? entry.path : `/${lang}${entry.path}`;
        expect(routeOf(localized), localized).toBe(true);
      }
    }
  });

  it("lists every page in all four languages in the sitemap, with alternates", () => {
    const xml = sitemapXml(catalog(live));
    for (const loc of ["/machines/stackable/", "/es/machines/stackable/", "/ru/machines/stackable/", "/es/", "/ru/start/", "/fr/machines/stackable/", "/fr/buildings/"]) {
      expect(xml).toContain(`<loc>https://washerrent.com${loc}</loc>`);
    }
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="es" href="https://washerrent.com/es/faq/"/>');
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="x-default" href="https://washerrent.com/faq/"/>');
    expect(xml.match(/<loc>/g)?.length).toBe(catalog(live).reduce((sum, entry) => sum + entry.languages.length, 0));
  });

  it("gives each page hreflang links to its four versions, and a canonical in its own language", async () => {
    const spanish = await testI18n("es");
    const tags = headMeta(pageHead(spanish, { path: "/faq/", kind: "faq", title: "t", description: "d" }));
    const links = tags.filter((tag) => "tagName" in tag && tag.tagName === "link") as Array<Record<string, string>>;
    expect(links.find((link) => link.rel === "canonical")?.href).toBe("https://washerrent.com/es/faq/");
    expect(links.filter((link) => link.rel === "alternate").map((link) => `${link.hrefLang} ${link.href}`)).toEqual([
      "en https://washerrent.com/faq/",
      "es https://washerrent.com/es/faq/",
      "ru https://washerrent.com/ru/faq/",
      "fr https://washerrent.com/fr/faq/",
      "x-default https://washerrent.com/faq/",
    ]);
    const policy = headMeta(pageHead(spanish, { path: "/terms/", kind: "terms", title: "t", description: "d" }));
    expect(policy.some((tag) => "rel" in tag && tag.rel === "alternate")).toBe(false);
  });
});
