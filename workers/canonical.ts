// Under `pnpm dev`, the Vite dev server's own URLs reach the Worker too: "/@vite/client",
// "/@id/__x00__virtual:react-router/browser-manifest", "/node_modules/.vite/deps/…",
// "/__manifest". Redirecting them to a trailing slash breaks them, and the page never hydrates.
// They don't exist in a build, so production keeps redirecting everything.
const DEV_SERVER_PREFIXES = ["/@", "/node_modules/", "/__"];

// Every page URL ends with a slash, as on the old static site: "/toronto" and
// "/toronto/index.html" redirect to "/toronto/". Files (a dot in the last segment) and
// React Router data requests are left alone.
export function canonicalRedirect(url: URL, dev = import.meta.env.DEV): Response | null {
  const { pathname } = url;
  if (dev && DEV_SERVER_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null;
  let target: string | null = null;
  if (pathname.endsWith("/index.html")) target = pathname.slice(0, -"index.html".length);
  else if (!pathname.endsWith("/") && !pathname.split("/").at(-1)?.includes(".")) {
    target = `${pathname}/`;
  }
  if (!target) return null;
  return Response.redirect(`${url.origin}${target}${url.search}`, 301);
}
