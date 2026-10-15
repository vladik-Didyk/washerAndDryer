import { useLoaderData } from "react-router";
import { FaqList } from "~/entities/faq";
import { siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { CircleHelp, Container } from "~/shared/ui";
import { CtaBand } from "~/widgets/cta-band";
import { PageIntro } from "~/widgets/page-intro";
import type { loader } from "../loader";

// /faq/: every question, grouped, all answers open. Each question has an id for direct links.
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
        <nav aria-label={text.topics} className="mt-8">
          <ul className="flex flex-wrap gap-2.5">
            {faqGroups.map((group) => (
              <li key={group.id}>
                <a
                  href={`#${group.id}`}
                  className="inline-flex min-h-[2.75rem] items-center rounded-full border border-line bg-white px-4 py-2 font-medium text-ink transition-colors hover:border-brand hover:bg-brand-mint hover:text-brand-dark"
                >
                  {group.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageIntro>

      <div className="border-y border-line bg-white">
        <Container className="py-14 sm:py-16 lg:py-20">
          <FaqList groups={faqGroups} />
        </Container>
      </div>

      <CtaBand variant="panel" id="faq-cta-title" />
    </>
  );
}
