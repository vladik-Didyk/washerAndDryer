import { useLoaderData } from "react-router";
import { cityPath, getCities } from "~/entities/area";
import { TYPE_CARD_SIZES_4UP, TypeCard, findMachine, getMachineTypes, type MachineType } from "~/entities/machine";
import { promotionText, useActivePromotions, usePrices } from "~/entities/offer";
import { MachineGallery } from "~/features/machine-gallery";
import { pagePaths, siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { useSite } from "~/shared/lib";
import {
  BadgeCheck,
  Button,
  Card,
  CheckList,
  Container,
  Eyebrow,
  Fold,
  Gift,
  Heading,
  KeepWordsWhole,
  LangLink,
  LinkList,
  MapPin,
  PhoneButton,
  Ruler,
  Section,
  SectionHeader,
  Truck,
  WasPrice,
  Wrench,
} from "~/shared/ui";
import { CtaBand } from "~/widgets/cta-band";
import { HowItWorks } from "~/widgets/how-it-works";
import { StartRental } from "~/widgets/start-rental";
import type { loader } from "../loader";

const MEASURE_GUIDE = "/guides/measure-your-laundry-space/";

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
    <Section
      aria-labelledby="summary-title"
      padded={false}
      className={`rounded-3xl border border-line bg-white p-6 shadow-[0_18px_40px_-28px_rgba(7,63,50,0.45)] sm:p-8 ${className}`}
    >
      <Heading id="summary-title" variant="none" className="sr-only">
        {text.summaryTitle}
      </Heading>
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span className="font-display text-5xl font-extrabold tracking-tight text-brand">{money(price.current)}</span>
        <span className="font-display text-lg font-bold text-ink">{d.common.aWeek}</span>
        <WasPrice price={price} className="font-display text-lg font-bold text-ink-muted" />
      </p>
      <p className="mt-1.5 text-ink-soft">{isSet ? text.forSet : text.forSingle}</p>
      <p className="mt-1 text-sm font-medium text-ink-muted">{d.common.priceTagNote}</p>

      <CheckList items={text.included} className="mt-5 space-y-2.5 border-t border-line pt-5 text-ink-soft" itemClassName="" />

      <div className="mt-6 grid gap-3">
        <Button href={`${pagePaths.start}?machine=${machine.slug}`} className="w-full">
          {d.common.startRental}
        </Button>
        <PhoneButton kind="call" variant="secondary" label={d.common.callOrText} className="w-full" />
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
    </Section>
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

// Four short facts with icons under the header: the type's typical width, then what every
// rental includes.
function MachineFacts({ machine }: { machine: MachineType }) {
  const { d } = useI18n();
  const { trust } = d.home;
  const items = [
    { Icon: Ruler, label: d.machines.animation.widths[machine.slug] },
    { Icon: Wrench, label: trust.repairs },
    { Icon: Truck, label: trust.sameWeek },
    { Icon: BadgeCheck, label: trust.noCreditCheck },
  ];
  return (
    <Section aria-label={trust.label} padded={false} className="border-y border-line bg-white">
      <Container as="ul" className="grid grid-cols-2 gap-x-4 gap-y-5 py-6 lg:grid-cols-4">
        {items.map(({ Icon, label }) => (
          <li key={label} className="flex items-center gap-3 font-display text-[15px] font-semibold leading-tight text-ink sm:text-base">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-mint text-brand">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            {label}
          </li>
        ))}
      </Container>
    </Section>
  );
}

// The type's drawing with its typical width marked under it, and the typical sizes as a short
// list (only the sizes the type's text gives: the width, and the height where we know it).
function SizeDiagram({ machine }: { machine: MachineType }) {
  const { d } = useI18n();
  const text = d.machines.page;
  return (
    <figure>
      <div className="rounded-3xl bg-brand-mint px-6 pb-6 pt-8">
        <img
          src={`/${machine.drawing}`}
          alt=""
          width={400}
          height={480}
          className="mx-auto h-56 w-auto sm:h-64"
        />
        <div aria-hidden="true" className="mx-auto mt-3 flex max-w-[16rem] items-center gap-2 text-brand">
          <span className="h-3 w-0.5 bg-brand" />
          <span className="h-0.5 flex-1 bg-brand" />
          <span className="whitespace-nowrap font-display text-sm font-bold">{d.machines.animation.widths[machine.slug]}</span>
          <span className="h-0.5 flex-1 bg-brand" />
          <span className="h-3 w-0.5 bg-brand" />
        </div>
      </div>
      <figcaption className="mt-4">
        <dl className="space-y-2">
          {machine.sizes.map((row) => (
            <div key={row.label} className="flex gap-3">
              <dt className="w-28 shrink-0 font-display font-semibold text-ink">{row.label}</dt>
              <dd className="text-ink-soft">{row.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 flex gap-2 text-sm text-ink-muted">
          <Ruler className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
          {text.measureTip}
        </p>
      </figcaption>
    </figure>
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
    { href: pagePaths.areas, label: d.common.allAreas },
  ];

  return (
    <>
      <Section id="top" aria-labelledby="hero-title" padded={false} nest={false} className="pb-12 pt-6 sm:pb-16 sm:pt-8">
        {/* Phones: heading, photos, price. From 1024px: photos left, heading and price right. */}
        <Container className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-x-12 lg:gap-y-8">
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
            <Eyebrow icon={MapPin}>{d.common.torontoAndGta}</Eyebrow>
            <Heading
              id="hero-title"
              variant="none"
              className="mt-3 font-display text-[2.125rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[2.5rem] lg:text-[2.625rem]"
            >
              {page.h1}
            </Heading>
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
        </Container>
      </Section>

      <MachineFacts machine={machine} />

      <Section id="specs" aria-labelledby="specs-title">
        <Container>
          <SectionHeader id="specs-title" title={text.specsTitle} />
        </Container>
        <Container className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <SizeDiagram machine={machine} />
          </div>

          <Card tone="mint" className="lg:col-span-5 lg:self-start">
            <Heading variant="cardSmall">{text.fitTitle}</Heading>
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
              <LangLink href={MEASURE_GUIDE} className="text-link mt-4 inline-block">
                {d.common.measureGuide}
              </LangLink>
            )}
          </Card>
        </Container>
      </Section>

      <Section id="details" aria-labelledby="details-title" className="border-y border-line bg-white">
        <Container className="max-w-4xl">
          <Heading id="details-title">{text.whoItFits}</Heading>
          <CheckList items={page.fits} className="mt-5 space-y-3 text-ink-soft" itemClassName="" />

          <Fold className="mt-10">
            <Heading variant="card">{text.whatItIs}</Heading>
            {page.whatItIs.map((paragraph) => (
              <p key={paragraph} className="mt-3 leading-relaxed text-ink-soft">
                {paragraph}
              </p>
            ))}
            <Heading variant="card" className="mt-8">
              {text.size}
            </Heading>
            <p className="mt-3 leading-relaxed text-ink-soft">{page.size}</p>
            <p className="mt-3 text-ink-soft">{text.specsLead}</p>
            <div className="mt-4">
              <SpecsTable machine={machine} />
            </div>
          </Fold>
        </Container>
      </Section>

      <HowItWorks />

      <Section aria-labelledby="other-types-title">
        <Container>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <Heading id="other-types-title">{text.otherTypes}</Heading>
            <LangLink href={pagePaths.machines} className="text-link shrink-0">
              {d.common.compareAllTypes}
            </LangLink>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {otherTypes.map((other) => (
              <TypeCard key={other.slug} machine={other} price={prices[other.item]} sizes={TYPE_CARD_SIZES_4UP} />
            ))}
          </ul>
          <LinkList
            id="areas-links-title"
            title={text.whereWeDeliver}
            links={cityLinks}
            className="mt-12"
          />
        </Container>
      </Section>

      <CtaBand
        title={format(text.ctaTitle, { title: machine.title, price: money(prices[machine.item].current) })}
        text={text.ctaText}
      />
      <StartRental />
    </>
  );
}
