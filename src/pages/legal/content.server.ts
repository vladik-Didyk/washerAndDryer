// The privacy policy (/privacy/) and the rental terms summary (/terms/), published on
// 2026-10-16 after the owner approved them (`draft: true` hides a page again). The words are in shared/i18n
// (locales/en.server.ts legal), server only, so a draft's text never ships to a normal
// deployment. Sections use the same blocks as the guides (widgets/article-body); a section
// `id` is its anchor (e.g. /terms/#referral).
//
// When the text changes, change its `updated` date too. The privacy text follows the
// deployment: "Visit statistics" always names Cloudflare Web Analytics (on for the zone, it
// needs no cookie), and both it and "Cookies" describe the cookie banner once
// siteConfig.analytics has an ID; the terms list each running promotion as a section of its own.
import { activePromotions, promotionText } from "~/entities/offer";
import type { I18n } from "~/shared/i18n";
import { analyticsConfigured } from "~/shared/lib";
import { serverText } from "~/shared/i18n/index.server";
import type { ArticleSection } from "~/shared/lib";

export interface LegalPage {
  path: "/privacy/" | "/terms/";
  kind: "privacy" | "terms";
  draft: boolean;
  updated: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  summary: string;
  sections: ArticleSection[];
}

export interface LegalContext {
  /** The request time: which promotions the terms list. */
  now: number;
  analyticsOn: boolean;
}

const PRIVACY_UPDATED = "2026-10-17";
const TERMS_UPDATED = "2026-10-16";

function privacy(i18n: I18n, _context: LegalContext): LegalPage {
  const text = serverText(i18n).legal.privacy;
  const included: Record<string, ArticleSection["blocks"]> = {
    visitStatistics: analyticsConfigured
      ? [text.visitStatistics.cloudflare, text.visitStatistics.withConsent]
      : [text.visitStatistics.cloudflare],
    cookies: [analyticsConfigured ? text.cookies.withConsent : text.cookies.withoutConsent],
  };
  return {
    path: "/privacy/",
    kind: "privacy",
    draft: false,
    updated: PRIVACY_UPDATED,
    metaTitle: text.metaTitle,
    metaDescription: text.metaDescription,
    title: text.title,
    summary: text.summary,
    sections: text.sections.map((section) => ({
      ...section,
      blocks: section.blocks.flatMap((block) =>
        typeof block === "object" && "include" in block && included[block.include] ? included[block.include] : [block],
      ),
    })),
  };
}

function terms(i18n: I18n, { now }: LegalContext): LegalPage {
  const text = serverText(i18n).legal.terms;
  const promotions = activePromotions(now);
  return {
    path: "/terms/",
    kind: "terms",
    draft: false,
    updated: TERMS_UPDATED,
    metaTitle: text.metaTitle,
    metaDescription: text.metaDescription,
    title: text.title,
    summary: text.summary,
    sections: text.sections.flatMap((section): ArticleSection[] => {
      if (typeof section === "string") {
        return promotions.map((promotion) => {
          const wording = promotionText(promotion, i18n);
          return { id: promotion.id, heading: wording.title, blocks: [wording.text, wording.stillPaid] };
        });
      }
      return [{ ...section, blocks: section.blocks.map((block) => i18n.format(block, { referralText: i18n.d.offers.referral.text })) }];
    }),
  };
}

// Every legal page, drafts included, for this request.
export const allLegalPages = (i18n: I18n, context: LegalContext): LegalPage[] => [
  privacy(i18n, context),
  terms(i18n, context),
];

// The legal pages this deployment shows: published ones, plus drafts in a preview deployment.
export const visibleLegalPages = (i18n: I18n, context: LegalContext, previewDrafts: boolean): LegalPage[] =>
  allLegalPages(i18n, context).filter((page) => previewDrafts || !page.draft);
