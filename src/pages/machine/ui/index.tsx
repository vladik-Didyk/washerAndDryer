import type { ReactNode } from "react";
import { useLoaderData } from "react-router";
import { cityPath, getCities } from "~/entities/area";
import { TYPE_CARD_SIZES_4UP, TypeCard, findMachine, getMachineTypes, type MachineType } from "~/entities/machine";
import { promotionText, useActivePromotions, usePrices } from "~/entities/offer";
import { MachineGallery } from "~/features/machine-gallery";
import { siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { useSite } from "~/shared/lib";
import { Check, Gift, KeepWordsWhole, LinkList, MapPin, Phone, WasPrice } from "~/shared/ui";
import { CtaBand } from "~/widgets/cta-band";
import { HowItWorks } from "~/widgets/how-it-works";
import { StartRental } from "~/widgets/start-rental";
import { TrustStrip } from "~/widgets/trust-strip";
import type { loader } from "../loader";

const MEASURE_GUIDE = "/guides/measure-your-laundry-space/";

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold">
        <Check className="h-3.5 w-3.5 text-brand-dark" strokeWidth={3} aria-hidden="true" />
      </span>
      {children}
    </li>
  );
}

// The price box beside the gallery: weekly price, what's included, the two ways to start, and
// the running promotions (decided per request, entities/offer).
function RentalSummary({ machine, className = "" }: { machine: MachineType; className?: string }) {
  const { phone } = siteConfig;
  const i18n = useI18n();
  const { d, money } = i18n;
  const text = d.machines.page;
  const price = usePrices()[machine.item];
  const promotions = useActivePromotions().filter((promotion) => promotion.appliesTo.includes(machine.item));
  const isSet = machine.item === "set";

  return (
    <section
      aria-labelledby="summary-title"
      className={`rounded-3xl border border-line bg-white p-6 shadow-[0_18px_40px_-28px_rgba(7,63,50,0.45)] sm:p-8 ${className}`}
    >
      <h2 id="summary-title" className="sr-only">
        {text.summaryTitle}
      </h2>
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span className="font-display text-5xl font-extrabold tracking-tight text-brand">{money(price.current)}</span>
        <span className="font-display text-lg font-bold text-ink">{d.common.aWeek}</span>
        <WasPrice price={price} className="font-display text-lg font-bold text-ink-muted" />
      </p>
      <p className="mt-1.5 text-ink-soft">{isSet ? text.forSet : text.forSingle}</p>
      <p className="mt-1 text-sm font-medium text-ink-muted">{d.common.priceTagNote}</p>

      <ul className="mt-5 space-y-2.5 border-t border-line pt-5 text-ink-soft">
        {text.included.map((item) => (
          <CheckItem key={item}>{item}</CheckItem>
        ))}
      </ul>

      <div className="mt-6 grid gap-3">
        <a href={`/start/?machine=${machine.slug}`} className="btn btn-primary w-full">
          {d.common.startRental}
        </a>
        <a href={phone.tel} className="btn btn-secondary w-full">
          <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
          {d.common.callOrText}
        </a>
      </div>

      {promotions.map((promotion) => {
        const offer = promotionText(promotion, i18n);
        return (
          <p
            key={promotion.id}
            className="mt-5 flex gap-2.5 rounded-2xl bg-gold/20 px-4 py-3 text-sm leading-relaxed text-ink"
          >
            <Gift className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
            <span>
              <strong className="font-semibold">{offer.title}.</strong> {offer.note}
            </span>
          </p>
        );
      })}

      <p className="mt-4 text-sm leading-relaxed text-ink-muted">
        {text.terms} {isSet ? text.needOne : text.needBoth}
      </p>
    </section>
  );
}

// Typical sizes (in inches and centimetres, entities/machine) and the hookups needed.
function SpecsTable({ machine }: { machine: MachineType }) {
  const { d, format } = useI18n();
  const text = d.machines.page;
  const rows = [
    ...machine.sizes,
    { label: text.loadsFrom, value: machine.compare.loads },
    { label: text.goodFor, value: machine.compare.goodFor },
  ];
  const label = "w-[38%] py-4 pr-4 text-left align-top font-display font-semibold text-ink sm:w-[34%]";

  return (
    <table className="w-full text-[15px] sm:text-base">
      <caption className="sr-only">{format(text.specsCaption, { title: machine.title })}</caption>
      <tbody className="divide-y divide-line">
        {rows.map((row) => (
          <tr key={row.label}>
            <th scope="row" className={label}>
              {row.label}
            </th>
            <td className="py-4 text-ink-soft">{row.value}</td>
          </tr>
        ))}
        <tr>
          <th scope="row" className={label}>
            {text.hookupsNeeded}
          </th>
          <td className="py-4 text-ink-soft">
            <ul className="space-y-1.5">
              {d.common.hookups.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>
                    <KeepWordsWhole text={item} />
                  </span>
                </li>
              ))}
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

// /machines/<slug>/: photos and price first, then sizes, what the type is, how renting works,
// the other types, and the way to start a rental.
export default function MachinePage() {
  const { slug } = useLoaderData<typeof loader>();
  const { d, format, money, rich } = useI18n();
  const text = d.machines.page;
  const machine = findMachine(d, slug)!;
  const site = useSite();
  const prices = usePrices();
  const { phone } = siteConfig;
  const { page } = machine;
  const otherTypes = getMachineTypes(d).filter((other) => other.slug !== machine.slug);
  const cityLinks = [
    ...getCities(d).map((city) => ({ href: cityPath(city), label: city.name })),
    { href: "/areas/", label: d.common.allAreas },
  ];

  return (
    <>
      <section id="top" aria-labelledby="hero-title" className="pb-12 pt-6 sm:pb-16 sm:pt-8">
        {/* Phones: heading, photos, price. From 1024px: photos left, heading and price right. */}
        <div className="container-page grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-x-12 lg:gap-y-8">
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
            <p className="inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-brand">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {d.common.torontoAndGta}
            </p>
            <h1
              id="hero-title"
              className="mt-3 font-display text-[2.125rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[2.5rem] lg:text-[2.625rem]"
            >
              {page.h1}
            </h1>
            <p className="lead mt-4">{page.intro}</p>
          </div>

          <MachineGallery
            machine={machine}
            className="mx-auto w-full max-w-xl lg:col-span-6 lg:row-span-2 lg:row-start-1 lg:max-w-none"
          />

          <RentalSummary
            machine={machine}
            className="mx-auto w-full max-w-xl lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:max-w-none"
          />
        </div>
      </section>

      <TrustStrip />

      <section id="specs" aria-labelledby="specs-title" className="section">
        <div className="container-page">
          <h2 id="specs-title" className="h2">
            {text.specsTitle}
          </h2>
          <p className="lead mt-4 max-w-2xl">{text.specsLead}</p>
        </div>
        <div className="container-page mt-8 grid gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="rounded-3xl border border-line bg-white px-5 sm:px-8 lg:col-span-7">
            <SpecsTable machine={machine} />
          </div>

          <div className="rounded-3xl bg-brand-mint p-6 sm:p-8 lg:col-span-5 lg:self-start">
            <h2 className="font-display text-xl font-bold text-ink">{text.fitTitle}</h2>
            <p className="mt-3 text-ink-soft">
              {rich(text.fitText, {
                phoneLink: (
                  <a href={phone.sms} className="text-link whitespace-nowrap">
                    {phone.display}
                  </a>
                ),
              })}
            </p>
            {site.has(MEASURE_GUIDE) && (
              <a href={MEASURE_GUIDE} className="text-link mt-4 inline-block">
                {d.common.measureGuide}
              </a>
            )}
          </div>
        </div>
      </section>

      <section
        id="details"
        aria-labelledby="details-title"
        className="section border-y border-line bg-white"
      >
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 id="details-title" className="h2">
              {text.whatItIs}
            </h2>
            {page.whatItIs.map((paragraph) => (
              <p key={paragraph} className="lead mt-4">
                {paragraph}
              </p>
            ))}

            <h2 className="mt-12 font-display text-2xl font-bold text-ink">{text.size}</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">{page.size}</p>
          </div>

          <div className="rounded-3xl border border-line bg-paper p-6 sm:p-8 lg:col-span-5 lg:self-start">
            <h2 className="font-display text-xl font-bold text-ink">{text.whoItFits}</h2>
            <ul className="mt-4 space-y-3 text-ink-soft">
              {page.fits.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <HowItWorks />

      <section aria-labelledby="other-types-title" className="section">
        <div className="container-page">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="other-types-title" className="h2">
              {text.otherTypes}
            </h2>
            <a href="/machines/" className="text-link shrink-0">
              {d.common.compareAllTypes}
            </a>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {otherTypes.map((other) => (
              <TypeCard key={other.slug} machine={other} price={prices[other.item]} sizes={TYPE_CARD_SIZES_4UP} />
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink-muted">{d.common.examplePhotosNote}</p>
          <LinkList
            id="areas-links-title"
            title={text.whereWeDeliver}
            links={cityLinks}
            className="mt-12"
          />
        </div>
      </section>

      <CtaBand
        title={format(text.ctaTitle, { title: machine.title, price: money(prices[machine.item].current) })}
        text={text.ctaText}
      />
      <StartRental />
    </>
  );
}
