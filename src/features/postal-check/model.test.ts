import { describe, expect, it } from "vitest";
import { testI18n } from "~/test/context";
import { checkPostalCode, formatPostalCode } from "./model";

const i18n = await testI18n();

const TEXT_US =
  "Not sure from the postal code. Text us your address at (437) 907-6955 and we'll confirm.";
const INVALID = "Enter a valid Canadian postal code, like M5V 2T6.";
const outside = (place: string) =>
  `${place} is outside our usual area. Call or text (437) 907-6955 and we'll check.`;

const samples: Array<[string, string]> = [
  // Toronto: the district by FSA; "Downtown Toronto" already names the city.
  ["M5V 2T6", "Yes, we deliver in Downtown Toronto."],
  ["m2n6k1", "Yes, we deliver in North York, Toronto."],
  ["M1B 3C3", "Yes, we deliver in Scarborough, Toronto."],
  ["M9W 1A1", "Yes, we deliver in Etobicoke, Toronto."],
  // The other cities: the neighbourhood when the FSA has one, else the city alone.
  ["L5B 1M2", "Yes, we deliver in West Cooksville, Mississauga."],
  ["L6Y 0A1", "Yes, we deliver in Brampton."],
  ["L4K 2Z2", "Yes, we deliver in Concord, Vaughan."],
  ["L3R 9Z1", "Yes, we deliver in Markham."],
  ["L4B 3P4", "Yes, we deliver in Richmond Hill."],
  // Missing from the old hand-typed list.
  ["L3L 1A1", "Yes, we deliver in Woodbridge, Vaughan."],
  ["L6G 0A1", "Yes, we deliver in Downtown Markham."],
  // Thornhill: west of Yonge is Vaughan, east is Markham.
  ["L4J 1A1", "Yes, we deliver in Thornhill, Vaughan."],
  ["L3T 1A1", "Yes, we deliver in Thornhill, Markham."],
  // Ontario outside our cities: the place by name, and call us.
  ["L6H 1A1", outside("Oakville")],
  ["L1V 1A1", outside("Pickering")],
  ["K1A 0B1", outside("Ottawa")],
  ["N6A 1A1", outside("London")],
  // Other provinces: the province by the first letter.
  ["V6B 1A1", outside("British Columbia")],
  ["H2X 1Y4", outside("Quebec")],
  // A rural code (the table lists FSAs, not rural routes): not sure.
  ["L0J 1C0", TEXT_US],
  ["12345", INVALID],
  // Edge cases: spacing and a hyphen, the FSA alone, letters never used, empty input.
  ["  l5b-1m2 ", "Yes, we deliver in West Cooksville, Mississauga."],
  ["M5V", "Yes, we deliver in Downtown Toronto."],
  ["D5V 2T6", INVALID],
  ["", INVALID],
];

describe("checkPostalCode", () => {
  it.each(samples)("%j -> %s", (input, expected) => {
    expect(checkPostalCode(input, i18n).message).toBe(expected);
  });

  it("links a yes to the city's page", () => {
    expect(checkPostalCode("L5B 1M2", i18n)).toMatchObject({ status: "yes", city: "Mississauga", path: "/mississauga/" });
    expect(checkPostalCode("M5V 2T6", i18n)).toMatchObject({ status: "yes", path: "/toronto/" });
  });

  it("keeps the city name apart from the place shown", () => {
    expect(checkPostalCode("M2N 6K1", i18n)).toMatchObject({ status: "yes", city: "Toronto", place: "North York, Toronto" });
    expect(checkPostalCode("L6H 1A1", i18n)).toMatchObject({ status: "outside", place: "Oakville" });
    expect(checkPostalCode("L6H 1A1", i18n).city).toBeUndefined();
  });

  it("never says no: far codes are 'outside', unknown ones 'unsure', bad input 'invalid'", () => {
    expect(checkPostalCode("V6B 1A1", i18n).status).toBe("outside");
    expect(checkPostalCode("L0J 1C0", i18n).status).toBe("unsure");
    expect(checkPostalCode("12345", i18n).status).toBe("invalid");
  });

  it("writes Toronto in the page's language", async () => {
    const russian = await testI18n("ru");
    expect(checkPostalCode("M2N 6K1", russian).place).toBe("North York, Торонто");
  });
});

describe("formatPostalCode", () => {
  it("writes a full code with a space", () => {
    expect(formatPostalCode(" m2n6k1")).toBe("M2N 6K1");
    expect(formatPostalCode("M5V")).toBe("M5V");
  });
});
