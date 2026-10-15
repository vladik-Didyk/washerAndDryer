import { siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { ArrowRight, Building2, Check, Phone } from "~/shared/ui";
import { CtaBand } from "~/widgets/cta-band";
import { PageIntro } from "~/widgets/page-intro";

const QUOTE_PATH = "/landlords/quote/";

function CheckList({ items, className = "mt-5" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-ink-soft">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold">
            <Check className="h-3.5 w-3.5 text-brand-dark" strokeWidth={3} aria-hidden="true" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

// /landlords/: the two ways landlords work with us, what's included, how it goes for a
// building, and landlord questions. Facts only: no income claims and no numbers beyond the
// list price.
export default function LandlordsPage() {
  const { phone } = siteConfig;
  const { d, format, number, rich } = useI18n();
  const text = d.landlords;

  return (
    <>
      <PageIntro
        icon={Building2}
        eyebrow={text.eyebrow}
        title={text.title}
        aside={
          <ol className="space-y-3">
            {text.options.map((option, index) => (
              <li key={option.title} className="rounded-3xl bg-brand-mint p-6">
                <p className="font-display text-sm font-semibold text-brand">
                  {format(text.option, { number: index + 1 })}
                </p>
                <p className="mt-1 font-display text-xl font-bold text-ink">{option.title}</p>
                <p className="mt-2 font-display text-lg font-bold text-brand">{option.headline}</p>
              </li>
            ))}
          </ol>
        }
      >
        <p className="lead mt-5 max-w-2xl">{text.lead}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={QUOTE_PATH} className="btn btn-primary">
            {d.common.getQuote}
          </a>
          <a href={phone.tel} className="btn btn-secondary">
            <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
            {d.common.callOrText}
          </a>
        </div>
      </PageIntro>

      <section aria-labelledby="options-title" className="section border-y border-line bg-white">
        <div className="container-page">
          <h2 id="options-title" className="h2">
            {text.optionsTitle}
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            {text.options.map((option, index) => (
              <article key={option.title} className="flex flex-col rounded-3xl border border-line bg-paper p-6 sm:p-8">
                <p className="font-display text-sm font-semibold text-brand">
                  {format(text.option, { number: index + 1 })}
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold text-ink">{option.title}</h3>
                <CheckList items={option.points} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="included-title" className="section">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 id="included-title" className="h2">
              {text.includedTitle}
            </h2>
            <p className="lead mt-4">{text.includedLead}</p>
          </div>
          <CheckList items={text.included} className="lg:col-span-7 lg:pt-2" />
        </div>
      </section>

      <section aria-labelledby="steps-title" className="on-dark section bg-brand text-white">
        <div className="container-page">
          <h2 id="steps-title" className="h2 text-white">
            {text.stepsTitle}
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
            {text.steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold font-display text-xl font-extrabold text-ink"
                >
                  {number(index + 1)}
                </span>
                <div className="pt-2.5">
                  <h3 className="font-display text-xl font-bold leading-snug text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-white/85">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <a href={QUOTE_PATH} className="btn btn-gold mt-12">
            {text.startWithQuote}
            <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section aria-labelledby="landlord-faq-title" className="section">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-line bg-white p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-ink">{text.unitNeedsTitle}</h2>
              <CheckList items={d.common.hookups} />
              <p className="mt-6 text-ink-soft">{text.unitNeedsNote}</p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <h2 id="landlord-faq-title" className="h2">
              {text.faqTitle}
            </h2>
            <div className="mt-6 divide-y divide-line rounded-3xl border border-line bg-white px-5 sm:px-8">
              {text.faqs.map((faq) => (
                <div key={faq.question} className="py-6">
                  <h3 className="font-display text-[17px] font-semibold leading-snug text-ink sm:text-lg">
                    {faq.question}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{faq.answer}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-ink-soft">
              {rich(text.moreAnswers, {
                faqLink: (
                  <a href="/faq/" className="text-link">
                    {text.faqLink}
                  </a>
                ),
              })}
            </p>
          </div>
        </div>
      </section>

      <CtaBand title={text.ctaTitle} text={text.ctaText} action={{ label: d.common.getQuote, href: QUOTE_PATH }} />
    </>
  );
}
