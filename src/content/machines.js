// The five machine types: shown in the Machines section, offered in the request form, and
// each given its own page at /machines/<slug>/. `compare` feeds the table on /machines/;
// `sizes` (with `compare.loads` and `compare.goodFor`) the table on the type's page. Sizes
// are typical ones only, in inches and centimetres: 24″ = 61 cm, 27″ = 69 cm, 55″ = 140 cm,
// 70″ = 178 cm.
//
// Pictures: `photos` are example photos (Pexels, see docs/photo-credits.md), the first one the
// main photo. Each is shown only when its file is in public/photos/types/, with WebP and
// smaller versions from `pnpm photos`. A type with no photo file shows `drawing` instead (a
// standalone SVG in public/types/, also used in social graphics), marked as a drawing.
// Every photo carries "Example of this type. Your machine may be a different brand."
// See src/components/MachineImage.jsx and src/content/photos.js.
import { hasPhotoFile } from "./photos";

export const machineTypes = [
  {
    slug: "stackable",
    compare: {
      width: "About 24″ (61 cm) or 27″ (69 cm), one machine wide",
      loads: "Front",
      goodFor: "Narrow, tall closets in condos and apartments",
    },
    sizes: [
      { label: "Width", value: "About 24″ (61 cm) compact, or about 27″ (69 cm) full-size" },
      { label: "Floor space", value: "One machine wide: the dryer stands on top of the washer" },
    ],
    title: "Stackable pair",
    description: "Dryer stacked on a front-load washer. Fits narrow closets.",
    price: 12.5,
    priceNote: "for the set",
    photos: [
      {
        src: "photos/types/stackable-1.jpg",
        alt: "Example of a stackable washer and dryer: a white dryer on top of a white front-load washer",
      },
      {
        src: "photos/types/stackable.jpg",
        alt: "Example of a stackable washer and dryer in a laundry closet with its door open",
      },
    ],
    drawing: "types/stackable.svg",
    alt: "Front-load washer with a dryer stacked on top",
    page: {
      metaTitle: "Stackable Washer & Dryer Rental, Toronto | $12.50/week",
      metaDescription:
        "Rent a stackable washer and dryer in Toronto and the GTA for $12.50 a week. Fits narrow closets. Repairs and old-machine haul-away included.",
      h1: "Stackable washer & dryer rental",
      intro:
        "A front-load washer with the dryer on top: two full machines on the floor space of one.",
      whatItIs: [
        "A stackable pair is a front-load washer and a matching dryer mounted on top of it with a stacking kit. You get two separate machines, each with its own controls, standing in one column.",
        "Because only one machine touches the floor, a stackable pair fits closets where two machines side by side never would.",
      ],
      fits: [
        "Condo and apartment laundry closets",
        "Narrow spaces with enough height for two machines, one above the other",
        "Anyone who wants a front-load washer but has room for only one footprint",
      ],
      size:
        "Compact stackable pairs are usually about 24 inches (61 cm) wide; full-size ones about 27 inches (69 cm). Measure the width, depth and height of the space, and the door you have to bring them through. Leave a few inches behind for the hoses and the dryer vent.",
    },
  },
  {
    slug: "laundry-centre",
    compare: {
      width: "24″ (61 cm) or 27″ (69 cm)",
      loads: "Top",
      goodFor: "Closets built for a one-piece unit",
    },
    sizes: [
      { label: "Width", value: "24″ (61 cm) or 27″ (69 cm)" },
      { label: "Height", value: "About 70″ (178 cm) for a 24″ unit" },
    ],
    title: "One-piece laundry centre",
    description: "Washer and dryer in one unit. The usual condo-closet machine.",
    price: 12.5,
    priceNote: "for the set",
    // No photo yet: the drawing shows until this file is added (docs/photo-credits.md).
    photos: [
      {
        src: "photos/types/laundry-centre.jpg",
        alt: "Example of a one-piece laundry centre: a dryer above a top-load washer in one cabinet",
      },
    ],
    drawing: "types/one-piece.svg",
    alt: "One-piece laundry centre: a dryer above a top-load washer in one cabinet",
    page: {
      metaTitle: "Laundry Centre Rental, Toronto | One-Piece Unit, $12.50/week",
      metaDescription:
        "Rent a one-piece laundry centre (washer and dryer in one unit) in Toronto and the GTA for $12.50 a week. 24″ or 27″ wide. Repairs included.",
      h1: "Laundry centre rental: washer & dryer in one unit",
      intro:
        "A top-load washer and a dryer built into one cabinet. One machine to deliver, one footprint to fit.",
      whatItIs: [
        "A laundry centre is a single appliance with a top-load washer at the bottom and a dryer at the top. The controls for both sit on one panel.",
        "Many condo closets were built around this machine, so it is often the simplest swap when an old unit needs replacing.",
      ],
      fits: [
        "Condo closets built for a one-piece unit",
        "Small laundry spaces with one set of water, drain and power hookups",
        "People who prefer loading the washer from the top",
      ],
      size:
        "Laundry centres come 24 or 27 inches (61 or 69 cm) wide. A 24-inch unit is about 70 inches (178 cm) tall. Measure the closet width and height, and check the depth with the doors closed.",
    },
  },
  {
    slug: "side-by-side-front-load",
    compare: {
      width: "About 55″ (140 cm) for the pair",
      loads: "Front",
      goodFor: "Laundry rooms and big loads like bedding",
    },
    sizes: [
      { label: "Width", value: "About 27″ (69 cm) each, about 55″ (140 cm) for the pair" },
      { label: "Clearance", value: "Room in front for both doors to open fully" },
    ],
    title: "Side-by-side front-load",
    description: "Two full-size machines side by side. Big loads, easy to reach.",
    price: 12.5,
    priceNote: "for the set",
    photos: [
      {
        src: "photos/types/side-by-side-front-load-1.jpg",
        alt: "Example of a white front-load washer and dryer side by side on a raised platform with drawers",
      },
      {
        src: "photos/types/side-by-side-front-load-2.jpg",
        alt: "Example of a white front-load washer and dryer side by side on pedestals in a laundry room",
      },
      {
        src: "photos/types/side-by-side-front-load.jpg",
        alt: "Example of a grey front-load washer and dryer side by side on pedestals, next to a window",
      },
    ],
    drawing: "types/side-by-side-front.svg",
    alt: "Front-load washer and dryer standing side by side",
    page: {
      metaTitle: "Front-Load Washer & Dryer Rental, Toronto | $12.50/week",
      metaDescription:
        "Rent a side-by-side front-load washer and dryer in Toronto and the GTA for $12.50 a week. Full-size drums for big loads. Repairs included.",
      h1: "Side-by-side front-load washer & dryer rental",
      intro:
        "A front-load washer and a matching dryer standing next to each other. Full-size drums, a flat top to fold on.",
      whatItIs: [
        "Two separate full-size machines, both loading from the front, placed side by side. The tops stay free, so they double as a folding counter.",
        "Front-load washers tumble the laundry through a small amount of water, which suits large loads like bedding and towels.",
      ],
      fits: [
        "Houses with a laundry room or a basement laundry area",
        "Bigger households that wash often",
        "Spaces with room in front for both doors to swing open",
      ],
      size:
        "Full-size machines are usually about 27 inches (69 cm) wide each, so plan for roughly 55 inches (140 cm) of width plus a little space between and around them. Check that both doors can open fully.",
    },
  },
  {
    slug: "side-by-side-top-load",
    compare: {
      width: "About 55″ (140 cm) for the pair",
      loads: "Top",
      goodFor: "Laundry rooms, and less bending to load",
    },
    sizes: [
      { label: "Width", value: "About 27″ (69 cm) each, about 55″ (140 cm) for the pair" },
      { label: "Clearance", value: "Clear space above the washer for the lid to open" },
    ],
    title: "Side-by-side top-load",
    description: "Top-load washer with a matching dryer. Simple and tough.",
    price: 12.5,
    priceNote: "for the set",
    photos: [
      {
        src: "photos/types/side-by-side-top-load-1.jpg",
        alt: "Example of a white top-load washer and matching dryer in a laundry room with yellow walls",
      },
      {
        src: "photos/types/side-by-side-top-load-2.jpg",
        alt: "Example of a top-load washer and dryer in an unfinished basement",
      },
      {
        src: "photos/types/side-by-side-top-load.jpg",
        alt: "Example of a white top-load washer and matching dryer under wall cabinets",
      },
    ],
    drawing: "types/side-by-side-top.svg",
    alt: "Top-load washer with a matching dryer",
    page: {
      metaTitle: "Top-Load Washer & Dryer Rental, Toronto | $12.50/week",
      metaDescription:
        "Rent a top-load washer and matching dryer in Toronto and the GTA for $12.50 a week. Simple to use, less bending. Repairs and haul-away included.",
      h1: "Side-by-side top-load washer & dryer rental",
      intro:
        "The classic pair: a top-load washer with a matching dryer next to it. Simple controls, less bending.",
      whatItIs: [
        "A top-load washer opens with a lid on top, so you load it standing up. The dryer next to it loads from the front.",
        "Top-loaders have simple controls and a wide opening, which makes heavy, wet laundry easy to lift out.",
      ],
      fits: [
        "Basements and laundry rooms with open space above the washer",
        "Anyone who would rather not bend down to load the washer",
        "Households that want a simple, familiar machine",
      ],
      size:
        "Full-size machines are usually about 27 inches (69 cm) wide each, so plan for roughly 55 inches (140 cm) of width. The washer lid needs clear space above it to open, so a low shelf over the washer can get in the way.",
    },
  },
  {
    slug: "single-machine",
    compare: {
      width: "About 24″ (61 cm) or 27″ (69 cm)",
      loads: "Front or top",
      goodFor: "Pairing with a machine you already have",
    },
    sizes: [
      { label: "Width", value: "About 27″ (69 cm) full-size, or about 24″ (61 cm) compact" },
    ],
    title: "Washer or dryer only",
    description: "One machine to pair with the one you already have.",
    price: 6.25,
    priceNote: null,
    photos: [
      {
        src: "photos/types/single-machine-washer.jpg",
        alt: "Example of a single white front-load washer with towels on top",
      },
      {
        src: "photos/types/single-machine-dryer.jpg",
        alt: "Example of a single white front-load dryer",
      },
      {
        src: "photos/types/single-machine.jpg",
        alt: "Example of a single white front-load washer",
      },
    ],
    drawing: "types/single.svg",
    alt: "One washer next to the dashed outline of a machine you already have",
    page: {
      metaTitle: "Washer or Dryer Rental, Toronto | One Machine, $6.25/week",
      metaDescription:
        "Rent just a washer or just a dryer in Toronto and the GTA for $6.25 a week. Pair it with the machine you have. Repairs included.",
      h1: "Washer or dryer rental: one machine",
      intro:
        "Just a washer or just a dryer, to pair with the machine you already have.",
      whatItIs: [
        "If one of your machines still works, you don't need a whole set. Rent the one you're missing, for half the price of a set.",
        "Tell us what the other machine is (front-load or top-load, and its width) and we look for one that sits well next to it.",
      ],
      fits: [
        "Your washer broke but the dryer still works, or the other way round",
        "You moved into a place that has only one machine",
        "You want a washer now and a dryer later",
      ],
      size:
        "Most full-size machines are about 27 inches (69 cm) wide; compact ones about 24 inches (61 cm). If you are renting a dryer to stack on your washer, tell us the washer's brand and model so we can check that they stack.",
    },
  },
];

// The type's photos whose files are in this build, main photo first. None: show the drawing.
export const machinePhotos = (machine) => machine.photos.filter((photo) => hasPhotoFile(photo.src));

// One of the type photos by its file, with the type it shows (city and district pages pick
// theirs this way). Null when the file isn't in the build.
export function findMachinePhoto(src) {
  for (const machine of machineTypes) {
    const photo = machinePhotos(machine).find((item) => item.src === src);
    if (photo) return { ...photo, machine };
  }
  return null;
}

// Hookups every machine needs. Shown on each machine type page.
export const hookupChecklist = [
  "Hot and cold water taps for the washer",
  "A drain: a standpipe or a laundry tub",
  "A standard outlet for the washer",
  "For an electric dryer: a 240V outlet, 3- or 4-prong",
  "For a vented dryer: a vent to the outside",
];
