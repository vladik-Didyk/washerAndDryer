// Per-page <head> tags: title, description, canonical, Open Graph, hreflang, robots and
// JSON-LD. Pages build a PageHead in their loader (pageHead) and export `meta = seoMeta`.
import type { MetaDescriptor } from "react-router";
import { siteConfig } from "../config/site";
import { DEFAULT_LANG, LANGUAGES, isEnglishOnly, localizePath, type I18n } from "../i18n";
import { photoFiles } from "../lib/photos";
import { breadcrumbList } from "./json-ld";
import type { Crumb, JsonLd, PageHead, PageKind, Preload } from "./types";

export const absoluteUrl = (path: string) => `${siteConfig.siteUrl}${path}`;

// The language versions of a page: every page exists in every language (src/app/routes.ts),
// except the English-only policies and the 404 page. `path` is the English path.
export function languageVersions(path: string, kind: PageKind): Array<{ lang: string; path: string }> {
  if (kind === "not-found" || isEnglishOnly(path)) return [];
  return LANGUAGES.map((language) => ({ lang: language.code, path: localizePath(path, language.code) }));
}

export interface PageHeadInput {
  /** The English path ("/faq/"): the page's own language prefix is added here. */
  path: string;
  kind: PageKind;
  title: string;
  description: string;
  draft?: boolean;
  noindex?: boolean;
  /** English paths, like `path`. */
  breadcrumbs?: Crumb[];
  ogType?: "website" | "article";
  jsonLd?: JsonLd[];
  preloads?: Array<Preload | null>;
}

// The page's own JSON-LD nodes, then its BreadcrumbList (every inner page has one). Paths come
// in English and go out in the page's language (`i18n`): canonical, og:url, breadcrumbs,
// hreflang alternates.
export function pageHead(i18n: I18n, input: PageHeadInput): PageHead {
  const breadcrumbs = input.breadcrumbs?.map((crumb) => ({ ...crumb, path: i18n.href(crumb.path) })) ?? null;
  return {
    path: i18n.href(input.path),
    kind: input.kind,
    lang: i18n.lang,
    title: input.title,
    description: input.description,
    draft: input.draft ?? false,
    // Drafts and the 404 page stay out of search results.
    noindex: Boolean(input.noindex || input.draft || input.kind === "not-found"),
    breadcrumbs,
    ogType: input.ogType ?? "website",
    ogLocale: i18n.language.ogLocale,
    alternates: languageVersions(input.path, input.kind),
    jsonLd: [...(input.jsonLd ?? []), ...(breadcrumbs ? [breadcrumbList(breadcrumbs)] : [])],
    preloads: (input.preloads ?? []).filter((preload): preload is Preload => Boolean(preload)),
  };
}

// Preload for the photo at the top of a page, with the same files and `sizes` as its <picture>,
// so the browser fetches it while still reading the <head>. WebP when there is one.
export function photoPreload({ src, sizes, media }: { src: string; sizes: string; media?: string }): Preload | null {
  const files = photoFiles(src);
  if (!files) return null;
  return {
    srcSet: files.webpSrcSet ?? files.jpegSrcSet,
    sizes,
    ...(files.webpSrcSet ? { type: "image/webp" } : {}),
    ...(media ? { media } : {}),
  };
}

export function headMeta(head: PageHead): MetaDescriptor[] {
  const url = absoluteUrl(head.path);
  const tags: MetaDescriptor[] = [
    { title: head.title },
    { name: "description", content: head.description },
    ...head.preloads.map(
      (preload): MetaDescriptor => ({
        tagName: "link",
        rel: "preload",
        as: "image",
        ...(preload.type ? { type: preload.type } : {}),
        imageSrcSet: preload.srcSet,
        imageSizes: preload.sizes,
        ...(preload.media ? { media: preload.media } : {}),
        fetchPriority: "high",
      }),
    ),
  ];
  if (head.kind !== "not-found") {
    tags.push({ tagName: "link", rel: "canonical", href: url });
    tags.push({ property: "og:url", content: url });
  }
  if (head.noindex) tags.push({ name: "robots", content: "noindex" });
  tags.push(
    { property: "og:type", content: head.ogType },
    { property: "og:locale", content: head.ogLocale },
    { property: "og:title", content: head.title },
    { property: "og:description", content: head.description },
    { name: "twitter:title", content: head.title },
    { name: "twitter:description", content: head.description },
  );
  if (head.alternates.length) {
    for (const alt of head.alternates) {
      tags.push({ tagName: "link", rel: "alternate", hrefLang: alt.lang, href: absoluteUrl(alt.path) });
    }
    const english = head.alternates.find((alt) => alt.lang === DEFAULT_LANG);
    if (english) tags.push({ tagName: "link", rel: "alternate", hrefLang: "x-default", href: absoluteUrl(english.path) });
  }
  for (const data of head.jsonLd) tags.push({ "script:ld+json": data });
  return tags;
}

// The route `meta` export of every page: its loader returns { head }.
export const seoMeta = ({ data }: { data?: unknown }): MetaDescriptor[] => {
  const head = (data as { head?: PageHead } | undefined)?.head;
  return head ? headMeta(head) : [];
};
