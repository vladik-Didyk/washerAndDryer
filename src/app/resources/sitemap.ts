// /sitemap.xml: published pages only; drafts are never listed, even in a preview deployment,
// and neither is the customer sign-in.
// Every page in each of its languages, each URL with the hreflang alternates of the others
// (xhtml:link, as Google reads them) and x-default = the English page.
import type { LoaderFunctionArgs } from "react-router";
import { siteConfig } from "~/shared/config";
import { DEFAULT_LANG, localizePath } from "~/shared/i18n";
import { isoDate } from "~/shared/lib";
import { siteCatalog, type CatalogEntry } from "../catalog";
import { catalogI18n, catalogOptions } from "./context";

const url = (path: string) => `${siteConfig.siteUrl}${path}`;

export function sitemapXml(entries: CatalogEntry[]): string {
  const lastmod = isoDate(siteConfig.lastUpdated);
  const urls = entries
    // Drafts, and the customer sign-in (noindex), are left out.
    .filter((entry) => !entry.draft && entry.kind !== "account")
    .flatMap((entry) => {
      const alternates =
        entry.languages.length > 1
          ? [
              ...entry.languages.map(
                (lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url(localizePath(entry.path, lang))}"/>`,
              ),
              `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(localizePath(entry.path, DEFAULT_LANG))}"/>`,
            ]
          : [];
      return entry.languages.map((lang) =>
        [
          "  <url>",
          `    <loc>${url(localizePath(entry.path, lang))}</loc>`,
          `    <lastmod>${lastmod}</lastmod>`,
          ...alternates,
          "  </url>",
        ].join("\n"),
      );
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
}

export async function loader({ context }: LoaderFunctionArgs) {
  const i18n = await catalogI18n(context);
  return new Response(sitemapXml(siteCatalog(catalogOptions(context), i18n)), {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
