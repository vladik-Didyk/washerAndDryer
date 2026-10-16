// Environment of the Worker (wrangler secrets, variables and bindings; locally .dev.vars).
// Nothing secret is ever written in the source: README.md lists every variable.
import type { AppLoadContext } from "react-router";
import type { FormMailer } from "../api/email.server";
import { siteConfig } from "./site";

export interface SiteEnv {
  /** Cloudflare email binding (wrangler.jsonc send_email): the forms' email delivery. */
  FORM_MAILER?: FormMailer;
  /** Signs the rental-request session cookie. Secret. */
  SESSION_SECRET?: string;
  /** "1": log form submissions instead of sending them (local checks, tests). */
  FORMS_DRY_RUN?: string;
  /** "1": draft pages (guides, /privacy/, /terms/) are shown, with a Draft ribbon and noindex. */
  PREVIEW_DRAFTS?: string;
  /** Cloudflare Web Analytics token. While empty, no beacon is added. */
  CF_ANALYTICS_TOKEN?: string;
  /** Google Search Console: the content="" value only. */
  GOOGLE_SITE_VERIFICATION?: string;
  /** Bing Webmaster Tools: the content="" value only. */
  BING_SITE_VERIFICATION?: string;
}

const isOn = (value: string | undefined) => ["1", "true"].includes((value ?? "").trim());
const orNull = (value: string | undefined) => (value ?? "").trim() || null;

// The settings the pages need. Safe to send to the browser: no secrets.
export interface SiteFlags {
  previewDrafts: boolean;
  stripePortalUrl: string | null;
  analyticsToken: string | null;
  googleVerification: string | null;
  bingVerification: string | null;
}

export function readFlags(env: SiteEnv): SiteFlags {
  const analyticsToken = orNull(env.CF_ANALYTICS_TOKEN);
  return {
    previewDrafts: isOn(env.PREVIEW_DRAFTS),
    stripePortalUrl: siteConfig.stripePortalUrl,
    // The token goes into an HTML attribute: anything unexpected is dropped.
    analyticsToken: analyticsToken && /^[\w-]+$/.test(analyticsToken) ? analyticsToken : null,
    googleVerification: orNull(env.GOOGLE_SITE_VERIFICATION),
    bingVerification: orNull(env.BING_SITE_VERIFICATION),
  };
}

export const envOf = (context: AppLoadContext): SiteEnv => context.cloudflare?.env ?? {};
export const flagsOf = (context: AppLoadContext): SiteFlags => readFlags(envOf(context));
export const isFormsDryRun = (env: SiteEnv) => isOn(env.FORMS_DRY_RUN);

// The time the request arrived (workers/app.ts), so every loader of one request agrees.
export const requestTimeOf = (context: AppLoadContext): number => context.requestTime ?? Date.now();
