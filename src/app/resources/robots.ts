// /robots.txt: everything may be crawled; the sitemap lists the pages.
import { siteConfig } from "~/shared/config";

export const robotsTxt = () => `User-agent: *\nAllow: /\n\nSitemap: ${siteConfig.siteUrl}/sitemap.xml\n`;

export function loader() {
  return new Response(robotsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
