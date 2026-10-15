import type { LoaderFunctionArgs } from "react-router";
import { contactPage } from "~/shared/config";
import { PHONE_E164, absoluteUrl, pageHead, providerRef } from "~/shared/seo";

export function loader(_args: LoaderFunctionArgs) {
  return {
    head: pageHead({
      path: contactPage.path,
      kind: "contact",
      title: contactPage.metaTitle,
      description: contactPage.metaDescription,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Contact", path: contactPage.path },
      ],
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: contactPage.metaTitle,
          description: contactPage.metaDescription,
          url: absoluteUrl(contactPage.path),
          about: {
            ...providerRef(),
            contactPoint: {
              "@type": "ContactPoint",
              telephone: PHONE_E164,
              contactType: "customer service",
              areaServed: "CA-ON",
              availableLanguage: ["English", "Spanish", "Russian"],
            },
          },
        },
      ],
    }),
  };
}
