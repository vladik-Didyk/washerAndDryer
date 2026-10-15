import { MapPin } from "lucide-react";
import { siteConfig } from "../content/config";
import { cities } from "../content/cities";
import { districts } from "../content/districts";
import { cityPath, districtPath } from "../content/routes";
import PostalCodeChecker from "./PostalCodeChecker";

const cityLink =
  "underline decoration-brand/30 decoration-2 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand";

// Each city and Toronto district links to its own page; the postal-code checker sits beside them.
export default function ServiceArea({ title = "Service area" }) {
  const { phone } = siteConfig;
  const [toronto, ...others] = cities;

  return (
    <section
      id="areas"
      aria-labelledby="areas-title"
      className="pb-16 sm:pb-20 lg:pb-24"
    >
      <div className="container-page">
        <div className="grid gap-8 rounded-3xl bg-brand-mint px-5 py-8 sm:p-10 lg:grid-cols-12 lg:gap-10 lg:p-12">
          <div className="lg:col-span-5">
            <h2 id="areas-title" className="h2">
              {title}
            </h2>
            <p className="lead mt-4">
              Farther away? Call or text{" "}
              <a href={phone.tel} className="text-link whitespace-nowrap">
                {phone.display}
              </a>{" "}
              and ask.
            </p>
            <PostalCodeChecker className="mt-6" />
          </div>

          <div className="lg:col-span-7 lg:pt-1">
            <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              <li className="sm:col-span-2">
                <span className="flex items-center gap-2 font-display text-2xl font-bold text-ink">
                  <MapPin className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  <a href={cityPath(toronto)} className={cityLink}>
                    {toronto.name}
                  </a>
                </span>
                <ul aria-label="Toronto districts" className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 pl-7">
                  {districts.map((district) => (
                    <li key={district.slug}>
                      <a href={districtPath(district)} className={`font-medium text-ink-soft ${cityLink}`}>
                        {district.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              {others.map((city) => (
                <li
                  key={city.slug}
                  className="flex items-center gap-2 border-t border-brand-mint-strong pt-4 font-display text-xl font-bold text-ink"
                >
                  <MapPin className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  <a href={cityPath(city)} className={cityLink}>
                    {city.name}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <a href="/areas/" className="text-link">
                All areas we deliver to
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
