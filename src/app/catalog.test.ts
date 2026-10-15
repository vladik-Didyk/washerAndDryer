import { describe, expect, it } from "vitest";
import { siteCatalog, optionalPages, type CatalogOptions } from "./catalog";
import { sitemapXml } from "./resources/sitemap";
import { llmsTxt } from "./resources/llms";

const live: CatalogOptions = { previewDrafts: false, stripePortalUrl: null, offerActive: true, analyticsOn: false };
const preview: CatalogOptions = { ...live, previewDrafts: true, stripePortalUrl: "https://billing.stripe.com/p/login/test" };

describe("site catalog", () => {
  it("keeps titles to 60 characters and descriptions to 155", () => {
    for (const entry of siteCatalog(preview)) {
      expect(entry.title.length, entry.path).toBeLessThanOrEqual(60);
      expect(entry.description.length, entry.path).toBeLessThanOrEqual(155);
    }
  });

  it("gives every page its own title and description", () => {
    const entries = siteCatalog(preview);
    expect(new Set(entries.map((entry) => entry.title)).size).toBe(entries.length);
    expect(new Set(entries.map((entry) => entry.description)).size).toBe(entries.length);
  });

  it("leaves drafts and /account/ out of a normal deployment", () => {
    const paths = siteCatalog(live).map((entry) => entry.path);
    expect(paths).not.toContain("/account/");
    expect(paths.filter((path) => path.startsWith("/guides/"))).toEqual([]);
    expect(paths).not.toContain("/privacy/");
    expect(paths).not.toContain("/terms/");
    expect(optionalPages(live).optionalPages["/guides/"]).toBe(false);
  });

  it("shows drafts (marked) and /account/ when switched on", () => {
    const entries = siteCatalog(preview);
    expect(entries.find((entry) => entry.path === "/terms/")?.draft).toBe(true);
    expect(entries.find((entry) => entry.path === "/guides/")?.draft).toBe(true);
    expect(entries.some((entry) => entry.path === "/account/")).toBe(true);
    expect(optionalPages(preview).draftPages).toContain("/privacy/");
  });

  it("never lists drafts in the sitemap", () => {
    const xml = sitemapXml(siteCatalog(preview));
    expect(xml).not.toContain("/guides/");
    expect(xml).not.toContain("/terms/");
    expect(xml).toContain("<loc>https://washerrent.com/toronto/north-york/</loc>");
  });

  it("lists the offer in llms.txt only while it runs", () => {
    expect(llmsTxt(siteCatalog(live), true)).toContain("- First week free:");
    expect(llmsTxt(siteCatalog(live), false)).not.toContain("- First week free:");
    expect(llmsTxt(siteCatalog(live), true)).not.toMatch(/draft/);
  });
});
