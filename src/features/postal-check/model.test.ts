import { describe, expect, it } from "vitest";
import { checkPostalCode, formatPostalCode } from "./model";

const TEXT_US =
  "Not sure from the postal code. Text us your address at (437) 907-6955 and we'll confirm.";
const INVALID = "Enter a valid Canadian postal code, like M5V 2T6.";

// The cases from the old `pnpm test` (scripts/test-postal-codes.mjs), unchanged.
const samples: Array<[string, string]> = [
  ["M5V 2T6", "Yes, we deliver in Toronto."],
  ["m2n6k1", "Yes, we deliver in Toronto."],
  ["L5B 1M2", "Yes, we deliver in Mississauga."],
  ["L6Y 0A1", "Yes, we deliver in Brampton."],
  ["L4K 2Z2", "Yes, we deliver in Vaughan."],
  ["L3R 9Z1", "Yes, we deliver in Markham."],
  ["L4B 3P4", "Yes, we deliver in Richmond Hill."],
  ["K1A 0B1", TEXT_US],
  ["12345", INVALID],
  // Edge cases: spacing and a hyphen, the FSA alone, letters never used, empty input.
  ["  l5b-1m2 ", "Yes, we deliver in Mississauga."],
  ["M5V", "Yes, we deliver in Toronto."],
  ["L0J 1C0", TEXT_US],
  ["D5V 2T6", INVALID],
  ["", INVALID],
];

describe("checkPostalCode", () => {
  it.each(samples)("%j -> %s", (input, expected) => {
    expect(checkPostalCode(input).message).toBe(expected);
  });

  it("links a yes to the city's page", () => {
    expect(checkPostalCode("L5B 1M2")).toMatchObject({ status: "yes", city: "Mississauga", path: "/mississauga/" });
    expect(checkPostalCode("M5V 2T6")).toMatchObject({ status: "yes", path: "/toronto/" });
  });

  it("never says no: unknown codes are 'unsure', bad input is 'invalid'", () => {
    expect(checkPostalCode("K1A 0B1").status).toBe("unsure");
    expect(checkPostalCode("12345").status).toBe("invalid");
  });
});

describe("formatPostalCode", () => {
  it("writes a full code with a space", () => {
    expect(formatPostalCode(" m2n6k1")).toBe("M2N 6K1");
    expect(formatPostalCode("M5V")).toBe("M5V");
  });
});
