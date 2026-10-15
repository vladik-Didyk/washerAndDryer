// Per-page <head> tags: title, description, canonical, Open Graph, hreflang, robots and
// JSON-LD. Pages build a PageHead in their loader (pageHead) and export `meta = seoMeta`.
import type { MetaDescriptor } from "react-router";
import { siteConfig } from "../config/site";
import { photoFiles } from "../lib/photos";
import { breadcrumbList } from "./json-ld";
import type { Crumb, JsonLd, Lang, PageHead, PageKind, Preload } from "./types";

export const absoluteUrl = (path: string) => `${siteConfig.siteUrl}${path}`;

// The home page and the Spanish and Russian pages are language versions of each other.
export const languageAlternates = [
  { lang: "en", path: "/" },
  ...siteConfig.languageLinks.map((link) => ({ lang: link.lang, path: link.href })),
];

export interface PageHeadInput {
  path: string;
  kind: PageKind;
  title: string;
  description: string;
  lang?: Lang;
  draft?: boolean;
  noindex?: boolean;
  breadcrumbs?: Crumb[];
  ogType?: "website" | "article";
  ogLocale?: string;
  jsonLd?: JsonLd[];
  preloads?: Array<Preload | null>;
}

// The page's own JSON-LD nodes, then its BreadcrumbList (every inner page has one).
export function pageHead(input: PageHeadInput): PageHead {
  const breadcrumbs = input.breadcrumbs ?? null;
  return {
    path: input.path,
    kind: input.kind,
    lang: input.lang ?? "en",
    title: input.title,
    description: input.description,
    draft: input.draft ?? false,
    // Drafts and the 404 page stay out of search results.
    noindex: Boolean(input.noindex || input.draft || input.kind === "not-found"),
    breadcrumbs,
    ogType: input.ogType ?? "website",
    ogLocale: input.ogLocale ?? "en_CA",
    alternates: languageAlternates.some((alt) => alt.path === input.path) ? languageAlternates : [],
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
    tags.push({ tagName: "link", rel: "alternate", hrefLang: "x-default", href: `${siteConfig.siteUrl}/` });
  }
  for (const data of head.jsonLd) tags.push({ "script:ld+json": data });
  return tags;
}

// The route `meta` export of every page: its loader returns { head }.
export const seoMeta = ({ data }: { data?: unknown }): MetaDescriptor[] => {
  const head = (data as { head?: PageHead } | undefined)?.head;
  return head ? headMeta(head) : [];
};
