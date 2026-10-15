import type { LoaderFunctionArgs } from "react-router";
import { aboutPage } from "~/shared/config";
import { pageHead, providerRef } from "~/shared/seo";
import { absoluteUrl } from "~/shared/seo";

export function loader(_args: LoaderFunctionArgs) {
  return {
    head: pageHead({
      path: aboutPage.path,
      kind: "about",
      title: aboutPage.metaTitle,
      description: aboutPage.metaDescription,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "About", path: aboutPage.path },
      ],
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: aboutPage.metaTitle,
          description: aboutPage.metaDescription,
          url: absoluteUrl(aboutPage.path),
          about: providerRef(),
        },
      ],
    }),
  };
}
