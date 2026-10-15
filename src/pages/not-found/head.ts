import { pagePaths } from "~/shared/config";
import type { I18n } from "~/shared/i18n";
import { pageHead } from "~/shared/seo";

// No canonical, noindex (pageHead does both for the "not-found" kind).
export const notFoundHead = ({ d }: I18n) =>
  pageHead({
    path: pagePaths.notFound,
    kind: "not-found",
    title: d.pages.notFound.title,
    description: d.pages.notFound.description,
  });
