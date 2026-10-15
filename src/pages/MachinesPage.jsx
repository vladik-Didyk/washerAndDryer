import { Check, Phone, Ruler } from "lucide-react";
import { siteConfig } from "../content/config";
import { hookupChecklist, machineTypes } from "../content/machines";
import { hasRoute, machinePath } from "../content/routes";
import Machines from "../components/Machines";
import LinkList from "../components/LinkList";
import PageIntro from "../components/PageIntro";
import KeepWordsWhole from "../components/KeepWordsWhole";
import BookingForm from "../components/BookingForm";

const COLUMNS = [
  { key: "width", label: "Width" },
  { key: "loads", label: "Washer loads from" },
  { key: "goodFor", label: "Good for" },
];

const GUIDES = [
  { href: "/guides/measure-your-laundry-space/", label: "How to measure your laundry space" },
  { href: "/guides/stackable-vs-laundry-centre/", label: "Stackable pair or laundry centre?" },
  { href: "/guides/3-prong-vs-4-prong-dryer-outlet/", label: "3-prong or 4-prong dryer outlet?" },
];

const price = (machine) => `$${machine.price.toFixed(2)}/week`;

// Side by side on wide screens; one card per type on phones. Same data either way.
function Compare() {
  return (
    <section aria-labelledby="compare-title" className="section">
      <div className="container-page">
        <h2 id="compare-title" className="h2">
          Compare the types
        </h2>
        <p className="lead mt-4 max-w-2xl">
          Widths are typical; the exact size depends on the machine we have for you.
          Tell us your measurements and we check them first.
        </p>

        <ul className="mt-8 space-y-3 md:hidden">
          {machineTypes.map((machine) => (
            <li key={machine.slug} className="rounded-2xl border border-line bg-white p-5">
              <div className="flex items-baseline justify-between gap-3">
                <a href={machinePath(machine)} className="text-link font-display text-lg">
                  <KeepWordsWhole text={machine.title} />
                </a>
                <span className="shrink-0 font-display font-bold text-brand">{price(machine)}</span>
              </div>
              <dl className="mt-3 space-y-1.5 text-[15px]">
                {COLUMNS.map((column) => (
                  <div key={column.key} className="flex gap-2">
                    <dt className="w-36 shrink-0 text-ink-muted">{column.label}</dt>
                    <dd className="text-ink-soft">{machine.compare[column.key]}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>

        <div className="mt-10 hidden overflow-hidden rounded-3xl border border-line bg-white md:block">
          <table className="w-full text-left">
            <thead className="bg-brand-mint font-display text-[15px] text-ink">
              <tr>
                <th scope="col" className="w-64 px-6 py-4 font-semibold">Type</th>
                {COLUMNS.map((column) => (
                  <th key={column.key} scope="col" className="px-6 py-4 font-semibold">
                    {column.label}
                  </th>
                ))}
                <th scope="col" className="px-6 py-4 text-right font-semibold">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {machineTypes.map((machine) => (
                <tr key={machine.slug}>
                  <th scope="row" className="px-6 py-4 font-medium">
                    <a href={machinePath(machine)} className="text-link">
                      <KeepWordsWhole text={machine.title} />
                    </a>
                  </th>
                  {COLUMNS.map((column) => (
                    <td key={column.key} className="px-6 py-4 text-ink-soft">
                      {machine.compare[column.key]}
                    </td>
                  ))}
                  <td className="whitespace-nowrap px-6 py-4 text-right font-display font-bold text-brand">
                    {price(machine)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// /machines/: every machine type, the Drawings/Photos switch, a comparison and the hookups.
export default function MachinesPage() {
  const { phone, prices } = siteConfig;
  const guides = GUIDES.filter((guide) => hasRoute(guide.href));

  return (
    <>
      <PageIntro icon={Ruler} eyebrow="Five types, two prices" title="Washer & dryer types we rent">
        <p className="lead mt-5 max-w-2xl">
          Any washer and dryer set is ${prices.setText} a week. One machine on its own
          is ${prices.singleText} a week. Every type comes with repairs and old-machine
          haul-away included.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="#request" className="btn btn-primary">
            Check availability
          </a>
          <a href={phone.tel} className="btn btn-secondary">
            <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
            Call or text {phone.display}
          </a>
        </div>
      </PageIntro>

      <Machines showAllLink={false} />
      <Compare />

      <section
        aria-labelledby="hookups-title"
        className="section border-y border-line bg-white"
      >
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 id="hookups-title" className="h2">
              What every machine needs
            </h2>
            <ul className="mt-6 space-y-3">
              {hookupChecklist.map((item) => (
                <li key={item} className="flex gap-3 text-ink-soft">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold">
                    <Check className="h-3.5 w-3.5 text-brand-dark" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-ink-soft">
              Not sure what you have? Text a photo of the space to{" "}
              <a href={phone.sms} className="text-link whitespace-nowrap">
                {phone.display}
              </a>{" "}
              and we'll tell you what fits.
            </p>
          </div>
          {guides.length > 0 && (
            <div className="rounded-3xl border border-line bg-paper p-6 sm:p-8 lg:col-span-5 lg:self-start">
              <LinkList id="machine-guides-title" title="Before you choose" links={guides} />
            </div>
          )}
        </div>
      </section>

      <BookingForm />
    </>
  );
}
