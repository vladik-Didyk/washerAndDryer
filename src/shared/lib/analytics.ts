// Visit statistics, only with consent: Google Analytics 4, Microsoft Clarity and PostHog,
// adapted from the analytics-stack package (its SSR template). Nothing is loaded and nothing
// is sent until the visitor clicks Accept on the cookie banner (widgets/cookie-consent); the
// choice is kept in localStorage. Each tool runs only when its ID is set in
// siteConfig.analytics. Every function is a no-op on the server, so pages import it freely.
//
// What visitors type stays out: every form, and every element that shows back what a visitor
// entered, carries data-clarity-mask (masked whatever the dashboard setting; the project is
// also set to Strict), PostHog records no sessions, and events carry the page path, never
// form contents.
import { siteConfig } from "../config";

const { ga4Id, clarityId, posthogKey, posthogHost } = siteConfig.analytics;

const CONSENT_KEY = "cookie-consent";

export type Consent = "accepted" | "declined";

type PostHog = typeof import("posthog-js").default;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
    [gaDisable: `ga-disable-${string}`]: boolean;
  }
}

/** At least one tool has an ID: otherwise there is nothing to ask consent for. */
export const analyticsConfigured = Boolean(ga4Id || clarityId || posthogKey);

let initialized = false;
let posthog: PostHog | null = null;

const inBrowser = () => typeof window !== "undefined";

// localStorage can throw (private windows, blocked storage): then there is no consent.
export function consentChoice(): Consent | null {
  if (!inBrowser()) return null;
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

export const hasConsented = () => consentChoice() === "accepted";

/** The event that shows the cookie banner again ("Cookie settings" in the footer). */
export const COOKIE_SETTINGS_EVENT = "cookie-settings:open";
export const openCookieSettings = () => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));

export function saveConsent(choice: Consent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // Not stored: the banner asks again on the next page.
  }
}

function loadGa4() {
  if (!ga4Id) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js reads the arguments object itself, not an array.
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  // Page views are sent by trackPageView, on every route change.
  window.gtag("config", ga4Id, { send_page_view: false });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`;
  document.head.appendChild(script);
}

function loadClarity() {
  if (!clarityId) return;
  const clarity = ((...args: unknown[]) => {
    (clarity.q = clarity.q || []).push(args);
  }) as NonNullable<Window["clarity"]>;
  window.clarity = window.clarity || clarity;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${encodeURIComponent(clarityId)}`;
  document.head.appendChild(script);
}

async function loadPostHog() {
  if (!posthogKey) return;
  // A chunk of its own, fetched only after Accept.
  const { default: client } = await import("posthog-js");
  client.init(posthogKey, {
    api_host: posthogHost,
    capture_pageview: false,
    disable_session_recording: true,
    persistence: "localStorage+cookie",
  });
  posthog = client;
}

/** Loads the tools, once. Call it only after consent. */
export async function initAnalytics() {
  if (!inBrowser() || initialized || !hasConsented()) return;
  initialized = true;
  loadGa4();
  loadClarity();
  await loadPostHog();
}

export function trackPageView(path: string) {
  if (!inBrowser() || !hasConsented()) return;
  window.gtag?.("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
  posthog?.capture("$pageview", { $current_url: window.location.href });
}

/** An event such as "generate_lead" (a form sent). Never pass what the visitor typed. */
export function trackEvent(name: string, props: Record<string, string | number> = {}) {
  if (!inBrowser() || !hasConsented()) return;
  window.gtag?.("event", name, props);
  posthog?.capture(name, props);
}

/** "Decline" after an "Accept": stop sending from this device. */
export function optOut() {
  if (!inBrowser()) return;
  if (ga4Id) window[`ga-disable-${ga4Id}`] = true;
  window.clarity?.("consent", false);
  posthog?.opt_out_capturing();
}
