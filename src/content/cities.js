// One page per city at /<slug>/. Local detail here must stay generally true and
// non-promissory: no claims about installs done, customers, or buildings served.
// `photo` is the example photo in the page header: one of the machine type photos in
// machines.js, a different one for each city, picked to match the homes described.
// `teaser` is the one-line summary on the /areas/ page. Toronto's districts have their own
// pages (districts.js); its `neighbourhoods` link to them.
export const cities = [
  {
    slug: "toronto",
    name: "Toronto",
    teaser: "The whole city: downtown, midtown, the east and west ends and the five districts.",
    metaTitle: "Washer & Dryer Rental Toronto | $12.50/week, Repairs Incl.",
    metaDescription:
      "Washer and dryer rental in Toronto, North York, Etobicoke, Scarborough, East York and York: $12.50 a week for a set, $6.25 for one machine.",
    intro:
      "We rent washers and dryers across the City of Toronto, including North York, Etobicoke, Scarborough, East York and York.",
    photo: "photos/types/stackable.jpg",
    neighbourhoods: ["North York", "Etobicoke", "Scarborough", "East York", "York"],
    homes: [
      "A lot of Toronto lives in condos and apartments. Condo laundry closets are usually narrow, so a 24-inch stackable pair or a one-piece laundry centre is the common fit.",
      "Most condo buildings ask you to book the service elevator for a delivery. Book a slot with your building and tell us the time.",
      "Houses with a basement laundry room usually have space for a side-by-side pair.",
    ],
    checklist: [
      "Closet width, depth and height, and the width of the closet door",
      "Dryer outlet: 3-prong or 4-prong",
      "Service elevator booking, if you're in a condo",
      "A photo of the space, sent by text",
    ],
  },
  {
    slug: "mississauga",
    name: "Mississauga",
    teaser: "Condos around City Centre and the lakeshore, houses and townhouses elsewhere.",
    metaTitle: "Washer & Dryer Rental Mississauga | $12.50/week",
    metaDescription:
      "Washer and dryer rental in Mississauga: $12.50 a week for a set, $6.25 for one machine. Repairs and old-machine haul-away included. No credit check.",
    intro:
      "We rent washers and dryers across Mississauga, from Port Credit to Meadowvale and from Malton to Erin Mills.",
    photo: "photos/types/stackable-1.jpg",
    neighbourhoods: [
      "City Centre",
      "Port Credit",
      "Cooksville",
      "Streetsville",
      "Meadowvale",
      "Erin Mills",
      "Churchill Meadows",
      "Malton",
    ],
    homes: [
      "Mississauga mixes condo towers, around the City Centre and along the lakeshore, with houses and townhouses in neighbourhoods like Meadowvale, Erin Mills and Churchill Meadows.",
      "In a condo, look at a stackable pair or a one-piece laundry centre. In a house or townhouse laundry room, a side-by-side pair often fits.",
    ],
    checklist: [
      "Where the laundry is: closet, laundry room or basement",
      "The width of the space and of the doors on the way in",
      "Dryer outlet: 3-prong or 4-prong",
      "Stairs or an elevator on delivery day",
    ],
  },
  {
    slug: "brampton",
    name: "Brampton",
    teaser: "Mostly houses and townhouses, with the laundry in the basement or on the main floor.",
    metaTitle: "Washer & Dryer Rental Brampton | $12.50/week",
    metaDescription:
      "Washer and dryer rental in Brampton: $12.50 a week for a washer and dryer set, $6.25 for one machine. Repairs included. Call (437) 907-6955.",
    intro:
      "We rent washers and dryers across Brampton, including Bramalea, Springdale, Heart Lake, Mount Pleasant and Castlemore.",
    photo: "photos/types/side-by-side-front-load-2.jpg",
    neighbourhoods: [
      "Bramalea",
      "Springdale",
      "Heart Lake",
      "Mount Pleasant",
      "Fletcher's Meadow",
      "Sandalwood",
      "Castlemore",
    ],
    homes: [
      "Most homes in Brampton are detached houses, semi-detached houses and townhouses. The laundry is often in the basement or on the main floor, where a full-size side-by-side pair usually fits.",
      "Renting a basement unit? Check with your landlord which water, drain and power hookups you can use. Text us a photo and we'll tell you what fits.",
    ],
    checklist: [
      "Which hookups you can use, if you rent a basement unit",
      "The stairs to the laundry area: how many, and how wide",
      "Dryer outlet: 3-prong or 4-prong",
      "Whether you need a set or just one machine",
    ],
  },
  {
    slug: "vaughan",
    name: "Vaughan",
    teaser: "Woodbridge, Maple, Concord and Kleinburg, plus newer condos near Vaughan Metropolitan Centre.",
    metaTitle: "Washer & Dryer Rental Vaughan | $12.50/week",
    metaDescription:
      "Washer and dryer rental in Vaughan, Woodbridge, Maple and Concord: $12.50 a week for a set, $6.25 for one machine. Repairs included.",
    intro:
      "We rent washers and dryers across Vaughan, including Woodbridge, Maple, Concord, Kleinburg and the Vaughan side of Thornhill.",
    photo: "photos/types/side-by-side-top-load-1.jpg",
    neighbourhoods: [
      "Woodbridge",
      "Maple",
      "Concord",
      "Kleinburg",
      "Vellore Village",
      "Thornhill (Vaughan side)",
      "Vaughan Metropolitan Centre",
    ],
    homes: [
      "Much of Vaughan is houses with a full laundry room, where a side-by-side pair, front-load or top-load, fits well.",
      "There are also newer condo towers, especially around the Vaughan Metropolitan Centre. New condo closets are often built for a 24-inch stackable pair or a one-piece unit.",
    ],
    checklist: [
      "Front-load or top-load: which do you prefer?",
      "The width of the space, and room for the doors or lid to open",
      "Dryer outlet: 3-prong or 4-prong",
      "Elevator booking, if you're in a condo",
    ],
  },
  {
    slug: "markham",
    name: "Markham",
    teaser: "Townhouses and houses in Unionville and Cornell, condos along Highway 7.",
    metaTitle: "Washer & Dryer Rental Markham | $12.50/week",
    metaDescription:
      "Washer and dryer rental in Markham and Unionville: $12.50 a week for a set, $6.25 for one machine. Repairs and haul-away included. No credit check.",
    intro:
      "We rent washers and dryers across Markham, including Unionville, Markham Village, Cornell, Milliken and Berczy Village.",
    photo: "photos/types/side-by-side-front-load-1.jpg",
    neighbourhoods: [
      "Unionville",
      "Markham Village",
      "Cornell",
      "Milliken",
      "Berczy Village",
      "Cathedraltown",
      "Thornhill (Markham side)",
    ],
    homes: [
      "Markham has many townhouses and stacked townhouses, as well as condos around Downtown Markham and Highway 7.",
      "In a townhouse the laundry is often in a closet upstairs or in the basement. Stairs change the delivery, so tell us how many flights there are and how tight the turns are.",
    ],
    checklist: [
      "Which floor the laundry is on, and how many flights of stairs",
      "Closet width and height",
      "Dryer outlet: 3-prong or 4-prong",
      "A photo of the space and of the stairs",
    ],
  },
  {
    slug: "richmond-hill",
    name: "Richmond Hill",
    teaser: "Houses from Oak Ridges to Langstaff, condo towers along Yonge Street.",
    metaTitle: "Washer & Dryer Rental Richmond Hill | $12.50/week",
    metaDescription:
      "Washer and dryer rental in Richmond Hill and Oak Ridges: $12.50 a week for a set, $6.25 for one machine. Repairs included. Call (437) 907-6955.",
    intro:
      "We rent washers and dryers across Richmond Hill, including Oak Ridges, Mill Pond, Bayview Hill, Richvale and Jefferson.",
    photo: "photos/types/side-by-side-top-load.jpg",
    neighbourhoods: [
      "Oak Ridges",
      "Mill Pond",
      "Bayview Hill",
      "Richvale",
      "Jefferson",
      "Langstaff",
      "Elgin Mills",
    ],
    homes: [
      "Richmond Hill homes run from detached houses with basement laundry rooms to condo towers along Yonge Street and near Highway 7.",
      "In a house, a side-by-side pair usually fits. In a condo closet, look at a stackable pair or a one-piece laundry centre.",
    ],
    checklist: [
      "House or condo, and where the laundry is",
      "The width of the space",
      "Dryer outlet: 3-prong or 4-prong",
      "The old machine you want taken away, if any",
    ],
  },
];
