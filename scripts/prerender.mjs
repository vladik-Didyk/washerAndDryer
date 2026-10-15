// Runs after `vite build` (client, into dist/) and `vite build --ssr` (into dist-ssr/).
// Writes dist/<route>/index.html for every route with the rendered page and its <head> tags,
// plus dist/404.html, dist/sitemap.xml and dist/llms.txt, then removes dist-ssr/.
//
// The build stops if a page breaks one of these rules:
//   - title at most 60 characters, description at most 155, both unique across pages
//   - exactly one <h1> per page, and every JSON-LD block parses
//   - every internal link points to a page or file in this build, and every #anchor exists
//   - a normal (non-preview) build has no draft pages and no draft text in its JS bundle
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const template = await fs.readFile(path.join(dist, "index.html"), "utf8");
for (const marker of ["<!--app-head-->", "<!--app-html-->", '<html lang="en">']) {
  if (!template.includes(marker)) throw new Error(`index.html is missing ${marker}`);
}

const {
  render,
  routes,
  notFoundRoute,
  sitemapXml,
  llmsTxt,
  includeDrafts,
  draftMarkers = [],
} = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

const problems = [];

// Search results cut titles at about 60 characters and descriptions at about 155.
for (const route of [...routes, notFoundRoute]) {
  if (route.metaTitle.length > 60) problems.push(`${route.path} title is ${route.metaTitle.length} chars`);
  if (route.metaDescription.length > 155)
    problems.push(`${route.path} description is ${route.metaDescription.length} chars`);
}
for (const field of ["metaTitle", "metaDescription"]) {
  const seen = new Map();
  for (const route of routes) {
    if (seen.has(route[field])) problems.push(`${seen.get(route[field])} and ${route.path} share a ${field}`);
    seen.set(route[field], route.path);
  }
}
if (!includeDrafts) {
  for (const route of routes.filter((route) => route.draft)) {
    problems.push(`${route.path} is a draft but this is not a preview build`);
  }
}

function page(url) {
  const { html, head, lang } = render(url);
  return template
    .replace('<html lang="en">', `<html lang="${lang}">`)
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", html);
}

const pages = new Map(routes.map((route) => [route.path, page(route.path)]));
const notFoundHtml = page(notFoundRoute.path);
const allPages = [...pages, ["/404.html", notFoundHtml]];

for (const [pagePath, html] of allPages) {
  const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1Count !== 1) problems.push(`${pagePath} has ${h1Count} <h1> elements`);
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      JSON.parse(json);
    } catch (error) {
      problems.push(`${pagePath} has JSON-LD that doesn't parse: ${error.message}`);
    }
  }
}

// Internal links: "/path/", "/path/#id" or "#id" must reach a page (or a file in dist/) and,
// with a #, an element with that id. Catches links to drafts left out of the build.
const idsOf = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
const pageIds = new Map(allPages.map(([pagePath, html]) => [pagePath, idsOf(html)]));
async function fileExists(urlPath) {
  try {
    return (await fs.stat(path.join(dist, decodeURIComponent(urlPath)))).isFile();
  } catch {
    return false;
  }
}
for (const [pagePath, html] of allPages) {
  const hrefs = new Set([...html.matchAll(/\shref="([^"]*)"/g)].map((match) => match[1]));
  for (const href of hrefs) {
    if (!href.startsWith("/") && !href.startsWith("#")) continue; // external, tel:, sms:
    if (href.startsWith("//")) continue;
    const [target, hash] = href.split("#");
    const targetPage = target === "" ? pagePath : target.split("?")[0];
    if (pageIds.has(targetPage)) {
      if (hash && !pageIds.get(targetPage).has(hash)) {
        problems.push(`${pagePath} links to ${href}, but ${targetPage} has no id="${hash}"`);
      }
    } else if (!(await fileExists(targetPage))) {
      problems.push(`${pagePath} links to ${href}, which is not in this build`);
    }
  }
}

// A normal build must not carry a draft's text in the browser bundle (src/content/drafts.js).
if (!includeDrafts && draftMarkers.length) {
  const assetsDir = path.join(dist, "assets");
  const scripts = (await fs.readdir(assetsDir)).filter((name) => name.endsWith(".js"));
  const bundle = (
    await Promise.all(scripts.map((name) => fs.readFile(path.join(assetsDir, name), "utf8")))
  ).join("\n");
  // The bundler may write non-ASCII characters as \uXXXX escapes, so look for both forms.
  const escaped = (text) =>
    JSON.stringify(text)
      .slice(1, -1)
      .replace(/[\u007f-\uffff]/g, (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`);
  for (const { path: draftPath, text } of draftMarkers) {
    if (bundle.includes(text) || bundle.includes(escaped(text))) {
      problems.push(`the JS bundle contains text from the draft ${draftPath}`);
    }
  }
}

if (problems.length) throw new Error(`Prerender checks failed:\n  ${problems.join("\n  ")}`);

const written = [];
for (const [routePath, html] of pages) {
  const file = path.join(dist, routePath, "index.html");
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, html);
  const isDraft = routes.find((route) => route.path === routePath).draft;
  written.push(`${path.relative(root, file)}${isDraft ? "  [draft]" : ""}`);
}

// GitHub Pages serves 404.html for any unknown path; the client renders the same page there.
await fs.writeFile(path.join(dist, "404.html"), notFoundHtml);
written.push("dist/404.html");

await fs.writeFile(path.join(dist, "sitemap.xml"), sitemapXml());
written.push("dist/sitemap.xml");

await fs.writeFile(path.join(dist, "llms.txt"), llmsTxt());
written.push("dist/llms.txt");

await fs.rm(ssrDir, { recursive: true, force: true });
const drafts = routes.filter((route) => route.draft).length;
console.log(
  `Prerendered ${written.length} files (${includeDrafts ? `preview build, ${drafts} drafts included` : "production build, drafts left out"}):\n  ${written.join("\n  ")}`,
);
