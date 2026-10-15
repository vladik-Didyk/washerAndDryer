// The frame around every page: skip link, draft ribbon, offer bar, header, breadcrumbs,
// footer and the phone bar. What changes per page comes from the page loader's `head`
// (kind, breadcrumbs, draft, lang) and, for pages in another language or the rental request,
// its `chrome` texts.
import type { ReactNode } from "react";
import { siteConfig } from "~/shared/config";
import type { PageHead } from "~/shared/seo";
import { Breadcrumbs } from "~/widgets/breadcrumbs";
import { DraftRibbon } from "~/widgets/draft-ribbon";
import { Footer } from "~/widgets/footer";
import { Header } from "~/widgets/header";
import { MobileActionBar, type MobileAction } from "~/widgets/mobile-action-bar";
import { OfferBar } from "~/widgets/offer-bar";

export interface PageChrome {
  skipLink?: string;
  callLabel?: string;
  barLabel?: string;
  mobileAction?: MobileAction;
}

// The phone bar's second button, after Call: what this page is for.
function mobileActionFor(kind: PageHead["kind"] | undefined): MobileAction {
  switch (kind) {
    case "landlords":
      return { label: "Get a quote", href: "/landlords/quote/" };
    case "landlord-quote":
      return { label: "Get a quote", href: "#landlord-quote" };
    case "repair":
      return { label: "Repair form", href: "#repair-request" };
    default:
      return { label: "Start rental", href: "/start/" };
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
  const otherLanguage = head && head.lang !== "en";
  return (
    <>
      <a href="#main" className="skip-link">
        {chrome?.skipLink ?? "Skip to content"}
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
        action={chrome?.mobileAction ?? mobileActionFor(head?.kind)}
        callLabel={chrome?.callLabel}
        label={chrome?.barLabel}
        lang={otherLanguage ? head.lang : "en"}
      />
    </>
  );
}

export const fontStylesheet =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700;800&display=swap";

export const ogImage = `${siteConfig.siteUrl}/og-image.jpg`;
