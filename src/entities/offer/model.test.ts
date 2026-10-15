import { describe, expect, it } from "vitest";
import { isFirstWeekFreeActive } from "./model";

// The offer runs to the end of November 30, 2026 in Toronto (EST, UTC-5).
describe("first week free", () => {
  it("runs until 23:59:59 on November 30 in Toronto", () => {
    expect(isFirstWeekFreeActive(Date.parse("2026-10-15T12:00:00Z"))).toBe(true);
    expect(isFirstWeekFreeActive(Date.parse("2026-11-30T23:59:59-05:00"))).toBe(true);
  });

  it("is over from midnight December 1 in Toronto", () => {
    expect(isFirstWeekFreeActive(Date.parse("2026-12-01T00:00:00-05:00"))).toBe(false);
    expect(isFirstWeekFreeActive(Date.parse("2027-01-01T00:00:00Z"))).toBe(false);
  });
});
