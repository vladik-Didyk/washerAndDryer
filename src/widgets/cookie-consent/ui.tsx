import { useEffect, useState } from "react";
import { useI18n } from "~/shared/i18n";
import {
  COOKIE_SETTINGS_EVENT,
  analyticsConfigured,
  consentChoice,
  initAnalytics,
  optOut,
  saveConsent,
  trackEvent,
  trackPageView,
  type Consent,
} from "~/shared/lib";
import { Button, LangLink } from "~/shared/ui";

// The cookie banner (shared/lib/analytics): shown until the visitor accepts or declines, and
// again from "Cookie settings" in the footer. Not rendered on the server and not before the
// page is interactive, so the pages built ahead of time stay the same. On phones it sits
// above the phone bar (widgets/mobile-action-bar). Its words follow the page's language.
export function CookieConsent() {
  const { d } = useI18n();
  const text = d.chrome.consent;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!analyticsConfigured) return;
    if (consentChoice() === null) setOpen(true);
    const show = () => setOpen(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, show);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, show);
  }, []);

  const choose = async (choice: Consent) => {
    const before = consentChoice();
    saveConsent(choice);
    setOpen(false);
    if (choice === "accepted") {
      await initAnalytics();
      trackPageView(window.location.pathname);
      trackEvent("cookie_consent_accepted");
    } else if (before === "accepted") {
      // The tools are already running on this page: stop them, and reload without them.
      optOut();
      window.location.reload();
    }
  };

  if (!open) return null;

  return (
    <section
      aria-label={text.label}
      className="fixed inset-x-0 bottom-[calc(5.25rem+env(safe-area-inset-bottom))] z-40 px-4 md:bottom-4"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-line bg-paper p-5 shadow-[0_12px_40px_rgba(7,63,50,0.18)] sm:flex-row sm:items-center">
        <p className="flex-1 text-sm leading-relaxed text-ink-soft">
          {text.text}{" "}
          <LangLink href="/privacy/" className="text-link">
            {text.privacyLink}
          </LangLink>
        </p>
        <div className="flex shrink-0 gap-3">
          <Button variant="secondary" className="flex-1 px-5 sm:flex-none" onClick={() => void choose("declined")}>
            {text.decline}
          </Button>
          <Button className="flex-1 px-5 sm:flex-none" onClick={() => void choose("accepted")}>
            {text.accept}
          </Button>
        </div>
      </div>
    </section>
  );
}

// A page view on every route, once the visitor has accepted (the first one, right after
// Accept, comes from the banner).
export function AnalyticsTracker({ path }: { path: string }) {
  useEffect(() => {
    if (consentChoice() !== "accepted") return;
    void initAnalytics().then(() => trackPageView(path));
  }, [path]);
  return null;
}
