// The landlords page (/landlords/). Facts only: the two options, what's included, how a
// building is quoted. No income claims and no numbers beyond the list price.
import { siteConfig } from "~/shared/config";

const { phone, prices } = siteConfig;

export const landlordOptions = [
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
    headline: `$${prices.setText} a week per set, list price`,
    points: [
      "You rent the machines and include laundry with the unit.",
      `List price: $${prices.setText} a week per washer and dryer set.`,
      "For 3 or more units, we quote per building after we see it.",
      "Repairs are included while you rent.",
    ],
  },
];

export const landlordIncluded = [
  "Installation: we connect the water, drain, power and vent, and run a test cycle before we leave.",
  "Old machines taken away at no charge.",
  "Repairs, or a replacement machine, at no charge.",
  "Pre-owned machines, each one checked before it goes out.",
];

export const landlordSteps = [
  {
    title: "Tell us about the building",
    text: "The address, how many units, and what's there now: no machines, old machines to replace, or hookups only.",
  },
  {
    title: "We see the building",
    text: "For 3 or more units, we look at the building before we quote: the laundry spaces and the hookups.",
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
];

export const landlordFaqs = [
  {
    question: "Do I pay anything if my tenants rent from you?",
    answer: "No. The tenant rents the machines and pays us. You allow the installation.",
  },
  {
    question: "What does it cost if I rent the machines?",
    answer: `The list price is $${prices.setText} a week per washer and dryer set. For 3 or more units, we quote per building after we see it. Delivery and installation are quoted before you pay.`,
  },
  {
    question: "Who arranges repairs?",
    answer: `Call or text ${phone.display} when a machine needs a repair. Repairs are included in both options.`,
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
    answer:
      "Toronto, Mississauga, Brampton, Vaughan, Markham and Richmond Hill. Farther away? Ask us.",
  },
];
