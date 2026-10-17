// Server-only English text: the guides, the privacy policy and rental terms, and llms.txt.
// It never ships to the browser (pages get it through their loaders), so a draft's text stays
// out of a normal deployment. Same rules as ./en.ts: plain data, `{names}` for facts
// (shared/i18n), filled in per request by serverText() in ../index.server.ts.
//
// Article blocks (widgets/article-body): a string is a paragraph; { list }, { steps }, { note }
// and { link } as in shared/lib/article.ts; { include: "hookups" } is the hookup checklist
// (en.ts common.hookups); { offer: "promotions" } is one paragraph per running promotion and
// { offer: "referral" } the referral offer, both filled in per request.
const enServer = {
  articles: {
    // How an { offer } block reads inside a guide.
    promotionParagraph: "{title}. {text} {stillPaid}",
    referralParagraph: "{title}. {text}",
  },

  guides: {
    "measure-your-laundry-space": {
    metaTitle: "How to Measure Your Laundry Space for a Washer & Dryer",
    metaDescription:
      "What to measure before you rent a washer and dryer: the space, the room hookups and doors need, and the way in. Plus what to send us for a quote.",
    title: "How to measure your laundry space",
    summary:
      "Ten minutes with a tape measure can save a wasted delivery. Here is what to measure, where a machine needs extra room, and what to send us before you rent.",
    sections: [
      {
        heading: "What you need",
        blocks: [
          "A tape measure, your phone and something to write on. A second person helps with the tall measurements and with holding the tape straight.",
          "Measure in inches. Washer and dryer sizes are usually given in inches, so you won't have to convert anything later.",
        ],
      },
      {
        heading: "Measure the space",
        blocks: [
          "Take each measurement at the narrowest point. Walls are rarely perfectly straight, and a door frame, a pipe or a baseboard can take away an inch you were counting on.",
          {
            list: [
              "Width: from wall to wall, or to the edge of the closet opening, wherever it is narrowest.",
              "Depth: from the back wall to the front edge of the closet frame, or to where a door would close.",
              "Height: from the floor to the lowest thing above the space, such as a shelf, a cabinet, a pipe or the top of the opening.",
            ],
          },
          "Write the three numbers down as width, depth and height, and note which one you are least sure of.",
        ],
      },
      {
        heading: "Leave room for hookups and doors",
        blocks: [
          "A washer or dryer can't sit flat against the back wall. The water hoses, the drain hose, the power cord and the dryer vent all connect at the back, so leave a few inches behind the machines.",
          "Leave a little space at the sides as well, so the machines don't rub against the walls or each other while they run.",
          "Then think about doors. A front-load machine needs room in front for its door to swing open, and you need room to stand there and load it. A top-load washer needs clear space above it for the lid. If the laundry closet has its own doors, check that they will still close in front of the machines.",
        ],
      },
      {
        heading: "Measure the way in",
        blocks: [
          "The machine has to reach the space before it can fit in it. Walk the route from the front door to the laundry space and find the narrowest point along the way:",
          {
            list: [
              "The front door and any inside doors, measured with the door open",
              "Hallways and tight corners",
              "Stairs: how many steps, how wide, and whether there's a turn or a landing",
              "In a condo or apartment building: the service elevator, and the booking you'll need for it",
            ],
          },
          "A stackable pair arrives as two separate machines, so each piece is smaller to carry. A one-piece laundry centre comes as one tall unit.",
        ],
      },
      {
        heading: "Typical sizes",
        blocks: [
          "Sizes vary by brand and model, so treat these as a starting point, not a promise:",
          {
            list: [
              "Compact machines are usually about 24 inches wide.",
              "Full-size machines are usually about 27 inches wide each. A side-by-side pair needs roughly 55 inches of width, plus a little space between and around them.",
              "One-piece laundry centres come 24 or 27 inches wide. A 24-inch unit is about 70 inches tall.",
              "A stackable pair is one machine wide and two machines tall, so check the height under any shelf above the space.",
            ],
          },
          "If your space is close to one of these sizes, send us the exact numbers. We check them against the machine we have for you before delivery day.",
        ],
      },
      {
        heading: "Check the hookups while you're there",
        blocks: [
          "While the tape measure is out, look at what's on the wall behind the space:",
          { include: "hookups" },
          "If you're not sure what something is, a photo is enough. We'll tell you what we see.",
          {
            link: {
              href: "/guides/3-prong-vs-4-prong-dryer-outlet/",
              label: "How to tell a 3-prong dryer outlet from a 4-prong one",
            },
          },
        ],
      },
      {
        heading: "What to send us",
        blocks: [
          "Text these to {phone} when you ask for a quote:",
          {
            list: [
              "The width, depth and height of the space",
              "The narrowest door or turn on the way in, and the number of stairs",
              "A photo of the space with the hookups visible",
              "A close photo of the dryer outlet",
            ],
          },
          "With that, we can tell you which machine type fits, and quote the delivery and installation before you pay anything.",
          { link: { href: "/machines/", label: "Compare the machine types" } },
        ],
      },
    ],
  },
    "3-prong-vs-4-prong-dryer-outlet": {
    metaTitle: "3-Prong vs 4-Prong Dryer Outlet: How to Tell Which You Have",
    metaDescription:
      "How to tell a 3-prong dryer outlet from a 4-prong one, why it matters for a rental dryer, and why outlet or cord changes are a job for an electrician.",
    title: "3-prong vs 4-prong dryer outlet",
    summary:
      "Most electric dryers plug into a large 240-volt outlet with either three or four slots. Here is how to tell which one you have, why we ask, and what not to do if the plug and the outlet don't match.",
    sections: [
      {
        heading: "Why we ask about your outlet",
        blocks: [
          "An electric dryer doesn't use a regular wall outlet. Its heater needs far more power than a lamp or a phone charger, so it plugs into a larger 240-volt outlet, and the plug on the dryer's power cord has to match that outlet.",
          "There are two common kinds of dryer outlet: one with three slots and one with four. Your home could have either. When you ask for a quote, we ask which one you have so the dryer can be connected properly on delivery day.",
        ],
      },
      {
        heading: "How to tell which one you have",
        blocks: [
          {
            steps: [
              "Find the outlet behind or beside the spot where the dryer goes. It's noticeably bigger than a regular outlet. If an old dryer is still plugged in, look at its plug rather than pulling it out.",
              "Count the slots. Three slots means a 3-prong outlet. Four slots means a 4-prong outlet.",
              "On a 4-prong outlet, one of the slots is usually rounded or U-shaped. That's the ground. A 3-prong dryer outlet has no separate ground slot.",
              "Take a photo, straight on and close enough to see every slot, and text it to us. It's the quickest way to be sure.",
            ],
          },
        ],
      },
      {
        heading: "The washer is different",
        blocks: [
          "A washer plugs into a regular household outlet. Check that there's one near the water taps, within reach of where the washer will stand.",
          "A one-piece laundry centre with an electric dryer needs the same kind of 240-volt dryer outlet, so check it the same way.",
        ],
      },
      {
        heading: "If the plug doesn't match the outlet",
        blocks: [
          {
            note: "Don't force a plug into an outlet it doesn't fit, and don't use an adapter or an extension cord to make it fit. A dryer draws a lot of power, and a poor connection can overheat.",
          },
          "There are two proper fixes: change the dryer's power cord to one that matches the outlet, or change the outlet to match the cord.",
          {
            list: [
              "Changing the outlet means working on your home's wiring. That should be done by a licensed electrician.",
              "Changing the cord on the dryer should be done by a licensed electrician or another qualified person, following the dryer maker's instructions.",
            ],
          },
          "Tell us about your outlet when you ask for a quote, so any mismatch is known well before delivery day.",
        ],
      },
      {
        heading: "No 240-volt outlet at all?",
        blocks: [
          "Some laundry spaces have water and a drain but no dryer outlet. Adding one means a new circuit from the electrical panel, which is also a job for a licensed electrician. If you rent your home, that's a question for your landlord first, and in a condo, for the building's management as well.",
          "Until then, you can still rent just a washer, for {singlePrice} a week.",
          { link: { href: "/machines/single-machine/", label: "Washer or dryer only" } },
        ],
      },
      {
        heading: "Quick checklist",
        blocks: [
          {
            list: [
              "Count the slots on the dryer outlet: 3 or 4",
              "Find the regular outlet for the washer",
              "Take a clear photo of both",
              "Text the photos to {phone} with your quote request",
            ],
          },
          "With those photos, we can plan the electrical side of the installation.",
          { link: { href: "/guides/measure-your-laundry-space/", label: "How to measure your laundry space" } },
        ],
      },
    ],
  },
    "stackable-vs-laundry-centre": {
    metaTitle: "Stackable Washer & Dryer vs Laundry Centre: Which Fits?",
    metaDescription:
      "Stackable pair or one-piece laundry centre? How the two compare on space, loading, controls and delivery, and how to tell which one suits your closet.",
    title: "Stackable pair or laundry centre: which fits your closet?",
    summary:
      "Both put a washer and a dryer in the floor space of one machine. They are built differently, though, and the difference matters for your closet, your laundry and your delivery.",
    sections: [
      {
        heading: "The short version",
        blocks: [
          {
            list: [
              "A stackable pair is a front-load washer with a separate dryer mounted on top of it. Two machines, two sets of controls.",
              "A laundry centre is one appliance: a top-load washer at the bottom and a dryer above it, built into one cabinet with one control panel.",
              "With us, both cost the same: {setPrice} a week as a set.",
            ],
          },
        ],
      },
      {
        heading: "Loading the washer",
        blocks: [
          "A stackable pair has a front-load washer, so you bend down to load it and to take the wet laundry out. Front-load washers tumble the laundry through a small amount of water, which suits bulky things like towels and bedding.",
          "A laundry centre's washer loads from the top, through a lid below the dryer, so there is less bending than with a front-loader. Its controls are simple, and the wide opening makes heavy, wet laundry easy to lift out.",
        ],
      },
      {
        heading: "Controls and the dryer",
        blocks: [
          "On a stackable pair, the washer and the dryer each have their own controls. On a laundry centre, the controls for both sit on one panel at the top.",
          "In both, the dryer is the upper machine. Check that whoever does the laundry can reach into it comfortably.",
        ],
      },
      {
        heading: "Size and height",
        blocks: [
          "Laundry centres come 24 or 27 inches wide. A 24-inch unit is about 70 inches tall.",
          "A stackable pair is as wide as one machine: usually about 24 inches for compact machines and about 27 inches for full-size ones. Its height depends on the two machines and the stacking kit, so measure the height under any shelf above the space and send it to us with the width.",
          "Both need a few inches behind them for the hoses, the power cord and the dryer vent.",
        ],
      },
      {
        heading: "Getting it in",
        blocks: [
          "A laundry centre is one tall unit, so it has to fit through every door, corner and elevator on the way in as a single piece.",
          "A stackable pair arrives as two machines and a stacking kit. Each piece is smaller, which can help in tight halls and stairwells. The two are stacked and connected once they are in place.",
        ],
      },
      {
        heading: "When something needs fixing",
        blocks: [
          "In a stackable pair, the washer and the dryer are separate machines. In a laundry centre they share one cabinet.",
          "Either way, repairs are included while you rent from us: we repair the machine or replace it at no charge.",
        ],
      },
      {
        heading: "Which one fits your closet?",
        blocks: [
          {
            list: [
              "Look at what's there now. Many condo closets were built around a one-piece laundry centre. If yours has one, another laundry centre of the same width is usually the simplest swap.",
              "Choose a stackable pair if you prefer a front-load washer, if the closet is tall enough for two machines, or if the way in is tight.",
              "Choose a laundry centre if you would rather load the washer from the top, or if your closet was built for one.",
            ],
          },
          "Not sure? Measure the width, depth and height, take a photo of the space and the hookups, and text it to {phone}. We'll tell you which type fits.",
        ],
      },
      {
        heading: "Both need the same hookups",
        blocks: [
          "Hot and cold water, a drain, and the right outlets. An electric dryer, on its own or in a laundry centre, needs a 240-volt outlet, 3- or 4-prong. A vented dryer also needs a vent to the outside.",
          { link: { href: "/machines/stackable/", label: "Stackable pair rental" } },
          { link: { href: "/machines/laundry-centre/", label: "Laundry centre rental" } },
        ],
      },
    ],
  },
    "condo-laundry-checklist": {
    metaTitle: "Condo Laundry Checklist: Before You Rent a Washer & Dryer",
    metaDescription:
      "Before a washer and dryer goes into your condo: building rules, the service elevator, closet size, hookups and delivery day, as a checklist.",
    title: "Condo laundry checklist",
    summary:
      "A washer and dryer delivery to a condo has a few extra steps: building rules, the service elevator and a narrow closet. Work through this list before delivery day.",
    sections: [
      {
        heading: "1. Check your building's rules",
        blocks: [
          "Rules differ from one building to the next, so don't assume yours match a friend's. Before you book, ask management or the concierge:",
          {
            list: [
              "Whether there are rules about in-suite washers and dryers",
              "Which days and hours deliveries are allowed",
              "What they need for a delivery, such as a form, a booking or a deposit for the elevator",
              "Where a delivery can park and unload: a loading dock, a driveway or the street",
              "Whether there are rules about leak protection, such as a drip tray under the washer",
            ],
          },
          "If you rent your condo, check with the owner as well. They may want to approve the machines.",
        ],
      },
      {
        heading: "2. Book the service elevator",
        blocks: [
          "Most condo buildings ask you to book the service elevator for a delivery. Book a slot with your building, then tell us the date and time.",
          "Ask how long the slot is, so the delivery and the installation both fit inside it.",
          "If your building has no service elevator, tell us the floor and describe the stairs, so we can plan how the machines come up.",
        ],
      },
      {
        heading: "3. Measure the closet",
        blocks: [
          "Condo laundry closets are usually narrow, so measure carefully:",
          {
            list: [
              "The width at the narrowest point",
              "The depth, with the closet door closed if it has one",
              "The height to the lowest shelf or the top of the opening",
              "The width of the closet opening and of your suite's front door",
            ],
          },
          "Leave a few inches behind the machines for the hoses, the power cord and the dryer vent.",
          { link: { href: "/guides/measure-your-laundry-space/", label: "How to measure your laundry space" } },
        ],
      },
      {
        heading: "4. Look at the hookups",
        blocks: [
          "Open the closet and look at the back wall. You should see:",
          {
            list: [
              "Hot and cold water taps",
              "A drain: a standpipe or a drain box in the wall",
              "The dryer outlet, 3-prong or 4-prong",
              "A regular outlet for the washer",
              "A dryer vent connection, if the closet has one",
            ],
          },
          "Take one photo of the whole back wall and send it to us. If something is missing or looks damaged, ask management about it before delivery day.",
          "Note where the water taps are. They shut off the water to the washer, so they should be easy to reach.",
          "If the closet has a dryer vent, we check the duct when we install: a crushed or blocked duct is a fire risk.",
          { link: { href: "/guides/3-prong-vs-4-prong-dryer-outlet/", label: "3-prong or 4-prong dryer outlet?" } },
        ],
      },
      {
        heading: "5. Choose the machine type",
        blocks: [
          "In most condo closets, the choice is between two types:",
          {
            list: [
              "A stackable pair: a front-load washer with the dryer on top",
              "A one-piece laundry centre: the washer and dryer in one cabinet, 24 or 27 inches wide",
            ],
          },
          "If the closet already has a laundry centre, one of the same width usually fits again.",
          { link: { href: "/guides/stackable-vs-laundry-centre/", label: "Stackable pair or laundry centre?" } },
        ],
      },
      {
        heading: "6. Get ready for delivery day",
        blocks: [
          {
            list: [
              "Someone at home for the whole delivery",
              "The elevator booked, and the concierge expecting us",
              "A clear path from the suite door to the closet",
              "The closet emptied, with room to work",
              "The old machine empty, if we're taking it away (haul-away is at no charge)",
            ],
          },
          "On the day, we connect the water, drain, power and vent, and run a test cycle before we leave.",
          "Questions about your building? Call or text {phone}.",
        ],
      },
    ],
  },
    "whats-included-when-you-rent": {
    metaTitle: "What's Included When You Rent a Washer and Dryer From Us",
    metaDescription:
      "What the weekly rent covers, what you pay separately, and how a rental runs: repairs, haul-away, the deposit, delivery, the minimum term and ending it.",
    title: "What's included when you rent from us",
    summary:
      "A plain list of what the weekly price covers, what you pay separately, and how a rental runs from the first week to the pickup.",
    sections: [
      {
        heading: "The weekly price",
        blocks: [
          {
            list: [
              "{setPrice} a week for a washer and dryer set",
              "{singlePrice} a week for one machine: just a washer or just a dryer",
            ],
          },
          "Rent is charged every week on the same weekday. All our prices are weekly, in Canadian dollars.",
          "We don't charge HST. The weekly price is what you pay.",
        ],
      },
      {
        heading: "Included in the price",
        blocks: [
          {
            list: [
              "Repairs. If the machine breaks while you rent it, we repair it or give you a replacement machine, at no charge.",
              "Haul-away. We take your old machine away when we deliver ours, at no charge.",
              "A checked machine. Our machines are pre-owned. Each one is checked before it goes out and is in good working order. The brand and model depend on what's available.",
              "Help in your language. We speak English, Spanish and Russian.",
            ],
          },
        ],
      },
      {
        heading: "Paid separately",
        blocks: [
          {
            list: [
              "Delivery and installation. We quote it per job, before you pay. It depends on the distance, the floor, stairs or elevator, and the hookups.",
              "A {deposit} refundable deposit. You get it back when the machine comes back in working condition.",
              "Damage beyond normal wear. Repairs from normal use are on us; damage beyond normal wear is the renter's responsibility.",
            ],
          },
        ],
      },
      {
        heading: "Getting started",
        blocks: [
          "Tell us your area, whether you need a set or one machine, and the size of your laundry space. A photo of the space helps. We reply with the machine, the total and the start date.",
          "Delivery is usually the same week. We confirm the date when we send the quote.",
        ],
      },
      {
        heading: "Installation",
        blocks: [
          "We deliver the machine, connect the water, drain, power and vent, and run a test cycle before we leave.",
          "Your space needs the right hookups: hot and cold water, a drain, the right outlet, and a vent to the outside for a vented dryer. If you live in a condo, book the service elevator for the delivery.",
          { link: { href: "/guides/measure-your-laundry-space/", label: "How to measure your laundry space" } },
        ],
      },
      {
        heading: "If something goes wrong",
        blocks: [
          "Call or text {phone}, or send the repair form with your address and what the machine is doing. We repair it or bring a replacement machine, at no charge.",
          "If water is leaking, turn off the water taps behind the washer if you can reach them safely, then call us.",
          { link: { href: "/repair/", label: "Request a repair" } },
        ],
      },
      {
        heading: "How long you rent",
        blocks: [
          "The minimum is {minWeeks} weeks. After that, the rental continues week to week.",
          "Once the minimum is over, either side can end the rental with {noticeDays} days' notice. To end it, text us at {phone}, and we pick the machine up.",
        ],
      },
      {
        heading: "Paying",
        blocks: [
          "Pay by Interac e-Transfer or credit card. For a card, we send a payment link with your quote. There's no credit check.",
        ],
      },
      {
        heading: "Current offers",
        blocks: [
          { offer: "promotions" },
          { offer: "referral" },
        ],
      },
      {
        heading: "What we don't do",
        blocks: [
          "We only rent washers and dryers. We don't sell machines, and we don't rent other appliances.",
        ],
      },
      {
        heading: "Before you sign",
        blocks: [
          "You get the full written rental agreement to read before you sign it. If anything on this page isn't clear, ask us first.",
          { link: { href: "/faq/", label: "More questions and answers" } },
        ],
      },
    ],
  },
  },

  legal: {
    privacy: {
      metaTitle: "Privacy Policy | {company}",
      metaDescription:
        "What {company} collects through its website forms and by phone, how it is used, which services handle it, and how to ask us to delete it.",
      title: "Privacy policy",
      summary:
        "What we collect through this website and by phone, what we do with it, and how to ask us to delete it, in plain language.",
      // "Visit statistics" and "Cookies" follow the deployment (pages/legal/content.server.ts):
      // the consent sentences appear once siteConfig.analytics has an ID.
      visitStatistics: {
        cloudflare: "We count visits to this site with Cloudflare Web Analytics. It doesn't use cookies. It shows us totals, such as how many times a page was viewed, not who you are.",
        withConsent: "If you click Accept on the cookie banner, we also use Google Analytics, Microsoft Clarity and PostHog to see how visitors use the site: which pages are viewed, where visits come from (for example a search or a Google ad), and which forms are sent, without what you wrote in them. Clarity also records clicks and scrolling on a page, with what you type into forms hidden. These services receive your IP address and details about your device and browser, and store the data outside Canada, mainly in the United States. We use the results to improve the site and to see which of our ads lead to requests; we don't use them to show you ads. If you click Decline, none of them load. To change your choice, use Cookie settings at the bottom of any page.",
      },
      cookies: {
        withoutConsent: "This site sets one cookie of its own, and only while you use the rental request: it holds your answers between the steps and is cleared when the request is sent. There are no advertising or tracking cookies.",
        withConsent: "This site sets one cookie of its own, and only while you use the rental request: it holds your answers between the steps and is cleared when the request is sent. If you accept on the cookie banner, Google Analytics, Microsoft Clarity and PostHog set their own cookies to recognize repeat visits; if you decline, they don't. Your choice itself is kept in your browser, so the banner doesn't ask again. There are no advertising cookies.",
      },
      sections: [
        {
          heading: "Who we are",
          blocks: ["{company} is a business based in Toronto, Ontario. You can reach us by phone or text at {phone}."],
        },
        {
          heading: "What we collect",
          blocks: [
            {
              list: [
                "When you send a form on this site, we get what you type into it. Depending on the form, that's your name, phone number, email address, address or postal code, your area, and your message: the machine you need, the size of your space, or what's wrong with a machine.",
                "When you call or text us, we get your phone number and what you tell us.",
                "The postal-code checker works only in your browser. The code you type there isn't sent to us or to anyone else.",
                "While you fill in the three steps of the rental request, what you have typed so far is kept in a cookie in your browser, so each step remembers the one before. The cookie is signed so it can't be altered, it is only sent to the rental request pages, and it is cleared when the request is sent. Nothing reaches us until you press Send.",
              ],
            },
          ],
        },
        {
          heading: "How forms reach us",
          blocks: [
            "Forms are delivered to us by email through Cloudflare, which hosts this site.",
          ],
        },
        {
          heading: "What we use it for",
          blocks: ["To answer you, quote a rental, deliver and install machines, arrange repairs, take payments and keep our records."],
        },
        {
          heading: "Card payments",
          blocks: [
            "Card payments are handled by Stripe, through a payment link we send with your quote. Stripe processes your card details; we never see your full card number.",
          ],
        },
        {
          heading: "Visit statistics",
          blocks: [{ include: "visitStatistics" }],
        },
        {
          heading: "Other services this site uses",
          blocks: [
            {
              list: [
                "The site runs on Cloudflare. Like any web host, it may keep standard server logs, such as IP addresses.",
                "Fonts load from Google Fonts, so your browser connects to Google's servers when a page opens.",
              ],
            },
          ],
        },
        {
          heading: "Cookies",
          blocks: [{ include: "cookies" }],
        },
        {
          heading: "Sharing",
          blocks: [
            "We don't sell your information, and we don't share it for advertising. It goes only to the services named on this page that run the site and take payments, or to others when the law requires it.",
          ],
        },
        {
          heading: "How long we keep it",
          blocks: ["As long as we need it for your request or your rental, and for the records a business has to keep."],
        },
        {
          heading: "Your choices",
          blocks: [
            "You can ask what information we have about you, ask us to correct it, or ask us to delete it. Call or text {phone}. If we have to keep something, for example for tax records, we'll tell you what and why.",
          ],
        },
        {
          heading: "Changes",
          blocks: ["If this policy changes, we'll update this page and the date at the top."],
        },
      ],
    },
    terms: {
      metaTitle: "Rental Terms | {company}",
      metaDescription:
        "A summary of our rental terms: the weekly price, the {deposit} refundable deposit, the {minWeeks}-week minimum, delivery quotes, included repairs and current offers.",
      title: "Rental terms",
      summary:
        "A summary of how renting from us works. Your rental agreement has the full terms, and you get it to read before you sign.",
      // "promotions": one section per running promotion (its title, text and what is still
      // paid), with the promotion's id as the anchor (/terms/#first-week-free).
      sections: [
        {
          id: "price",
          heading: "Price",
          blocks: [
            "{setPrice} a week for a washer and dryer set. {singlePrice} a week for one machine. Rent is charged every week on the same weekday.",
            "Prices are in Canadian dollars. We don't charge HST: the weekly price is what you pay.",
          ],
        },
        {
          id: "deposit",
          heading: "Deposit",
          blocks: ["A {deposit} refundable deposit. It's returned when the machine comes back in working condition."],
        },
        {
          id: "minimum-term",
          heading: "Minimum term and ending the rental",
          blocks: [
            "The minimum rental is {minWeeks} weeks. After that, it continues week to week, and either side can end it with {noticeDays} days' notice. We pick the machine up.",
            "To end your rental, text us.",
          ],
        },
        {
          id: "delivery",
          heading: "Delivery and installation",
          blocks: [
            "Quoted per job, before you pay. The quote depends on the distance, the floor, stairs or elevator, and the hookups.",
          ],
        },
        {
          id: "repairs",
          heading: "Repairs and damage",
          blocks: [
            "Repairs are included: if the machine breaks while you rent it, we repair it or replace it at no charge.",
            "Damage beyond normal wear is the renter's responsibility.",
          ],
        },
        {
          id: "haul-away",
          heading: "Old machine haul-away",
          blocks: ["We take your old machine away at no charge when we deliver."],
        },
        {
          id: "machines",
          heading: "The machines",
          blocks: [
            "Pre-owned, checked before they go out, and in good working order. The brand and model depend on what's available.",
          ],
        },
        {
          id: "credit-check",
          heading: "Credit check",
          blocks: ["There is no credit check."],
        },
        {
          id: "payment",
          heading: "Payment",
          blocks: [
            "By Interac e-Transfer or credit card. Card payments go through a Stripe payment link sent with your quote.",
          ],
        },
        "promotions",
        {
          id: "referral",
          heading: "Referral",
          blocks: ["{referralText}"],
        },
        {
          id: "landlords",
          heading: "Landlords",
          blocks: [
            "Landlords can have their tenants rent from us directly, or rent machines for their units. For a landlord renting machines, the list price is {setPrice} a week per washer and dryer set; for {quoteUnits} or more units, we quote per building after seeing it.",
          ],
        },
        {
          id: "agreement",
          heading: "Your agreement",
          blocks: ["This page is a summary. Before you sign, you get the full written rental agreement to read."],
        },
      ],
    },
  },

  // /llms.txt, a plain-text fact sheet for AI assistants. {offers}, {machineList}, {hookups}
  // and {pages} are lists built by src/app/resources/llms.ts.
  llms: {
    body: `# {company}

> Washer and dryer rental in Toronto and the GTA, Ontario, Canada. {setPrice} a week for a washer + dryer set, {singlePrice} a week for one machine. Repairs and old-machine haul-away included. A local Toronto business.

## Contact

- Phone (call or text): {phone}
- Hours: Monday to Saturday, {opens} to {closes}. Sunday closed.
- Website: {siteUrl}/
- Facebook: {facebook}
- Languages: English, Spanish and Russian
- No street address is published; we deliver.

## Offer

- Washer + dryer set: {setPrice} a week (CAD)
- One machine (washer only or dryer only): {singlePrice} a week (CAD)
- No HST is charged: the weekly price is what you pay
- Rent is charged every week on the same weekday. There are no monthly prices.
- Repairs included: repair or a replacement machine at no charge
- Old machine haul-away included, at no charge
- Delivery and installation: quoted per job, before you pay
- Machine types: {machineList}
- Machines are pre-owned, checked before they go out, in good working order. Brand and model depend on availability.
- Washers and dryers only: no other appliances, and no sales.

## Current offers

{offers}

## Terms

- {deposit} refundable deposit, returned when the machine comes back working
- {minWeeks}-week minimum, then week to week; either side can end the rental with {noticeDays} days' notice, and we pick the machine up
- To end a rental, text us
- No credit check
- Delivery usually the same week
- Payment by Interac e-Transfer or credit card; card payments go through a payment link sent with the quote
- Damage beyond normal wear is the renter's responsibility
- The full written rental agreement is given before signing

## Landlords

- Option 1: tenants rent directly from us. Nothing for the landlord to pay; the landlord only allows the installation.
- Option 2: the landlord rents machines for the units. List price {setPrice} a week per washer and dryer set; for {quoteUnits} or more units, we quote per building after seeing it.
- Either way, repairs are included, and we install the machines and take old ones away.

## What the space needs

{hookups}

## Service area

Toronto (North York, Etobicoke, Scarborough, East York, York), Mississauga, Brampton, Vaughan, Markham, Richmond Hill. Farther away: ask.

## About

A local Toronto business with more than {experienceYears} years of hands-on experience installing and fixing washers and dryers. We check each machine before it goes out, connect the water, drain, power and vent, and run a test cycle before we leave.

## Pages

{pages}
`,
    offerLine: "- {title}: {text} {stillPaid}",
    referralLine: "- {title}: {text}",
    machineItem: "{name} ({price} a week)",
    listItem: "- {item}",
    pageLine: "- [{name}]({url}){note}{draft}",
    pageNote: ": {note}",
    draft: " (draft, not published yet)",
    groupHeading: "### {title}",
    groups: {
      main: "Main pages",
      machines: "Machine types",
      areas: "Areas",
      guides: "Guides",
      policies: "Policies",
      languages: "Other languages",
    },
  },
};

export default enServer;
