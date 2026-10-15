import { ArrowRight, Building2, Check, MessageSquare, Phone } from "lucide-react";
import { siteConfig } from "../content/config";
import { hookupChecklist } from "../content/machines";
import { landlordOptions, landlordIncluded, landlordSteps, landlordFaqs } from "../content/landlords";

const QUOTE_PATH = "/landlords/quote/";

function CheckList({ items, className = "mt-5" }) {
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
// building, and landlord questions. Content in src/content/landlords.js. No income claims.
export default function LandlordsPage() {
  const { phone } = siteConfig;

  return (
    <>
      <section id="top" aria-labelledby="hero-title" className="overflow-hidden">
        <div className="container-page grid gap-10 pb-14 pt-8 sm:pt-10 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pb-16">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-brand">
              <Building2 className="h-4 w-4" aria-hidden="true" />
              For landlords
            </p>
            <h1
              id="hero-title"
              className="mt-3 font-display text-[2.25rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[2.75rem] lg:text-[3rem]"
            >
              Washers and dryers for your rental units
            </h1>
            <p className="lead mt-5 max-w-2xl">
              Two ways to put laundry in your units. Either way, we install the
              machines, take the old ones away, and repairs are included.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={QUOTE_PATH} className="btn btn-primary">
                Get a quote
              </a>
              <a href={phone.tel} className="btn btn-secondary">
                <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
                Call or text {phone.display}
              </a>
            </div>
          </div>

          <ol className="space-y-3 lg:col-span-5">
            {landlordOptions.map((option, index) => (
              <li key={option.title} className="rounded-3xl bg-brand-mint p-6">
                <p className="font-display text-sm font-semibold text-brand">Option {index + 1}</p>
                <p className="mt-1 font-display text-xl font-bold text-ink">{option.title}</p>
                <p className="mt-2 font-display text-lg font-bold text-brand">{option.headline}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="options-title" className="section border-y border-line bg-white">
        <div className="container-page">
          <h2 id="options-title" className="h2">
            Two ways to work with us
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            {landlordOptions.map((option, index) => (
              <article key={option.title} className="flex flex-col rounded-3xl border border-line bg-paper p-6 sm:p-8">
                <p className="font-display text-sm font-semibold text-brand">Option {index + 1}</p>
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
              Included either way
            </h2>
            <p className="lead mt-4">
              Delivery and installation are quoted per job, before anyone pays.
            </p>
          </div>
          <CheckList items={landlordIncluded} className="lg:col-span-7 lg:pt-2" />
        </div>
      </section>

      <section aria-labelledby="steps-title" className="on-dark section bg-brand text-white">
        <div className="container-page">
          <h2 id="steps-title" className="h2 text-white">
            How it works for a building
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
            {landlordSteps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold font-display text-xl font-extrabold text-ink"
                >
                  {index + 1}
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
            Start with a quote
            <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section aria-labelledby="landlord-faq-title" className="section">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-line bg-white p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-ink">What each unit needs</h2>
              <CheckList items={hookupChecklist} />
              <p className="mt-6 text-ink-soft">
                Tell us what each unit has, and we'll tell you what fits.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <h2 id="landlord-faq-title" className="h2">
              Landlord questions
            </h2>
            <div className="mt-6 divide-y divide-line rounded-3xl border border-line bg-white px-5 sm:px-8">
              {landlordFaqs.map((faq) => (
                <div key={faq.question} className="py-6">
                  <h3 className="font-display text-[17px] font-semibold leading-snug text-ink sm:text-lg">
                    {faq.question}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{faq.answer}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-ink-soft">
              More answers on the{" "}
              <a href="/faq/" className="text-link">
                FAQ page
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="landlord-cta-title" className="pb-16 sm:pb-20 lg:pb-24">
        <div className="container-page">
          <div className="grid gap-6 rounded-3xl bg-brand-mint px-5 py-8 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-7">
              <h2 id="landlord-cta-title" className="h2">
                Get a quote for your building
              </h2>
              <p className="lead mt-3">
                Tell us the address, the number of units and what's there now.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-5 lg:justify-end">
              <a href={QUOTE_PATH} className="btn btn-primary">
                Get a quote
              </a>
              <a href={phone.sms} className="btn btn-secondary">
                <MessageSquare className="h-[18px] w-[18px]" aria-hidden="true" />
                Text {phone.display}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
