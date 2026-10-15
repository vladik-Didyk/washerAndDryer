// The text of /llms.txt (./llms.ts), a plain-text fact sheet for AI assistants. Server only.
// The words are in shared/i18n (locales/en.server.ts llms), the facts come from shared/config
// and the entities, and the page list comes from the catalog, so it never lists a page this
// deployment doesn't have. Drafts appear only in preview deployments, marked as drafts.
import { getMachineTypes } from "~/entities/machine";
import { activePromotions, getPrice, promotionText } from "~/entities/offer";
import { siteConfig } from "~/shared/config";
import { DEFAULT_LANG, LANGUAGES, type I18n } from "~/shared/i18n";
import { serverText } from "~/shared/i18n/index.server";
import type { CatalogEntry } from "../catalog";

const { siteUrl, facebook } = siteConfig;
const absolute = (path: string) => `${siteUrl}${path}`;

const PAGE_GROUPS: Array<{ title: keyof ReturnType<typeof serverText>["llms"]["groups"]; kinds: string[] }> = [
  {
    title: "main",
    kinds: ["home", "machines", "areas", "landlords", "landlord-quote", "faq", "about", "contact", "repair", "start", "account"],
  },
  { title: "machines", kinds: ["machine"] },
  { title: "areas", kinds: ["city", "district"] },
  { title: "guides", kinds: ["guides", "guide"] },
  { title: "policies", kinds: ["privacy", "terms"] },
];

// `now` decides the prices and the running promotions (the request time).
export function llmsTxt(entries: CatalogEntry[], i18n: I18n, now: number): string {
  const { llms } = serverText(i18n);
  const { d, format, money } = i18n;

  const pageLine = (entry: CatalogEntry) =>
    format(llms.pageLine, {
      name: entry.name,
      url: absolute(entry.path),
      note: entry.llmsNote ? format(llms.pageNote, { note: entry.llmsNote }) : "",
      draft: entry.draft ? llms.draft : "",
    });

  const group = (title: keyof typeof llms.groups, lines: string[]) =>
    lines.length ? `${format(llms.groupHeading, { title: llms.groups[title] })}\n\n${lines.join("\n")}` : null;
  const pages = [
    ...PAGE_GROUPS.map(({ title, kinds }) =>
      group(title, entries.filter((entry) => kinds.includes(entry.kind)).map(pageLine)),
    ),
    // Every page is in each language too (/es/faq/, ...); the list links their home pages.
    group(
      "languages",
      LANGUAGES.filter((language) => language.code !== DEFAULT_LANG).map((language) =>
        format(llms.pageLine, { name: language.name, url: absolute(language.path), note: "", draft: "" }),
      ),
    ),
  ].filter(Boolean);

  const offers = [
    ...activePromotions(now).map((promotion) => format(llms.offerLine, promotionText(promotion, i18n))),
    format(llms.referralLine, d.offers.referral),
  ];

  const machineList = getMachineTypes(d)
    .map((machine) =>
      format(llms.machineItem, { name: machine.title.toLowerCase(), price: money(getPrice(machine.item, now).current) }),
    )
    .join(", ");

  return format(llms.body, {
    siteUrl,
    facebook,
    offers: offers.join("\n"),
    machineList,
    hookups: d.common.hookups.map((item) => format(llms.listItem, { item })).join("\n"),
    pages: pages.join("\n\n"),
  });
}
