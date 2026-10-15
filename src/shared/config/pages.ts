// The <head> facts of the site's fixed pages: path, title (at most 60 characters),
// description (at most 155), the name used in breadcrumbs and llms.txt, and the llms.txt note.
// Each page's loader builds its <head> from these; the sitemap and llms.txt list them
// (src/app/catalog.ts). Pages made from data (cities, districts, machine types, guides,
// policies) keep these facts next to their data.
export const homePage = {
  path: "/",
  name: "Home",
  llmsNote: "offer, machine types, prices, how it works, FAQ, rental request",
  metaTitle: "Washer & Dryer Rental Toronto & GTA | $12.50/week",
  metaDescription:
    "Washer & dryer rental in Toronto and the GTA: $12.50 a week for a set, $6.25 for one machine. Repairs included. Call or text (437) 907-6955.",
} as const;

export const areasPage = {
  path: "/areas/",
  name: "Areas",
  llmsNote: "every city and Toronto district we deliver to, with a postal-code check",
  metaTitle: "Washer & Dryer Rental Service Area | Toronto & the GTA",
  metaDescription:
    "Where we deliver rental washers and dryers: Toronto and its districts, Mississauga, Brampton, Vaughan, Markham and Richmond Hill. Check your postal code.",
} as const;

export const machinesPage = {
  path: "/machines/",
  name: "Machines",
  llmsNote: "all five machine types compared, with prices",
  metaTitle: "Washer & Dryer Types for Rent | Toronto, from $6.25/week",
  metaDescription:
    "Compare the washer and dryer types we rent in Toronto and the GTA: stackable, laundry centre, side-by-side front-load or top-load, or one machine.",
} as const;

export const landlordsPage = {
  path: "/landlords/",
  name: "Landlords",
  llmsNote: "two options: tenants rent directly, or the landlord rents machines for the units",
  metaTitle: "Washer & Dryer Rental for Landlords | Toronto & the GTA",
  metaDescription:
    "Laundry for rental units in Toronto and the GTA: tenants rent from us directly, or you rent machines for your units. Repairs included either way.",
} as const;

export const landlordQuotePage = {
  path: "/landlords/quote/",
  name: "Get a quote",
  llmsNote: "quote request form for landlords",
  metaTitle: "Landlord Quote: Washers & Dryers for Rental Units",
  metaDescription:
    "Ask for a quote for washers and dryers in your rental units in Toronto and the GTA. For 3 or more units, we quote per building after seeing it.",
} as const;

export const faqPage = {
  path: "/faq/",
  name: "FAQ",
  llmsNote: "renting, prices and payment, delivery and installation, repairs, landlords, current offers",
  metaTitle: "Washer & Dryer Rental FAQ | GTA Washer & Dryer Rentals",
  metaDescription:
    "Answers about renting a washer and dryer in Toronto and the GTA: prices, the deposit, payment, delivery, installation, repairs and landlords.",
} as const;

export const aboutPage = {
  path: "/about/",
  name: "About",
  llmsNote: "who we are and how we work",
  metaTitle: "About Us | GTA Washer & Dryer Rentals, Toronto",
  metaDescription:
    "GTA Washer & Dryer Rentals is a local Toronto business with more than 3 years of hands-on experience installing and fixing washers and dryers.",
} as const;

export const contactPage = {
  path: "/contact/",
  name: "Contact",
  llmsNote: "phone, hours, languages and the way into the rental request",
  metaTitle: "Contact | GTA Washer & Dryer Rentals, (437) 907-6955",
  metaDescription:
    "Call or text (437) 907-6955, Monday to Saturday, 9 am to 7 pm, in English, Spanish or Russian. Or send a request and we reply with a quote.",
} as const;

export const repairPage = {
  path: "/repair/",
  name: "Request a repair",
  llmsNote: "repair request form for customers renting from us",
  metaTitle: "Request a Repair | GTA Washer & Dryer Rentals",
  metaDescription:
    "Renting a washer or dryer from us and it stopped working? Repairs are included. Send a repair request, or call or text (437) 907-6955.",
} as const;

export const accountPage = {
  path: "/account/",
  name: "Pay or manage",
  llmsNote: "paying by card, the Stripe customer portal, ending a rental",
  metaTitle: "Pay or Manage Your Rental | GTA Washer & Dryer Rentals",
  metaDescription:
    "Pay with the link sent with your quote, manage your card and receipts in the Stripe customer portal, or text us to end a rental.",
} as const;

export const startPage = {
  path: "/start/",
  name: "Start your rental",
  llmsNote: "the rental request in three short steps: machine type, your space, how to reach you",
  metaTitle: "Start Your Rental | GTA Washer & Dryer Rentals",
  metaDescription:
    "Request a washer and dryer rental in Toronto and the GTA in three short steps. We reply with the machine, the total and the start date.",
} as const;

export const notFoundPage = {
  path: "/404/",
  name: "Page not found",
  metaTitle: "Page not found | GTA Washer & Dryer Rentals",
  metaDescription:
    "This page doesn't exist. Washer & dryer rental in Toronto and the GTA: $12.50 a week for a set. Call or text (437) 907-6955.",
} as const;
