// The cities we deliver to (one page each at /<slug>/) and Toronto's districts (the former
// municipalities, /toronto/<slug>/). Which ones, and in which order, is in shared/config
// (serviceAreas); the words (name, teaser, meta, intro, neighbourhoods, homes, checklist) in
// the dictionary (shared/i18n areas.cities / areas.districts). Local detail stays generally
// true and non-promissory: no claims about installs done, customers or buildings served.
//
// `photo` is the example photo in the page header: one of the machine type photos in
// entities/machine, a different one for each area, picked to match the homes described.
// A district's `fits` lists the machine types that usually suit its homes (the reasons are in
// the dictionary); `regionNote` marks York (the former city), which is not York Region.
import { siteConfig } from "~/shared/config";
import type { Dictionary } from "~/shared/i18n";

type CitySlug = (typeof siteConfig.serviceAreas.cities)[number];
type DistrictSlug = (typeof siteConfig.serviceAreas.torontoDistricts)[number];
type FitSlug = keyof Dictionary["machines"]["types"];

const cityPhotos: Record<CitySlug, string> = {
  toronto: "photos/types/stackable.jpg",
  mississauga: "photos/types/stackable-1.jpg",
  brampton: "photos/types/side-by-side-front-load-2.jpg",
  vaughan: "photos/types/side-by-side-top-load-1.jpg",
  markham: "photos/types/side-by-side-front-load-1.jpg",
  "richmond-hill": "photos/types/side-by-side-top-load.jpg",
};

const districtFacts: Record<DistrictSlug, { photo: string; fits: FitSlug[]; regionNote?: boolean }> = {
  "north-york": {
    photo: "photos/types/stackable-1.jpg",
    fits: ["stackable", "laundry-centre", "side-by-side-top-load", "single-machine"],
  },
  etobicoke: {
    photo: "photos/types/side-by-side-front-load.jpg",
    fits: ["stackable", "side-by-side-front-load", "side-by-side-top-load", "single-machine"],
  },
  scarborough: {
    photo: "photos/types/side-by-side-top-load-1.jpg",
    fits: ["side-by-side-top-load", "side-by-side-front-load", "laundry-centre", "single-machine"],
  },
  "east-york": {
    photo: "photos/types/side-by-side-top-load-2.jpg",
    fits: ["side-by-side-top-load", "stackable", "laundry-centre", "single-machine"],
  },
  // Not York Region: Vaughan, Markham and Richmond Hill have their own pages.
  york: {
    photo: "photos/types/side-by-side-front-load-2.jpg",
    fits: ["side-by-side-front-load", "side-by-side-top-load", "stackable", "single-machine"],
    regionNote: true,
  },
};

// The York Region cities (the note on the York page).
export const YORK_REGION: string[] = ["vaughan", "markham", "richmond-hill"];

export type City = Dictionary["areas"]["cities"][CitySlug] & { slug: CitySlug; photo: string };

export interface District extends Omit<Dictionary["areas"]["districts"][DistrictSlug], "fits"> {
  slug: DistrictSlug;
  photo: string;
  regionNote: boolean;
  fits: Array<{ machine: FitSlug; note: string }>;
}

const builtCities = new WeakMap<Dictionary, City[]>();
const builtDistricts = new WeakMap<Dictionary, District[]>();

// The cities, in the language of `d` (i18n.d).
export function getCities(d: Dictionary): City[] {
  let list = builtCities.get(d);
  if (!list) {
    list = siteConfig.serviceAreas.cities.map((slug) => ({ ...d.areas.cities[slug], slug, photo: cityPhotos[slug] }));
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
        photo: facts.photo,
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
