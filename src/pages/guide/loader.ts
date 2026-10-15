import { data, type LoaderFunctionArgs } from "react-router";
import { findGuide, guidePath, visibleGuides, type Guide } from "~/entities/guide/index.server";
import { firstWeekFreeOffer, isFirstWeekFreeActive, referralOffer } from "~/entities/offer";
import { flagsOf, requestTimeOf, siteConfig } from "~/shared/config";
import type { ArticleBlock, ArticleSection, RenderedBlock } from "~/shared/lib";
import { absoluteUrl, pageHead, providerRef } from "~/shared/seo";

// The current offers inside long-form text, filled in for this request: the first-week line
// drops out once the offer ends.
export function renderOffers(sections: ArticleSection[], offerActive: boolean): ArticleSection<RenderedBlock>[] {
  const render = (block: ArticleBlock): RenderedBlock[] => {
    if (typeof block !== "string" && "offer" in block) {
      if (block.offer === "referral") return [`Refer a friend. ${referralOffer.text}`];
      return offerActive ? [`First week free. ${firstWeekFreeOffer.text} ${firstWeekFreeOffer.stillPaid}`] : [];
    }
    return [block];
  };
  return sections.map((section) => ({ ...section, blocks: section.blocks.flatMap(render) }));
}

export function guideHead(guide: Guide) {
  const url = absoluteUrl(guidePath(guide));
  return pageHead({
    path: guidePath(guide),
    kind: "guide",
    title: guide.metaTitle,
    description: guide.metaDescription,
    draft: guide.draft,
    ogType: "article",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides/" },
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
export function loader({ params, context }: LoaderFunctionArgs) {
  const { previewDrafts } = flagsOf(context);
  const guide = findGuide(params.slug ?? "", previewDrafts);
  if (!guide) throw data("Not found", { status: 404 });
  const offerActive = isFirstWeekFreeActive(requestTimeOf(context));
  return {
    head: guideHead(guide),
    guide: {
      title: guide.title,
      summary: guide.summary,
      updated: guide.updated,
      sections: renderOffers(guide.sections, offerActive),
    },
    otherGuides: visibleGuides(previewDrafts)
      .filter((other) => other.slug !== guide.slug)
      .map((other) => ({ href: guidePath(other), label: other.title })),
  };
}
