import { data, type LoaderFunctionArgs } from "react-router";
import { findGuide, guidePath, visibleGuides, type Guide } from "~/entities/guide/index.server";
import { requestI18n } from "~/entities/offer";
import { flagsOf, pagePaths, requestTimeOf, siteConfig } from "~/shared/config";
import type { I18n } from "~/shared/i18n";
import { serverText } from "~/shared/i18n/index.server";
import { absoluteUrl, pageHead, providerRef } from "~/shared/seo";
import { prepareArticle } from "~/widgets/article-body";

export function guideHead({ d }: I18n, guide: Guide) {
  const url = absoluteUrl(guidePath(guide));
  return pageHead({
    path: guidePath(guide),
    kind: "guide",
    title: guide.metaTitle,
    description: guide.metaDescription,
    draft: guide.draft,
    ogType: "article",
    breadcrumbs: [
      { name: d.pages.home.name, path: "/" },
      { name: d.pages.guides.name, path: pagePaths.guides },
      { name: guide.title, path: guidePath(guide) },
    ],
    // The author and publisher are the business itself: no author bios.
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: guide.title,
        description: guide.metaDescription,
        url,
        mainEntityOfPage: url,
        datePublished: guide.published,
        dateModified: guide.updated,
        inLanguage: "en-CA",
        image: `${siteConfig.siteUrl}/og-image.jpg`,
        author: providerRef(),
        publisher: { ...providerRef(), logo: { "@type": "ImageObject", url: `${siteConfig.siteUrl}/brand/logo.png` } },
      },
    ],
  });
}

// A draft guide is a 404 unless this is a preview deployment (PREVIEW_DRAFTS=1).
export async function loader(args: LoaderFunctionArgs) {
  const { params, context } = args;
  const i18n = await requestI18n(args);
  const { previewDrafts } = flagsOf(context);
  const guide = findGuide(i18n, params.slug ?? "", previewDrafts);
  if (!guide) throw data("Not found", { status: 404 });
  return {
    head: guideHead(i18n, guide),
    guide: {
      title: guide.title,
      summary: guide.summary,
      updated: guide.updated,
      // The running offers are filled in for this request: they drop out when they end.
      sections: prepareArticle(guide.sections, i18n, requestTimeOf(context), serverText(i18n).articles),
    },
    otherGuides: visibleGuides(i18n, previewDrafts)
      .filter((other) => other.slug !== guide.slug)
      .map((other) => ({ href: guidePath(other), label: other.title })),
  };
}
