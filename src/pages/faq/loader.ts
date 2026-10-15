import type { LoaderFunctionArgs } from "react-router";
import { faqGroupsFor, faqsFor } from "~/entities/faq";
import { activePromotions, promotionText, requestI18n } from "~/entities/offer";
import { pagePaths, requestTimeOf } from "~/shared/config";
import { pageHead } from "~/shared/seo";

export async function loader(args: LoaderFunctionArgs) {
  const i18n = await requestI18n(args);
  const { d } = i18n;
  const firstWeekFree = activePromotions(requestTimeOf(args.context)).find(
    (promotion) => promotion.id === "first-week-free",
  );
  const offers = {
    firstWeekFree: firstWeekFree ? promotionText(firstWeekFree, i18n).text : null,
    referral: d.offers.referral.text,
  };
  return {
    groups: faqGroupsFor(i18n, offers),
    head: pageHead({
      path: pagePaths.faq,
      kind: "faq",
      title: d.pages.faq.title,
      description: d.pages.faq.description,
      breadcrumbs: [
        { name: d.pages.home.name, path: "/" },
        { name: d.pages.faq.name, path: pagePaths.faq },
      ],
      // The only page with FAQPage markup: every question on the site lives on /faq/.
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqsFor(i18n, offers).map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        },
      ],
    }),
  };
}
