import type { LoaderFunctionArgs } from "react-router";
import { faqPage } from "~/shared/config";
import { faqGroupsFor, faqsFor } from "~/entities/faq";
import { firstWeekFreeOffer, isFirstWeekFreeActive, referralOffer } from "~/entities/offer";
import { requestTimeOf } from "~/shared/config";
import { pageHead } from "~/shared/seo";

export function loader({ context }: LoaderFunctionArgs) {
  const offers = {
    firstWeekFree: isFirstWeekFreeActive(requestTimeOf(context)) ? firstWeekFreeOffer.text : null,
    referral: referralOffer.text,
  };
  return {
    groups: faqGroupsFor(offers),
    head: pageHead({
      path: faqPage.path,
      kind: "faq",
      title: faqPage.metaTitle,
      description: faqPage.metaDescription,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "FAQ", path: faqPage.path },
      ],
      // The only page with FAQPage markup: every question on the site lives on /faq/.
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqsFor(offers).map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        },
      ],
    }),
  };
}
