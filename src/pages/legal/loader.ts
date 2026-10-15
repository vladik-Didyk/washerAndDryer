import { data, type LoaderFunctionArgs } from "react-router";
import { requestI18n } from "~/entities/offer";
import { flagsOf, requestTimeOf } from "~/shared/config";
import { serverText } from "~/shared/i18n/index.server";
import type { I18n } from "~/shared/i18n";
import { pageHead } from "~/shared/seo";
import { prepareArticle } from "~/widgets/article-body";
import { allLegalPages, type LegalContext, type LegalPage } from "./content.server";

export const legalContextOf = (context: LoaderFunctionArgs["context"]): LegalContext => ({
  now: requestTimeOf(context),
  analyticsOn: Boolean(flagsOf(context).analyticsToken),
});

export const legalHead = ({ d }: I18n, page: LegalPage) =>
  pageHead({
    path: page.path,
    kind: page.kind,
    title: page.metaTitle,
    description: page.metaDescription,
    draft: page.draft,
    breadcrumbs: [
      { name: d.pages.home.name, path: "/" },
      { name: page.title, path: page.path },
    ],
  });

// /privacy/ and /terms/: drafts until approved, so a 404 unless PREVIEW_DRAFTS=1.
export async function loader(args: LoaderFunctionArgs) {
  const { request, context } = args;
  const i18n = await requestI18n(args);
  const legal = legalContextOf(context);
  const path = new URL(request.url).pathname;
  const page = allLegalPages(i18n, legal).find((entry) => entry.path === path);
  if (!page || (page.draft && !flagsOf(context).previewDrafts)) throw data("Not found", { status: 404 });
  return {
    head: legalHead(i18n, page),
    page: {
      kind: page.kind,
      title: page.title,
      summary: page.summary,
      updated: page.updated,
      sections: prepareArticle(page.sections, i18n, legal.now, serverText(i18n).articles),
    },
  };
}
