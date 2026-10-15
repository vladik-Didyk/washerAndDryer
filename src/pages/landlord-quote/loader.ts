import type { LoaderFunctionArgs } from "react-router";
import { requestI18n } from "~/entities/offer";
import { pagePaths } from "~/shared/config";
import { pageHead } from "~/shared/seo";

export async function loader(args: LoaderFunctionArgs) {
  const i18n = await requestI18n(args);
  const { d } = i18n;
  return {
    head: pageHead(i18n, {
      path: pagePaths.landlordQuote,
      kind: "landlord-quote",
      title: d.pages.landlordQuote.title,
      description: d.pages.landlordQuote.description,
      breadcrumbs: [
        { name: d.pages.home.name, path: "/" },
        { name: d.pages.landlords.name, path: pagePaths.landlords },
        { name: d.pages.landlordQuote.name, path: pagePaths.landlordQuote },
      ],
    }),
  };
}
