import { Check, Clock, Gift, MapPin, MessageSquare, Phone } from "lucide-react";
import { siteConfig } from "../content/config";
import { firstWeekFreeActive } from "../content/offers";
import { machineTypes } from "../content/machines";
import { machinePath } from "../content/routes";

// The offer in Spanish or Russian. Text comes from src/content/languages.js; machine type
// names link to the English pages, which have the details and the request form.
export default function LanguagePage({ content }) {
  const { phone, prices } = siteConfig;

  return (
    <>
      <section id="top" aria-labelledby="hero-title" className="overflow-hidden">
        <div className="container-page pb-14 pt-10 sm:pt-14 lg:pb-16 lg:pt-16">
          <p className="inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-brand">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {content.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="mt-3 max-w-4xl font-display text-[2.25rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[2.75rem] lg:text-[3rem]"
          >
            {content.h1}
          </h1>
          <p className="mt-6 font-display text-3xl font-extrabold text-brand sm:text-4xl">
            {content.priceSet(prices.setText)}
          </p>
          <p className="mt-2 text-lg text-ink-soft">{content.priceSingle(prices.singleText)}</p>
          {firstWeekFreeActive && (
            <p className="mt-5 flex max-w-3xl gap-3 rounded-2xl bg-gold/20 px-5 py-4 text-ink">
              <Gift className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <span>{content.firstWeekFree}</span>
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={phone.tel} className="btn btn-primary">
              <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
              {content.call}: {phone.display}
            </a>
            <a href={phone.sms} className="btn btn-secondary">
              <MessageSquare className="h-[18px] w-[18px]" aria-hidden="true" />
              {content.text}
            </a>
          </div>
          <p className="mt-4 flex items-center gap-2 text-ink-soft">
            <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
            {content.hours}
          </p>
        </div>
      </section>

      <section
        aria-labelledby="included-title"
        className="section border-y border-line bg-white"
      >
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 id="included-title" className="h2">
              {content.includedTitle}
            </h2>
            <ul className="mt-6 space-y-3">
              {content.included.map((item) => (
                <li key={item} className="flex gap-3 text-ink-soft">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold">
                    <Check className="h-3.5 w-3.5 text-brand-dark" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h2">{content.termsTitle}</h2>
            <ul className="mt-6 space-y-3">
              {content.terms(prices.deposit).map((item) => (
                <li key={item} className="flex gap-3 text-ink-soft">
                  <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="types-title" className="section">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 id="types-title" className="h2">
              {content.machinesTitle}
            </h2>
            <ul className="mt-6 divide-y divide-line rounded-3xl border border-line bg-white px-5 sm:px-6">
              {machineTypes.map((machine) => (
                <li key={machine.slug} className="flex items-baseline justify-between gap-4 py-4">
                  <a href={machinePath(machine)} className="text-link font-medium">
                    {content.machines[machine.slug]}
                  </a>
                  <span className="shrink-0 font-display font-bold text-brand">
                    ${machine.price.toFixed(2)} {content.perWeek}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h2">{content.needsTitle}</h2>
            <p className="lead mt-6">{content.needs}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="area-title" className="pb-16 sm:pb-20 lg:pb-24">
        <div className="container-page">
          <div className="grid gap-8 rounded-3xl bg-brand-mint px-5 py-8 sm:p-10 lg:grid-cols-2 lg:gap-10 lg:p-12">
            <div>
              <h2 id="area-title" className="h2">
                {content.areaTitle}
              </h2>
              <ul className="mt-5 space-y-2">
                {content.area.map((name) => (
                  <li key={name} className="flex items-center gap-2 font-semibold text-ink">
                    <MapPin className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                    {name}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-ink-soft">{content.areaFar}</p>
            </div>
            <div>
              <h2 className="h2">{content.contactTitle}</h2>
              <p className="mt-4 font-display text-3xl font-bold text-brand">
                {phone.display}
              </p>
              <p className="mt-2 text-ink-soft">{content.hours}</p>
              <p className="mt-1 text-ink-soft">{content.languagesLine}</p>
              <div className="mt-6 grid max-w-sm grid-cols-2 gap-3">
                <a href={phone.tel} className="btn btn-primary">
                  <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
                  {content.call}
                </a>
                <a href={phone.sms} className="btn btn-secondary">
                  <MessageSquare className="h-[18px] w-[18px]" aria-hidden="true" />
                  {content.text}
                </a>
              </div>
              <p className="mt-6">
                <a href="/" hrefLang="en" className="text-link">
                  {content.englishLink}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
