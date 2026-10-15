import { data, type LoaderFunctionArgs } from "react-router";
import { machinePath, machineTypes } from "~/entities/machine";
import { isFirstWeekFreeActive } from "~/entities/offer";
import { requestTimeOf, siteConfig } from "~/shared/config";
import { absoluteUrl, areaServed, pageHead, providerRef, setOffer, singleOffer } from "~/shared/seo";
import { languagePages, type LanguageContent } from "./content";

export const languageHead = (content: LanguageContent) =>
  pageHead({
    path: content.path,
    kind: "language",
    lang: content.lang,
    title: content.metaTitle,
    description: content.metaDescription,
    ogLocale: content.locale,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: content.h1,
        description: content.metaDescription,
        url: absoluteUrl(content.path),
        provider: providerRef(),
        areaServed: areaServed(),
        availableLanguage: content.lang,
        offers: [setOffer(), singleOffer()],
      },
    ],
  });

// /es/ or /ru/: the offer in Spanish or Russian. The text is resolved here (prices filled in),
// so the page gets plain strings.
export function loader({ request, context }: LoaderFunctionArgs) {
  const path = new URL(request.url).pathname;
  const content = languagePages.find((page) => page.path === path);
  if (!content) throw data("Not found", { status: 404 });
  const { prices, phone } = siteConfig;
  return {
    head: languageHead(content),
    // The root uses these for the skip link and the phone bar, in this language.
    chrome: {
      skipLink: content.skipLink,
      callLabel: content.call,
      barLabel: content.barLabel,
      mobileAction: { label: content.text, href: phone.sms, icon: "sms" as const },
    },
    page: {
      lang: content.lang,
      eyebrow: content.eyebrow,
      h1: content.h1,
      priceSet: content.priceSet(prices.setText),
      priceSingle: content.priceSingle(prices.singleText),
      priceNote: content.priceNote,
      firstWeekFree: isFirstWeekFreeActive(requestTimeOf(context)) ? content.firstWeekFree : null,
      includedTitle: content.includedTitle,
      included: content.included,
      termsTitle: content.termsTitle,
      terms: content.terms(prices.deposit),
      machinesTitle: content.machinesTitle,
      machines: machineTypes.map((machine) => ({
        slug: machine.slug,
        href: machinePath(machine),
        label: content.machines[machine.slug],
        price: `$${machine.price.toFixed(2)} ${content.perWeek}`,
      })),
      needsTitle: content.needsTitle,
      needs: content.needs,
      areaTitle: content.areaTitle,
      area: content.area,
      areaFar: content.areaFar,
      contactTitle: content.contactTitle,
      call: content.call,
      text: content.text,
      hours: content.hours,
      languagesLine: content.languagesLine,
      englishLink: content.englishLink,
    },
  };
}
