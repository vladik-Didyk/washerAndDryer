import { useLoaderData } from "react-router";
import { FaqTabs } from "~/entities/faq";
import { siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { CircleHelp, Container } from "~/shared/ui";
import { CtaBand } from "~/widgets/cta-band";
import { PageIntro } from "~/widgets/page-intro";
import type { loader } from "../loader";

// /faq/: every question, by topic: icon tabs, answers folded (entities/faq FaqTabs). Each
// question has an id for direct links.
// The FAQPage JSON-LD for this page comes from the same list (../loader.ts).
export default function FaqPage() {
  const { groups: faqGroups } = useLoaderData<typeof loader>();
  const { phone } = siteConfig;
  const { d, rich } = useI18n();
  const text = d.faq.page;

  return (
    <>
      <PageIntro icon={CircleHelp} eyebrow={text.eyebrow} title={text.title} textWidth="max-w-5xl">
        <p className="lead mt-5 max-w-2xl">
          {rich(text.lead, {
            phoneLink: (
              <a href={phone.tel} className="text-link whitespace-nowrap">
                {phone.display}
              </a>
            ),
          })}
        </p>
      </PageIntro>

      <div className="border-y border-line bg-white">
        <Container className="py-14 sm:py-16 lg:py-20">
          <FaqTabs groups={faqGroups} />
        </Container>
      </div>

      <CtaBand variant="panel" id="faq-cta-title" />
    </>
  );
}
