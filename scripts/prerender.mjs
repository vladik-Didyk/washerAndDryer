// Runs after `vite build` (client, into dist/) and `vite build --ssr` (into dist-ssr/).
// Writes dist/<route>/index.html for every route with the rendered page and its <head> tags,
// plus dist/404.html and dist/sitemap.xml, then removes dist-ssr/.
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

const { render, routes, notFoundRoute, sitemapXml } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

// Search results cut titles at about 60 characters and descriptions at about 155.
const problems = [];
for (const route of [...routes, notFoundRoute]) {
  if (route.metaTitle.length > 60) problems.push(`${route.path} title is ${route.metaTitle.length} chars`);
  if (route.metaDescription.length > 155)
    problems.push(`${route.path} description is ${route.metaDescription.length} chars`);
}
const titles = routes.map((route) => route.metaTitle);
if (new Set(titles).size !== titles.length) problems.push("two routes share a title");
if (problems.length) throw new Error(`Head text too long or duplicated:\n  ${problems.join("\n  ")}`);

function page(url) {
  const { html, head, lang } = render(url);
  return template
    .replace('<html lang="en">', `<html lang="${lang}">`)
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", html);
}

const written = [];
for (const route of routes) {
  const file = path.join(dist, route.path, "index.html");
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, page(route.path));
  written.push(path.relative(root, file));
}

// GitHub Pages serves 404.html for any unknown path; the client renders the same page there.
await fs.writeFile(path.join(dist, "404.html"), page(notFoundRoute.path));
written.push("dist/404.html");

await fs.writeFile(path.join(dist, "sitemap.xml"), sitemapXml());
written.push("dist/sitemap.xml");

await fs.rm(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${written.length} files:\n  ${written.join("\n  ")}`);
