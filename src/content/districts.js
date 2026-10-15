// Toronto's districts (the former municipalities), one page each at /toronto/<slug>/.
// Same rules as cities.js: local detail stays general and true. Neighbourhoods listed are ones
// that are clearly inside the district. No claims about installs done, customers or buildings.
// `machine` is the type pictured in the page header; `fits` lists the types that usually suit
// the homes there (slugs from machines.js).
export const districts = [
  {
    slug: "north-york",
    name: "North York",
    metaTitle: "Washer & Dryer Rental North York, Toronto | $12.50/week",
    metaDescription:
      "Rent a washer and dryer in North York, from Willowdale and Don Mills to Downsview: $12.50 a week for a set, $6.25 for one machine. Repairs included.",
    teaser: "Condo towers along Yonge Street, houses with basement laundry on the side streets.",
    intro:
      "We rent washers and dryers across North York, from Willowdale and Bayview Village to Don Mills, Downsview and Bathurst Manor.",
    machine: "stackable",
    neighbourhoods: [
      "Willowdale",
      "Bayview Village",
      "York Mills",
      "Don Mills",
      "Parkwoods",
      "Flemingdon Park",
      "Downsview",
      "Lawrence Heights",
      "Bathurst Manor",
      "Newtonbrook",
    ],
    homes: [
      "North York has two kinds of laundry space. Along Yonge Street, especially around North York Centre and Sheppard Avenue, many people live in condo towers, where the laundry is a closet inside the suite. Off the main streets, many homes are houses with the laundry in the basement.",
      "There are also many older rental apartment buildings. Some of them have a shared laundry room and no washer or dryer hookups in the units, so check with your landlord before you book.",
    ],
    fits: [
      { machine: "stackable", note: "Narrow, tall condo closets near Yonge Street and Sheppard Avenue." },
      { machine: "laundry-centre", note: "Condo closets that were built for a one-piece unit." },
      { machine: "side-by-side-top-load", note: "Basement laundry areas in houses." },
      { machine: "single-machine", note: "When one of your machines still works." },
    ],
    checklist: [
      "Condo: the closet's width, depth and height, and a service elevator booking",
      "House: the basement stairs and the doorways on the way down",
      "Apartment: whether your unit has its own hookups",
      "Dryer outlet: 3-prong or 4-prong",
    ],
  },
  {
    slug: "etobicoke",
    name: "Etobicoke",
    metaTitle: "Washer & Dryer Rental Etobicoke, Toronto | $12.50/week",
    metaDescription:
      "Rent a washer and dryer in Etobicoke, from Humber Bay Shores and Mimico to Rexdale: $12.50 a week for a set, $6.25 for one machine. Haul-away included.",
    teaser: "Lakeshore condos, houses with basement laundry rooms, and apartment buildings.",
    intro:
      "We rent washers and dryers across Etobicoke, from the lakeshore at Humber Bay Shores, Mimico and Long Branch up to Islington Village and Rexdale.",
    machine: "side-by-side-front-load",
    neighbourhoods: [
      "Humber Bay Shores",
      "Mimico",
      "New Toronto",
      "Long Branch",
      "Alderwood",
      "The Kingsway",
      "Islington Village",
      "Markland Wood",
      "Rexdale",
      "Thistletown",
    ],
    homes: [
      "Many of Etobicoke's condo towers stand by the lake at Humber Bay Shores or near the Islington and Kipling subway stations. In those suites the laundry is usually a narrow closet.",
      "Much of the rest of Etobicoke is houses, from bungalows to two-storey homes, along with low-rise and high-rise apartment buildings. In a house, the laundry is often in the basement, where a full-size side-by-side pair usually has room.",
    ],
    fits: [
      { machine: "stackable", note: "Condo closets by the lake and near the subway." },
      { machine: "side-by-side-front-load", note: "Basement laundry rooms with space for both doors to open." },
      { machine: "side-by-side-top-load", note: "Basements with open space above the washer for the lid." },
      { machine: "single-machine", note: "Pairing with a washer or dryer you already have." },
    ],
    checklist: [
      "Condo: the closet's width and height, and a service elevator booking",
      "House: the basement stairs and the turn at the bottom",
      "Dryer outlet: 3-prong or 4-prong",
      "Where the old machine is, if you want it taken away",
    ],
  },
  {
    slug: "scarborough",
    name: "Scarborough",
    metaTitle: "Washer & Dryer Rental Scarborough, Toronto | $12.50/week",
    metaDescription:
      "Rent a washer and dryer in Scarborough, from Agincourt and Malvern to Guildwood: $12.50 a week for a set, $6.25 for one machine. No credit check.",
    teaser: "Mostly houses and townhouses, plus apartment towers and newer condos.",
    intro:
      "We rent washers and dryers across Scarborough, including Agincourt, Malvern, Wexford, Guildwood, Birch Cliff and West Hill.",
    machine: "side-by-side-top-load",
    neighbourhoods: [
      "Agincourt",
      "L'Amoreaux",
      "Malvern",
      "Wexford",
      "Bendale",
      "Birch Cliff",
      "Cliffside",
      "Guildwood",
      "West Hill",
      "Highland Creek",
    ],
    homes: [
      "Much of Scarborough is detached and semi-detached houses and townhouses. The laundry is usually in the basement or in a small room on the main floor, and a full-size side-by-side pair often fits.",
      "Scarborough also has many apartment towers and some newer condos, including around Scarborough Town Centre. Some houses have a basement apartment: if you rent one, ask your landlord which water, drain and power hookups you can use.",
    ],
    fits: [
      { machine: "side-by-side-top-load", note: "Basement and main-floor laundry rooms in houses." },
      { machine: "side-by-side-front-load", note: "Bigger households that wash bedding and towels often." },
      { machine: "laundry-centre", note: "Apartments and condos with one small laundry closet." },
      { machine: "single-machine", note: "When the house already has one of the two machines." },
    ],
    checklist: [
      "Which hookups you can use, if you rent part of a house",
      "The stairs: how many, how wide, and any tight turns",
      "Dryer outlet: 3-prong or 4-prong",
      "Whether you need a set or just one machine",
    ],
  },
  {
    slug: "east-york",
    name: "East York",
    metaTitle: "Washer & Dryer Rental East York, Toronto | $12.50/week",
    metaDescription:
      "Rent a washer and dryer in East York, Leaside and Thorncliffe Park: $12.50 a week for a set, $6.25 for one machine. Repairs and haul-away included.",
    teaser: "Streets of houses in Leaside and Pape Village, apartment towers in Thorncliffe Park.",
    intro:
      "We rent washers and dryers across East York, including Leaside, Thorncliffe Park, Pape Village, Woodbine Heights and Crescent Town.",
    machine: "laundry-centre",
    neighbourhoods: [
      "Leaside",
      "Thorncliffe Park",
      "Broadview North",
      "Pape Village",
      "Woodbine Heights",
      "O'Connor–Parkview",
      "Topham Park",
      "Crescent Town",
    ],
    homes: [
      "East York mixes quiet streets of detached and semi-detached houses, in areas like Leaside and Pape Village, with apartment towers in Thorncliffe Park and Crescent Town.",
      "In an older house, the basement stairs can be narrow and steep, so measure them along with the laundry space. In an apartment, check first that your unit has hookups for a washer and dryer.",
    ],
    fits: [
      { machine: "side-by-side-top-load", note: "Basement laundry areas in houses." },
      { machine: "stackable", note: "Tight basements where two machines side by side won't fit." },
      { machine: "laundry-centre", note: "Apartments with a laundry closet." },
      { machine: "single-machine", note: "Replacing one machine of an older pair." },
    ],
    checklist: [
      "The basement stairs: their width, and any turns",
      "The laundry space: width, depth and height",
      "Apartment: whether your unit has water, drain and power hookups",
      "Dryer outlet: 3-prong or 4-prong",
    ],
  },
  {
    slug: "york",
    name: "York",
    metaTitle: "Washer & Dryer Rental York, Toronto | $12.50/week",
    metaDescription:
      "Rent a washer and dryer in York, Toronto, including Weston and Mount Dennis: $12.50 a week for a set, $6.25 for one machine. Repairs included.",
    teaser: "Older houses with basements, and apartment buildings along the main streets.",
    intro:
      "We rent washers and dryers across York, the former City of York northwest of downtown Toronto, including Weston, Mount Dennis, Fairbank and Oakwood Village.",
    // Not York Region: Vaughan, Markham and Richmond Hill have their own pages.
    regionNote: true,
    machine: "stackable",
    neighbourhoods: [
      "Weston",
      "Mount Dennis",
      "Silverthorn",
      "Keelesdale",
      "Rockcliffe–Smythe",
      "Fairbank",
      "Oakwood Village",
      "Humewood–Cedarvale",
    ],
    homes: [
      "Much of York is older detached and semi-detached houses, many with a laundry area in the basement, plus apartment buildings along main streets such as Weston Road and Eglinton Avenue West.",
      "Some houses here are split into separate units. If you rent one, check with your landlord which hookups you can use and whether a dryer can vent outside.",
    ],
    fits: [
      { machine: "side-by-side-front-load", note: "Basement laundry rooms in houses." },
      { machine: "side-by-side-top-load", note: "Anyone who would rather not bend down to load the washer." },
      { machine: "stackable", note: "Narrow spaces in a unit that is part of a house." },
      { machine: "single-machine", note: "Pairing with the machine already in the basement." },
    ],
    checklist: [
      "The basement stairs and doorways: how wide they are",
      "Which hookups you can use, if the house is split into units",
      "Dryer outlet: 3-prong or 4-prong",
      "A photo of the space, sent by text",
    ],
  },
];
