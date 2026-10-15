import { useLoaderData } from "react-router";
import { FaqList } from "~/entities/faq";
import { siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { CircleHelp, LangLink, MessageSquare, Phone } from "~/shared/ui";
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
        <div className="container-page py-14 sm:py-16 lg:py-20">
          <FaqList groups={faqGroups} />
        </div>
      </div>

      <section aria-labelledby="faq-cta-title" className="section">
        <div className="container-page">
          <div className="grid gap-6 rounded-3xl bg-brand-mint px-5 py-8 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-7">
              <h2 id="faq-cta-title" className="h2">
                {d.common.readyToRent}
              </h2>
              <p className="lead mt-3">{d.common.readyToRentText}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-5 lg:justify-end">
              <LangLink href="/start/" className="btn btn-primary">
                {d.common.startRental}
              </LangLink>
              <a href={phone.tel} className="btn btn-secondary">
                <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
                {d.common.call}
              </a>
              <a href={phone.sms} className="btn btn-secondary">
                <MessageSquare className="h-[18px] w-[18px]" aria-hidden="true" />
                {d.common.text}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
