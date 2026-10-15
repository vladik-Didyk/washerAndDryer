// "Do we deliver to you?" by postal code, for the checker on the home, areas, city and district
// pages (src/components/PostalCodeChecker.jsx). Runs in the browser; nothing is sent anywhere.
//
// Every postal code starting with "M" is in the City of Toronto. For the other cities, the
// lists below cover the main FSAs (the first 3 characters of a postal code) that clearly belong
// to that city. They are not complete on purpose: an FSA we weren't sure about is left out, and
// any code that isn't listed gets "not sure, text us your address". The checker never says no.
//
// Imports carry the .js extension so `pnpm test` (plain Node) can load this file directly.
import { siteConfig } from "./config.js";
import { cities } from "./cities.js";

export const cityFsas = {
  Mississauga: [
    "L4T", "L4V", "L4W", "L4X", "L4Y", "L4Z", "L5A", "L5B", "L5C", "L5E", "L5G", "L5H",
    "L5J", "L5K", "L5L", "L5M", "L5N", "L5P", "L5R", "L5S", "L5T", "L5V", "L5W",
  ],
  Brampton: ["L6P", "L6R", "L6S", "L6T", "L6V", "L6W", "L6X", "L6Y", "L6Z", "L7A"],
  Vaughan: ["L4H", "L4J", "L4K", "L4L", "L6A"],
  Markham: ["L3P", "L3R", "L3S", "L3T", "L6B", "L6C", "L6E"],
  "Richmond Hill": ["L4B", "L4C", "L4E", "L4S"],
};

const cityByFsa = new Map(
  Object.entries(cityFsas).flatMap(([city, fsas]) => fsas.map((fsa) => [fsa, city])),
);

// Letter-digit-letter digit-letter-digit. D, F, I, O, Q and U are never used, and W and Z
// never come first. The second half is optional: "M5V" on its own is enough to answer.
const POSTAL_CODE = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z](\d[ABCEGHJ-NPRSTV-Z]\d)?$/;

// "m5v 2t6", " M5V-2T6 " -> "M5V2T6"
export const normalizePostalCode = (input) =>
  String(input ?? "")
    .toUpperCase()
    .replace(/[\s-]+/g, "");

// Returns { status, message, city?, path? }. status is "yes", "unsure" or "invalid".
export function checkPostalCode(input) {
  const code = normalizePostalCode(input);
  if (!POSTAL_CODE.test(code)) {
    return { status: "invalid", message: "Enter a valid Canadian postal code, like M5V 2T6." };
  }
  const cityName = code.startsWith("M") ? "Toronto" : cityByFsa.get(code.slice(0, 3));
  if (cityName) {
    const city = cities.find((entry) => entry.name === cityName);
    return {
      status: "yes",
      city: cityName,
      path: city ? `/${city.slug}/` : undefined,
      message: `Yes, we deliver in ${cityName}.`,
    };
  }
  return {
    status: "unsure",
    message: `Not sure from the postal code. Text us your address at ${siteConfig.phone.display} and we'll confirm.`,
  };
}
