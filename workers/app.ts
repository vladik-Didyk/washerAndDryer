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

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

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
    if (request.method === "GET" || request.method === "HEAD") {
      const redirect = canonicalRedirect(url);
      if (redirect) return redirect;
    }
    return requestHandler(request, {
      cloudflare: { env: env as SiteEnv, ctx },
      requestTime: Date.now(),
    });
  },
} satisfies ExportedHandler<Env>;
