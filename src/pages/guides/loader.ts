import { data, type LoaderFunctionArgs } from "react-router";
import { guidePath, visibleGuides } from "~/entities/guide/index.server";
import { requestI18n } from "~/entities/offer";
import { flagsOf, pagePaths } from "~/shared/config";
import { itemList, pageHead } from "~/shared/seo";

// /guides/ exists once at least one guide is shown; it counts as a draft while every guide
// in it is one (so in a normal deployment, with every guide a draft, it is a 404).
export async function loader(args: LoaderFunctionArgs) {
  const i18n = await requestI18n(args);
  const { d } = i18n;
  const guides = visibleGuides(i18n, flagsOf(args.context).previewDrafts);
  if (!guides.length) throw data("Not found", { status: 404 });
  return {
    guides: guides.map((guide) => ({ slug: guide.slug, title: guide.title, summary: guide.summary, path: guidePath(guide) })),
    head: pageHead(i18n, {
      path: pagePaths.guides,
      kind: "guides",
      title: d.pages.guides.title,
      description: d.pages.guides.description,
      draft: guides.every((guide) => guide.draft),
      breadcrumbs: [
        { name: d.pages.home.name, path: "/" },
        { name: d.pages.guides.name, path: pagePaths.guides },
      ],
      jsonLd: [
        itemList(
          i18n,
          d.jsonLd.guidesList,
          pagePaths.guides,
          guides.map((guide) => ({ name: guide.title, path: guidePath(guide) })),
        ),
      ],
    }),
  };
}
