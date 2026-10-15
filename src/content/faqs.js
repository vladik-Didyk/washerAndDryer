// Questions and answers, in groups. The /faq/ page shows them all and is the only page with
// FAQPage JSON-LD; the home page shows a few (homeFaqIds) and links to /faq/.
// `id` is the anchor on /faq/ (the offer bar links to /faq/#first-week-free and /faq/#referral).
// Answers are plain text so the same words work in JSON-LD. `link` adds a link under the
// answer on the page; it's left out while the page it points to isn't in the build.
import { siteConfig } from "./config";
import { firstWeekFreeActive, firstWeekFreeOffer, referralOffer } from "./offers";

const { phone, prices } = siteConfig;

export const faqGroups = [
  {
    id: "renting",
    title: "Renting",
    items: [
      {
        id: "minimum-term",
        question: "How long is the rental?",
        answer:
          "52 weeks minimum. After that it continues week to week, and either side can end it with 30 days' notice. We pick the machine up.",
      },
      {
        id: "ending",
        question: "How do I end my rental?",
        answer: `Text us at ${phone.display}. After the 52-week minimum, either side can end the rental with 30 days' notice, and we come and pick the machine up.`,
      },
      {
        id: "machine-types",
        question: "Which machines can I rent?",
        answer:
          "A stackable pair, a one-piece laundry centre, a side-by-side pair (front-load or top-load), or one machine on its own: a washer or a dryer.",
        link: { href: "/machines/", label: "Compare the machine types" },
      },
      {
        id: "new-machines",
        question: "Are the machines new?",
        answer:
          "No. They are pre-owned machines in good working order. Each one is checked before it goes out.",
      },
      {
        id: "brands",
        question: "Which brands do you have?",
        answer:
          "Whatever fits your space and is available: GE, Whirlpool, Samsung, LG, Frigidaire, Maytag, Kenmore and others.",
      },
      {
        id: "credit-check",
        question: "Do you check credit?",
        answer: "No. There is no credit check.",
      },
      {
        id: "other-appliances",
        question: "Do you rent other appliances, or sell machines?",
        answer: "No. We only rent washers and dryers.",
      },
      {
        id: "languages",
        question: "Which languages do you speak?",
        answer: "English, Spanish and Russian.",
      },
    ],
  },
  {
    id: "prices-and-payment",
    title: "Prices and payment",
    items: [
      {
        id: "price",
        question: "How much does it cost?",
        answer: `$${prices.setText} a week for a washer and dryer set, or $${prices.singleText} a week for one machine. Rent is charged every week on the same weekday.`,
      },
      {
        id: "deposit",
        question: "Is there a deposit?",
        answer: `Yes, $${prices.deposit}. You get it back when the machine comes back in working condition.`,
      },
      {
        id: "payment",
        question: "How do I pay?",
        answer:
          "By e-Transfer or card. To pay by card, use the payment link we send with your quote.",
      },
      {
        id: "referral",
        question: "Do you have a referral offer?",
        answer: `Yes. ${referralOffer.text}`,
      },
    ],
  },
  {
    id: "delivery-and-installation",
    title: "Delivery and installation",
    items: [
      {
        id: "space-needs",
        question: "What do I need in my laundry space?",
        answer:
          "Water hookups (hot and cold), a drain, and the right outlet. Most electric dryers need a 240V outlet, 3- or 4-prong. A vented dryer also needs a vent to the outside. Send us a photo and we'll check.",
        link: { href: "/guides/measure-your-laundry-space/", label: "How to measure your laundry space" },
      },
      {
        id: "delivery-cost",
        question: "How much are delivery and installation?",
        answer:
          "We quote it before you pay. It depends on the distance, the floor, stairs or elevator, and the hookups.",
      },
      {
        id: "delivery-time",
        question: "How soon can you deliver?",
        answer: "Usually the same week. We confirm the date when we send the quote.",
      },
      {
        id: "condo",
        question: "Can you deliver to a condo?",
        answer:
          "Yes. Tell us the closet size and whether the building has a service elevator, and we plan the delivery.",
        link: { href: "/guides/condo-laundry-checklist/", label: "Condo laundry checklist" },
      },
      {
        id: "haul-away",
        question: "Do you take my old machine?",
        answer: "Yes, at no charge, when we deliver yours.",
      },
      {
        id: "areas",
        question: "Where do you deliver?",
        answer:
          "Toronto, including North York, Etobicoke, Scarborough, East York and York, plus Mississauga, Brampton, Vaughan, Markham and Richmond Hill. Farther away? Ask us.",
        link: { href: "/areas/", label: "Check your postal code" },
      },
    ],
  },
  {
    id: "repairs",
    title: "Repairs",
    items: [
      {
        id: "breaks",
        question: "What if the machine breaks?",
        answer:
          "Call or text us. We arrange a repair or a replacement machine at no charge.",
      },
      {
        id: "repair-request",
        question: "How do I ask for a repair?",
        answer: `Call or text ${phone.display}, or send the repair form with your address and what's wrong. Repairs are included while you rent.`,
        link: { href: "/repair/", label: "Request a repair" },
      },
      {
        id: "damage",
        question: "Is every repair included?",
        answer:
          "Repairs from normal use are included. Damage beyond normal wear is the renter's responsibility.",
      },
    ],
  },
  {
    id: "for-landlords",
    title: "Landlords",
    items: [
      {
        id: "landlord-options",
        question: "How do landlords work with you?",
        answer: `Two ways. Your tenants rent from us directly: there's nothing for you to pay, you only allow the installation. Or you rent machines for your units: the list price is $${prices.setText} a week per set, and for 3 or more units we quote per building after seeing it. Repairs are included either way.`,
        link: { href: "/landlords/", label: "Washers and dryers for landlords" },
      },
      {
        id: "landlord-quote",
        question: "How does a landlord get a quote?",
        answer: `Send the landlord quote form with the address, the number of units and what's there now, or call or text ${phone.display}.`,
        link: { href: "/landlords/quote/", label: "Landlord quote form" },
      },
    ],
  },
  // Shown only while the offer runs (decided at build time, see offers.js).
  firstWeekFreeActive && {
    id: "first-week-free-offer",
    title: "First week free",
    items: [
      {
        id: "first-week-free",
        question: "How does the first week free work?",
        answer: firstWeekFreeOffer.text,
      },
      {
        id: "first-week-free-costs",
        question: "With the first week free, what do I still pay?",
        answer: `The $${prices.deposit} refundable deposit and the delivery. From the second week, the weekly rent is charged as usual.`,
      },
    ],
  },
].filter(Boolean);

export const faqs = faqGroups.flatMap((group) => group.items);

// The short list on the home page, which links to /faq/ for the rest.
const homeFaqIds = ["space-needs", "deposit", "minimum-term", "breaks", "delivery-cost"];
export const homeFaqs = homeFaqIds.map((id) => faqs.find((faq) => faq.id === id));
