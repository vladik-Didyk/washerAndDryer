import { useI18n } from "~/shared/i18n";
import { BadgeCheck, Container, Languages, MapPin, Section, Truck, Wrench } from "~/shared/ui";

// Five short facts in a band under the hero of the home, machine type, city and district pages.
// One row from 1280px, three columns on tablets, two on phones.
export function TrustStrip() {
  const { d } = useI18n();
  const { trust } = d.home;
  const items = [
    { Icon: Wrench, label: trust.repairs },
    { Icon: BadgeCheck, label: trust.noCreditCheck },
    { Icon: Truck, label: trust.sameWeek },
    { Icon: Languages, label: d.common.languages },
    { Icon: MapPin, label: trust.local },
  ];

  return (
    <Section aria-label={trust.label} padded={false} className="border-y border-line bg-white">
      <Container as="ul" className="grid grid-cols-2 gap-x-4 gap-y-4 py-5 sm:grid-cols-3 sm:gap-x-6 lg:py-6 xl:flex xl:justify-between xl:gap-x-4">
        {items.map(({ Icon, label }, index) => (
          <li
            key={label}
            className={`flex items-center gap-2.5 font-display text-[15px] font-semibold leading-tight text-ink ${
              index === items.length - 1 ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-mint text-brand">
              <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            {label}
          </li>
        ))}
      </Container>
    </Section>
  );
}
