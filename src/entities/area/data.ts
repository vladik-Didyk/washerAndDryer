// The cities we deliver to (one page each at /<slug>/) and Toronto's districts (the former
// municipalities, /toronto/<slug>/). Which ones, and in which order, is in shared/config
// (serviceAreas); the words (name, teaser, meta, intro, neighbourhoods, homes, checklist) in
// the dictionary (shared/i18n areas.cities / areas.districts). Local detail stays generally
// true and non-promissory: no claims about installs done, customers or buildings served.
//
// A district's `pin` is where it sits on the drawn service map (ui/AreaMap, the page header):
// a rough spot inside Toronto, not a survey point.
// A district's `fits` lists the machine types that usually suit its homes (the reasons are in
// the dictionary); `regionNote` marks York (the former city), which is not York Region.
import { siteConfig } from "~/shared/config";
import type { Dictionary } from "~/shared/i18n";

type CitySlug = (typeof siteConfig.serviceAreas.cities)[number];
type DistrictSlug = (typeof siteConfig.serviceAreas.torontoDistricts)[number];
type FitSlug = keyof Dictionary["machines"]["types"];

const districtFacts: Record<DistrictSlug, { pin: [x: number, y: number]; fits: FitSlug[]; regionNote?: boolean }> = {
  "north-york": {
    pin: [420, 196],
    fits: ["stackable", "laundry-centre", "side-by-side-top-load", "single-machine"],
  },
  etobicoke: {
    pin: [262, 250],
    fits: ["stackable", "side-by-side-front-load", "side-by-side-top-load", "single-machine"],
  },
  scarborough: {
    pin: [580, 204],
    fits: ["side-by-side-top-load", "side-by-side-front-load", "laundry-centre", "single-machine"],
  },
  "east-york": {
    pin: [500, 238],
    fits: ["side-by-side-top-load", "stackable", "laundry-centre", "single-machine"],
  },
  // Not York Region: Vaughan, Markham and Richmond Hill have their own pages.
  york: {
    pin: [360, 244],
    fits: ["side-by-side-front-load", "side-by-side-top-load", "stackable", "single-machine"],
    regionNote: true,
  },
};

// The York Region cities (the note on the York page).
export const YORK_REGION: string[] = ["vaughan", "markham", "richmond-hill"];

export type City = Dictionary["areas"]["cities"][CitySlug] & { slug: CitySlug };
export type { CitySlug };

export interface District extends Omit<Dictionary["areas"]["districts"][DistrictSlug], "fits"> {
  slug: DistrictSlug;
  pin: [x: number, y: number];
  regionNote: boolean;
  fits: Array<{ machine: FitSlug; note: string }>;
}

const builtCities = new WeakMap<Dictionary, City[]>();
const builtDistricts = new WeakMap<Dictionary, District[]>();

// The cities, in the language of `d` (i18n.d).
export function getCities(d: Dictionary): City[] {
  let list = builtCities.get(d);
  if (!list) {
    list = siteConfig.serviceAreas.cities.map((slug) => ({ ...d.areas.cities[slug], slug }));
    builtCities.set(d, list);
  }
  return list;
}

// Toronto's districts, in the language of `d`.
export function getDistricts(d: Dictionary): District[] {
  let list = builtDistricts.get(d);
  if (!list) {
    list = siteConfig.serviceAreas.torontoDistricts.map((slug) => {
      const facts = districtFacts[slug];
      const text = d.areas.districts[slug];
      const notes = text.fits as Partial<Record<FitSlug, string>>;
      return {
        ...text,
        slug,
        pin: facts.pin,
        regionNote: facts.regionNote ?? false,
        fits: facts.fits.map((machine) => ({ machine, note: notes[machine] ?? "" })),
      };
    });
    builtDistricts.set(d, list);
  }
  return list;
}

export const cityPath = (city: { slug: string }) => `/${city.slug}/`;
export const districtPath = (district: { slug: string }) => `/toronto/${district.slug}/`;
export const findCity = (d: Dictionary, slug: string) => getCities(d).find((city) => city.slug === slug);
export const findDistrict = (d: Dictionary, slug: string) => getDistricts(d).find((district) => district.slug === slug);
