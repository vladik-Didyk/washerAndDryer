import type { LoaderFunctionArgs } from "react-router";
import { requestI18n } from "~/entities/offer";
import { pagePaths } from "~/shared/config";
import { pageHead } from "~/shared/seo";

// The customer sign-in page. Kept out of search results (noindex, not in the sitemap).
export async function loader(args: LoaderFunctionArgs) {
  const i18n = await requestI18n(args);
  const { d } = i18n;
  return {
    head: pageHead(i18n, {
      path: pagePaths.account,
      kind: "account",
      title: d.pages.account.title,
      description: d.pages.account.description,
      noindex: true,
      breadcrumbs: [
        { name: d.pages.home.name, path: "/" },
        { name: d.pages.account.name, path: pagePaths.account },
      ],
    }),
  };
}
