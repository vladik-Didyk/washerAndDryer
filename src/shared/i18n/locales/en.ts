// Every word the site shows in English: page copy, buttons, form labels and errors, alt text,
// aria-labels, <title> and meta descriptions, JSON-LD text. The full dictionary: its shape is
// the type every other language follows (shared/i18n Dictionary).
//
// Rules
// - Plain data only: strings, lists and objects. No functions, no imports.
// - Facts are never typed into the text. Prices, the deposit, dates, the phone number and the
//   business numbers are `{names}` filled in per request from shared/config and the running
//   promotions (entities/offer offerFacts): {company} {phone} {setPrice} {singlePrice}
//   {setBasePrice} {singleBasePrice} {deposit} {referralAmount} {referralMonths} {minWeeks}
//   {noticeDays} {quoteUnits} {experienceYears} {opens} {closes} {firstWeekFreeEnd}
//   {firstWeekFreeEndShort}. Other {names} are filled in where the text is used ({name}, {city}).
// - The guides, the policies and llms.txt are server-only: ./en.server.ts.
// - Verified facts only. The site speaks as "we", never as a person. No HST is charged.
const en = {
  // How dates and times are written (shared/i18n formatters). {day} {month} {year};
  // {hour} (12-hour) {hour24} {minutes} {min} (":30", or nothing on the hour) {period}.
  formats: {
    dateLong: "{month} {day}, {year}",
    dateShort: "{month} {day}",
    time: "{hour}{min} {period}",
    am: "am",
    pm: "pm",
  },

  common: {
    // Carousel controls (shared/ui Carousel).
    carousel: {
      previous: "Previous slide",
      next: "Next slide",
      slideOf: "{index} of {count}",
      goTo: "Go to slide {index} of {count}",
      slides: "Slides",
      pause: "Pause the slideshow",
      play: "Play the slideshow",
    },
    examplePhotos: "Example photos, not our machines or buildings.",
    sharedRooms: {
      title: "Shared laundry rooms",
      note: "Example photos of shared laundry rooms, not buildings we serve.",
    },
    languages: "English, Spanish & Russian",
    tagline: "Washer & dryer rental in Toronto & the GTA",
    location: "Toronto · serving the GTA",
    localBusiness: "Local Toronto business",
    torontoAndGta: "Toronto & the GTA",
    call: "Call",
    text: "Text",
    callPhone: "Call {phone}",
    callOrText: "Call or text {phone}",
    textPhone: "Text {phone}",
    startRental: "Start your rental",
    getQuote: "Get a quote",
    pricesNote: "Prices in Canadian dollars. No HST charged.",
    priceTagNote: "No HST charged · Prices in CAD",
    perWeekSuffix: "/week",
    pricePerWeek: "{price}/week",
    aWeek: "a week",
    // "was $12.50", beside a price lowered by a promotion (the old price is struck through).
    wasPrice: "was {price}",
    hoursSentence: "Mon–Sat {opens} – {closes}. Sunday closed.",
    hoursList: ["Mon–Sat: {opens} – {closes}", "Sunday: closed"],
    preferCallOrText: "Prefer to call or text?",
    closetPhotoHelps: "A photo of the closet helps. You can text it to us.",
    fartherAwayAsk: "Farther away? Ask us.",
    fartherAwayCall: "Farther away? Call or text {phoneLink} and ask.",
    allAreas: "All areas",
    compareAllTypes: "Compare all machine types",
    compareTypes: "Compare the machine types",
    examplePhotosNote:
      "Photos are examples of each type, not our machines. Brand and model depend on what's available.",
    textPhotoFits: "Not sure what you have? Text a photo of the space to {phoneLink} and we'll tell you what fits.",
    readyToRent: "Ready to rent?",
    readyToRentText: "Tell us your area and your laundry space. We reply with the machine, the total and the start date.",
    measureGuide: "How to measure your laundry space",
    howItWorks: "How it works",
    opensInNewTab: "(opens in a new tab)",
    // Beside a link from a Spanish or Russian page to an English-only page (the policies).
    availableInEnglish: "Available in English",
    // The hookups every machine needs: machine pages, /machines/, landlords, guides, llms.txt.
    hookups: [
      "Hot and cold water taps for the washer",
      "A drain: a standpipe or a laundry tub",
      "A standard outlet for the washer",
      "For an electric dryer: a 240V outlet, 3- or 4-prong",
      "For a vented dryer: a vent to the outside",
    ],
    // How we work: confirmed facts only.
    howWeWork: [
      "We check each machine before it goes out.",
      "We connect the water, drain, power and vent properly.",
      "We run a test cycle before we leave.",
      "We answer calls in English, Spanish and Russian.",
    ],
    logoAlt: "{company}",
  },

  // Alt text of the laundry-room photos (public/photos/rooms and /shared, Unsplash, see
  // docs/photo-credits.md), by file name without the extension. Every one is an example.
  photos: {
    "rooms/washer-dryer-shelving": "Example: a white front-load washer under wooden shelving in a bright laundry room",
    "rooms/washer-shelves": "Example: a white front-load washer between a basket and open shelves",
    "rooms/drum-empty": "Example: the empty stainless drum of a front-load washer, seen through the open door",
    "rooms/washer-basket-sock": "Example: a white washer with a laundry basket on top and a sock on the door",
    "rooms/washer-cabinet-plants": "Example: a white front-load washer under a counter, beside a cabinet with plants",
    "rooms/dark-set-laundry-room": "Example: a dark grey front-load washer and dryer side by side under a shelf",
    "rooms/grey-set-laundry-room": "Example: a grey front-load washer and dryer side by side with a basket on top",
    "rooms/drum-open-door": "Example: a front-load washer with its door open, showing the drum",
    "rooms/laundry-room-shirts": "Example: a white front-load washer in a laundry room with shirts hanging above it",
    "rooms/black-washer-basket": "Example: a black front-load washer with a white laundry basket in front of it",
    "rooms/stacked-small-room": "Example: a white dryer stacked on a front-load washer in a small white room",
    "shared/stacked-dryers-tiles": "Example of a shared laundry room: stacked washers and dryers along a tiled wall",
    "shared/stacked-dryers-row": "Example of a shared laundry room: a row of stacked dryers with round doors",
    "shared/washers-row-silver": "Example of a shared laundry room: a row of silver front-load washers",
    "shared/washers-and-dryers-rows": "Example of a shared laundry room: a row of washers in front of a row of dryers",
    "shared/washers-row-beige": "Example of a shared laundry room: a row of beige front-load washers with lettered doors",
    "shared/washers-row-wood-front": "Example of a shared laundry room: front-load washers with wood-panel fronts",
    "shared/washers-row-wide": "Example of a shared laundry room: a long row of front-load washers",
  },

  // The site frame: skip link, header, footer, offer bar, phone bar, breadcrumbs, draft ribbon.
  chrome: {
    skipLink: "Skip to content",
    ogImageAlt: "{company}: washer and dryer rental in Toronto and the GTA",
    breadcrumb: "Breadcrumb",
    mobileBar: {
      label: "Quick actions",
      call: "Call",
      callAria: "Call {phone}",
      startRental: "Start rental",
      getQuote: "Get a quote",
      repairForm: "Repair form",
      textUs: "Text us",
    },
    draft: {
      label: "Draft notice",
      title: "Draft — not published",
      text: "Preview build only. The live site leaves this page out until it's approved.",
    },
    offerBar: {
      label: "Current offers",
    },
  },

  nav: {
    main: "Main",
    more: "More",
    machines: "Machines",
    prices: "Prices",
    areas: "Areas",
    landlords: "Landlords",
    faq: "FAQ",
    repair: "Request a repair",
    guides: "Guides",
    account: "Pay / manage",
  },

  header: {
    utilityLine: "Mon–Sat {opens} – {closes} · We speak {languages}",
    callAria: "Call {phone}",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuContact: "{phone}, Mon–Sat {opens} – {closes}",
    // The EN · ES · RU switcher.
    language: "Language",
  },

  footer: {
    weSpeak: "We speak {languages}.",
    facebook: "Facebook page",
    machines: "Machines",
    allMachineTypes: "All machine types",
    areas: "Areas",
    torontoDistricts: "Toronto districts",
    company: "Company",
    languages: "Languages",
    about: "About",
    contact: "Contact",
    landlords: "Landlords",
    buildings: "Laundry rooms",
    repair: "Request a repair",
    guides: "Guides",
    account: "Pay / manage",
    privacy: "Privacy",
    terms: "Rental terms",
    copyright: "© {year} {company}",
  },

  // The offers. Promotions are listed in shared/config/pricing.ts; each one's wording is here,
  // under its id. A promotion's values are facts named after its id (entities/offer
  // offerFacts): first-week-free has {firstWeekFreeEnd} (its last day), {firstWeekFreeEndShort}
  // and {firstWeekFreeWeeks}; a percentOff one "january-sets" would have {januarySetsPercent},
  // {januarySetsStart}, {januarySetsEnd}...
  offers: {
    promotions: {
      "first-week-free": {
        short: "First week free until {firstWeekFreeEndShort}",
        title: "First week free",
        text: "New customers who start a rental by {firstWeekFreeEnd} pay no rent for the first week. It applies to washer and dryer sets and to single machines.",
        stillPaid: "The {deposit} deposit and the delivery are still paid.",
        // Beside a price (machine type pages): the rent only.
        note: "New customers who start by {firstWeekFreeEnd} pay no rent for the first week. The deposit and delivery are still paid.",
      },
    },
    referral: {
      short: "Refer a friend, get {referralAmount}",
      title: "Refer a friend",
      text: "You get {referralAmount} when a friend you refer signs up for {referralMonths} months or more.",
    },
  },

  // <title>, meta description, breadcrumb name and llms.txt note of the fixed pages.
  // Titles at most 60 characters, descriptions at most 155 (src/app/catalog.test.ts).
  pages: {
    home: {
      name: "Home",
      llmsNote: "offer, machine types, prices, how it works, FAQ, rental request",
      title: "Washer & Dryer Rental Toronto & GTA | {setPrice}/week",
      description:
        "Washer & dryer rental in Toronto and the GTA: {setPrice} a week for a set, {singlePrice} for one machine. Repairs included. Call or text {phone}.",
    },
    areas: {
      name: "Areas",
      llmsNote: "every city and Toronto district we deliver to, with a postal-code check",
      title: "Washer & Dryer Rental Service Area | Toronto & the GTA",
      description:
        "Where we deliver rental washers and dryers: Toronto and its districts, Mississauga, Brampton, Vaughan, Markham and Richmond Hill. Check your postal code.",
    },
    machines: {
      name: "Machines",
      llmsNote: "all five machine types compared, with prices",
      title: "Washer & Dryer Types for Rent | Toronto, from {singlePrice}/week",
      description:
        "Compare the washer and dryer types we rent in Toronto and the GTA: stackable, laundry centre, side-by-side front-load or top-load, or one machine.",
    },
    landlords: {
      name: "Landlords",
      llmsNote: "two options: tenants rent directly, or the landlord rents machines for the units",
      title: "Washer & Dryer Rental for Landlords | Toronto & the GTA",
      description:
        "Laundry for rental units in Toronto and the GTA: tenants rent from us directly, or you rent machines for your units. Repairs included either way.",
    },
    landlordQuote: {
      name: "Get a quote",
      llmsNote: "quote request form for landlords",
      title: "Landlord Quote: Washers & Dryers for Rental Units",
      description:
        "Ask for a quote for washers and dryers in your rental units in Toronto and the GTA. For {quoteUnits} or more units, we quote per building after seeing it.",
    },
    buildings: {
      name: "Laundry rooms",
      llmsNote: "shared laundry rooms in residential buildings: the building rents the machines, or residents pay per load; quoted per building",
      title: "Laundry Room Machines for Buildings | Toronto & GTA",
      description:
        "Washers and dryers for shared laundry rooms in Toronto and GTA buildings: the building rents the machines, or residents pay per load. Repairs included.",
    },
    faq: {
      name: "FAQ",
      llmsNote: "renting, prices and payment, delivery and installation, repairs, landlords, current offers",
      title: "Washer & Dryer Rental FAQ | {company}",
      description:
        "Answers about renting a washer and dryer in Toronto and the GTA: prices, the deposit, payment, delivery, installation, repairs and landlords.",
    },
    about: {
      name: "About",
      llmsNote: "who we are and how we work",
      title: "About Us | {company}, Toronto",
      description:
        "{company} is a local Toronto business with more than {experienceYears} years of hands-on experience installing and fixing washers and dryers.",
    },
    contact: {
      name: "Contact",
      llmsNote: "phone, hours, languages and the way into the rental request",
      title: "Contact | {company}, {phone}",
      description:
        "Call or text {phone}, Monday to Saturday, {opens} to {closes}, in English, Spanish or Russian. Or send a request and we reply with a quote.",
    },
    repair: {
      name: "Request a repair",
      llmsNote: "repair request form for customers renting from us",
      title: "Request a Repair | {company}",
      description:
        "Renting a washer or dryer from us and it stopped working? Repairs are included. Send a repair request, or call or text {phone}.",
    },
    account: {
      name: "Pay or manage",
      llmsNote: "paying by card, the Stripe customer portal, ending a rental",
      title: "Pay or Manage Your Rental | {company}",
      description:
        "Pay with the link sent with your quote, manage your card and receipts in the Stripe customer portal, or text us to end a rental.",
    },
    start: {
      name: "Start your rental",
      llmsNote: "the rental request in three short steps: machine type, your space, how to reach you",
      title: "Start Your Rental | {company}",
      description:
        "Request a washer and dryer rental in Toronto and the GTA in three short steps. We reply with the machine, the total and the start date.",
    },
    guides: {
      name: "Guides",
      llmsNote: "practical guides for renting a washer and dryer",
      title: "Washer & Dryer Rental Guides | {company}",
      description:
        "Practical guides for renting a washer and dryer in Toronto and the GTA: what to measure, check and ask before delivery day.",
    },
    notFound: {
      name: "Page not found",
      title: "Page not found | {company}",
      description:
        "This page doesn't exist. Washer & dryer rental in Toronto and the GTA: {setPrice} a week for a set. Call or text {phone}.",
    },
    error: {
      title: "Something went wrong | {company}",
    },
  },

  // Schema.org text (shared/seo json-ld).
  jsonLd: {
    setOffer: {
      name: "Washer and dryer set rental",
      description: "A washer and dryer set, per week. Repairs and old-machine haul-away included.",
    },
    singleOffer: {
      name: "Single washer or dryer rental",
      description: "One washer or one dryer, per week. Repairs and old-machine haul-away included.",
    },
    business: {
      description:
        "Washer and dryer rental in Toronto and the GTA. {setPrice} a week for a washer and dryer set, {singlePrice} a week for one machine. Repairs and old-machine haul-away included. English, Spanish and Russian spoken.",
      paymentAccepted: "Interac e-Transfer, Credit Card",
      catalog: "Washer and dryer rentals",
    },
    serviceType: "Washer and dryer rental",
    serviceGta: "Washer and dryer rental in Toronto and the GTA",
    serviceIn: "Washer and dryer rental in {place}",
    serviceInDistrict: "Washer and dryer rental in {place}, Toronto",
    torontoPlace: "{place}, Toronto",
    machinesList: "Washer and dryer types for rent",
    machineOffer: {
      name: "{title} rental",
      description: "{title}, per week. Repairs and old-machine haul-away included.",
    },
    landlords: {
      name: "Washer and dryer rental for landlords",
      serviceType: "Washer and dryer rental for rental units",
      audience: "Landlords",
      offerName: "Washer and dryer set for a rental unit",
      offerDescription:
        "List price per washer and dryer set, per week. For {quoteUnits} or more units, quoted per building after seeing it. Repairs included.",
    },
    buildings: {
      name: "Washers and dryers for building laundry rooms",
      serviceType: "Washer and dryer supply for shared laundry rooms",
      audience: "Residential building owners and property managers",
    },
    contact: {
      contactType: "customer service",
      languages: ["English", "Spanish", "Russian"],
    },
    guidesList: "Guides for renting a washer and dryer",
  },

  forms: {
    requiredNote: "Fields marked {star} are required.",
    sending: "Sending…",
    sendError: "Couldn't send. Call or text {phoneLink}.",
    sentTitle: "Request sent.",
    sentNote: "We'll call or text you.",
    sendAnother: "Send another",
    name: "Name",
    phone: "Phone",
    email: "Email",
    notes: "Notes",
    optional: "Optional.",
    notGiven: "Not given",
    none: "None",
    errors: {
      nameMissing: "Enter your name.",
      nameShort: "Name must be at least 2 characters.",
      phoneMissing: "Enter your phone number.",
      phoneInvalid: "Enter a valid phone number, with area code.",
      emailInvalid: "Enter a valid email address, or leave it empty.",
    },
  },

  postalCheck: {
    label: "Your postal code",
    placeholder: "e.g. M5V 2T6",
    check: "Check",
    invalid: "Enter a valid Canadian postal code, like M5V 2T6.",
    yes: "Yes, we deliver in {city}.",
    outside: "{place} is outside our usual area. Call or text {phone} and we'll check.",
    unsure: "Not sure from the postal code. Text us your address at {phone} and we'll confirm.",
    textUs: "Text {phone}",
  },

  // The five machine types (entities/machine), by slug. `photos` are the alt texts of the
  // example photos, by file name. Sizes are typical ones: 24″ = 61 cm, 27″ = 69 cm,
  // 55″ = 140 cm, 70″ = 178 cm. " " (a non-breaking space) keeps "cm" with its number.
  machines: {
    types: {
      stackable: {
        title: "Stackable pair",
        description: "Dryer stacked on a front-load washer. Fits narrow closets.",
        priceNote: "for the set",
        alt: "Front-load washer with a dryer stacked on top",
        compare: {
          width: "About 24″ (61 cm) or 27″ (69 cm), one machine wide",
          loads: "Front",
          goodFor: "Narrow, tall closets in condos and apartments",
        },
        sizes: [
          { label: "Width", value: "About 24″ (61 cm) compact, or about 27″ (69 cm) full-size" },
          { label: "Floor space", value: "One machine wide: the dryer stands on top of the washer" },
        ],
        photos: {
          "stackable-1": "Example of a stackable washer and dryer: a white dryer on top of a white front-load washer",
          stackable: "Example of a stackable washer and dryer in a laundry closet with its door open",
        },
        page: {
          metaTitle: "Stackable Washer & Dryer Rental, Toronto | {setPrice}/week",
          metaDescription:
            "Rent a stackable washer and dryer in Toronto and the GTA for {setPrice} a week. Fits narrow closets. Repairs and old-machine haul-away included.",
          h1: "Stackable washer & dryer rental",
          intro: "A front-load washer with the dryer on top: two full machines on the floor space of one.",
          whatItIs: [
            "A stackable pair is a front-load washer and a matching dryer mounted on top of it with a stacking kit. You get two separate machines, each with its own controls, standing in one column.",
            "Because only one machine touches the floor, a stackable pair fits closets where two machines side by side never would.",
          ],
          fits: [
            "Condo and apartment laundry closets",
            "Narrow spaces with enough height for two machines, one above the other",
            "Anyone who wants a front-load washer but has room for only one footprint",
          ],
          size: "Compact stackable pairs are usually about 24 inches (61 cm) wide; full-size ones about 27 inches (69 cm). Measure the width, depth and height of the space, and the door you have to bring them through. Leave a few inches behind for the hoses and the dryer vent.",
        },
      },
      "laundry-centre": {
        title: "One-piece laundry centre",
        description: "Washer and dryer in one unit. The usual condo-closet machine.",
        priceNote: "for the set",
        alt: "One-piece laundry centre: a dryer above a top-load washer in one cabinet",
        compare: {
          width: "24″ (61 cm) or 27″ (69 cm)",
          loads: "Top",
          goodFor: "Closets built for a one-piece unit",
        },
        sizes: [
          { label: "Width", value: "24″ (61 cm) or 27″ (69 cm)" },
          { label: "Height", value: "About 70″ (178 cm) for a 24″ unit" },
        ],
        photos: {
          "laundry-centre": "Example of a one-piece laundry centre: a dryer above a top-load washer in one cabinet",
        },
        page: {
          metaTitle: "Laundry Centre Rental, Toronto | One-Piece Unit, {setPrice}/week",
          metaDescription:
            "Rent a one-piece laundry centre (washer and dryer in one unit) in Toronto and the GTA for {setPrice} a week. 24″ or 27″ wide. Repairs included.",
          h1: "Laundry centre rental: washer & dryer in one unit",
          intro: "A top-load washer and a dryer built into one cabinet. One machine to deliver, one footprint to fit.",
          whatItIs: [
            "A laundry centre is a single appliance with a top-load washer at the bottom and a dryer at the top. The controls for both sit on one panel.",
            "Many condo closets were built around this machine, so it is often the simplest swap when an old unit needs replacing.",
          ],
          fits: [
            "Condo closets built for a one-piece unit",
            "Small laundry spaces with one set of water, drain and power hookups",
            "People who prefer loading the washer from the top",
          ],
          size: "Laundry centres come 24 or 27 inches (61 or 69 cm) wide. A 24-inch unit is about 70 inches (178 cm) tall. Measure the closet width and height, and check the depth with the doors closed.",
        },
      },
      "side-by-side-front-load": {
        title: "Side-by-side front-load",
        description: "Two full-size machines side by side. Big loads, easy to reach.",
        priceNote: "for the set",
        alt: "Front-load washer and dryer standing side by side",
        compare: {
          width: "About 55″ (140 cm) for the pair",
          loads: "Front",
          goodFor: "Laundry rooms and big loads like bedding",
        },
        sizes: [
          { label: "Width", value: "About 27″ (69 cm) each, about 55″ (140 cm) for the pair" },
          { label: "Clearance", value: "Room in front for both doors to open fully" },
        ],
        photos: {
          "side-by-side-front-load-1":
            "Example of a white front-load washer and dryer side by side on a raised platform with drawers",
          "side-by-side-front-load-2":
            "Example of a white front-load washer and dryer side by side on pedestals in a laundry room",
          "side-by-side-front-load":
            "Example of a grey front-load washer and dryer side by side on pedestals, next to a window",
        },
        page: {
          metaTitle: "Front-Load Washer & Dryer Rental, Toronto | {setPrice}/week",
          metaDescription:
            "Rent a side-by-side front-load washer and dryer in Toronto and the GTA for {setPrice} a week. Full-size drums for big loads. Repairs included.",
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
          size: "Full-size machines are usually about 27 inches (69 cm) wide each, so plan for roughly 55 inches (140 cm) of width plus a little space between and around them. Check that both doors can open fully.",
        },
      },
      "side-by-side-top-load": {
        title: "Side-by-side top-load",
        description: "Top-load washer with a matching dryer. Simple and tough.",
        priceNote: "for the set",
        alt: "Top-load washer with a matching dryer",
        compare: {
          width: "About 55″ (140 cm) for the pair",
          loads: "Top",
          goodFor: "Laundry rooms, and less bending to load",
        },
        sizes: [
          { label: "Width", value: "About 27″ (69 cm) each, about 55″ (140 cm) for the pair" },
          { label: "Clearance", value: "Clear space above the washer for the lid to open" },
        ],
        photos: {
          "side-by-side-top-load-1":
            "Example of a white top-load washer and matching dryer in a laundry room with yellow walls",
          "side-by-side-top-load-2": "Example of a top-load washer and dryer in an unfinished basement",
          "side-by-side-top-load": "Example of a white top-load washer and matching dryer under wall cabinets",
        },
        page: {
          metaTitle: "Top-Load Washer & Dryer Rental, Toronto | {setPrice}/week",
          metaDescription:
            "Rent a top-load washer and matching dryer in Toronto and the GTA for {setPrice} a week. Simple to use, less bending. Repairs and haul-away included.",
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
          size: "Full-size machines are usually about 27 inches (69 cm) wide each, so plan for roughly 55 inches (140 cm) of width. The washer lid needs clear space above it to open, so a low shelf over the washer can get in the way.",
        },
      },
      "single-machine": {
        title: "Washer or dryer only",
        description: "One machine to pair with the one you already have.",
        priceNote: "for one machine",
        alt: "One washer next to the dashed outline of a machine you already have",
        compare: {
          width: "About 24″ (61 cm) or 27″ (69 cm)",
          loads: "Front or top",
          goodFor: "Pairing with a machine you already have",
        },
        sizes: [{ label: "Width", value: "About 27″ (69 cm) full-size, or about 24″ (61 cm) compact" }],
        photos: {
          "single-machine-washer": "Example of a single white front-load washer with towels on top",
          "single-machine-dryer": "Example of a single white front-load dryer",
          "single-machine": "Example of a single white front-load washer",
        },
        page: {
          metaTitle: "Washer or Dryer Rental, Toronto | One Machine, {singlePrice}/week",
          metaDescription:
            "Rent just a washer or just a dryer in Toronto and the GTA for {singlePrice} a week. Pair it with the machine you have. Repairs included.",
          h1: "Washer or dryer rental: one machine",
          intro: "Just a washer or just a dryer, to pair with the machine you already have.",
          whatItIs: [
            "If one of your machines still works, you don't need a whole set. Rent the one you're missing, for half the price of a set.",
            "Tell us what the other machine is (front-load or top-load, and its width) and we look for one that sits well next to it.",
          ],
          fits: [
            "Your washer broke but the dryer still works, or the other way round",
            "You moved into a place that has only one machine",
            "You want a washer now and a dryer later",
          ],
          size: "Most full-size machines are about 27 inches (69 cm) wide; compact ones about 24 inches (61 cm). If you are renting a dryer to stack on your washer, tell us the washer's brand and model so we can check that they stack.",
        },
      },
    },
    // Shown with every example photo of a machine type.
    photoCaption: "Example of this type. Your machine may be a different brand.",
    drawingAlt: "Drawing: {alt}",
    drawingTag: "Drawing",
    seeDetails: "See details",
    drawingCaption: "A drawing of this type, not a photo. Brand and model depend on what's available.",
    galleryLabel: "Photos of this type",
    galleryShow: "Show photo {index} of {count}",
    galleryCounter: "{index} / {count}",
    view: {
      label: "Show machines as",
      photos: "Photos",
      drawings: "Drawings",
    },
    showcase: {
      title: "Find the type that fits your space",
      lead: "Tell us your closet size and outlet type. We find a machine that fits, check it, deliver it and hook it up.",
      photosNote: "Photos are examples of each type, not our machines. ",
      drawingsNote: "Drawings show the type, not a specific machine. ",
      availabilityNote: "Brand and model depend on what's available.",
    },
    animation: {
      label: "Machine types we rent",
      show: "Show {title}",
      pause: "Pause machine slideshow",
      play: "Play machine slideshow",
      widths: {
        "laundry-centre": "24″ or 27″ wide",
        "side-by-side-top-load": "About 55″ wide for the pair",
        "single-machine": "24″ or 27″ wide",
        "side-by-side-front-load": "About 55″ wide for the pair",
        stackable: "24″ or 27″ wide",
      },
    },
    // /machines/
    index: {
      eyebrow: "Five types, two prices",
      title: "Washer & dryer types we rent",
      lead: "Any washer and dryer set is {setPrice} a week. One machine on its own is {singlePrice} a week. Every type comes with repairs and old-machine haul-away included.",
      compareTitle: "Compare the types",
      compareLead:
        "Widths are typical; the exact size depends on the machine we have for you. Tell us your measurements and we check them first.",
      columns: {
        type: "Type",
        width: "Width",
        loads: "Washer loads from",
        goodFor: "Good for",
        price: "Price",
      },
      hookupsTitle: "What every machine needs",
      guidesTitle: "Before you choose",
      guides: {
        measure: "How to measure your laundry space",
        stackableVsCentre: "Stackable pair or laundry centre?",
        outlet: "3-prong or 4-prong dryer outlet?",
      },
      ctaTitle: "Not sure which type fits?",
      ctaText: "Text a photo of the space to {phoneSpan} and we'll tell you what fits.",
    },
    // /machines/<slug>/
    page: {
      summaryTitle: "Price and what's included",
      forSet: "For the washer and dryer set.",
      forSingle: "For one machine: a washer or a dryer.",
      included: [
        "Delivery and installation quoted before you pay",
        "Repairs included",
        "Your old machine taken away at no charge",
        "No credit check",
      ],
      terms: "{deposit} refundable deposit. {minWeeks}-week minimum, then week to week.",
      needOne: "Need only one machine? {singlePrice} a week.",
      needBoth: "Need both? A washer + dryer set is {setPrice} a week.",
      specsTitle: "Sizes and hookups",
      specsLead: "Typical sizes. The exact size depends on the machine we have for you, so we check your measurements first.",
      specsCaption: "Typical sizes and hookups: {title}",
      loadsFrom: "Washer loads from",
      goodFor: "Good for",
      hookupsNeeded: "Hookups needed",
      fitTitle: "Not sure it fits?",
      fitText: "Text a photo of the space to {phoneLink} and we'll check.",
      whatItIs: "What it is",
      size: "Size",
      whoItFits: "Who it fits",
      otherTypes: "Other machine types",
      whereWeDeliver: "Where we deliver",
      ctaTitle: "{title}: {price} a week",
      ctaText: "Delivery and installation quoted before you pay. Repairs included while you rent.",
    },
  },

  // Home page sections and the shared bands (widgets).
  home: {
    // The two slides after the price slide of the home hero (widgets/hero).
    heroSlides: {
      label: "Highlights",
      repairs: {
        eyebrow: "Repairs included",
        title: "If it breaks, we fix it",
        text: "Repairs, or a replacement machine, at no charge for as long as you rent.",
        cta: "How repairs work",
      },
      buildings: {
        eyebrow: "For buildings",
        title: "Machines for your building's laundry room",
        text: "We supply, install and repair the machines. Quoted per building after we see the room.",
        cta: "Laundry rooms",
      },
    },
    // Three photo cards under the hero (widgets/included-cards).
    included: {
      title: "What's included",
      items: [
        {
          title: "Delivered and installed",
          text: "We connect the water, drain, power and vent, and run a test cycle before we leave.",
        },
        {
          title: "Repairs included",
          text: "If a machine stops working, we repair it or replace it at no charge.",
        },
        {
          title: "Old machine taken away",
          text: "We take your old machine with us at no charge.",
        },
      ],
    },
    // The laundry-room photo carousel (widgets/rooms-carousel): captions by file name.
    rooms: {
      title: "A machine for every kind of space",
      lead: "Closets, condos, basements and laundry rooms: example photos of the spaces our machine types fit.",
      captions: {
        "rooms/stacked-small-room": "A stackable pair in a narrow room",
        "rooms/washer-shelves": "One washer between the shelves",
        "rooms/dark-set-laundry-room": "A front-load set under a shelf",
        "rooms/laundry-room-shirts": "A washer in a shared hallway room",
        "rooms/grey-set-laundry-room": "A front-load set with a folding counter",
        "rooms/washer-cabinet-plants": "A washer under the kitchen counter",
        "rooms/washer-dryer-shelving": "A washer with shelving above",
        "rooms/black-washer-basket": "A single washer in a corner",
        "rooms/washer-basket-sock": "A washer ready for the next load",
      },
    },
    hero: {
      // The line above the heading (the Spanish and Russian home pages: "We speak Spanish").
      eyebrow: "Local Toronto business",
      title: "Washer & dryer rental in Toronto & the GTA",
      priceSummary: "{setPrice} a week for the set, or {singlePrice} a week for one machine.",
      aWeek: "a week",
      forTheSet: "for the set",
      orSingle: "or {price} for one machine",
      singlePrice: "{singlePrice} a week",
      photoCaption: "Example photo",
      photoAlt: "A white front-load washer and dryer side by side in a bright laundry room",
    },
    trust: {
      label: "Why rent from us",
      repairs: "Repairs included",
      noCreditCheck: "No credit check",
      sameWeek: "Same-week delivery",
      local: "Local Toronto business",
    },
    how: {
      steps: [
        "Tell us what fits",
        "Get a quote",
        "We deliver and hook it up",
        "Repairs on us",
      ],
    },
    videos: {
      title: "How installation works",
      source: "Video: {source}",
      items: {
        "veEH0wF9LEU": {
          title: "Installing a laundry centre (washer and dryer in one unit)",
          source: "W Service on YouTube",
        },
        "h-co6mCEKNk": {
          title: "Connecting the dryer vent duct with clamps",
          source: "Imperial Manufacturing Group on YouTube",
        },
      },
    },
    prices: {
      title: "Prices",
      perWeek: "a week",
      forSet: "washer + dryer set",
      orSingle: "or {price} a week for one machine",
      checks: [
        "Repairs included",
        "Old machine haul-away included",
        "No HST charged",
      ],
      details: "Deposit, minimum term and payment",
    },
    landlordsTeaser: {
      title: "Landlord or building?",
      text: "Machines for your units, or for your building's laundry room. Repairs included.",
      link: "Laundry for landlords",
      buildingsLink: "Laundry rooms",
    },
    about: {
      title: "About us",
      facts: [
        "Local Toronto business",
        "{experienceYears}+ years fixing washers and dryers",
        "We speak {languages}",
      ],
      more: "More about us",
    },
    serviceArea: {
      title: "Service area",
      allAreas: "All areas we deliver to",
      mapLabel: "Map of the areas we deliver to",
      lake: "Lake Ontario",
    },
    faq: {
      title: "FAQ",
      another: "Another question? Call or text {phoneLink}.",
      all: "All questions and answers",
    },
    cta: {
      title: "A washer and dryer for {setPrice} a week",
      text: "Repairs included. No HST charged.",
    },
    startRental: {
      title: "Start your rental",
      stepsTitle: "Three short steps",
      steps: [
        "Machine type",
        "Your space",
        "How to reach you",
      ],
      nothingToPay: "Nothing to pay now. We confirm the machine, the total and the start date first.",
    },
  },

  // Cities and Toronto districts (entities/area), by slug. Local detail stays generally true
  // and non-promissory: no claims about installs done, customers or buildings served.
  areas: {
    cities: {
      toronto: {
        name: "Toronto",
        teaser: "The whole city: downtown, midtown, the east and west ends and the five districts.",
        metaTitle: "Washer & Dryer Rental Toronto | {setPrice}/week, Repairs Incl.",
        metaDescription:
          "Washer and dryer rental in Toronto, North York, Etobicoke, Scarborough, East York and York: {setPrice} a week for a set, {singlePrice} for one machine.",
        intro:
          "We rent washers and dryers across the City of Toronto, including North York, Etobicoke, Scarborough, East York and York.",
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
      mississauga: {
        name: "Mississauga",
        teaser: "Condos around City Centre and the lakeshore, houses and townhouses elsewhere.",
        metaTitle: "Washer & Dryer Rental Mississauga | {setPrice}/week",
        metaDescription:
          "Washer and dryer rental in Mississauga: {setPrice} a week for a set, {singlePrice} for one machine. Repairs and old-machine haul-away included. No credit check.",
        intro:
          "We rent washers and dryers across Mississauga, from Port Credit to Meadowvale and from Malton to Erin Mills.",
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
      brampton: {
        name: "Brampton",
        teaser: "Mostly houses and townhouses, with the laundry in the basement or on the main floor.",
        metaTitle: "Washer & Dryer Rental Brampton | {setPrice}/week",
        metaDescription:
          "Washer and dryer rental in Brampton: {setPrice} a week for a washer and dryer set, {singlePrice} for one machine. Repairs included. Call {phone}.",
        intro:
          "We rent washers and dryers across Brampton, including Bramalea, Springdale, Heart Lake, Mount Pleasant and Castlemore.",
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
      vaughan: {
        name: "Vaughan",
        teaser: "Woodbridge, Maple, Concord and Kleinburg, plus newer condos near Vaughan Metropolitan Centre.",
        metaTitle: "Washer & Dryer Rental Vaughan | {setPrice}/week",
        metaDescription:
          "Washer and dryer rental in Vaughan, Woodbridge, Maple and Concord: {setPrice} a week for a set, {singlePrice} for one machine. Repairs included.",
        intro:
          "We rent washers and dryers across Vaughan, including Woodbridge, Maple, Concord, Kleinburg and the Vaughan side of Thornhill.",
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
      markham: {
        name: "Markham",
        teaser: "Townhouses and houses in Unionville and Cornell, condos along Highway 7.",
        metaTitle: "Washer & Dryer Rental Markham | {setPrice}/week",
        metaDescription:
          "Washer and dryer rental in Markham and Unionville: {setPrice} a week for a set, {singlePrice} for one machine. Repairs and haul-away included. No credit check.",
        intro:
          "We rent washers and dryers across Markham, including Unionville, Markham Village, Cornell, Milliken and Berczy Village.",
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
      "richmond-hill": {
        name: "Richmond Hill",
        teaser: "Houses from Oak Ridges to Langstaff, condo towers along Yonge Street.",
        metaTitle: "Washer & Dryer Rental Richmond Hill | {setPrice}/week",
        metaDescription:
          "Washer and dryer rental in Richmond Hill and Oak Ridges: {setPrice} a week for a set, {singlePrice} for one machine. Repairs included. Call {phone}.",
        intro:
          "We rent washers and dryers across Richmond Hill, including Oak Ridges, Mill Pond, Bayview Hill, Richvale and Jefferson.",
        neighbourhoods: ["Oak Ridges", "Mill Pond", "Bayview Hill", "Richvale", "Jefferson", "Langstaff", "Elgin Mills"],
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
    },
    // `fits`: why each machine type (by slug) suits the homes there.
    districts: {
      "north-york": {
        name: "North York",
        metaTitle: "Washer & Dryer Rental North York, Toronto | {setPrice}/week",
        metaDescription:
          "Rent a washer and dryer in North York, from Willowdale and Don Mills to Downsview: {setPrice} a week for a set, {singlePrice} for one machine. Repairs included.",
        teaser: "Condo towers along Yonge Street, houses with basement laundry on the side streets.",
        intro:
          "We rent washers and dryers across North York, from Willowdale and Bayview Village to Don Mills, Downsview and Bathurst Manor.",
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
        fits: {
          stackable: "Narrow, tall condo closets near Yonge Street and Sheppard Avenue.",
          "laundry-centre": "Condo closets that were built for a one-piece unit.",
          "side-by-side-top-load": "Basement laundry areas in houses.",
          "single-machine": "When one of your machines still works.",
        },
        checklist: [
          "Condo: the closet's width, depth and height, and a service elevator booking",
          "House: the basement stairs and the doorways on the way down",
          "Apartment: whether your unit has its own hookups",
          "Dryer outlet: 3-prong or 4-prong",
        ],
      },
      etobicoke: {
        name: "Etobicoke",
        metaTitle: "Washer & Dryer Rental Etobicoke, Toronto | {setPrice}/week",
        metaDescription:
          "Rent a washer and dryer in Etobicoke, from Humber Bay Shores and Mimico to Rexdale: {setPrice} a week for a set, {singlePrice} for one machine. Haul-away included.",
        teaser: "Lakeshore condos, houses with basement laundry rooms, and apartment buildings.",
        intro:
          "We rent washers and dryers across Etobicoke, from the lakeshore at Humber Bay Shores, Mimico and Long Branch up to Islington Village and Rexdale.",
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
        fits: {
          stackable: "Condo closets by the lake and near the subway.",
          "side-by-side-front-load": "Basement laundry rooms with space for both doors to open.",
          "side-by-side-top-load": "Basements with open space above the washer for the lid.",
          "single-machine": "Pairing with a washer or dryer you already have.",
        },
        checklist: [
          "Condo: the closet's width and height, and a service elevator booking",
          "House: the basement stairs and the turn at the bottom",
          "Dryer outlet: 3-prong or 4-prong",
          "Where the old machine is, if you want it taken away",
        ],
      },
      scarborough: {
        name: "Scarborough",
        metaTitle: "Washer & Dryer Rental Scarborough, Toronto | {setPrice}/week",
        metaDescription:
          "Rent a washer and dryer in Scarborough, from Agincourt and Malvern to Guildwood: {setPrice} a week for a set, {singlePrice} for one machine. No credit check.",
        teaser: "Mostly houses and townhouses, plus apartment towers and newer condos.",
        intro:
          "We rent washers and dryers across Scarborough, including Agincourt, Malvern, Wexford, Guildwood, Birch Cliff and West Hill.",
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
        fits: {
          "side-by-side-top-load": "Basement and main-floor laundry rooms in houses.",
          "side-by-side-front-load": "Bigger households that wash bedding and towels often.",
          "laundry-centre": "Apartments and condos with one small laundry closet.",
          "single-machine": "When the house already has one of the two machines.",
        },
        checklist: [
          "Which hookups you can use, if you rent part of a house",
          "The stairs: how many, how wide, and any tight turns",
          "Dryer outlet: 3-prong or 4-prong",
          "Whether you need a set or just one machine",
        ],
      },
      "east-york": {
        name: "East York",
        metaTitle: "Washer & Dryer Rental East York, Toronto | {setPrice}/week",
        metaDescription:
          "Rent a washer and dryer in East York, Leaside and Thorncliffe Park: {setPrice} a week for a set, {singlePrice} for one machine. Repairs and haul-away included.",
        teaser: "Streets of houses in Leaside and Pape Village, apartment towers in Thorncliffe Park.",
        intro:
          "We rent washers and dryers across East York, including Leaside, Thorncliffe Park, Pape Village, Woodbine Heights and Crescent Town.",
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
        fits: {
          "side-by-side-top-load": "Basement laundry areas in houses.",
          stackable: "Tight basements where two machines side by side won't fit.",
          "laundry-centre": "Apartments with a laundry closet.",
          "single-machine": "Replacing one machine of an older pair.",
        },
        checklist: [
          "The basement stairs: their width, and any turns",
          "The laundry space: width, depth and height",
          "Apartment: whether your unit has water, drain and power hookups",
          "Dryer outlet: 3-prong or 4-prong",
        ],
      },
      york: {
        name: "York",
        metaTitle: "Washer & Dryer Rental York, Toronto | {setPrice}/week",
        metaDescription:
          "Rent a washer and dryer in York, Toronto, including Weston and Mount Dennis: {setPrice} a week for a set, {singlePrice} for one machine. Repairs included.",
        teaser: "Older houses with basements, and apartment buildings along the main streets.",
        intro:
          "We rent washers and dryers across York, the former City of York northwest of downtown Toronto, including Weston, Mount Dennis, Fairbank and Oakwood Village.",
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
        fits: {
          "side-by-side-front-load": "Basement laundry rooms in houses.",
          "side-by-side-top-load": "Anyone who would rather not bend down to load the washer.",
          stackable: "Narrow spaces in a unit that is part of a house.",
          "single-machine": "Pairing with the machine already in the basement.",
        },
        checklist: [
          "The basement stairs and doorways: how wide they are",
          "Which hookups you can use, if the house is split into units",
          "Dryer outlet: 3-prong or 4-prong",
          "A photo of the space, sent by text",
        ],
      },
    },
    // /areas/
    index: {
      eyebrow: "Toronto & the GTA",
      title: "Where we deliver",
      checkTitle: "Do we deliver to you?",
      lead: "We deliver rental washers and dryers across Toronto and five cities around it. Type your postal code to check, or find your area below.",
      samePrice: "Same price in every area: {setPrice} a week for a set, {singlePrice} for one machine.",
      fartherText: "Farther away? Text us your address and we'll tell you.",
      torontoTitle: "Toronto",
      torontoLead:
        "All of the City of Toronto. North York, Etobicoke, Scarborough, East York and York each have their own page.",
      wholeCity: "Whole city",
      district: "Toronto district",
      aroundTitle: "Around Toronto",
      aroundLead: "West into Peel Region and north into York Region.",
    },
    // City and district pages.
    page: {
      cityEyebrow: "{place} · {company}",
      districtEyebrow: "{place} · Toronto",
      title: "Washer & dryer rental in {place}",
      priceLabel: "a week for a washer + dryer set",
      otherPrice: "or {singlePrice} a week for one machine",
      photoCaption: "Example photo: {title}. Your machine may be a different brand.",
      otherAreasLabel: "Other areas",
      torontoDistricts: "Toronto districts",
      otherAreas: "Other areas we serve",
      otherToronto: "Other parts of Toronto",
      aroundToronto: "Around Toronto",
      allOfToronto: "All of Toronto",
      ctaTitle: "Ready to rent in {place}?",
      fitsTitle: "Machines that usually fit in {place}",
      yorkNote: "This page is about York in Toronto. Looking for York Region? See {cities}.",
      listAnd: " and ",
      listComma: ", ",
      localTitle: "Laundry in {place} homes",
      localAreas: "Areas of {place} we deliver to",
      beforeYouCall: "Before you call, check",
      notSure: "Not sure? Text a photo to {phoneLink} and we'll tell you what fits.",
      deliveryTitle: "Do we deliver to you?",
      deliveryLead: "Type your postal code. If the code doesn't tell us, text us your address and we'll confirm.",
    },
    districtsLabel: "Toronto districts",
  },

  // Questions and answers (entities/faq), by id; groups by id. A `link` is the label of the
  // link under the answer.
  faq: {
    groups: {
      renting: "Renting",
      "prices-and-payment": "Prices and payment",
      "delivery-and-installation": "Delivery and installation",
      repairs: "Repairs",
      "for-landlords": "Landlords",
      "first-week-free-offer": "First week free",
    },
    items: {
      "minimum-term": {
        question: "How long is the rental?",
        answer:
          "{minWeeks} weeks minimum. After that it continues week to week, and either side can end it with {noticeDays} days' notice. We pick the machine up.",
      },
      ending: {
        question: "How do I end my rental?",
        answer:
          "Text us at {phone}. After the {minWeeks}-week minimum, either side can end the rental with {noticeDays} days' notice, and we come and pick the machine up.",
      },
      "machine-types": {
        question: "Which machines can I rent?",
        answer:
          "A stackable pair, a one-piece laundry centre, a side-by-side pair (front-load or top-load), or one machine on its own: a washer or a dryer.",
        link: "Compare the machine types",
      },
      "new-machines": {
        question: "Are the machines new?",
        answer: "No. They are pre-owned machines in good working order. Each one is checked before it goes out.",
      },
      brands: {
        question: "Which brands do you have?",
        answer:
          "Whatever fits your space and is available: GE, Whirlpool, Samsung, LG, Frigidaire, Maytag, Kenmore and others.",
      },
      "credit-check": {
        question: "Do you check credit?",
        answer: "No. There is no credit check.",
      },
      "other-appliances": {
        question: "Do you rent other appliances, or sell machines?",
        answer: "No. We only rent washers and dryers.",
      },
      languages: {
        question: "Which languages do you speak?",
        answer: "English, Spanish and Russian.",
      },
      price: {
        question: "How much does it cost?",
        answer:
          "{setPrice} a week for a washer and dryer set, or {singlePrice} a week for one machine, in Canadian dollars. Rent is charged every week on the same weekday.",
      },
      tax: {
        question: "Do prices include tax?",
        answer: "We don't charge HST. The weekly price is what you pay.",
      },
      deposit: {
        question: "Is there a deposit?",
        answer: "Yes, {deposit}. You get it back when the machine comes back in working condition.",
      },
      payment: {
        question: "How do I pay?",
        answer: "By Interac e-Transfer or credit card. To pay by card, use the payment link we send with your quote.",
      },
      referral: {
        question: "Do you have a referral offer?",
        answer: "Yes. {referralText}",
      },
      "space-needs": {
        question: "What do I need in my laundry space?",
        answer:
          "Water hookups (hot and cold), a drain, and the right outlet. Most electric dryers need a 240V outlet, 3- or 4-prong. A vented dryer also needs a vent to the outside. Send us a photo and we'll check.",
        link: "How to measure your laundry space",
      },
      "delivery-cost": {
        question: "How much are delivery and installation?",
        answer: "We quote it before you pay. It depends on the distance, the floor, stairs or elevator, and the hookups.",
      },
      "delivery-time": {
        question: "How soon can you deliver?",
        answer: "Usually the same week. We confirm the date when we send the quote.",
      },
      installation: {
        question: "What does installation include?",
        answer: "We check the space and connect the dryer to its own 240-volt outlet (3- or 4-prong). We run a 4-inch metal vent duct to the outside, clamped at both ends and without kinks: a crushed duct is a fire risk. We connect the hot and cold water and the drain, level the machine and run a test cycle before we leave.",
      },
      condo: {
        question: "Can you deliver to a condo?",
        answer:
          "Yes. Tell us the closet size and whether the building has a service elevator, and we plan the delivery.",
        link: "Condo laundry checklist",
      },
      "haul-away": {
        question: "Do you take my old machine?",
        answer: "Yes, at no charge, when we deliver yours.",
      },
      areas: {
        question: "Where do you deliver?",
        answer:
          "Toronto, including North York, Etobicoke, Scarborough, East York and York, plus Mississauga, Brampton, Vaughan, Markham and Richmond Hill. Farther away? Ask us.",
        link: "Check your postal code",
      },
      breaks: {
        question: "What if the machine breaks?",
        answer: "Call or text us. We arrange a repair or a replacement machine at no charge.",
      },
      "repair-request": {
        question: "How do I ask for a repair?",
        answer:
          "Call or text {phone}, or send the repair form with your address and what's wrong. Repairs are included while you rent.",
        link: "Request a repair",
      },
      damage: {
        question: "Is every repair included?",
        answer: "Repairs from normal use are included. Damage beyond normal wear is the renter's responsibility.",
      },
      "landlord-options": {
        question: "How do landlords work with you?",
        answer:
          "Two ways. Your tenants rent from us directly: there's nothing for you to pay, you only allow the installation. Or you rent machines for your units: the list price is {setPrice} a week per set, and for {quoteUnits} or more units we quote per building after seeing it. Repairs are included either way.",
        link: "Washers and dryers for landlords",
      },
      "landlord-quote": {
        question: "How does a landlord get a quote?",
        answer:
          "Send the landlord quote form with the address, the number of units and what's there now, or call or text {phone}.",
        link: "Landlord quote form",
      },
      "first-week-free": {
        question: "How does the first week free work?",
        answer: "{promotionText}",
      },
      "first-week-free-costs": {
        question: "With the first week free, what do I still pay?",
        answer:
          "The {deposit} refundable deposit and the delivery. From the second week, the weekly rent is charged as usual.",
      },
    },
    // /faq/
    page: {
      eyebrow: "FAQ",
      title: "Questions and answers",
      lead: "Renting, prices, delivery, repairs and landlords. Another question? Call or text {phoneLink}.",
      topics: "Topics",
    },
  },

  landlords: {
    eyebrow: "For landlords",
    title: "Washers and dryers for your rental units",
    lead: "Two ways to put laundry in your units. Either way, we install the machines, take the old ones away, and repairs are included.",
    option: "Option {number}",
    options: [
      {
        title: "Your tenants rent from us",
        headline: "Nothing for you to pay",
        points: [
          "Each tenant rents a washer and dryer from us and pays us directly.",
          "There's nothing for you to pay.",
          "You only allow the installation.",
          "Repairs are included while the tenant rents.",
        ],
      },
      {
        title: "You rent machines for your units",
        headline: "{setPrice} a week per set, list price",
        points: [
          "You rent the machines and include laundry with the unit.",
          "List price: {setPrice} a week per washer and dryer set.",
          "For {quoteUnits} or more units, we quote per building after we see it.",
          "Repairs are included while you rent.",
        ],
      },
    ],
    optionsTitle: "Two ways to work with us",
    includedTitle: "Included either way",
    includedLead: "Delivery and installation are quoted per job, before anyone pays.",
    included: [
      "Installation: we connect the water, drain, power and vent, and run a test cycle before we leave.",
      "Old machines taken away at no charge.",
      "Repairs, or a replacement machine, at no charge.",
      "Pre-owned machines, each one checked before it goes out.",
    ],
    stepsTitle: "How it works for a building",
    steps: [
      {
        title: "Tell us about the building",
        text: "The address, how many units, and what's there now: no machines, old machines to replace, or hookups only.",
      },
      {
        title: "We see the building",
        text: "For {quoteUnits} or more units, we look at the building before we quote: the laundry spaces and the hookups.",
      },
      {
        title: "You get a quote",
        text: "If your tenants rent directly, each tenant gets their own quote. If you rent the machines, you get a quote for the building.",
      },
      {
        title: "We install",
        text: "We deliver, connect each machine, run a test cycle and take the old machines away.",
      },
      {
        title: "Repairs while the machines are in",
        text: "Call or text us when a machine needs a repair. We repair it or replace it at no charge.",
      },
    ],
    startWithQuote: "Start with a quote",
    unitNeedsTitle: "What each unit needs",
    unitNeedsNote: "Tell us what each unit has, and we'll tell you what fits.",
    faqTitle: "Landlord questions",
    faqs: [
      {
        question: "Do I pay anything if my tenants rent from you?",
        answer: "No. The tenant rents the machines and pays us. You allow the installation.",
      },
      {
        question: "What does it cost if I rent the machines?",
        answer:
          "The list price is {setPrice} a week per washer and dryer set. For {quoteUnits} or more units, we quote per building after we see it. Delivery and installation are quoted before you pay.",
      },
      {
        question: "Who arranges repairs?",
        answer: "Call or text {phone} when a machine needs a repair. Repairs are included in both options.",
      },
      {
        question: "What if a unit has no hookups?",
        answer:
          "A unit needs hot and cold water, a drain, the right outlet and, for a vented dryer, a vent to the outside. Tell us what each unit has and we'll tell you what fits.",
      },
      {
        question: "Do my tenants need a credit check?",
        answer: "No. There is no credit check.",
      },
      {
        question: "Can you take the old machines away?",
        answer: "Yes. We take old machines away at no charge when we install ours.",
      },
      {
        question: "Which areas do you cover?",
        answer: "Toronto, Mississauga, Brampton, Vaughan, Markham and Richmond Hill. Farther away? Ask us.",
      },
    ],
    moreAnswers: "More answers on the {faqLink}.",
    faqLink: "FAQ page",
    ctaTitle: "Get a quote for your building",
    ctaText: "Tell us the address, the number of units and what's there now.",
    // The link to /buildings/ for a shared laundry room.
    buildingsNote: "A shared laundry room in the building? {buildingsLink}.",
    buildingsLink: "See the laundry room options",
    // /landlords/quote/
    quote: {
      eyebrow: "For landlords",
      title: "Get a quote for your building",
      lead: "Tell us about the building and the units. In the units, your tenants can rent from us directly or you can rent the machines. For a shared laundry room, the building rents the machines or residents pay per load.",
      howOptionsWork: "How the two options work",
      nextTitle: "What happens next",
      next: [
        "We read your request and call or text you.",
        "For {quoteUnits} or more units, we arrange a time to see the building.",
        "You get a quote before anything is installed.",
      ],
      formTitle: "Your building",
      address: "Building address or city",
      units: "Number of units",
      setup: "What's there now",
      // Option labels; the English text is also what the form posts (shared/forms).
      setupOptions: { none: "No machines", replace: "Old machines to replace", hookupsOnly: "Hookups only" },
      machineType: "Machine type",
      notSure: "Not sure",
      differentEachUnit: "Different in each unit",
      option: "How you'd like to do it",
      optionChoices: {
        tenants: "My tenants rent directly",
        landlord: "I rent the machines for my units",
        laundryRoomRent: "Shared laundry room: the building rents the machines",
        laundryRoomPerLoad: "Shared laundry room: residents pay per load",
        notSure: "Not sure yet",
      },
      notesHint:
        "For example: where the laundry is in each unit, stairs or elevator, a good time to see the building.",
      submit: "Send quote request",
      sent: "Quote request sent.",
      subject: "Landlord quote request — {name}",
      errors: {
        address: "Enter the address or the city.",
        unitsMissing: "Enter the number of units.",
        unitsInvalid: "Enter a whole number, 1 or more.",
        setup: "Choose what's there now.",
        option: "Choose how you'd like to do it.",
      },
    },
  },

  // /buildings/: machines for the shared laundry room of a residential building. Quoted per
  // building after we see the room: no price and no machine type on the page (owner,
  // 2026-10-15).
  buildings: {
    eyebrow: "For residential buildings",
    title: "Washers and dryers for your building's laundry room",
    lead: "For apartment and condo buildings with a shared laundry room. We supply the machines, install them and repair them. Two ways to set it up, quoted per building after we see the room.",
    option: "Option {number}",
    options: [
      {
        title: "The building rents the machines",
        headline: "Quoted per building",
        points: [
          "The building rents the machines for its laundry room.",
          "The building decides how residents use them.",
          "We quote after we see the room.",
          "Repairs are included while you rent.",
        ],
      },
      {
        title: "Residents pay per load",
        headline: "No cost to the building",
        points: [
          "We supply the machines at no cost to the building.",
          "Residents pay per load.",
          "The building gets a share of what the machines take in. We agree on the share before we install.",
          "Repairs are included.",
        ],
      },
    ],
    optionsTitle: "Two ways to set up the laundry room",
    includedTitle: "Included either way",
    includedLead: "Delivery and installation are in the quote, before anything is installed.",
    included: [
      "We see the room first and tell you which machines fit.",
      "Installation: we connect the water, drain, power and vent, and run a test cycle before we leave.",
      "Old machines taken away at no charge.",
      "Repairs, or a replacement machine, at no charge.",
    ],
    stepsTitle: "How it works",
    steps: [
      {
        title: "Tell us about the building",
        text: "The address, the number of units, and what's in the laundry room now.",
      },
      {
        title: "We see the laundry room",
        text: "We look at the space, the hookups and how many machines the room can take.",
      },
      {
        title: "You get a quote",
        text: "For the option you choose: the building rents the machines, or residents pay per load.",
      },
      {
        title: "We install",
        text: "We deliver, connect each machine, run a test cycle and take the old machines away.",
      },
      {
        title: "Repairs while the machines are in",
        text: "Call or text us when a machine needs a repair. We repair it or replace it at no charge.",
      },
    ],
    startWithQuote: "Start with a quote",
    inSuiteTitle: "Machines in each unit instead?",
    inSuiteText: "If the units have their own hookups, tenants can rent from us directly, or you can rent machines for the units.",
    inSuiteLink: "Landlord options",
    faqTitle: "Building questions",
    faqs: [
      {
        question: "What does it cost?",
        answer: "We quote per building after we see the laundry room. Delivery and installation are in the quote, before anything is installed.",
      },
      {
        question: "How does the pay-per-load option work?",
        answer: "We supply the machines at no cost to the building, and residents pay per load. The building gets a share of what the machines take in. We agree on the share before we install.",
      },
      {
        question: "Which machines do you put in?",
        answer: "It depends on the room: the space, the hookups and how many residents use it. We tell you what fits after we see it.",
      },
      {
        question: "Who arranges repairs?",
        answer: "Call or text {phone} when a machine needs a repair. Repairs are included in both options.",
      },
      {
        question: "Can you take the old machines away?",
        answer: "Yes. We take old machines away at no charge when we install ours.",
      },
      {
        question: "Which areas do you cover?",
        answer: "Toronto, Mississauga, Brampton, Vaughan, Markham and Richmond Hill. Farther away? Ask us.",
      },
    ],
    ctaTitle: "Get a quote for your laundry room",
    ctaText: "Tell us the address, the number of units and what's in the laundry room now.",
  },

  about: {
    eyebrow: "About us",
    title: "About {company}",
    lead: "{company} is a local Toronto business. We bring more than {experienceYears} years of hands-on experience installing and fixing washers and dryers.",
    howWeWork: "How we work",
    whatWeDo: "What we do",
    whatWeDoItems: [
      "We rent washers and dryers in Toronto and the GTA: stackable pairs, one-piece laundry centres, side-by-side pairs, or a single washer or dryer.",
      "We only rent. We don't sell machines, and we don't rent other appliances.",
      "The machines are pre-owned, checked, and in good working order. The brand and model depend on what's available.",
      "Rent is {setPrice} a week for a set or {singlePrice} a week for one machine, with repairs and old-machine haul-away included.",
    ],
    readMore: "Read more",
    links: {
      machines: "Machine types",
      prices: "Prices",
      areas: "Where we deliver",
      landlords: "For landlords",
      faq: "FAQ",
    },
    talkTitle: "Talk to us",
    talkText: "{phone}. Mon–Sat {opens} – {closes}. Sunday closed.",
    contactPage: "Contact page",
  },

  contact: {
    eyebrow: "Call or text",
    title: "Contact us",
    lead: "The fastest way is a call or a text. Or send the request form below and we reply with the machine, the total and the start date.",
    reachLabel: "How to reach us",
    phoneTitle: "Phone and text",
    hours: "Hours",
    languages: "Languages",
    weSpeak: "We speak {languages}.",
    whereTitle: "Where we deliver",
    somethingElse: "Something else?",
    other: [
      { title: "A machine you rent needs a repair", label: "Request a repair" },
      { title: "You're a landlord", label: "Landlord quote" },
      { title: "You have a question first", label: "Questions and answers" },
    ],
  },

  repair: {
    eyebrow: "For customers renting from us",
    title: "Request a repair",
    lead: "Is a machine you rent from us not working right? Repairs are included while you rent: we repair it or replace it at no charge.",
    sectionLabel: "Repair request",
    fastest: "Fastest: call or text",
    leakTitle: "Water leaking?",
    leakText: "Turn off the water taps behind the washer if you can reach them safely, then call us.",
    helpsTitle: "What helps us",
    helps: [
      "What the machine does, or doesn't do",
      "Any error code on the display",
      "When it started",
      "A photo or a short video, sent by text",
    ],
    damageNote: "Repairs from normal use are included. Damage beyond normal wear is the renter's responsibility.",
    // The form
    formTitle: "What's wrong?",
    address: "Address or postal code",
    machine: "Machine",
    // Option labels; the English text is also what the form posts (shared/forms).
    machineOptions: {
      washer: "Washer",
      dryer: "Dryer",
      stackable: "Stackable pair",
      laundryCentre: "One-piece laundry centre",
      notSure: "Not sure",
    },
    bestTime: "Best time to reach you",
    timeOptions: { any: "Any time", morning: "Morning", afternoon: "Afternoon", evening: "Evening" },
    problem: "What's wrong",
    problemHint: "For example: won't start, won't drain, leaks, doesn't heat, an error code on the display.",
    submit: "Send repair request",
    sent: "Repair request sent.",
    sentNote: "We'll call or text you to arrange the repair.",
    subject: "Repair request — {name}",
    errors: {
      address: "Enter your address or postal code.",
      problemMissing: "Tell us what the machine is doing.",
      problemShort: "Tell us a little more about the problem.",
    },
  },

  account: {
    eyebrow: "For customers renting from us",
    title: "Pay or manage your rental",
    lead: "Card payments go through Stripe. We never see your full card number.",
    sectionLabel: "Your rental",
    payTitle: "Pay by card",
    payText: "Use the Stripe payment link we sent with your quote. Can't find it? Text us.",
    portalTitle: "Your card and receipts",
    portalText: "Change your card and see your receipts in the Stripe customer portal.",
    portalButton: "Open the customer portal",
    endTitle: "End a rental",
    endText:
      "Text us at {phone}. After the {minWeeks}-week minimum, either side can end the rental with {noticeDays} days' notice, and we pick the machine up.",
    textUs: "Text us",
  },

  guides: {
    eyebrow: "Guides",
    title: "Guides for renting a washer and dryer",
    lead: "Short, practical guides for renting a washer and dryer in Toronto and the GTA.",
    listLabel: "All guides",
    read: "Read the guide",
    // One guide
    guideEyebrow: "Guide",
    byline: "By {company} · Updated {date}",
    onThisPage: "On this page",
    ctaText: "{setPrice} a week for a washer and dryer set, {singlePrice} for one machine. Repairs and old-machine haul-away included.",
    more: "More guides",
  },

  legal: {
    termsEyebrow: "Renting with us",
    privacyEyebrow: "Your information",
    updated: "Last updated {date}",
    questions: "Questions about this page? Call or text {phoneLink}.",
  },

  notFound: {
    title: "Page not found",
    text: "This page doesn't exist. Washer & dryer rental in Toronto and the GTA is {setPrice} a week for a set, {singlePrice} for one machine.",
    home: "Go to the home page",
  },

  error: {
    title: "Something went wrong",
    text: "Please try again, or call or text {phoneLink}.",
  },

  // The rental request at /start/ (processes/rental-request).
  start: {
    eyebrow: "Start your rental",
    stepsLabel: "Rental request steps",
    stepOf: "Step {step} of {steps}",
    stepDone: ", done",
    back: "Back to the previous step",
    asideLabel: "Call or text instead",
    steps: {
      machine: "Machine type",
      details: "Your space",
      contact: "How to reach you",
    },
    heads: {
      details: {
        title: "Your Space: Step {step} of {steps} | {company}",
        description: "Step {step} of the rental request: postal code, closet width, dryer outlet and the way in.",
      },
      contact: {
        title: "How to Reach You: Step {step} of {steps} | {company}",
        description: "Step {step} of the rental request: your name, phone number and a preferred day.",
      },
      done: {
        title: "Request Sent | {company}",
        description: "Your rental request is sent. We reply with the machine, the total and the start date.",
      },
    },
    machine: {
      title: "Which machine do you need?",
      intro: "Not sure? Choose \"Not sure yet\": we help you pick from your closet size and hookups. {link}",
      legend: "Machine type",
      setNote: "{setPrice}/week for the set",
      singleNote: "{singlePrice}/week",
      washerOnly: "Washer only",
      dryerOnly: "Dryer only",
      notSure: "Not sure yet",
      notSureNote: "We'll help you choose",
      next: "Next: your space",
      error: "Choose a machine type, or \"Not sure yet\".",
    },
    details: {
      title: "Tell us about your space",
      intro: "You chose: {machine}. Now the space, so we bring a machine that fits.",
      postal: "Postal code",
      postalPlaceholder: "e.g. M5V 2T6",
      width: "Closet or space width",
      widthPlaceholder: "e.g. 24\" or 61 cm",
      widthHint: "Not sure? Write \"not sure\".",
      outlet: "Dryer outlet",
      outlets: { "3-prong": "3-prong", "4-prong": "4-prong", "not-sure": "Not sure" },
      access: "How do we get the machine in?",
      accessChoices: {
        ground: { label: "No stairs", note: "Ground floor or a step or two" },
        stairs: { label: "Stairs", note: "Basement or upstairs, no elevator" },
        elevator: { label: "Elevator", note: "Condo or apartment building" },
      },
      floor: "Floor or unit",
      floorPlaceholder: "e.g. 12th floor, basement",
      floorHint: "Optional. Tell us about tight stairs or turns in the notes on the next step.",
      next: "Next: how to reach you",
      errors: {
        postal: "Enter your postal code.",
        widthMissing: "Enter the width of the space, or write \"not sure\".",
        widthLong: "Keep it short, like 24\" or 61 cm.",
        outlet: "Choose the dryer outlet, or \"Not sure\".",
        access: "Choose how we get the machine in.",
        floorLong: "Keep it short, like \"3rd floor\" or \"basement\".",
      },
    },
    contact: {
      title: "How can we reach you?",
      intro: "We reply with the machine, the total and the start date.",
      summaryTitle: "Your request so far",
      summary: {
        machine: "Machine",
        postal: "Postal code",
        postalWithCity: "{postal} ({city})",
        width: "Closet width",
        outlet: "Dryer outlet",
        access: "Way in",
      },
      postalUnsure: "We can't tell your area from the postal code alone. We'll confirm by text.",
      preferredDay: "Preferred delivery day",
      preferredDayHint: "Optional. We confirm the date with the quote.",
      notesHint: "For example: stairs or tight turns, the old machine to take away, a good time to call.",
      submit: "Send request",
      errors: {
        date: "Choose a date.",
        dateEarly: "Choose today or a later date.",
        notesLong: "Keep the notes under {max} characters.",
      },
    },
    done: {
      title: "Request sent.",
      thanks: "Thank you, {name}. We'll call or text you at {customerPhone} with the machine, the total and the start date.",
      photo: "A photo of the space helps. Text it to {phoneLink}.",
      textPhoto: "Text a photo",
      home: "Back to the home page",
    },
    // The email the business gets.
    email: {
      subject: "New rental request — {name}",
      areaUnsure: "Not sure from the postal code: confirm by text",
    },
  },
};

export default en;
