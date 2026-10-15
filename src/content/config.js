// Business facts used across the site. Change them here, not in the components.
// Only verified facts belong in this file: no invented numbers, claims or reviews.
export const siteConfig = {
  companyName: "GTA Washer & Dryer Rentals",
  siteUrl: "https://washerrent.com", // no trailing slash
  // The date the page content last changed; used as <lastmod> in the generated sitemap.xml.
  lastUpdated: "2026-10-15",
  owner: "Vlad",
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
    // single machines. The deposit and the delivery are still paid. Shown until `endsAt`
    // (src/content/offers.js decides from the build date; the offer bar re-checks in the browser).
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
  // Search engine ownership checks. Paste the code from Google Search Console / Bing
  // Webmaster Tools (the content="" value only); the meta tag is output only when non-empty.
  googleSiteVerification: "",
  bingSiteVerification: "",
  web3formsKey: "b1731368-a27c-491d-a5a3-c3783ebd926c",
  // Stripe customer portal login link (https://billing.stripe.com/p/login/...). While this is
  // empty, the /account/ page and every link to it are left out of the build.
  stripePortalUrl: "",
  // Cloudflare Web Analytics: the "token" value from the snippet Cloudflare gives you. The
  // cookie-free beacon script is added to every page only when this is non-empty.
  cloudflareAnalyticsToken: "",
  // Main menu. Secondary links (repair, guides, pay) are in Header.jsx.
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
};
