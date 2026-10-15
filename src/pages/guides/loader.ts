import { data, type LoaderFunctionArgs } from "react-router";
import { guidePath, guidesIndex, visibleGuides } from "~/entities/guide/index.server";
import { flagsOf } from "~/shared/config";
import { itemList, pageHead } from "~/shared/seo";

const guidesPage = {
  ...guidesIndex,
  name: "Guides",
  llmsNote: "practical guides for renting a washer and dryer",
};

// /guides/ exists once at least one guide is shown; it counts as a draft while every guide
// in it is one (so in a normal deployment, with every guide a draft, it is a 404).
export function loader({ context }: LoaderFunctionArgs) {
  const guides = visibleGuides(flagsOf(context).previewDrafts);
  if (!guides.length) throw data("Not found", { status: 404 });
  return {
    guides: guides.map((guide) => ({ slug: guide.slug, title: guide.title, summary: guide.summary, path: guidePath(guide) })),
    head: pageHead({
      path: guidesPage.path,
      kind: "guides",
      title: guidesPage.metaTitle,
      description: guidesPage.metaDescription,
      draft: guides.every((guide) => guide.draft),
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Guides", path: guidesPage.path },
      ],
      jsonLd: [
        itemList(
          "Guides for renting a washer and dryer",
          guidesPage.path,
          guides.map((guide) => ({ name: guide.title, path: guidePath(guide) })),
        ),
      ],
    }),
  };
}
