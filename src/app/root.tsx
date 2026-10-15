// The document: <html>, the shared <head> tags, the site frame (./chrome.tsx) and the 404 /
// error page. The root loader decides, once per request, everything the pages share: whether
// the first-week offer still runs (server clock, Toronto dates), which optional pages exist
// (drafts, /account/), the footer year, and the analytics/verification settings.
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLocation,
  useMatches,
  useRouteError,
  useRouteLoaderData,
  type LinksFunction,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "react-router";
import type { ReactNode } from "react";
import { isFirstWeekFreeActive } from "~/entities/offer";
import { NotFoundPage, notFoundHead } from "~/pages/not-found";
import { flagsOf, requestTimeOf } from "~/shared/config";
import { SiteProvider, torontoYear, type SiteState } from "~/shared/lib";
import { headMeta, type PageHead } from "~/shared/seo";
import { optionalPages } from "./catalog";
import { SiteChrome, fontStylesheet, ogImage, type PageChrome } from "./chrome";
import appStylesHref from "./app.css?url";

export function loader({ context }: LoaderFunctionArgs) {
  const flags = flagsOf(context);
  const now = requestTimeOf(context);
  const offerActive = isFirstWeekFreeActive(now);
  const site: SiteState = {
    offerActive,
    year: torontoYear(now),
    stripePortalUrl: flags.stripePortalUrl,
    ...optionalPages({
      previewDrafts: flags.previewDrafts,
      stripePortalUrl: flags.stripePortalUrl,
      offerActive,
      analyticsOn: Boolean(flags.analyticsToken),
    }),
  };
  return {
    site,
    analyticsToken: flags.analyticsToken,
    googleVerification: flags.googleVerification,
    bingVerification: flags.bingVerification,
  };
}

type RootData = ReturnType<typeof loader>;

export const links: LinksFunction = () => [
  { rel: "icon", type: "image/png", href: "/favicon.png" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: fontStylesheet },
  { rel: "stylesheet", href: appStylesHref },
];

// Only shown for errors: every page has its own meta. A 404 gets the "Page not found" head.
export const meta: MetaFunction = ({ error }) => {
  if (!error || (isRouteErrorResponse(error) && error.status === 404)) return headMeta(notFoundHead());
  return [{ title: "Something went wrong | GTA Washer & Dryer Rentals" }, { name: "robots", content: "noindex" }];
};

interface LeafData {
  head?: PageHead;
  chrome?: PageChrome;
}

function useLeafData(): LeafData {
  const matches = useMatches();
  return (matches.at(-1)?.data ?? {}) as LeafData;
}

export function Layout({ children }: { children: ReactNode }) {
  const root = useRouteLoaderData<RootData>("root");
  const { head } = useLeafData();
  return (
    <html lang={head?.lang ?? "en"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <meta name="theme-color" content="#FAF8F2" />
        <meta property="og:site_name" content="GTA Washer &amp; Dryer Rentals" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="GTA Washer & Dryer Rentals: washer and dryer rental in Toronto and the GTA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImage} />
        {root?.googleVerification && <meta name="google-site-verification" content={root.googleVerification} />}
        {root?.bingVerification && <meta name="msvalidate.01" content={root.bingVerification} />}
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {/* Cloudflare Web Analytics: cookie-free visit counts, only once a token is set. */}
        {root?.analyticsToken && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: root.analyticsToken })}
          />
        )}
      </body>
    </html>
  );
}

function Frame({ children }: { children: ReactNode }) {
  const root = useRouteLoaderData<RootData>("root");
  const { head, chrome } = useLeafData();
  const location = useLocation();
  return (
    <SiteProvider value={root?.site ?? { offerActive: false, year: 2026, optionalPages: {}, draftPages: [], stripePortalUrl: null }}>
      <SiteChrome head={head} chrome={chrome} currentPath={location.pathname}>
        {children}
      </SiteChrome>
    </SiteProvider>
  );
}

export default function App() {
  return (
    <Frame>
      <Outlet />
    </Frame>
  );
}

// Unknown URLs (and drafts or /account/ where they don't exist) render the 404 page with the
// status 404; anything else is a short error page with the phone number.
export function ErrorBoundary() {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  if (!notFound) console.error(error);
  return (
    <Frame>
      {notFound ? (
        <NotFoundPage />
      ) : (
        <section aria-labelledby="hero-title" className="section">
          <div className="container-page max-w-3xl">
            <h1 id="hero-title" className="h2">
              Something went wrong
            </h1>
            <p className="lead mt-4">
              Please try again, or call or text <a href="tel:+14379076955" className="text-link">(437) 907-6955</a>.
            </p>
          </div>
        </section>
      )}
    </Frame>
  );
}
