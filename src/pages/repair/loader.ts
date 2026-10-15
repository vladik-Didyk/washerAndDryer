import type { LoaderFunctionArgs } from "react-router";
import { requestI18n } from "~/entities/offer";
import { pagePaths } from "~/shared/config";
import { pageHead } from "~/shared/seo";

export async function loader(args: LoaderFunctionArgs) {
  const { d } = await requestI18n(args);
  return {
    head: pageHead({
      path: pagePaths.repair,
      kind: "repair",
      title: d.pages.repair.title,
      description: d.pages.repair.description,
      breadcrumbs: [
        { name: d.pages.home.name, path: "/" },
        { name: d.pages.repair.name, path: pagePaths.repair },
      ],
    }),
  };
}
