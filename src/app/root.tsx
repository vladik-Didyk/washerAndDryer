// The document: <html>, the shared <head> tags, the site frame (./chrome.tsx) and the 404 /
// error page. The root loader decides, once per request, everything the pages share: the
// language (from the URL) and the facts its text needs (prices and promotions at the request
// time, entities/offer), which optional pages exist (drafts, /account/), the footer year, and
// the analytics/verification settings.
// The dictionary itself is not sent: the browser loads the same language before hydrating
// (./entry.client.tsx), from <html lang>.
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
import { offerFacts } from "~/entities/offer";
import { NotFoundPage, notFoundHead } from "~/pages/not-found";
import { flagsOf, requestTimeOf, siteConfig } from "~/shared/config";
import {
  DEFAULT_LANG,
  I18nProvider,
  createI18n,
  isDictionaryLoaded,
  langFromPath,
  loadAllDictionaries,
  type Facts,
  type I18n,
  type Lang,
} from "~/shared/i18n";
import { SiteProvider, torontoYear, type SiteState } from "~/shared/lib";
import { headMeta, type PageHead } from "~/shared/seo";
import { Container, Heading, Section } from "~/shared/ui";
import { optionalPages } from "./catalog";
import { SiteChrome, fontStylesheet, ogImage, type PageChrome } from "./chrome";
import appStylesHref from "./app.css?url";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const flags = flagsOf(context);
  const now = requestTimeOf(context);
  const lang = langFromPath(new URL(request.url).pathname);
  // Every language: the catalog of pages below lists them all (and the server keeps them).
  await loadAllDictionaries();
  const facts = offerFacts(now);
  const site: SiteState = {
    now,
    year: torontoYear(now),
    stripePortalUrl: flags.stripePortalUrl,
    ...optionalPages(
      {
        previewDrafts: flags.previewDrafts,
        stripePortalUrl: flags.stripePortalUrl,
        now,
        analyticsOn: Boolean(flags.analyticsToken),
      },
      createI18n(DEFAULT_LANG, facts),
    ),
  };
  return {
    lang,
    // Small: prices, dates and the like. The words come from the dictionary.
    facts,
    site,
    analyticsToken: flags.analyticsToken,
    googleVerification: flags.googleVerification,
    bingVerification: flags.bingVerification,
  };
}

type RootData = Awaited<ReturnType<typeof loader>>;

// The text of this page: the root loader's language and facts (same on server and browser).
function i18nOf(root: { lang: Lang; facts: Facts } | undefined): I18n {
  const lang = root && isDictionaryLoaded(root.lang) ? root.lang : DEFAULT_LANG;
  return createI18n(lang, root?.facts ?? offerFacts(Date.now()));
}

export const links: LinksFunction = () => [
  { rel: "icon", type: "image/png", href: "/favicon.png" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: fontStylesheet },
  { rel: "stylesheet", href: appStylesHref },
];

// Only shown for errors: every page has its own meta. A 404 gets the "Page not found" head.
export const meta: MetaFunction<typeof loader> = ({ error, data }) => {
  const i18n = i18nOf(data);
  if (!error || (isRouteErrorResponse(error) && error.status === 404)) return headMeta(notFoundHead(i18n));
  return [{ title: i18n.d.pages.error.title }, { name: "robots", content: "noindex" }];
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
  const i18n = i18nOf(root);
  return (
    <html lang={i18n.lang} dir={i18n.language.dir === "rtl" ? "rtl" : undefined}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <meta name="theme-color" content="#FFFBF5" />
        <meta property="og:site_name" content={siteConfig.companyName} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={i18n.d.chrome.ogImageAlt} />
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
  const site = root?.site ?? {
    now: Date.now(),
    year: torontoYear(Date.now()),
    optionalPages: {},
    draftPages: [],
    stripePortalUrl: null,
  };
  return (
    <I18nProvider value={i18nOf(root)}>
      <SiteProvider value={site}>
        <SiteChrome head={head} chrome={chrome} currentPath={location.pathname}>
          {children}
        </SiteChrome>
      </SiteProvider>
    </I18nProvider>
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
  return <Frame>{notFound ? <NotFoundPage /> : <ErrorMessage />}</Frame>;
}

function ErrorMessage() {
  const root = useRouteLoaderData<RootData>("root");
  const { d, rich } = i18nOf(root);
  const { phone } = siteConfig;
  return (
    <Section aria-labelledby="hero-title" nest={false}>
      <Container className="max-w-3xl">
        <Heading id="hero-title">{d.error.title}</Heading>
        <p className="lead mt-4">
          {rich(d.error.text, {
            phoneLink: (
              <a href={phone.tel} className="text-link">
                {phone.display}
              </a>
            ),
          })}
        </p>
      </Container>
    </Section>
  );
}
