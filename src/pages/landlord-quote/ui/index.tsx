import { useActionData } from "react-router";
import { LandlordQuoteForm } from "~/features/landlord-quote-form";
import { siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { Building2, MessageSquare, Phone } from "~/shared/ui";
import type { action } from "../action";

// /landlords/quote/: the landlord quote form, with what happens after sending it.
export default function LandlordQuotePage() {
  const result = useActionData<typeof action>();
  const { phone } = siteConfig;
  const { d, number } = useI18n();
  const { quote } = d.landlords;

  return (
    <section id="top" aria-labelledby="hero-title" className="pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-brand">
            <Building2 className="h-4 w-4" aria-hidden="true" />
            {quote.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="mt-3 font-display text-[2.25rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[2.75rem]"
          >
            {quote.title}
          </h1>
          <p className="lead mt-5">
            {quote.lead}{" "}
            <a href="/landlords/" className="text-link">
              {quote.howOptionsWork}
            </a>
          </p>

          <h2 className="mt-10 font-display text-xl font-bold text-ink">{quote.nextTitle}</h2>
          <ol className="mt-4 space-y-3">
            {quote.next.map((step, index) => (
              <li key={step} className="flex gap-3 text-ink-soft">
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold font-display text-sm font-bold text-ink"
                >
                  {number(index + 1)}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-3xl border border-brand-mint-strong bg-brand-mint p-6">
            <p className="font-display font-semibold text-ink">{d.common.preferCallOrText}</p>
            <p className="mt-1 font-display text-2xl font-bold text-brand">{phone.display}</p>
            <p className="mt-1 text-sm text-ink-muted">{d.common.hoursSentence}</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <a href={phone.tel} className="btn btn-primary">
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

        <div id="landlord-quote" className="lg:col-span-7">
          <LandlordQuoteForm result={result} />
        </div>
      </div>
    </section>
  );
}
