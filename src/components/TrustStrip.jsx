import { BadgeCheck, Languages, MapPin, Truck, Wrench } from "lucide-react";
import { siteConfig } from "../content/config";

// Five short facts in a band under the hero of the home, machine type, city and district pages.
// One row from 1280px, three columns on tablets, two on phones.
export default function TrustStrip() {
  const { owner, languages } = siteConfig;
  const items = [
    { Icon: Wrench, label: "Repairs included" },
    { Icon: BadgeCheck, label: "No credit check" },
    { Icon: Truck, label: "Same-week delivery" },
    { Icon: Languages, label: languages },
    { Icon: MapPin, label: `Run by ${owner} in Toronto` },
  ];

  return (
    <section aria-label="Why rent from us" className="border-y border-line bg-white">
      <ul className="container-page grid grid-cols-2 gap-x-4 gap-y-4 py-5 sm:grid-cols-3 sm:gap-x-6 lg:py-6 xl:flex xl:justify-between xl:gap-x-4">
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
      </ul>
    </section>
  );
}
