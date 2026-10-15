import type { LoaderFunctionArgs } from "react-router";
import { requestI18n } from "~/entities/offer";
import { pagePaths } from "~/shared/config";
import { absoluteUrl, pageHead, providerRef } from "~/shared/seo";

export async function loader(args: LoaderFunctionArgs) {
  const i18n = await requestI18n(args);
  const { d } = i18n;
  return {
    head: pageHead(i18n, {
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
          url: absoluteUrl(i18n.href(pagePaths.about)),
          about: providerRef(),
        },
      ],
    }),
  };
}
