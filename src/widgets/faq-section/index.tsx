import { FaqAccordion, homeFaqs, type Faq } from "~/entities/faq";
import { siteConfig } from "~/shared/config";
import { ArrowRight } from "~/shared/ui";

// Accordion of a few common questions; the full list is on /faq/ (pages/faq).
export function FaqSection({ items = homeFaqs, moreHref = "/faq/" }: { items?: Faq[]; moreHref?: string | null }) {
  const { phone } = siteConfig;

  return (
    <section id="faq" aria-labelledby="faq-title" className="section border-y border-line bg-white">
      <div className="container-page grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <h2 id="faq-title" className="h2">
            FAQ
          </h2>
          <p className="lead mt-4">
            Another question? Call or text{" "}
            <a href={phone.tel} className="text-link whitespace-nowrap">
              {phone.display}
            </a>
            .
          </p>
          {moreHref && (
            <a href={moreHref} className="btn btn-secondary mt-6">
              All questions and answers
              <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
            </a>
          )}
        </div>

        <FaqAccordion
          items={items}
          className="divide-y divide-line rounded-3xl border border-line bg-paper px-5 sm:px-8 lg:col-span-8"
        />
      </div>
    </section>
  );
}
