import type { LoaderFunctionArgs } from "react-router";
import { landlordQuotePage } from "~/shared/config";
import { pageHead } from "~/shared/seo";

export function loader(_args: LoaderFunctionArgs) {
  return {
    head: pageHead({
      path: landlordQuotePage.path,
      kind: "landlord-quote",
      title: landlordQuotePage.metaTitle,
      description: landlordQuotePage.metaDescription,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Landlords", path: "/landlords/" },
        { name: "Get a quote", path: landlordQuotePage.path },
      ],
    }),
  };
}
