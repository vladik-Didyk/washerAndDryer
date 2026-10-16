// The five machine types: shown in the Machines section, offered in the rental request, and
// each given its own page at /machines/<slug>/. Facts here; words in the dictionary
// (shared/i18n machines.types.<slug>): the name, the comparison (`compare`, the table on
// /machines/), typical sizes (`sizes`, the table on the type's page), the page copy and the
// photos' alt texts.
//
// Pictures: `photos` are example photos (Pexels, see docs/photo-credits.md) in
// public/photos/types/, the first one the main photo. Each is shown only when its file is in
// the build, with WebP and smaller versions from `pnpm photos`. A type with no photo file
// shows `drawing` instead (a standalone SVG in public/types/, also used in social graphics),
// marked as a drawing. See ./ui/MachineImage.tsx and src/shared/lib/photos.ts.
import type { PriceItem } from "~/shared/config";
import type { Dictionary } from "~/shared/i18n";
import { hasPhotoFile } from "~/shared/lib/photos";

export type MachineSlug = keyof Dictionary["machines"]["types"];
type MachineText = Dictionary["machines"]["types"][MachineSlug];

export interface MachinePhoto {
  src: string;
  alt: string;
}

export interface MachineType extends Omit<MachineText, "photos"> {
  slug: MachineSlug;
  /** What it costs: a washer + dryer set, or one machine (entities/offer). */
  item: PriceItem;
  photos: MachinePhoto[];
  drawing: string;
}

const machineFacts: Array<{ slug: MachineSlug; item: PriceItem; photos: string[]; drawing: string }> = [
  { slug: "stackable", item: "set", photos: ["stackable-1", "stackable", "rooms/stacked-small-room", "shared/stacked-dryers-tiles"], drawing: "types/stackable.svg" },
  // No photo yet: the drawing shows until this file is added (docs/photo-credits.md).
  { slug: "laundry-centre", item: "set", photos: ["laundry-centre"], drawing: "types/one-piece.svg" },
  {
    slug: "side-by-side-front-load",
    item: "set",
    photos: [
      "side-by-side-front-load-1",
      "side-by-side-front-load-2",
      "side-by-side-front-load",
      "rooms/dark-set-laundry-room",
      "rooms/grey-set-laundry-room",
    ],
    drawing: "types/side-by-side-front.svg",
  },
  {
    slug: "side-by-side-top-load",
    item: "set",
    photos: ["side-by-side-top-load-1", "side-by-side-top-load-2", "side-by-side-top-load"],
    drawing: "types/side-by-side-top.svg",
  },
  {
    slug: "single-machine",
    item: "single",
    photos: [
      "single-machine-washer",
      "single-machine-dryer",
      "single-machine",
      "rooms/washer-shelves",
      "rooms/washer-cabinet-plants",
      "rooms/black-washer-basket",
    ],
    drawing: "types/single.svg",
  },
];

export const machineSlugs: MachineSlug[] = machineFacts.map((machine) => machine.slug);

const built = new WeakMap<Dictionary, MachineType[]>();

// The types with their words in the language of `d` (i18n.d).
export function getMachineTypes(d: Dictionary): MachineType[] {
  let types = built.get(d);
  if (!types) {
    types = machineFacts.map((facts) => {
      const text = d.machines.types[facts.slug];
      const alts = text.photos as Record<string, string>;
      return {
        ...text,
        ...facts,
        // A name with a folder ("rooms/washer-shelves") is a laundry-room photo (alt text in
        // the photos namespace); a bare name is in photos/types/ (alt text with the type).
        photos: facts.photos.map((name) =>
          name.includes("/")
            ? { src: `photos/${name}.jpg`, alt: (d.photos as Record<string, string>)[name] ?? "" }
            : { src: `photos/types/${name}.jpg`, alt: alts[name] ?? "" },
        ),
      };
    });
    built.set(d, types);
  }
  return types;
}

export const findMachine = (d: Dictionary, slug: string) => getMachineTypes(d).find((machine) => machine.slug === slug);

// The type's photos whose files are in this build, main photo first. None: show the drawing.
export const machinePhotos = (machine: MachineType) => machine.photos.filter((photo) => hasPhotoFile(photo.src));

// One of the type photos by its file, with the type it shows (city and district pages pick
// theirs this way). Null when the file isn't in the build.
export function findMachinePhoto(d: Dictionary, src: string): (MachinePhoto & { machine: MachineType }) | null {
  for (const machine of getMachineTypes(d)) {
    const photo = machinePhotos(machine).find((item) => item.src === src);
    if (photo) return { ...photo, machine };
  }
  return null;
}

export const machinePath = (machine: { slug: string }) => `/machines/${machine.slug}/`;
