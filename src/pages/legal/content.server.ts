// The privacy policy (/privacy/) and the rental terms summary (/terms/). Both are drafts until
// the owner approves them: they exist only with PREVIEW_DRAFTS=1. Sections use the same blocks
// as the guides (widgets/article-body); a section `id` is its anchor (e.g. /terms/#referral).
// Server only, so a draft's text never ships to a normal deployment.
//
// When something here changes, change `updated` too. The privacy text follows the deployment:
// it describes visit statistics as on once CF_ANALYTICS_TOKEN is set, and the terms list the
// first-week offer only while it runs.
import { firstWeekFreeOffer, referralOffer } from "~/entities/offer";
import { siteConfig } from "~/shared/config";
import type { ArticleSection } from "~/shared/lib";

const { companyName, phone, prices } = siteConfig;

export interface LegalPage {
  path: "/privacy/" | "/terms/";
  kind: "privacy" | "terms";
  draft: boolean;
  updated: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  summary: string;
  sections: ArticleSection[];
}

export interface LegalContext {
  offerActive: boolean;
  analyticsOn: boolean;
}

const privacy = ({ analyticsOn }: LegalContext): LegalPage => ({
  path: "/privacy/",
  kind: "privacy",
  draft: true,
  updated: "2026-10-15",
  metaTitle: "Privacy Policy | GTA Washer & Dryer Rentals",
  metaDescription:
    "What GTA Washer & Dryer Rentals collects through its website forms and by phone, how it is used, which services handle it, and how to ask us to delete it.",
  title: "Privacy policy",
  summary:
    "What we collect through this website and by phone, what we do with it, and how to ask us to delete it, in plain language.",
  sections: [
    {
      heading: "Who we are",
      blocks: [
        `${companyName} is a business based in Toronto, Ontario. You can reach us by phone or text at ${phone.display}.`,
      ],
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
        "Forms are delivered to us by email through Web3Forms, a form service. Web3Forms receives what you send so it can pass it on to us.",
      ],
    },
    {
      heading: "What we use it for",
      blocks: [
        "To answer you, quote a rental, deliver and install machines, arrange repairs, take payments and keep our records.",
      ],
    },
    {
      heading: "Card payments",
      blocks: [
        "Card payments are handled by Stripe, through a payment link we send with your quote. Stripe processes your card details; we never see your full card number.",
      ],
    },
    {
      heading: "Visit statistics",
      blocks: [
        analyticsOn
          ? "We count visits to this site with Cloudflare Web Analytics. It doesn't use cookies. It shows us totals, such as how many times a page was viewed, not who you are."
          : "This site doesn't collect visit statistics at the moment. If we turn them on, we'll use Cloudflare Web Analytics, which counts visits without cookies and shows us totals, such as how many times a page was viewed, not who you are.",
      ],
    },
    {
      heading: "Other services this site uses",
      blocks: [
        {
          list: [
            "The site runs on Cloudflare. Like any web host, it may keep standard server logs, such as IP addresses.",
            "Fonts load from Google Fonts, so your browser connects to Google's servers when a page opens.",
            "The home page shows two manufacturer videos from YouTube in privacy-enhanced mode. If you play one, YouTube's own privacy policy applies.",
          ],
        },
      ],
    },
    {
      heading: "Cookies",
      blocks: [
        "This site sets one cookie of its own, and only while you use the rental request: it holds your answers between the steps and is cleared when the request is sent. There are no advertising or tracking cookies.",
      ],
    },
    {
      heading: "Sharing",
      blocks: [
        "We don't sell your information, and we don't share it for advertising. It goes only to the services named on this page that run the site and take payments, or to others when the law requires it.",
      ],
    },
    {
      heading: "How long we keep it",
      blocks: [
        "As long as we need it for your request or your rental, and for the records a business has to keep.",
      ],
    },
    {
      heading: "Your choices",
      blocks: [
        `You can ask what information we have about you, ask us to correct it, or ask us to delete it. Call or text ${phone.display}. If we have to keep something, for example for tax records, we'll tell you what and why.`,
      ],
    },
    {
      heading: "Changes",
      blocks: ["If this policy changes, we'll update this page and the date at the top."],
    },
  ],
});

const terms = ({ offerActive }: LegalContext): LegalPage => ({
  path: "/terms/",
  kind: "terms",
  draft: true,
  updated: "2026-10-15",
  metaTitle: "Rental Terms | GTA Washer & Dryer Rentals",
  metaDescription:
    "A summary of our rental terms: the weekly price, the $200 refundable deposit, the 52-week minimum, delivery quotes, included repairs and current offers.",
  title: "Rental terms",
  summary:
    "A summary of how renting from us works. Your rental agreement has the full terms, and you get it to read before you sign.",
  sections: [
    {
      id: "price",
      heading: "Price",
      blocks: [
        `$${prices.setText} a week for a washer and dryer set. $${prices.singleText} a week for one machine. Rent is charged every week on the same weekday.`,
        "Prices are in Canadian dollars. We don't charge HST: the weekly price is what you pay.",
      ],
    },
    {
      id: "deposit",
      heading: "Deposit",
      blocks: [
        `A $${prices.deposit} refundable deposit. It's returned when the machine comes back in working condition.`,
      ],
    },
    {
      id: "minimum-term",
      heading: "Minimum term and ending the rental",
      blocks: [
        "The minimum rental is 52 weeks. After that, it continues week to week, and either side can end it with 30 days' notice. We pick the machine up.",
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
    // Left out once the offer ends (decided per request).
    ...(offerActive
      ? [
          {
            id: "first-week-free",
            heading: "First week free",
            blocks: [firstWeekFreeOffer.text, firstWeekFreeOffer.stillPaid],
          },
        ]
      : []),
    {
      id: "referral",
      heading: "Referral",
      blocks: [referralOffer.text],
    },
    {
      id: "landlords",
      heading: "Landlords",
      blocks: [
        `Landlords can have their tenants rent from us directly, or rent machines for their units. For a landlord renting machines, the list price is $${prices.setText} a week per washer and dryer set; for 3 or more units, we quote per building after seeing it.`,
      ],
    },
    {
      id: "agreement",
      heading: "Your agreement",
      blocks: ["This page is a summary. Before you sign, you get the full written rental agreement to read."],
    },
  ],
});

// Every legal page, drafts included, for this request.
export const allLegalPages = (context: LegalContext): LegalPage[] => [privacy(context), terms(context)];

// The legal pages this deployment shows: published ones, plus drafts in a preview deployment.
export const visibleLegalPages = (context: LegalContext, previewDrafts: boolean): LegalPage[] =>
  allLegalPages(context).filter((page) => previewDrafts || !page.draft);
