import type { Lang } from "../i18n";

export type { Lang };

export interface Crumb {
  name: string;
  path: string;
}

export type PageKind =
  | "home"
  | "areas"
  | "city"
  | "district"
  | "machines"
  | "machine"
  | "landlords"
  | "landlord-quote"
  | "faq"
  | "about"
  | "contact"
  | "repair"
  | "account"
  | "guides"
  | "guide"
  | "privacy"
  | "terms"
  | "language"
  | "start"
  | "not-found";

export type JsonLd = Record<string, unknown>;

// An image to fetch while the browser is still reading the <head> (the photo at the top).
export interface Preload {
  srcSet: string;
  sizes: string;
  type?: string;
  media?: string;
}

// Everything a page's <head> needs, returned by its loader (serializable). Built with
// pageHead() and turned into tags by headMeta().
export interface PageHead {
  path: string;
  kind: PageKind;
  lang: Lang;
  title: string;
  description: string;
  /** A draft page (preview deployments only): ribbon + noindex. */
  draft: boolean;
  noindex: boolean;
  breadcrumbs: Crumb[] | null;
  ogType: "website" | "article";
  ogLocale: string;
  /** hreflang alternates, when the page is one language version of another. */
  alternates: Array<{ lang: string; path: string }>;
  jsonLd: JsonLd[];
  preloads: Preload[];
}
