// Business facts used across the site. Change them here, not in the components.
// Only verified facts belong in this file: no invented numbers, claims or reviews.
// Secrets and per-deployment settings (the Web3Forms key, the Stripe portal link, the
// analytics token, search-engine verification codes) come from the environment instead:
// see ./env.ts and README.md.
export const siteConfig = {
  companyName: "GTA Washer & Dryer Rentals",
  siteUrl: "https://washerrent.com", // no trailing slash
  // The date the page content last changed; used as <lastmod> in the generated sitemap.xml.
  lastUpdated: "2026-10-15",
  languages: "English, Spanish & Russian",
  tagline: "Washer & dryer rental in Toronto & the GTA",
  location: "Toronto · serving the GTA",
  phone: {
    display: "(437) 907-6955",
    tel: "tel:+14379076955",
    sms: "sms:+14379076955",
  },
  hours: [
    { days: "Mon–Sat", time: "9 am – 7 pm" },
    { days: "Sunday", time: "Closed" },
  ],
  facebook: "https://www.facebook.com/profile.php?id=61588384887072",
  prices: {
    set: 12.5, // washer + dryer set, per week
    single: 6.25, // one machine, per week
    setText: "12.50", // as shown on the site
    singleText: "6.25",
    deposit: 200, // refundable
  },
  offers: {
    // First week's rent free for new customers who start a rental by Nov 30, 2026: sets and
    // single machines. The deposit and the delivery are still paid. Shown until `endsAt`,
    // decided on the server for every request (src/entities/offer).
    firstWeekFree: {
      endsAt: "2026-12-01T05:00:00Z", // the end of Nov 30, 2026 in Toronto (EST, UTC-5)
      lastDay: "November 30, 2026",
      lastDayShort: "Nov 30",
    },
    // $100 when a friend you refer signs up for 12 months or more.
    referral: { amount: 100, minMonths: 12 },
  },
  serviceAreas: [
    {
      name: "Toronto",
      districts: ["North York", "Etobicoke", "Scarborough", "East York", "York"],
    },
    { name: "Mississauga" },
    { name: "Brampton" },
    { name: "Vaughan" },
    { name: "Markham" },
    { name: "Richmond Hill" },
  ],
  // Main menu. Secondary links (repair, guides, pay) are in widgets/header.
  navigation: [
    { label: "Machines", href: "/machines/" },
    { label: "Prices", href: "/#prices" },
    { label: "Areas", href: "/areas/" },
    { label: "Landlords", href: "/landlords/" },
    { label: "FAQ", href: "/faq/" },
  ],
  // Language versions of the site, shown as short links in the header and footer.
  languageLinks: [
    { short: "ES", label: "Español", lang: "es", href: "/es/" },
    { short: "RU", label: "Русский", lang: "ru", href: "/ru/" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
