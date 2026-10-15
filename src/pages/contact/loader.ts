import type { LoaderFunctionArgs } from "react-router";
import { requestI18n } from "~/entities/offer";
import { pagePaths } from "~/shared/config";
import { PHONE_E164, absoluteUrl, pageHead, providerRef } from "~/shared/seo";

export async function loader(args: LoaderFunctionArgs) {
  const { d } = await requestI18n(args);
  return {
    head: pageHead({
      path: pagePaths.contact,
      kind: "contact",
      title: d.pages.contact.title,
      description: d.pages.contact.description,
      breadcrumbs: [
        { name: d.pages.home.name, path: "/" },
        { name: d.pages.contact.name, path: pagePaths.contact },
      ],
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: d.pages.contact.title,
          description: d.pages.contact.description,
          url: absoluteUrl(pagePaths.contact),
          about: {
            ...providerRef(),
            contactPoint: {
              "@type": "ContactPoint",
              telephone: PHONE_E164,
              contactType: d.jsonLd.contact.contactType,
              areaServed: "CA-ON",
              availableLanguage: d.jsonLd.contact.languages,
            },
          },
        },
      ],
    }),
  };
}
