// The five machine types: shown in the Machines section, offered in the request form, and
// each given its own page at /machines/<slug>/.
//
// Pictures: `photo` is a real photo the owner adds at public/photos/types/<slug>.jpg.
// Until that file exists the build falls back to `drawing` (a standalone SVG in public/types/,
// also used in social graphics). See src/components/MachineImage.jsx and vite.config.js.
export const machineTypes = [
  {
    slug: "stackable",
    title: "Stackable pair",
    description:
      "Front-load washer with the dryer stacked on top. Good for narrow closets.",
    price: 50,
    priceNote: "for the set",
    photo: "photos/types/stackable.jpg",
    drawing: "types/stackable.svg",
    alt: "Front-load washer with a dryer stacked on top",
    page: {
      metaTitle: "Stackable Washer & Dryer Rental, Toronto | $50/month",
      metaDescription:
        "Rent a stackable washer and dryer in Toronto and the GTA for $50 a month. Fits narrow closets. Repairs and old-machine haul-away included.",
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
        "Compact stackable pairs are usually about 24 inches wide; full-size ones about 27 inches. Measure the width, depth and height of the space, and the door you have to bring them through. Leave a few inches behind for the hoses and the dryer vent.",
    },
  },
  {
    slug: "laundry-centre",
    title: "One-piece laundry centre",
    description:
      "Washer and dryer built as one unit, 24″ or 27″ wide. The usual condo-closet machine.",
    price: 50,
    priceNote: "for the set",
    photo: "photos/types/laundry-centre.jpg",
    drawing: "types/one-piece.svg",
    alt: "One-piece laundry centre: a dryer above a top-load washer in one cabinet",
    page: {
      metaTitle: "Laundry Centre Rental, Toronto | One-Piece Unit, $50/month",
      metaDescription:
        "Rent a one-piece laundry centre (washer and dryer in one unit) in Toronto and the GTA for $50 a month. 24″ or 27″ wide. Repairs included.",
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
        "Laundry centres come 24 or 27 inches wide. A 24-inch unit is about 70 inches tall. Measure the closet width and height, and check the depth with the doors closed.",
    },
  },
  {
    slug: "side-by-side-front-load",
    title: "Side-by-side front-load",
    description: "Two machines next to each other. Big loads, easy to reach.",
    price: 50,
    priceNote: "for the set",
    photo: "photos/types/side-by-side-front-load.jpg",
    drawing: "types/side-by-side-front.svg",
    alt: "Front-load washer and dryer standing side by side",
    page: {
      metaTitle: "Front-Load Washer & Dryer Rental, Toronto | $50/month",
      metaDescription:
        "Rent a side-by-side front-load washer and dryer in Toronto and the GTA for $50 a month. Full-size drums for big loads. Repairs included.",
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
        "Full-size machines are usually about 27 inches wide each, so plan for roughly 55 inches of width plus a little space between and around them. Check that both doors can open fully.",
    },
  },
  {
    slug: "side-by-side-top-load",
    title: "Side-by-side top-load",
    description: "Classic top-loader with a matching dryer. Simple and tough.",
    price: 50,
    priceNote: "for the set",
    photo: "photos/types/side-by-side-top-load.jpg",
    drawing: "types/side-by-side-top.svg",
    alt: "Top-load washer with a matching dryer",
    page: {
      metaTitle: "Top-Load Washer & Dryer Rental, Toronto | $50/month",
      metaDescription:
        "Rent a top-load washer and matching dryer in Toronto and the GTA for $50 a month. Simple to use, less bending. Repairs and haul-away included.",
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
        "Full-size machines are usually about 27 inches wide each, so plan for roughly 55 inches of width. The washer lid needs clear space above it to open, so a low shelf over the washer can get in the way.",
    },
  },
  {
    slug: "single-machine",
    title: "Washer or dryer only",
    description: "One machine to pair with what you already have.",
    price: 25,
    priceNote: null,
    photo: "photos/types/single-machine.jpg",
    drawing: "types/single.svg",
    alt: "One washer next to the dashed outline of a machine you already have",
    page: {
      metaTitle: "Washer or Dryer Rental, Toronto | One Machine, $25/month",
      metaDescription:
        "Rent just a washer or just a dryer in Toronto and the GTA for $25 a month. Pair it with the machine you have. Repairs included.",
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
        "Most full-size machines are about 27 inches wide; compact ones about 24 inches. If you are renting a dryer to stack on your washer, tell us the washer's brand and model so we can check that they stack.",
    },
  },
];

// Hookups every machine needs. Shown on each machine type page.
export const hookupChecklist = [
  "Hot and cold water taps for the washer",
  "A drain: a standpipe or a laundry tub",
  "A standard outlet for the washer",
  "For an electric dryer: a 240V outlet, 3- or 4-prong",
  "For a vented dryer: a vent to the outside",
];
