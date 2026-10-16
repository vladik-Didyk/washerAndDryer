// Requests the site can't serve, through React Router's real request handler, as on the
// Worker: bots post to WordPress URLs (/wp-json/..., /?rest_route=...). They get a 404 or 405
// page, never a 500, and nothing is logged. Nothing loads the dictionaries first, as in a
// fresh Worker isolate whose first request is such a POST.
import { createRequestHandler, type ServerBuild } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import * as notFound from "~/pages/not-found/route";
import { post, testContext } from "~/test/context";
import * as entry from "./entry.server";
import * as root from "./root";

// Vitest resolves the stylesheet URL to "", which React warns about.
vi.mock("./app.css?url", () => ({ default: "/app.css" }));

// The home page (no form), the repair page (a form) and the catch-all 404 route.
const pages = {
  home: { path: undefined, index: true, module: await import("~/pages/home") },
  repair: { path: "repair", index: undefined, module: await import("~/pages/repair") },
  "not-found": { path: "*", index: undefined, module: notFound },
};

const routes: ServerBuild["routes"] = {
  root: { id: "root", path: "", module: root as never },
  ...Object.fromEntries(
    Object.entries(pages).map(([id, page]) => [id, { id, parentId: "root", ...page, module: page.module as never }]),
  ),
};

const assetRoute = (id: string, parentId?: string) => ({
  id,
  parentId,
  module: `/${id}.js`,
  hasAction: Boolean((routes[id]?.module as { action?: unknown }).action),
  hasLoader: true,
  hasClientAction: false,
  hasClientLoader: false,
  hasClientMiddleware: false,
  hasErrorBoundary: id === "root",
});

const build = {
  entry: { module: entry },
  routes,
  assets: {
    entry: { module: "/entry.client.js", imports: [] },
    routes: Object.fromEntries(Object.keys(routes).map((id) => [id, assetRoute(id, routes[id]?.parentId)])),
    url: "/manifest.js",
    version: "test",
  },
  publicPath: "/",
  assetsBuildDirectory: "build/client",
  future: {},
  ssr: true,
  isSpaMode: false,
  prerender: [],
  routeDiscovery: { mode: "lazy", manifestPath: "/__manifest" },
} as unknown as ServerBuild;

const handle = createRequestHandler(build, "production");
const request = (url: string, init?: RequestInit) => handle(new Request(`http://localhost${url}`, init), testContext());

const logged = vi.spyOn(console, "error").mockImplementation(() => {});

afterEach(() => {
  logged.mockClear();
});

describe("requests the site can't serve", () => {
  it("answers a POST to an unknown URL with the 404 page", async () => {
    const response = await request("/wp-json/batch/v1", { method: "POST", body: "{}" });
    expect(response.status).toBe(404);
    expect(await response.text()).toContain("<title>Page not found");
    expect(logged).not.toHaveBeenCalled();
  });

  it("answers a POST to a page without a form with a 405", async () => {
    const response = await request("/?rest_route=%2Fbatch%2Fv1", { method: "POST", body: "{}" });
    expect(response.status).toBe(405);
    expect(await response.text()).toContain('<meta name="robots" content="noindex"');
    expect(logged).not.toHaveBeenCalled();
  });

  it("still renders the pages and takes the forms", async () => {
    const home = await request("/");
    expect(home.status).toBe(200);
    expect(await home.text()).toContain('<html lang="en"');
    expect((await request("/nothing-here/")).status).toBe(404);
    // An empty repair form: the action answers with its field errors.
    expect((await handle(post("/repair/", {}), testContext())).status).toBe(400);
    expect(logged).not.toHaveBeenCalled();
  });
});
