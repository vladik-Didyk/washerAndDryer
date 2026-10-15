// Business facts used across the site. Change them here, not in the components.
// Only verified facts belong in this file: no invented numbers, claims or reviews.
export const siteConfig = {
  companyName: "GTA Washer & Dryer Rentals",
  siteUrl: "https://washerrent.com", // no trailing slash
  // The date the page content last changed; used as <lastmod> in the generated sitemap.xml.
  lastUpdated: "2026-10-14",
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
    set: 50, // washer + dryer set, per month
    single: 25, // one machine, per month
    deposit: 200, // refundable
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
  navigation: [
    { label: "Machines", href: "/#machines" },
    { label: "Prices", href: "/#prices" },
    { label: "How it works", href: "/#how" },
    { label: "FAQ", href: "/#faq" },
  ],
  // Language versions of the site, shown as short links in the header and footer.
  languageLinks: [
    { short: "ES", label: "Español", lang: "es", href: "/es/" },
    { short: "RU", label: "Русский", lang: "ru", href: "/ru/" },
  ],
};
