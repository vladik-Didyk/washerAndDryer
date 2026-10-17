// The consent contract of the visit statistics (./analytics): nothing loads and nothing is
// sent before Accept, everything is a no-op on the server, and Decline keeps it that way.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../config", () => ({
  siteConfig: { analytics: { ga4Id: "G-TEST123", clarityId: "", posthogKey: "", posthogHost: "" } },
}));

// A browser just big enough for the module: localStorage, <head> and the window it writes to.
function fakeBrowser() {
  const store = new Map<string, string>();
  const scripts: string[] = [];
  const win = {
    localStorage: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => void store.set(key, value),
    },
    location: { href: "https://washerrent.com/faq/" },
    dispatchEvent: () => true,
  } as unknown as Window;
  const doc = {
    title: "FAQ",
    createElement: () => ({}) as HTMLScriptElement,
    head: { appendChild: (el: HTMLScriptElement) => void scripts.push(el.src) },
  } as unknown as Document;
  vi.stubGlobal("window", win);
  vi.stubGlobal("document", doc);
  return { win, scripts };
}

beforeEach(() => {
  vi.resetModules();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("visit statistics", () => {
  it("do nothing on the server", async () => {
    const analytics = await import("./analytics");
    expect(analytics.analyticsConfigured).toBe(true);
    expect(analytics.consentChoice()).toBeNull();
    await analytics.initAnalytics();
    expect(() => analytics.trackEvent("generate_lead", { form: "repair" })).not.toThrow();
  });

  it("load nothing and send nothing before Accept", async () => {
    const { win, scripts } = fakeBrowser();
    const analytics = await import("./analytics");
    await analytics.initAnalytics();
    analytics.trackPageView("/faq/");
    expect(scripts).toEqual([]);
    expect(win.dataLayer).toBeUndefined();
  });

  it("stay off after Decline", async () => {
    const { scripts } = fakeBrowser();
    const analytics = await import("./analytics");
    analytics.saveConsent("declined");
    await analytics.initAnalytics();
    expect(analytics.hasConsented()).toBe(false);
    expect(scripts).toEqual([]);
  });

  it("load Google Analytics once after Accept, then count page views and events", async () => {
    const { win, scripts } = fakeBrowser();
    const analytics = await import("./analytics");
    analytics.saveConsent("accepted");
    await analytics.initAnalytics();
    await analytics.initAnalytics();
    expect(scripts).toEqual(["https://www.googletagmanager.com/gtag/js?id=G-TEST123"]);

    analytics.trackPageView("/faq/");
    analytics.trackEvent("generate_lead", { form: "repair" });
    const sent = (win.dataLayer ?? []).map((args) => Array.from(args as ArrayLike<unknown>));
    expect(sent).toContainEqual(["event", "page_view", expect.objectContaining({ page_path: "/faq/" })]);
    expect(sent).toContainEqual(["event", "generate_lead", { form: "repair" }]);
  });
});
