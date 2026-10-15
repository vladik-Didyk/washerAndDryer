import { describe, expect, it } from "vitest";
import type { Promotion } from "~/shared/config";
import { createI18n } from "~/shared/i18n";
import { testI18n } from "~/test/context";
import { activePromotions, getPrice, isFirstWeekFreeActive, offerFacts, promotionText } from "./model";

const END = Date.parse("2026-12-01T05:00:00Z"); // the end of Nov 30, 2026 in Toronto

// The offer runs to the end of November 30, 2026 in Toronto (EST, UTC-5).
describe("first week free", () => {
  it("runs until 23:59:59 on November 30 in Toronto", () => {
    expect(isFirstWeekFreeActive(Date.parse("2026-10-15T12:00:00Z"))).toBe(true);
    expect(isFirstWeekFreeActive(Date.parse("2026-11-30T23:59:59-05:00"))).toBe(true);
    expect(isFirstWeekFreeActive(END - 1)).toBe(true);
  });

  it("is over from midnight December 1 in Toronto", () => {
    expect(isFirstWeekFreeActive(END)).toBe(false);
    expect(isFirstWeekFreeActive(Date.parse("2026-12-01T00:00:00-05:00"))).toBe(false);
    expect(isFirstWeekFreeActive(Date.parse("2027-01-01T00:00:00Z"))).toBe(false);
    expect(activePromotions(END).map((promotion) => promotion.id)).not.toContain("first-week-free");
  });

  it("is worded with its last day, and leaves the weekly price alone", async () => {
    const i18n = await testI18n();
    const [offer] = activePromotions(END - 1);
    expect(promotionText(offer, i18n)).toMatchObject({
      short: "First week free until Nov 30",
      text: expect.stringContaining("start a rental by November 30, 2026 pay no rent"),
      stillPaid: "The $200 deposit and the delivery are still paid.",
    });
    expect(getPrice("set", END - 1)).toMatchObject({ base: 12.5, current: 12.5 });
  });
});

describe("promotions", () => {
  const january: Promotion = {
    id: "first-week-free", // any wording key; the kind and value are what count here
    kind: "percentOff",
    value: 10,
    appliesTo: ["set"],
    startsAt: "2027-01-01T05:00:00Z",
    endsAt: "2027-02-01T05:00:00Z",
  };
  const inside = Date.parse("2027-01-15T12:00:00Z");
  const before = Date.parse("2026-12-31T12:00:00Z");
  const after = Date.parse("2027-02-01T05:00:00Z");

  it("lowers the price only inside its window, and only for what it applies to", () => {
    expect(getPrice("set", inside, [january])).toMatchObject({ base: 12.5, current: 11.25 });
    expect(getPrice("single", inside, [january])).toMatchObject({ base: 6.25, current: 6.25 });
    expect(getPrice("set", before, [january]).current).toBe(12.5);
    expect(getPrice("set", after, [january]).current).toBe(12.5);
  });

  it("changes every price in the text while it runs", async () => {
    await testI18n();
    const during = createI18n("en", offerFacts(inside, [january]));
    const outside = createI18n("en", offerFacts(before, [january]));
    expect(during.d.pages.home.title).toBe("Washer & Dryer Rental Toronto & GTA | $11.25/week");
    expect(during.d.machines.types.stackable.page.metaTitle).toContain("$11.25/week");
    expect(during.amount("setPrice")).toBe(11.25);
    expect(outside.d.pages.home.title).toBe("Washer & Dryer Rental Toronto & GTA | $12.50/week");
  });

  it("knows each kind", () => {
    const kinds: Array<[Promotion["kind"], number, number]> = [
      ["percentOff", 20, 10],
      ["amountOff", 2.5, 10],
      ["fixedPrice", 9.99, 9.99],
      ["freeWeeks", 1, 12.5],
    ];
    for (const [kind, value, expected] of kinds) {
      const promotion: Promotion = { id: "first-week-free", kind, value, appliesTo: ["set"] };
      expect(getPrice("set", inside, [promotion]).current, kind).toBe(expected);
    }
  });
});
