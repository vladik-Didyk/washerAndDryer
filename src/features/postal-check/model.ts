// "Do we deliver to you?" by postal code, for the checker on the home, areas, city and district
// pages (./ui.tsx), and for the postal code in the rental request (processes/rental-request).
// The checker runs in the browser; nothing is sent anywhere.
//
// The place of a code comes from its FSA (the first 3 characters), in ./fsa-data.ts: every
// Ontario FSA, generated from the published FSA lists (scripts/postal-fsas.mjs). Outside
// Ontario, the first letter names the province. The checker never says no:
//   yes      the FSA is in one of our cities: "Yes, we deliver in North York, Toronto."
//   outside  any other place: "Oakville is outside our usual area. Call or text us."
//   unsure   a valid code we can't place (a rural route): "Text us your address."
//   invalid  not a Canadian postal code.
import { cityPath, findCity } from "~/entities/area";
import { formatPostalCode, isPostalCode, normalizePostalCode } from "~/shared/forms";
import type { I18n } from "~/shared/i18n";
import { DELIVERY_FSAS, FSA_PLACES } from "./fsa-data";

// The format check is the postal field's (shared/forms), the same for this checker and the
// rental request.
export { formatPostalCode, normalizePostalCode };

// Outside Ontario, the first letter of a postal code is the province or territory.
const PROVINCES: Record<string, string> = {
  A: "Newfoundland and Labrador",
  B: "Nova Scotia",
  C: "Prince Edward Island",
  E: "New Brunswick",
  G: "Quebec",
  H: "Quebec",
  J: "Quebec",
  R: "Manitoba",
  S: "Saskatchewan",
  T: "Alberta",
  V: "British Columbia",
  X: "the Northwest Territories or Nunavut",
  Y: "Yukon",
};

export type PostalStatus = "yes" | "outside" | "unsure" | "invalid";

export interface PostalCheck {
  status: PostalStatus;
  message: string;
  /** yes: the city, in the language of the page. */
  city?: string;
  /** yes: the city's page. */
  path?: string;
  /** yes: "North York, Toronto"; outside: "Oakville". */
  place?: string;
}

// The message and the names are in the language of `i18n` (place names stay English, the
// cities as the dictionary writes them).
export function checkPostalCode(input: unknown, i18n: I18n): PostalCheck {
  const { d, format } = i18n;
  const code = normalizePostalCode(input);
  if (!isPostalCode(code)) return { status: "invalid", message: d.postalCheck.invalid };
  const fsa = code.slice(0, 3);

  const delivery = DELIVERY_FSAS[fsa];
  const city = delivery ? findCity(d, delivery[0]) : undefined;
  if (delivery && city) {
    const [, area, namesCity] = delivery;
    // "Downtown Toronto" already names the city; "North York" gets ", Toronto".
    const place = !area ? city.name : namesCity ? area : `${area}, ${city.name}`;
    return { status: "yes", city: city.name, path: cityPath(city), place, message: format(d.postalCheck.yes, { city: place }) };
  }

  const elsewhere = FSA_PLACES[fsa] ?? PROVINCES[fsa[0]];
  if (elsewhere) {
    return { status: "outside", place: elsewhere, message: format(d.postalCheck.outside, { place: elsewhere }) };
  }
  return { status: "unsure", message: d.postalCheck.unsure };
}
