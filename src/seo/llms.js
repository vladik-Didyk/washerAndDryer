// llms.txt: a plain-text fact sheet for AI assistants, written to dist/llms.txt by
// scripts/prerender.mjs. Facts come from src/content/; the page list comes from the routes in
// this build, so it never lists a page the build doesn't have. Drafts appear only in preview
// builds, marked as drafts.
import { siteConfig } from "../content/config";
import { machineTypes } from "../content/machines";
import { hookupChecklist } from "../content/machines";
import { firstWeekFreeActive, firstWeekFreeOffer, referralOffer } from "../content/offers";
import { routes } from "../content/routes";

const { companyName, siteUrl, phone, prices, owner, languages, facebook } = siteConfig;
const absolute = (path) => `${siteUrl}${path}`;

const PAGE_GROUPS = [
  { title: "Main pages", kinds: ["home", "machines", "areas", "landlords", "landlord-quote", "faq", "about", "contact", "repair", "account"] },
  { title: "Machine types", kinds: ["machine"] },
  { title: "Areas", kinds: ["city", "district"] },
  { title: "Guides", kinds: ["guides", "guide"] },
  { title: "Policies", kinds: ["privacy", "terms"] },
  { title: "Other languages", kinds: ["language"] },
];

function pageLine(route) {
  const name = route.breadcrumbs?.at(-1)?.name ?? route.name ?? route.metaTitle;
  const note = route.llmsNote ? `: ${route.llmsNote}` : "";
  const draft = route.draft ? " (draft, not published yet)" : "";
  return `- [${name}](${absolute(route.path)})${note}${draft}`;
}

function pageSections() {
  return PAGE_GROUPS.map((group) => {
    const lines = routes.filter((route) => group.kinds.includes(route.kind)).map(pageLine);
    return lines.length ? `### ${group.title}\n\n${lines.join("\n")}` : null;
  }).filter(Boolean);
}

export function llmsTxt() {
  const offers = [
    firstWeekFreeActive && `- ${firstWeekFreeOffer.title}: ${firstWeekFreeOffer.text} ${firstWeekFreeOffer.stillPaid}`,
    `- ${referralOffer.title}: ${referralOffer.text}`,
  ].filter(Boolean);

  const machineList = machineTypes
    .map((machine) => `${machine.title.toLowerCase()} ($${machine.price.toFixed(2)} a week)`)
    .join(", ");

  return `# ${companyName}

> Washer and dryer rental in Toronto and the GTA, Ontario, Canada. $${prices.setText} a week for a washer + dryer set, $${prices.singleText} a week for one machine. Repairs and old-machine haul-away included. Run by ${owner} in Toronto.

## Contact

- Phone (call or text): ${phone.display}
- Hours: Monday to Saturday, 9 am to 7 pm. Sunday closed.
- Website: ${siteUrl}/
- Facebook: ${facebook}
- Languages: ${languages.replace("&", "and")}
- No street address is published; we deliver.

## Offer

- Washer + dryer set: $${prices.setText} a week (CAD)
- One machine (washer only or dryer only): $${prices.singleText} a week (CAD)
- Rent is charged every week on the same weekday. There are no monthly prices.
- Repairs included: repair or a replacement machine at no charge
- Old machine haul-away included, at no charge
- Delivery and installation: quoted per job, before you pay
- Machine types: ${machineList}
- Machines are pre-owned, checked before they go out, in good working order. Brand and model depend on availability.
- Washers and dryers only: no other appliances, and no sales.

## Current offers

${offers.join("\n")}

## Terms

- $${prices.deposit} refundable deposit, returned when the machine comes back working
- 52-week minimum, then week to week; either side can end the rental with 30 days' notice, and we pick the machine up
- To end a rental, text us
- No credit check
- Delivery usually the same week
- Payment by e-Transfer or card; card payments go through a payment link sent with the quote
- Damage beyond normal wear is the renter's responsibility
- The full written rental agreement is given before signing

## Landlords

- Option 1: tenants rent directly from us. Nothing for the landlord to pay; the landlord only allows the installation.
- Option 2: the landlord rents machines for the units. List price $${prices.setText} a week per washer and dryer set; for 3 or more units, we quote per building after seeing it.
- Either way, repairs are included, and we install the machines and take old ones away.

## What the space needs

${hookupChecklist.map((item) => `- ${item}`).join("\n")}

## Service area

Toronto (North York, Etobicoke, Scarborough, East York, York), Mississauga, Brampton, Vaughan, Markham, Richmond Hill. Farther away: ask.

## About

Run by ${owner} in Toronto, who has more than 3 years of experience installing and fixing washers and dryers. He checks each machine before it goes out, connects the water, drain, power and vent, and runs a test cycle before leaving.

## Pages

${pageSections().join("\n\n")}
`;
}
