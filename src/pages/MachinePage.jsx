import { Check, Gift, MapPin, Phone } from "lucide-react";
import { siteConfig } from "../content/config";
import { cities } from "../content/cities";
import { hookupChecklist, machineTypes } from "../content/machines";
import { firstWeekFreeActive, firstWeekFreeOffer } from "../content/offers";
import { cityPath, hasRoute } from "../content/routes";
import MachineGallery from "../components/MachineGallery";
import TrustStrip from "../components/TrustStrip";
import TypeCard from "../components/TypeCard";
import KeepWordsWhole from "../components/KeepWordsWhole";
import HowItWorks from "../components/HowItWorks";
import LinkList from "../components/LinkList";
import CtaBand from "../components/CtaBand";
import BookingForm from "../components/BookingForm";

const MEASURE_GUIDE = "/guides/measure-your-laundry-space/";

// Four cards in a row from 1024px.
const RELATED_CARD_SIZES = "(min-width: 1024px) 17rem, (min-width: 640px) 50vw, 38vw";

function CheckItem({ children }) {
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
// the first-week offer while it runs (decided at build time, src/content/offers.js).
function RentalSummary({ machine, className = "" }) {
  const { prices, phone } = siteConfig;
  const isSet = machine.price === prices.set;
  const included = [
    "Delivery and installation quoted before you pay",
    "Repairs included",
    "Your old machine taken away at no charge",
    "No credit check",
  ];

  return (
    <section
      aria-labelledby="summary-title"
      className={`rounded-3xl border border-line bg-white p-6 shadow-[0_18px_40px_-28px_rgba(7,63,50,0.45)] sm:p-8 ${className}`}
    >
      <h2 id="summary-title" className="sr-only">
        Price and what's included
      </h2>
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span className="font-display text-5xl font-extrabold tracking-tight text-brand">
          ${machine.price.toFixed(2)}
        </span>
        <span className="font-display text-lg font-bold text-ink">a week</span>
      </p>
      <p className="mt-1.5 text-ink-soft">
        {isSet ? "For the washer and dryer set." : "For one machine: a washer or a dryer."}
      </p>
      <p className="mt-1 text-sm font-medium text-ink-muted">No HST charged · Prices in CAD</p>

      <ul className="mt-5 space-y-2.5 border-t border-line pt-5 text-ink-soft">
        {included.map((item) => (
          <CheckItem key={item}>{item}</CheckItem>
        ))}
      </ul>

      <div className="mt-6 grid gap-3">
        <a href="#request" className="btn btn-primary w-full">
          Start your rental
        </a>
        <a href={phone.tel} className="btn btn-secondary w-full">
          <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
          Call or text {phone.display}
        </a>
      </div>

      {firstWeekFreeActive && (
        <p className="mt-5 flex gap-2.5 rounded-2xl bg-gold/20 px-4 py-3 text-sm leading-relaxed text-ink">
          <Gift className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
          <span>
            <strong className="font-semibold">{firstWeekFreeOffer.title}.</strong>{" "}
            {firstWeekFreeOffer.note}
          </span>
        </p>
      )}

      <p className="mt-4 text-sm leading-relaxed text-ink-muted">
        ${prices.deposit} refundable deposit. 52-week minimum, then week to week.{" "}
        {isSet
          ? `Need only one machine? $${prices.singleText} a week.`
          : `Need both? A washer + dryer set is $${prices.setText} a week.`}
      </p>
    </section>
  );
}

// Typical sizes (in inches and centimetres, src/content/machines.js) and the hookups needed.
function SpecsTable({ machine }) {
  const rows = [
    ...machine.sizes,
    { label: "Washer loads from", value: machine.compare.loads },
    { label: "Good for", value: machine.compare.goodFor },
  ];
  const label = "w-[38%] py-4 pr-4 text-left align-top font-display font-semibold text-ink sm:w-[34%]";

  return (
    <table className="w-full text-[15px] sm:text-base">
      <caption className="sr-only">Typical sizes and hookups: {machine.title}</caption>
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
            Hookups needed
          </th>
          <td className="py-4 text-ink-soft">
            <ul className="space-y-1.5">
              {hookupChecklist.map((item) => (
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
// the other types, and the request form.
export default function MachinePage({ machine }) {
  const { phone } = siteConfig;
  const { page } = machine;
  const otherTypes = machineTypes.filter((other) => other.slug !== machine.slug);
  const cityLinks = [
    ...cities.map((city) => ({ href: cityPath(city), label: city.name })),
    { href: "/areas/", label: "All areas" },
  ];

  return (
    <>
      <section id="top" aria-labelledby="hero-title" className="pb-12 pt-6 sm:pb-16 sm:pt-8">
        {/* Phones: heading, photos, price. From 1024px: photos left, heading and price right. */}
        <div className="container-page grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-x-12 lg:gap-y-8">
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
            <p className="inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-brand">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Toronto &amp; the GTA
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
            Sizes and hookups
          </h2>
          <p className="lead mt-4 max-w-2xl">
            Typical sizes. The exact size depends on the machine we have for you, so we
            check your measurements first.
          </p>
        </div>
        <div className="container-page mt-8 grid gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="rounded-3xl border border-line bg-white px-5 sm:px-8 lg:col-span-7">
            <SpecsTable machine={machine} />
          </div>

          <div className="rounded-3xl bg-brand-mint p-6 sm:p-8 lg:col-span-5 lg:self-start">
            <h2 className="font-display text-xl font-bold text-ink">Not sure it fits?</h2>
            <p className="mt-3 text-ink-soft">
              Text a photo of the space to{" "}
              <a href={phone.sms} className="text-link whitespace-nowrap">
                {phone.display}
              </a>{" "}
              and we'll check.
            </p>
            {hasRoute(MEASURE_GUIDE) && (
              <a href={MEASURE_GUIDE} className="text-link mt-4 inline-block">
                How to measure your laundry space
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
              What it is
            </h2>
            {page.whatItIs.map((paragraph) => (
              <p key={paragraph} className="lead mt-4">
                {paragraph}
              </p>
            ))}

            <h2 className="mt-12 font-display text-2xl font-bold text-ink">Size</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">{page.size}</p>
          </div>

          <div className="rounded-3xl border border-line bg-paper p-6 sm:p-8 lg:col-span-5 lg:self-start">
            <h2 className="font-display text-xl font-bold text-ink">Who it fits</h2>
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
              Other machine types
            </h2>
            <a href="/machines/" className="text-link shrink-0">
              Compare all machine types
            </a>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {otherTypes.map((other) => (
              <TypeCard key={other.slug} machine={other} sizes={RELATED_CARD_SIZES} />
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink-muted">
            Photos are examples of each type, not our machines. Brand and model depend on
            what's available.
          </p>
          <LinkList
            id="areas-links-title"
            title="Where we deliver"
            links={cityLinks}
            className="mt-12"
          />
        </div>
      </section>

      <CtaBand
        title={`${machine.title}: $${machine.price.toFixed(2)} a week`}
        text="Delivery and installation quoted before you pay. Repairs included while you rent."
      />
      <BookingForm />
    </>
  );
}
