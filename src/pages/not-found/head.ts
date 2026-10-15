import { notFoundPage } from "~/shared/config";
import { pageHead } from "~/shared/seo";

// No canonical, noindex (pageHead does both for the "not-found" kind).
export const notFoundHead = () =>
  pageHead({
    path: notFoundPage.path,
    kind: "not-found",
    title: notFoundPage.metaTitle,
    description: notFoundPage.metaDescription,
  });
