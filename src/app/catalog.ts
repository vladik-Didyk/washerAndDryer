// Every page this deployment has, in site order: the source for sitemap.xml, llms.txt, the
// root's list of optional pages, and the page tests. Built per request because some pages
// depend on the environment (drafts with PREVIEW_DRAFTS=1, /account/ with STRIPE_PORTAL_URL)
// and on the date (the first-week offer).
import { cities, cityPath, districtPath, districts } from "~/entities/area";
import { allGuides, guidePath, guidesIndex } from "~/entities/guide/index.server";
import { machinePath, machineTypes } from "~/entities/machine";
import { visibleLegalPages } from "~/pages/legal/index.server";
import { languagePages } from "~/pages/language/index.server";
import {
  aboutPage,
  accountPage,
  areasPage,
  contactPage,
  faqPage,
  homePage,
  landlordQuotePage,
  landlordsPage,
  machinesPage,
  repairPage,
  startPage,
} from "~/shared/config";
import type { Lang, PageKind } from "~/shared/seo";

export interface CatalogEntry {
  path: string;
  kind: PageKind;
  lang: Lang;
  /** Breadcrumb / llms.txt name. */
  name: string;
  title: string;
  description: string;
  llmsNote?: string;
  draft: boolean;
}

export interface CatalogOptions {
  previewDrafts: boolean;
  stripePortalUrl: string | null;
  offerActive: boolean;
  analyticsOn: boolean;
}

const fixed = (
  info: { path: string; name: string; metaTitle: string; metaDescription: string; llmsNote?: string },
  kind: PageKind,
): CatalogEntry => ({
  path: info.path,
  kind,
  lang: "en",
  name: info.name,
  title: info.metaTitle,
  description: info.metaDescription,
  llmsNote: info.llmsNote,
  draft: false,
});

export function siteCatalog(options: CatalogOptions): CatalogEntry[] {
  const guides = allGuides.filter((guide) => options.previewDrafts || !guide.draft);
  const legal = visibleLegalPages(
    { offerActive: options.offerActive, analyticsOn: options.analyticsOn },
    options.previewDrafts,
  );

  return [
    fixed(homePage, "home"),
    fixed(areasPage, "areas"),
    // Each city, with Toronto's districts right after Toronto.
    ...cities.flatMap((city): CatalogEntry[] => [
      { path: cityPath(city), kind: "city", lang: "en", name: city.name, title: city.metaTitle, description: city.metaDescription, draft: false },
      ...(city.slug === "toronto"
        ? districts.map((district): CatalogEntry => ({
            path: districtPath(district),
            kind: "district",
            lang: "en",
            name: district.name,
            title: district.metaTitle,
            description: district.metaDescription,
            draft: false,
          }))
        : []),
    ]),
    fixed(machinesPage, "machines"),
    ...machineTypes.map((machine): CatalogEntry => ({
      path: machinePath(machine),
      kind: "machine",
      lang: "en",
      name: machine.title,
      title: machine.page.metaTitle,
      description: machine.page.metaDescription,
      draft: false,
    })),
    fixed(landlordsPage, "landlords"),
    fixed(landlordQuotePage, "landlord-quote"),
    fixed(faqPage, "faq"),
    fixed(aboutPage, "about"),
    fixed(contactPage, "contact"),
    fixed(repairPage, "repair"),
    fixed(startPage, "start"),
    ...(options.stripePortalUrl ? [fixed(accountPage, "account")] : []),
    // The guides list exists once a guide is shown; it is a draft while every guide is one.
    ...(guides.length
      ? [
          {
            ...fixed({ ...guidesIndex, name: "Guides", llmsNote: "practical guides for renting a washer and dryer" }, "guides"),
            draft: guides.every((guide) => guide.draft),
          },
        ]
      : []),
    ...guides.map((guide): CatalogEntry => ({
      path: guidePath(guide),
      kind: "guide",
      lang: "en",
      name: guide.title,
      title: guide.metaTitle,
      description: guide.metaDescription,
      draft: guide.draft,
    })),
    ...legal.map((page): CatalogEntry => ({
      path: page.path,
      kind: page.kind,
      lang: "en",
      name: page.title,
      title: page.metaTitle,
      description: page.metaDescription,
      draft: page.draft,
    })),
    ...languagePages.map((content): CatalogEntry => ({
      path: content.path,
      kind: "language",
      lang: content.lang,
      name: content.languageName,
      title: content.metaTitle,
      description: content.metaDescription,
      draft: false,
    })),
  ];
}

// Pages that exist only in some deployments, and whether this one has them: the header,
// footer and in-text links check this before linking (shared/lib useSite).
export function optionalPages(options: CatalogOptions) {
  const catalog = siteCatalog(options);
  const present = new Set(catalog.map((entry) => entry.path));
  const candidates = [
    accountPage.path,
    guidesIndex.path,
    ...allGuides.map(guidePath),
    "/privacy/",
    "/terms/",
  ];
  return {
    optionalPages: Object.fromEntries(candidates.map((path) => [path, present.has(path)])),
    draftPages: catalog.filter((entry) => entry.draft).map((entry) => entry.path),
  };
}
