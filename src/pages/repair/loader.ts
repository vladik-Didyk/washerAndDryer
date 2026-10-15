import type { LoaderFunctionArgs } from "react-router";
import { repairPage } from "~/shared/config";
import { pageHead } from "~/shared/seo";

export function loader(_args: LoaderFunctionArgs) {
  return {
    head: pageHead({
      path: repairPage.path,
      kind: "repair",
      title: repairPage.metaTitle,
      description: repairPage.metaDescription,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Request a repair", path: repairPage.path },
      ],
    }),
  };
}
