// Renders each request to HTML on the Worker (the Cloudflare template's entry, unchanged in
// spirit): the shell streams, and crawlers get the complete page at once.
import type { AppLoadContext, EntryContext, HandleErrorFunction } from "react-router";
import { ServerRouter, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { loadAllDictionaries } from "~/shared/i18n";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  _loadContext: AppLoadContext,
) {
  // The dictionaries, here and not only in the root loader: a POST to a page without a form
  // runs no loader at all, and its 405 page still needs the words.
  await loadAllDictionaries();
  let shellRendered = false;
  const userAgent = request.headers.get("user-agent");

  const body = await renderToReadableStream(<ServerRouter context={routerContext} url={request.url} />, {
    onError(error: unknown) {
      responseStatusCode = 500;
      // Errors inside the shell are logged here; shell errors reject and are logged by React Router.
      if (shellRendered) console.error(error);
    },
  });
  shellRendered = true;

  // Crawlers (and SPA mode) wait for all content, so they read the finished HTML.
  if ((userAgent && isbot(userAgent)) || routerContext.isSpaMode) {
    await body.allReady;
  }

  responseHeaders.set("Content-Type", "text/html; charset=utf-8");
  return new Response(body, { headers: responseHeaders, status: responseStatusCode });
}

// What React Router logs. A 4xx is a request the site can't serve (a bot posting to
// /wp-json/..., an unknown URL), answered by its page: not logged. Real errors are, as before.
export const handleError: HandleErrorFunction = (error, { request }) => {
  if (request.signal.aborted || (isRouteErrorResponse(error) && error.status < 500)) return;
  // A 405 or 500 React Router made itself carries the original error inside.
  console.error(isRouteErrorResponse(error) && "error" in error && error.error ? error.error : error);
};
