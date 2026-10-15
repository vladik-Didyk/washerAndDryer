import { getMachineTypes, machinePath, type MachineType } from "~/entities/machine";
import { usePrices } from "~/entities/offer";
import { pagePaths, siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { useSite } from "~/shared/lib";
import {
  Button,
  Card,
  CheckList,
  Container,
  Heading,
  KeepWordsWhole,
  LangLink,
  LinkList,
  PhoneButton,
  Ruler,
  Section,
  SectionHeader,
  WasPrice,
} from "~/shared/ui";
import { CtaBand } from "~/widgets/cta-band";
import { MachineShowcase } from "~/widgets/machine-showcase";
import { PageIntro } from "~/widgets/page-intro";
import { StartRental } from "~/widgets/start-rental";

const COLUMNS: Array<keyof MachineType["compare"]> = ["width", "loads", "goodFor"];

const GUIDES = [
  { href: "/guides/measure-your-laundry-space/", key: "measure" },
  { href: "/guides/stackable-vs-laundry-centre/", key: "stackableVsCentre" },
  { href: "/guides/3-prong-vs-4-prong-dryer-outlet/", key: "outlet" },
] as const;

// The weekly price of a type, with the list price struck through while a promotion lowers it.
function TypePrice({ machine }: { machine: MachineType }) {
  const { d, format, money } = useI18n();
  const price = usePrices()[machine.item];
  return (
    <>
      {format(d.common.pricePerWeek, { price: money(price.current) })}
      <WasPrice price={price} className="ml-2 text-sm font-normal text-ink-muted" />
    </>
  );
}

// Side by side on wide screens; one card per type on phones. Same data either way.
function Compare() {
  const { d } = useI18n();
  const text = d.machines.index;
  const machineTypes = getMachineTypes(d);
  return (
    <Section aria-labelledby="compare-title">
      <Container>
        <SectionHeader id="compare-title" title={text.compareTitle} lead={text.compareLead} leadClassName="mt-4 max-w-2xl" />

        <ul className="mt-8 space-y-3 md:hidden">
          {machineTypes.map((machine) => (
            <li key={machine.slug} className="rounded-2xl border border-line bg-white p-5">
              <div className="flex items-baseline justify-between gap-3">
                <LangLink href={machinePath(machine)} className="text-link font-display text-lg">
                  <KeepWordsWhole text={machine.title} />
                </LangLink>
                <span className="shrink-0 font-display font-bold text-brand">
                  <TypePrice machine={machine} />
                </span>
              </div>
              <dl className="mt-3 space-y-1.5 text-[15px]">
                {COLUMNS.map((column) => (
                  <div key={column} className="flex gap-2">
                    <dt className="w-36 shrink-0 text-ink-muted">{text.columns[column]}</dt>
                    <dd className="text-ink-soft">{machine.compare[column]}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>

        <Card padding="none" className="mt-10 hidden overflow-hidden md:block">
          <table className="w-full text-left">
            <thead className="bg-brand-mint font-display text-[15px] text-ink">
              <tr>
                <th scope="col" className="w-64 px-6 py-4 font-semibold">
                  {text.columns.type}
                </th>
                {COLUMNS.map((column) => (
                  <th key={column} scope="col" className="px-6 py-4 font-semibold">
                    {text.columns[column]}
                  </th>
                ))}
                <th scope="col" className="px-6 py-4 text-right font-semibold">
                  {text.columns.price}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {machineTypes.map((machine) => (
                <tr key={machine.slug}>
                  <th scope="row" className="px-6 py-4 font-medium">
                    <LangLink href={machinePath(machine)} className="text-link">
                      <KeepWordsWhole text={machine.title} />
                    </LangLink>
                  </th>
                  {COLUMNS.map((column) => (
                    <td key={column} className="px-6 py-4 text-ink-soft">
                      {machine.compare[column]}
                    </td>
                  ))}
                  <td className="whitespace-nowrap px-6 py-4 text-right font-display font-bold text-brand">
                    <TypePrice machine={machine} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Container>
    </Section>
  );
}

// /machines/: every machine type, the Drawings/Photos switch, a comparison and the hookups.
export default function MachinesPage() {
  const { phone } = siteConfig;
  const site = useSite();
  const { d, rich } = useI18n();
  const text = d.machines.index;
  const guides = GUIDES.filter((guide) => site.has(guide.href)).map((guide) => ({
    href: guide.href,
    label: text.guides[guide.key],
  }));

  return (
    <>
      <PageIntro icon={Ruler} eyebrow={text.eyebrow} title={text.title}>
        <p className="lead mt-5 max-w-2xl">{text.lead}</p>
        <p className="mt-2 text-sm text-ink-muted">{d.common.pricesNote}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href={pagePaths.start}>{d.common.startRental}</Button>
          <PhoneButton kind="call" variant="secondary" label={d.common.callOrText} />
        </div>
      </PageIntro>

      <MachineShowcase showAllLink={false} />
      <Compare />

      <Section aria-labelledby="hookups-title" className="border-y border-line bg-white">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Heading id="hookups-title">{text.hookupsTitle}</Heading>
            <CheckList items={d.common.hookups} className="mt-6 space-y-3" />
            <p className="mt-6 text-ink-soft">
              {rich(d.common.textPhotoFits, {
                phoneLink: (
                  <a href={phone.sms} className="text-link whitespace-nowrap">
                    {phone.display}
                  </a>
                ),
              })}
            </p>
          </div>
          {guides.length > 0 && (
            <Card tone="paper" className="lg:col-span-5 lg:self-start">
              <LinkList id="machine-guides-title" title={text.guidesTitle} links={guides} />
            </Card>
          )}
        </Container>
      </Section>

      <CtaBand
        title={text.ctaTitle}
        text={rich(text.ctaText, { phoneSpan: <span className="whitespace-nowrap">{phone.display}</span> })}
      />
      <StartRental />
    </>
  );
}
