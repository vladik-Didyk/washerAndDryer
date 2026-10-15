// /llms.txt: a plain-text fact sheet for AI assistants. Facts come from shared/config and the
// entities; the page list comes from the catalog, so it never lists a page this deployment
// doesn't have. Drafts appear only in preview deployments, marked as drafts.
import type { LoaderFunctionArgs } from "react-router";
import { machineTypes } from "~/entities/machine";
import { firstWeekFreeOffer, referralOffer } from "~/entities/offer";
import { hookupChecklist, siteConfig } from "~/shared/config";
import { siteCatalog, type CatalogEntry } from "../catalog";
import { catalogOptions } from "./context";

const { companyName, siteUrl, phone, prices, languages, facebook } = siteConfig;
const absolute = (path: string) => `${siteUrl}${path}`;

const PAGE_GROUPS: Array<{ title: string; kinds: string[] }> = [
  {
    title: "Main pages",
    kinds: ["home", "machines", "areas", "landlords", "landlord-quote", "faq", "about", "contact", "repair", "start", "account"],
  },
  { title: "Machine types", kinds: ["machine"] },
  { title: "Areas", kinds: ["city", "district"] },
  { title: "Guides", kinds: ["guides", "guide"] },
  { title: "Policies", kinds: ["privacy", "terms"] },
  { title: "Other languages", kinds: ["language"] },
];

function pageLine(entry: CatalogEntry) {
  const note = entry.llmsNote ? `: ${entry.llmsNote}` : "";
  const draft = entry.draft ? " (draft, not published yet)" : "";
  return `- [${entry.name}](${absolute(entry.path)})${note}${draft}`;
}

function pageSections(entries: CatalogEntry[]) {
  return PAGE_GROUPS.map((group) => {
    const lines = entries.filter((entry) => group.kinds.includes(entry.kind)).map(pageLine);
    return lines.length ? `### ${group.title}\n\n${lines.join("\n")}` : null;
  }).filter(Boolean);
}

export function llmsTxt(entries: CatalogEntry[], offerActive: boolean): string {
  const offers = [
    offerActive && `- ${firstWeekFreeOffer.title}: ${firstWeekFreeOffer.text} ${firstWeekFreeOffer.stillPaid}`,
    `- ${referralOffer.title}: ${referralOffer.text}`,
  ].filter(Boolean);

  const machineList = machineTypes
    .map((machine) => `${machine.title.toLowerCase()} ($${machine.price.toFixed(2)} a week)`)
    .join(", ");

  return `# ${companyName}

> Washer and dryer rental in Toronto and the GTA, Ontario, Canada. $${prices.setText} a week for a washer + dryer set, $${prices.singleText} a week for one machine. Repairs and old-machine haul-away included. A local Toronto business.

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
- No HST is charged: the weekly price is what you pay
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
- Payment by Interac e-Transfer or credit card; card payments go through a payment link sent with the quote
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

A local Toronto business with more than 3 years of hands-on experience installing and fixing washers and dryers. We check each machine before it goes out, connect the water, drain, power and vent, and run a test cycle before we leave.

## Pages

${pageSections(entries).join("\n\n")}
`;
}

export function loader({ context }: LoaderFunctionArgs) {
  const options = catalogOptions(context);
  return new Response(llmsTxt(siteCatalog(options), options.offerActive), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
