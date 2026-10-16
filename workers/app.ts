import { createRequestHandler } from "react-router";
import type { SiteEnv } from "../src/shared/config/env";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: SiteEnv;
      ctx: ExecutionContext;
    };
    // One clock per request: the root and every loader decide the same way whether a
    // time-limited offer still runs.
    requestTime: number;
  }
}

// Loaded up front (top-level await), not on the first request: the app is evaluated while the
// Worker starts, which doesn't count toward a request's 10 ms of CPU (loading it lazily made
// the first request after a cold start fail). It stays a dynamic import: React Router builds
// it as its own chunk.
const serverBuild = await import("virtual:react-router/server-build");

const requestHandler = createRequestHandler(serverBuild, import.meta.env.MODE);

// Every page URL ends with a slash, as on the old static site: "/toronto" and
// "/toronto/index.html" redirect to "/toronto/". Files (a dot in the last segment) and
// React Router data requests are left alone.
function canonicalRedirect(url: URL): Response | null {
  const { pathname } = url;
  let target: string | null = null;
  if (pathname.endsWith("/index.html")) target = pathname.slice(0, -"index.html".length);
  else if (!pathname.endsWith("/") && !pathname.split("/").at(-1)?.includes(".")) {
    target = `${pathname}/`;
  }
  if (!target) return null;
  return Response.redirect(`${url.origin}${target}${url.search}`, 301);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // www.washerrent.com -> washerrent.com, same path (every method: forms post to the apex).
    if (url.hostname === "www.washerrent.com") {
      return Response.redirect(`https://washerrent.com${url.pathname}${url.search}`, 301);
    }
    if (request.method === "GET" || request.method === "HEAD") {
      const redirect = canonicalRedirect(url);
      if (redirect) return redirect;
      // A page built ahead of time (react-router.config.ts), or its _.data: served as a file,
      // without rendering. Anything else (the rental request, unknown URLs) renders below.
      const asset = await env.ASSETS.fetch(request);
      if (asset.status !== 404) return asset;
    }
    return requestHandler(request, {
      cloudflare: { env: env as SiteEnv, ctx },
      requestTime: Date.now(),
    });
  },
} satisfies ExportedHandler<Env>;
