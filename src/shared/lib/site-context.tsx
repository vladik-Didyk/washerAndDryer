// What every page may need to know about this request, decided once by the root loader
// (src/app/root.tsx) and handed down: the request time (prices and promotions are decided from
// it, entities/offer), which optional pages exist (drafts only with PREVIEW_DRAFTS, /account/
// only with STRIPE_PORTAL_URL) and the year for the footer. Components read it here instead of the clock, so the server HTML and the
// hydrated page always agree.
import { createContext, useContext, type ReactNode } from "react";

export interface SiteState {
  /** The request time (ms), from the server: prices and promotions (entities/offer). */
  now: number;
  year: number;
  /** Optional pages and whether this deployment has them (path -> present). */
  optionalPages: Record<string, boolean>;
  /** Optional pages that are drafts (shown only in preview deployments). */
  draftPages: string[];
  stripePortalUrl: string | null;
}

const defaultState: SiteState = {
  now: 0,
  year: 2026,
  optionalPages: {},
  draftPages: [],
  stripePortalUrl: null,
};

const SiteContext = createContext<SiteState>(defaultState);

export function SiteProvider({ value, children }: { value: SiteState; children: ReactNode }) {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export interface Site extends SiteState {
  /** The page exists in this deployment ("/guides/x/#part" -> "/guides/x/"). */
  has: (href: string) => boolean;
  /** The page exists and isn't a draft. */
  isPublished: (href: string) => boolean;
}

export function useSite(): Site {
  const state = useContext(SiteContext);
  const pathOf = (href: string) => href.split("#")[0].split("?")[0];
  const has = (href: string) => {
    const path = pathOf(href);
    return path in state.optionalPages ? state.optionalPages[path] : true;
  };
  return {
    ...state,
    has,
    isPublished: (href) => has(href) && !state.draftPages.includes(pathOf(href)),
  };
}
