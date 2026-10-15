import { data, type LoaderFunctionArgs } from "react-router";
import { isFirstWeekFreeActive } from "~/entities/offer";
import { flagsOf, requestTimeOf } from "~/shared/config";
import { pageHead } from "~/shared/seo";
import { allLegalPages, type LegalContext, type LegalPage } from "./content.server";

export const legalContextOf = (context: LoaderFunctionArgs["context"]): LegalContext => ({
  offerActive: isFirstWeekFreeActive(requestTimeOf(context)),
  analyticsOn: Boolean(flagsOf(context).analyticsToken),
});

export const legalHead = (page: LegalPage) =>
  pageHead({
    path: page.path,
    kind: page.kind,
    title: page.metaTitle,
    description: page.metaDescription,
    draft: page.draft,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: page.title, path: page.path },
    ],
  });

// /privacy/ and /terms/: drafts until approved, so a 404 unless PREVIEW_DRAFTS=1.
export function loader({ request, context }: LoaderFunctionArgs) {
  const path = new URL(request.url).pathname;
  const page = allLegalPages(legalContextOf(context)).find((entry) => entry.path === path);
  if (!page || (page.draft && !flagsOf(context).previewDrafts)) throw data("Not found", { status: 404 });
  return {
    head: legalHead(page),
    page: {
      kind: page.kind,
      title: page.title,
      summary: page.summary,
      updated: page.updated,
      // Legal text has no offer placeholders; the type is narrowed for the article renderer.
      sections: page.sections.map((section) => ({
        ...section,
        blocks: section.blocks.filter((block) => typeof block === "string" || !("offer" in block)),
      })),
    },
  };
}
