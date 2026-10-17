// Page URLs end with a slash; files, data requests and (under `pnpm dev`) the dev server's own
// URLs are left alone.
import { describe, expect, it } from "vitest";
import { canonicalRedirect } from "./canonical";

const ORIGIN = "http://localhost:8790";
const target = (path: string, dev: boolean) =>
  canonicalRedirect(new URL(path, ORIGIN), dev)?.headers.get("Location") ?? null;

describe("canonicalRedirect", () => {
  it("adds the slash to a page URL, keeping the query", () => {
    expect(target("/toronto", false)).toBe(`${ORIGIN}/toronto/`);
    expect(target("/fr/toronto?x=1", false)).toBe(`${ORIGIN}/fr/toronto/?x=1`);
    expect(canonicalRedirect(new URL("/toronto", ORIGIN), false)?.status).toBe(301);
  });

  it("drops index.html", () => {
    expect(target("/x/index.html", false)).toBe(`${ORIGIN}/x/`);
    expect(target("/index.html", false)).toBe(`${ORIGIN}/`);
  });

  it("leaves pages with a slash, files and data requests alone", () => {
    for (const path of ["/", "/toronto/", "/sitemap.xml", "/toronto/_.data", "/assets/root-abc.js"]) {
      expect(target(path, false)).toBeNull();
    }
  });

  const devServerPaths = [
    "/@vite/client",
    "/@id/__x00__virtual:react-router/browser-manifest",
    "/@id/__x00__virtual:react-router/hmr-runtime",
    "/@react-refresh",
    "/node_modules/.vite/deps/react-dom_client",
    "/__manifest",
  ];

  it("leaves the dev server's URLs alone under pnpm dev", () => {
    for (const path of devServerPaths) expect(target(path, true)).toBeNull();
    expect(target("/toronto", true)).toBe(`${ORIGIN}/toronto/`);
    expect(target("/x/index.html", true)).toBe(`${ORIGIN}/x/`);
  });

  it("still redirects those URLs in production, where they don't exist", () => {
    expect(target("/@vite/client", false)).toBe(`${ORIGIN}/@vite/client/`);
  });
});
