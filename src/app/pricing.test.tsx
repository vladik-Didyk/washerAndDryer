// Prices and promotions reach every page from shared/config/pricing.ts alone: change a price,
// or add a promotion, and the rendered pages, titles, JSON-LD and llms.txt follow.
import type { ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { offerFacts } from "~/entities/offer";
import HomePage from "~/pages/home/ui";
import { pricing, promotions, type Promotion } from "~/shared/config";
import { I18nProvider, createI18n, loadAllDictionaries, type Lang } from "~/shared/i18n";
import { serverText } from "~/shared/i18n/index.server";
import { SiteProvider, torontoYear } from "~/shared/lib";
import { localBusiness } from "~/shared/seo";
import { TEST_NOW } from "~/test/context";
import { Footer } from "~/widgets/footer";
import { OfferBar } from "~/widgets/offer-bar";
import { siteCatalog } from "./catalog";
import { llmsTxt } from "./resources/llms.server";

await loadAllDictionaries();

const weekly = pricing.weekly as { set: number; single: number };
const original = { ...weekly };
const originalPromotions = [...promotions];

afterEach(() => {
  Object.assign(weekly, original);
  promotions.splice(0, promotions.length, ...originalPromotions);
});

// A page as the root renders it: the text and the site state of one moment.
function render(page: ReactNode, { lang = "en", now = TEST_NOW }: { lang?: Lang; now?: number } = {}) {
  const i18n = createI18n(lang, offerFacts(now));
  const site = { now, year: torontoYear(now), optionalPages: {}, draftPages: [], stripePortalUrl: null };
  return renderToString(
    <I18nProvider value={i18n}>
      <SiteProvider value={site}>
        <OfferBar />
        {page}
        <Footer />
      </SiteProvider>
    </I18nProvider>,
  ).replaceAll("<!-- -->", "");
}

// Everything English the server writes for a moment: the dictionary, the server-only text,
// the catalog of titles and descriptions, llms.txt and the business JSON-LD.
function serverOutput(now = TEST_NOW) {
  const i18n = createI18n("en", offerFacts(now));
  const options = { previewDrafts: true, stripePortalUrl: "https://example.com", now, analyticsOn: false };
  const catalog = siteCatalog(options, i18n);
  return JSON.stringify([i18n.d, serverText(i18n), catalog, llmsTxt(catalog, i18n, now), localBusiness(i18n)]);
}

describe("changing a base price", () => {
  it("shows today's prices everywhere", () => {
    expect(render(<HomePage />)).toContain("$12.50");
    expect(serverOutput()).toContain("$12.50");
  });

  it("changes every rendered occurrence and leaves no stale price", () => {
    weekly.set = 13.75;
    weekly.single = 7;
    const home = render(<HomePage />);
    const spanish = render(<HomePage />, { lang: "es" });
    const russian = render(<HomePage />, { lang: "ru" });
    const french = render(<HomePage />, { lang: "fr" });
    const server = serverOutput();
    for (const output of [home, spanish, russian, french, server]) {
      expect(output).not.toMatch(/12\.50|6\.25/);
    }
    expect(home).toContain("$13.75");
    expect(home).toContain("$7 a week");
    expect(spanish).toContain("$7 por semana");
    expect(spanish).toContain("$13.75");
    expect(russian).toContain("$7");
    expect(server).toContain("Washer & Dryer Rental Toronto & GTA | $13.75/week");
    expect(server).toContain('"price":"13.75"');
  });
});

describe("a percent-off promotion", () => {
  const tenOff: Promotion = {
    id: "first-week-free",
    kind: "percentOff",
    value: 10,
    appliesTo: ["set"],
    startsAt: "2026-10-01T04:00:00Z",
    endsAt: "2026-11-01T04:00:00Z",
  };

  it("shows the lower price, with the list price struck through, while it runs", () => {
    promotions.splice(0, promotions.length, tenOff);
    const home = render(<HomePage />);
    expect(home).toContain("$11.25");
    expect(home).toContain('<span class="sr-only">was $12.50</span><s aria-hidden="true">$12.50</s>');
    expect(serverOutput()).toContain("| $11.25/week");
  });

  it("changes nothing outside its window", () => {
    promotions.splice(0, promotions.length, tenOff);
    const later = Date.parse("2026-11-15T15:00:00Z");
    const home = render(<HomePage />, { now: later });
    expect(home).not.toContain("$11.25");
    expect(home).not.toContain("was $12.50");
    expect(serverOutput(later)).not.toContain("11.25");
  });
});

describe("the first week free", () => {
  const end = Date.parse("2026-12-01T05:00:00Z");

  it("shows until the end of November 30 in Toronto, then disappears", () => {
    expect(render(<HomePage />, { now: end - 1 })).toContain("First week free until Nov 30");
    expect(render(<HomePage />, { now: end })).not.toContain("First week free");
    expect(render(<HomePage />, { lang: "es", now: end - 1 })).toContain("Primera semana gratis");
    expect(render(<HomePage />, { lang: "es", now: end })).not.toContain("Primera semana gratis");
    expect(createI18n("es", offerFacts(end - 1)).d.offers.promotions["first-week-free"].note).toContain(
      "hasta el 30 de noviembre de 2026",
    );
    const llms = (now: number) => {
      const i18n = createI18n("en", offerFacts(now));
      const options = { previewDrafts: false, stripePortalUrl: null, now, analyticsOn: false };
      return llmsTxt(siteCatalog(options, i18n), i18n, now);
    };
    expect(llms(end - 1)).toContain("- First week free: New customers who start a rental by November 30, 2026");
    expect(llms(end)).not.toContain("First week free");
  });
});
