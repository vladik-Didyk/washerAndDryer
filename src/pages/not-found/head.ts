import { pagePaths } from "~/shared/config";
import type { I18n } from "~/shared/i18n";
import { pageHead } from "~/shared/seo";

// No canonical, noindex (pageHead does both for the "not-found" kind).
export const notFoundHead = (i18n: I18n) =>
  pageHead(i18n, {
    path: pagePaths.notFound,
    kind: "not-found",
    title: i18n.d.pages.notFound.title,
    description: i18n.d.pages.notFound.description,
  });
