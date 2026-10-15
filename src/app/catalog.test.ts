import { describe, expect, it } from "vitest";
import { loadAllDictionaries } from "~/shared/i18n";
import { TEST_NOW, testI18n } from "~/test/context";
import { siteCatalog, optionalPages as optionalPagesOf, type CatalogOptions } from "./catalog";
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
    expect(paths).not.toContain("/privacy/");
    expect(paths).not.toContain("/terms/");
    expect(optionalPages(live).optionalPages["/guides/"]).toBe(false);
  });

  it("shows drafts (marked) and /account/ when switched on", () => {
    const entries = catalog(preview);
    expect(entries.find((entry) => entry.path === "/terms/")?.draft).toBe(true);
    expect(entries.find((entry) => entry.path === "/guides/")?.draft).toBe(true);
    expect(entries.some((entry) => entry.path === "/account/")).toBe(true);
    expect(optionalPages(preview).draftPages).toContain("/privacy/");
  });

  it("never lists drafts in the sitemap", () => {
    const xml = sitemapXml(catalog(preview));
    expect(xml).not.toContain("/guides/");
    expect(xml).not.toContain("/terms/");
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
