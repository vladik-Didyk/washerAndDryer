import type { LoaderFunctionArgs } from "react-router";
import { requestI18n } from "~/entities/offer";
import { pagePaths } from "~/shared/config";
import { absoluteUrl, pageHead, providerRef } from "~/shared/seo";

export async function loader(args: LoaderFunctionArgs) {
  const { d } = await requestI18n(args);
  return {
    head: pageHead({
      path: pagePaths.about,
      kind: "about",
      title: d.pages.about.title,
      description: d.pages.about.description,
      breadcrumbs: [
        { name: d.pages.home.name, path: "/" },
        { name: d.pages.about.name, path: pagePaths.about },
      ],
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: d.pages.about.title,
          description: d.pages.about.description,
          url: absoluteUrl(pagePaths.about),
          about: providerRef(),
        },
      ],
    }),
  };
}
