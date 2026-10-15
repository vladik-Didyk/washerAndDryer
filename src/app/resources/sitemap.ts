// /sitemap.xml: published pages only; drafts are never listed, even in a preview deployment.
import type { LoaderFunctionArgs } from "react-router";
import { siteConfig } from "~/shared/config";
import { siteCatalog, type CatalogEntry } from "../catalog";
import { catalogOptions } from "./context";

export function sitemapXml(entries: CatalogEntry[]): string {
  const urls = entries
    .filter((entry) => !entry.draft)
    .map(
      (entry) =>
        `  <url>\n    <loc>${siteConfig.siteUrl}${entry.path}</loc>\n    <lastmod>${siteConfig.lastUpdated}</lastmod>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function loader({ context }: LoaderFunctionArgs) {
  return new Response(sitemapXml(siteCatalog(catalogOptions(context))), {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
