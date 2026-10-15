import { useI18n } from "~/shared/i18n";
import { ArrowRight, KeepWordsWhole, WasPrice } from "~/shared/ui";
import { machinePath, type MachineType } from "../data";
import { MachineImage } from "./MachineImage";

// Card widths for the photo's srcset: the five-type grid (widgets/machine-showcase), and grids
// of four (other types on a type page, types that fit a district).
export const TYPE_CARD_SIZES =
  "(min-width: 1280px) 14rem, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 38vw";
export const TYPE_CARD_SIZES_4UP = "(min-width: 1024px) 17rem, (min-width: 640px) 50vw, 38vw";

// One machine type as a card: picture first, then the name, one line about it, the weekly
// price (`price`, from entities/offer usePrices; the list price struck through while a
// promotion lowers it) and "See details". The name is the link, stretched over the whole card; the focus
// ring is drawn on the card. Phones: picture on the left. From 640px: picture on top.
// `note` replaces the description (e.g. why the type suits an area); `preferPhoto` follows the
// Drawings/Photos switch. A drawing carries its "Drawing" tag.
export function TypeCard({
  machine,
  price,
  note,
  preferPhoto = true,
  sizes = TYPE_CARD_SIZES,
}: {
  machine: MachineType;
  price: { base: number; current: number };
  note?: string;
  preferPhoto?: boolean;
  sizes?: string;
}) {
  const { d, money } = useI18n();
  return (
    <li className="group relative flex overflow-hidden rounded-2xl border border-line bg-white transition-[border-color,box-shadow] duration-150 hover:border-brand hover:shadow-[0_14px_30px_-18px_rgba(7,63,50,0.45)] sm:flex-col">
      <MachineImage
        machine={machine}
        preferPhoto={preferPhoto}
        sizes={sizes}
        frameClassName="aspect-[4/5] w-[38%] shrink-0 overflow-hidden bg-brand-mint sm:aspect-[4/3] sm:w-auto xl:aspect-[4/5]"
      />
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-ink">
          <a
            href={machinePath(machine)}
            className="transition-colors after:absolute after:inset-0 after:rounded-2xl group-hover:text-brand focus-visible:outline-none focus-visible:after:ring-[3px] focus-visible:after:ring-inset focus-visible:after:ring-brand"
          >
            <KeepWordsWhole text={machine.title} />
          </a>
        </h3>
        <p className="mt-1.5 text-[15px] leading-snug text-ink-soft">{note ?? machine.description}</p>
        <p className="mt-auto pt-3 leading-tight">
          <span className="font-display text-lg font-bold text-brand">
            {money(price.current)}
            <span className="text-[15px]">{d.common.perWeekSuffix}</span>
          </span>
          <WasPrice price={price} className="ml-2 text-sm text-ink-muted" />
          <span className="block text-sm text-ink-muted">{machine.priceNote}</span>
        </p>
        {/* The whole card is the link (the name above); this only shows where it goes. */}
        <span
          aria-hidden="true"
          className="mt-2 inline-flex items-center gap-1 font-display text-[15px] font-semibold text-brand"
        >
          {d.machines.seeDetails}
          <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
        </span>
      </div>
    </li>
  );
}
