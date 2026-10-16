// The list of pages built ahead of time (prerender.json, read by react-router.config.ts) must
// match the published site: every page of the catalog in each of its languages, except the
// rental request (it keeps a session per visitor), plus the text files. Drafts are left out:
// the build runs without PREVIEW_DRAFTS. When a page is added or removed, this test fails
// and prints the new list: paste it into prerender.json.
import { describe, expect, it } from "vitest";
import { loadAllDictionaries, localizePath } from "~/shared/i18n";
import { pagePaths, siteConfig } from "~/shared/config";
import { TEST_NOW, testI18n } from "~/test/context";
import { siteCatalog } from "./catalog";
import prerendered from "./prerender.json";

await loadAllDictionaries();

describe("pages built ahead of time", () => {
  it("are the published pages, without the rental request", async () => {
    const options = { previewDrafts: false, stripePortalUrl: siteConfig.stripePortalUrl, now: TEST_NOW, analyticsOn: false };
    const expected = [
      ...siteCatalog(options, await testI18n())
        .filter((entry) => !entry.draft && entry.path !== pagePaths.start)
        .flatMap((entry) => entry.languages.map((lang) => localizePath(entry.path, lang))),
      "/sitemap.xml",
      "/robots.txt",
      "/llms.txt",
    ];
    expect(prerendered, `prerender.json should be:\n${JSON.stringify(expected, null, 2)}`).toEqual(expected);
  });
});
