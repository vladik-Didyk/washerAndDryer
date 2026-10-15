// /sitemap.xml: published pages only; drafts are never listed, even in a preview deployment.
import type { LoaderFunctionArgs } from "react-router";
import { siteConfig } from "~/shared/config";
import { isoDate } from "~/shared/lib";
import { siteCatalog, type CatalogEntry } from "../catalog";
import { catalogI18n, catalogOptions } from "./context";

export function sitemapXml(entries: CatalogEntry[]): string {
  const lastmod = isoDate(siteConfig.lastUpdated);
  const urls = entries
    .filter((entry) => !entry.draft)
    .map((entry) => `  <url>\n    <loc>${siteConfig.siteUrl}${entry.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export async function loader({ context }: LoaderFunctionArgs) {
  const i18n = await catalogI18n(context);
  return new Response(sitemapXml(siteCatalog(catalogOptions(context), i18n)), {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
