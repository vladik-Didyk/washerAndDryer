import { FaqAccordion, homeFaqs, type Faq } from "~/entities/faq";
import { siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { ArrowRight } from "~/shared/ui";

// Accordion of a few common questions; the full list is on /faq/ (pages/faq).
export function FaqSection({ items, moreHref = "/faq/" }: { items?: Faq[]; moreHref?: string | null }) {
  const { phone } = siteConfig;
  const i18n = useI18n();
  const { d, rich } = i18n;

  return (
    <section id="faq" aria-labelledby="faq-title" className="section border-y border-line bg-white">
      <div className="container-page grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <h2 id="faq-title" className="h2">
            {d.home.faq.title}
          </h2>
          <p className="lead mt-4">
            {rich(d.home.faq.another, {
              phoneLink: (
                <a href={phone.tel} className="text-link whitespace-nowrap">
                  {phone.display}
                </a>
              ),
            })}
          </p>
          {moreHref && (
            <a href={moreHref} className="btn btn-secondary mt-6">
              {d.home.faq.all}
              <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
            </a>
          )}
        </div>

        <FaqAccordion
          items={items ?? homeFaqs(i18n)}
          className="divide-y divide-line rounded-3xl border border-line bg-paper px-5 sm:px-8 lg:col-span-8"
        />
      </div>
    </section>
  );
}
