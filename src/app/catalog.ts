// Every page this deployment has, in site order: the source for sitemap.xml, llms.txt, the
// root's list of optional pages, and the page tests. Built per request because some pages
// depend on the environment (drafts with PREVIEW_DRAFTS=1, /account/ with STRIPE_PORTAL_URL)
// and on the date (the first-week offer). One entry per page, by its English path and
// text; `languages` are the versions it has (every language, the policies English only).
import { cityPath, districtPath, getCities, getDistricts } from "~/entities/area";
import { allGuides, guidePath, guideSlugs } from "~/entities/guide/index.server";
import { getMachineTypes, machinePath } from "~/entities/machine";
import { visibleLegalPages } from "~/pages/legal/index.server";
import { englishOnlyPaths, pagePaths, type FixedPage } from "~/shared/config";
import { LANGUAGES, isEnglishOnly, type I18n, type Lang } from "~/shared/i18n";
import type { PageKind } from "~/shared/seo";

export interface CatalogEntry {
  path: string;
  kind: PageKind;
  /** The languages this page exists in (src/app/routes.ts). */
  languages: Lang[];
  /** Breadcrumb / llms.txt name. */
  name: string;
  title: string;
  description: string;
  llmsNote?: string;
  draft: boolean;
}

type Entry = Omit<CatalogEntry, "languages">;

export interface CatalogOptions {
  previewDrafts: boolean;
  stripePortalUrl: string | null;
  /** The request time (offers). */
  now: number;
  analyticsOn: boolean;
}

const ALL_LANGUAGES: Lang[] = LANGUAGES.map((language) => language.code);
const languagesOf = (path: string): Lang[] => (isEnglishOnly(path) ? ["en"] : ALL_LANGUAGES);

// `i18n` is the English text of this request (its prices and offers filled in).
export function siteCatalog(options: CatalogOptions, i18n: I18n): CatalogEntry[] {
  return buildCatalog(options, i18n).map((entry) => ({ ...entry, languages: languagesOf(entry.path) }));
}

function buildCatalog(options: CatalogOptions, i18n: I18n): Entry[] {
  const { d } = i18n;
  const fixed = (page: Exclude<FixedPage, "notFound" | "guides">, kind: PageKind): Entry => {
    const text: { name: string; title: string; description: string; llmsNote?: string } = d.pages[page];
    return {
      path: pagePaths[page],
      kind,
      name: text.name,
      title: text.title,
      description: text.description,
      llmsNote: text.llmsNote,
      draft: false,
    };
  };
  const guides = allGuides(i18n).filter((guide) => options.previewDrafts || !guide.draft);
  const legal = visibleLegalPages(
    i18n,
    { now: options.now, analyticsOn: options.analyticsOn },
    options.previewDrafts,
  );
  const districts = getDistricts(d);

  return [
    fixed("home", "home"),
    fixed("areas", "areas"),
    // Each city, with Toronto's districts right after Toronto.
    ...getCities(d).flatMap((city): Entry[] => [
      { path: cityPath(city), kind: "city", name: city.name, title: city.metaTitle, description: city.metaDescription, draft: false },
      ...(city.slug === "toronto"
        ? districts.map((district): Entry => ({
            path: districtPath(district),
            kind: "district",
                  name: district.name,
            title: district.metaTitle,
            description: district.metaDescription,
            draft: false,
          }))
        : []),
    ]),
    fixed("machines", "machines"),
    ...getMachineTypes(d).map((machine): Entry => ({
      path: machinePath(machine),
      kind: "machine",
      name: machine.title,
      title: machine.page.metaTitle,
      description: machine.page.metaDescription,
      draft: false,
    })),
    fixed("landlords", "landlords"),
    fixed("landlordQuote", "landlord-quote"),
    fixed("faq", "faq"),
    fixed("about", "about"),
    fixed("contact", "contact"),
    fixed("repair", "repair"),
    fixed("start", "start"),
    ...(options.stripePortalUrl ? [fixed("account", "account")] : []),
    // The guides list exists once a guide is shown; it is a draft while every guide is one.
    ...(guides.length
      ? [
          {
            path: pagePaths.guides,
            kind: "guides" as const,
            name: d.pages.guides.name,
            title: d.pages.guides.title,
            description: d.pages.guides.description,
            llmsNote: d.pages.guides.llmsNote,
            draft: guides.every((guide) => guide.draft),
          },
        ]
      : []),
    ...guides.map((guide): Entry => ({
      path: guidePath(guide),
      kind: "guide",
      name: guide.title,
      title: guide.metaTitle,
      description: guide.metaDescription,
      draft: guide.draft,
    })),
    ...legal.map((page): Entry => ({
      path: page.path,
      kind: page.kind,
      name: page.title,
      title: page.metaTitle,
      description: page.metaDescription,
      draft: page.draft,
    })),
  ];
}

// Pages that exist only in some deployments, and whether this one has them: the header,
// footer and in-text links check this before linking (shared/lib useSite).
export function optionalPages(options: CatalogOptions, i18n: I18n) {
  const catalog = siteCatalog(options, i18n);
  const present = new Set(catalog.map((entry) => entry.path));
  const candidates = [
    pagePaths.account,
    pagePaths.guides,
    ...guideSlugs.map((slug) => guidePath({ slug })),
    ...englishOnlyPaths,
  ];
  return {
    optionalPages: Object.fromEntries(candidates.map((path) => [path, present.has(path)])),
    draftPages: catalog.filter((entry) => entry.draft).map((entry) => entry.path),
  };
}
