import { data, type LoaderFunctionArgs } from "react-router";
import { requestI18n } from "~/entities/offer";
import type { I18n } from "~/shared/i18n";
import { absoluteUrl, areaServed, pageHead, providerRef, setOffer, singleOffer } from "~/shared/seo";

export const languageHead = (i18n: I18n) => {
  const { d, language } = i18n;
  return pageHead({
    path: language.path,
    kind: "language",
    lang: i18n.lang,
    title: d.language.metaTitle,
    description: d.language.metaDescription,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: d.language.h1,
        description: d.language.metaDescription,
        url: absoluteUrl(language.path),
        provider: providerRef(),
        areaServed: areaServed(i18n),
        availableLanguage: i18n.lang,
        offers: [setOffer(i18n), singleOffer(i18n)],
      },
    ],
  });
};

// /es/ or /ru/: the offer in Spanish or Russian. The words are the language's dictionary
// (shared/i18n locales/es.ts, ru.ts), chosen from the URL.
export async function loader(args: LoaderFunctionArgs) {
  const i18n = await requestI18n(args);
  if (i18n.lang === "en") throw data("Not found", { status: 404 });
  return { head: languageHead(i18n) };
}
