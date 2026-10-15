// "Do we deliver to you?" by postal code, for the checker on the home, areas, city and district
// pages (./ui.tsx), and for the postal code in the rental request (processes/rental-request).
// The checker runs in the browser; nothing is sent anywhere.
//
// Every postal code starting with "M" is in the City of Toronto. For the other cities, the
// lists below cover the main FSAs (the first 3 characters of a postal code) that clearly belong
// to that city. They are not complete on purpose: an FSA we weren't sure about is left out, and
// any code that isn't listed gets "not sure, text us your address". The checker never says no.
import { cityPath, findCity } from "~/entities/area";
import { formatPostalCode, isPostalCode, normalizePostalCode } from "~/shared/forms";
import type { I18n } from "~/shared/i18n";

// The format check is the postal field's (shared/forms), the same for this checker and the
// rental request.
export { formatPostalCode, normalizePostalCode };

// By city (its slug in entities/area).
export const cityFsas: Record<string, string[]> = {
  mississauga: [
    "L4T", "L4V", "L4W", "L4X", "L4Y", "L4Z", "L5A", "L5B", "L5C", "L5E", "L5G", "L5H",
    "L5J", "L5K", "L5L", "L5M", "L5N", "L5P", "L5R", "L5S", "L5T", "L5V", "L5W",
  ],
  brampton: ["L6P", "L6R", "L6S", "L6T", "L6V", "L6W", "L6X", "L6Y", "L6Z", "L7A"],
  vaughan: ["L4H", "L4J", "L4K", "L4L", "L6A"],
  markham: ["L3P", "L3R", "L3S", "L3T", "L6B", "L6C", "L6E"],
  "richmond-hill": ["L4B", "L4C", "L4E", "L4S"],
};

const cityByFsa = new Map<string, string>(
  Object.entries(cityFsas).flatMap(([city, fsas]) => fsas.map((fsa): [string, string] => [fsa, city])),
);

export type PostalStatus = "yes" | "unsure" | "invalid";

export interface PostalCheck {
  status: PostalStatus;
  message: string;
  city?: string;
  path?: string;
}

// status is "yes", "unsure" or "invalid"; the message and the city name are in the language
// of `i18n`.
export function checkPostalCode(input: unknown, { d, format }: I18n): PostalCheck {
  const code = normalizePostalCode(input);
  if (!isPostalCode(code)) return { status: "invalid", message: d.postalCheck.invalid };
  const slug = code.startsWith("M") ? "toronto" : cityByFsa.get(code.slice(0, 3));
  const city = slug ? findCity(d, slug) : undefined;
  if (city) {
    return {
      status: "yes",
      city: city.name,
      path: cityPath(city),
      message: format(d.postalCheck.yes, { city: city.name }),
    };
  }
  return { status: "unsure", message: d.postalCheck.unsure };
}
