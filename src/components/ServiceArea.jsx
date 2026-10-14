import { MapPin } from "lucide-react";
import { siteConfig } from "../content/config";

export default function ServiceArea() {
  const { serviceAreas, phone } = siteConfig;
  const [toronto, ...cities] = serviceAreas;

  return (
    <section
      id="areas"
      aria-labelledby="areas-title"
      className="pb-16 sm:pb-20 lg:pb-24"
    >
      <div className="container-page">
        <div className="grid gap-8 rounded-3xl bg-brand-mint px-5 py-8 sm:p-10 lg:grid-cols-12 lg:gap-10 lg:p-12">
          <div className="lg:col-span-4">
            <h2 id="areas-title" className="h2">
              Service area
            </h2>
            <p className="lead mt-4">Farther away? Ask us.</p>
            <p className="mt-2 text-ink-soft">
              Call or text{" "}
              <a href={phone.tel} className="text-link whitespace-nowrap">
                {phone.display}
              </a>
            </p>
          </div>

          <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:col-span-8 lg:pt-1">
            <li className="sm:col-span-2">
              <span className="flex items-center gap-2 font-display text-2xl font-bold text-ink">
                <MapPin className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                {toronto.name}
              </span>
              <span className="mt-1 block pl-7 text-ink-soft">
                {toronto.districts.join(", ")}
              </span>
            </li>
            {cities.map((city) => (
              <li
                key={city.name}
                className="flex items-center gap-2 border-t border-brand-mint-strong pt-4 font-display text-xl font-bold text-ink"
              >
                <MapPin className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                {city.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
