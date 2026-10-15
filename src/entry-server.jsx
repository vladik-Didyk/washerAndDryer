// Server entry for the prerender (scripts/prerender.mjs): renders one route to HTML.
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { findRoute, notFoundRoute, routes } from "./content/routes";
import { renderHead, sitemapXml } from "./seo/head";
import { llmsTxt } from "./seo/llms";
import { includeDrafts } from "./content/drafts";
import { draftMarkers } from "./content/draftMarkers";

export { routes, notFoundRoute, sitemapXml, llmsTxt, includeDrafts, draftMarkers };

export function render(url) {
  const route = findRoute(url);
  const html = renderToString(
    <StrictMode>
      <App path={url} />
    </StrictMode>,
  );
  return { html, head: renderHead(route), lang: route.lang };
}
