// The frame around every page: skip link, draft ribbon, offer bar, header, breadcrumbs,
// footer and the phone bar. What changes per page comes from the page loader's `head`
// (kind, breadcrumbs, draft, lang) and its `chrome` (the rental request asks for "Text us" in
// the phone bar). Words come from the page's language (shared/i18n).
import type { ReactNode } from "react";
import { siteConfig } from "~/shared/config";
import { useI18n, type Dictionary } from "~/shared/i18n";
import type { PageHead } from "~/shared/seo";
import { Breadcrumbs } from "~/widgets/breadcrumbs";
import { DraftRibbon } from "~/widgets/draft-ribbon";
import { Footer } from "~/widgets/footer";
import { Header } from "~/widgets/header";
import { MobileActionBar, type MobileAction } from "~/widgets/mobile-action-bar";
import { OfferBar } from "~/widgets/offer-bar";

export interface PageChrome {
  /** The phone bar's second button: "textUs" (a text message) instead of the page's default. */
  mobileAction?: "textUs";
}

// The phone bar's second button, after Call: what this page is for.
function mobileActionFor(
  kind: PageHead["kind"] | undefined,
  chrome: PageChrome | undefined,
  bar: Dictionary["chrome"]["mobileBar"],
): MobileAction {
  if (chrome?.mobileAction === "textUs") return { label: bar.textUs, href: siteConfig.phone.sms, icon: "sms" };
  switch (kind) {
    case "language":
      return { label: bar.text, href: siteConfig.phone.sms, icon: "sms" };
    case "landlords":
      return { label: bar.getQuote, href: "/landlords/quote/" };
    case "landlord-quote":
      return { label: bar.getQuote, href: "#landlord-quote" };
    case "repair":
      return { label: bar.repairForm, href: "#repair-request" };
    default:
      return { label: bar.startRental, href: "/start/" };
  }
}

export function SiteChrome({
  head,
  chrome,
  currentPath,
  children,
}: {
  head?: PageHead;
  chrome?: PageChrome;
  currentPath: string;
  children: ReactNode;
}) {
  const { d } = useI18n();
  const otherLanguage = head && head.lang !== "en";
  return (
    <>
      <a href="#main" className="skip-link">
        {d.chrome.skipLink}
      </a>
      {head?.draft && <DraftRibbon />}
      <OfferBar />
      <Header currentPath={currentPath} />
      <main id="main">
        {head?.breadcrumbs && <Breadcrumbs items={head.breadcrumbs} />}
        {children}
      </main>
      <Footer />
      <MobileActionBar
        action={mobileActionFor(head?.kind, chrome, d.chrome.mobileBar)}
        lang={otherLanguage ? head.lang : "en"}
      />
    </>
  );
}

export const fontStylesheet =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700;800&display=swap";

export const ogImage = `${siteConfig.siteUrl}/og-image.jpg`;
