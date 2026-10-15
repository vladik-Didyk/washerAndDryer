import type { ReactNode } from "react";
import { siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { MapPin } from "~/shared/ui";

// Local detail for a city or district page: what homes are like there, the neighbourhoods we
// deliver to, and what to check before calling. `neighbourhoodLinks` maps a neighbourhood name
// to its own page (Toronto's districts). `children` go above the text (e.g. a note).
export function LocalLaundry({
  area,
  neighbourhoodLinks = {},
  children,
}: {
  area: { name: string; homes: string[]; neighbourhoods: string[]; checklist: string[] };
  neighbourhoodLinks?: Record<string, string>;
  children?: ReactNode;
}) {
  const { phone } = siteConfig;
  const { d, format, rich } = useI18n();
  const text = d.areas.page;

  return (
    <section
      id="local"
      aria-labelledby="local-title"
      className="section border-y border-line bg-white"
    >
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          {children}
          <h2 id="local-title" className="h2">
            {format(text.localTitle, { place: area.name })}
          </h2>
          {area.homes.map((paragraph) => (
            <p key={paragraph} className="lead mt-4">
              {paragraph}
            </p>
          ))}
          <h3 className="mt-8 font-display text-lg font-bold text-ink">
            {format(text.localAreas, { place: area.name })}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-ink-soft">
            {area.neighbourhoods.map((name) => (
              <li key={name} className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                {neighbourhoodLinks[name] ? (
                  <a href={neighbourhoodLinks[name]} className="text-link">
                    {name}
                  </a>
                ) : (
                  name
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-line bg-paper p-6 sm:p-8 lg:col-span-5 lg:self-start">
          <h3 className="font-display text-xl font-bold text-ink">
            {text.beforeYouCall}
          </h3>
          <ul className="mt-5 space-y-3">
            {area.checklist.map((item) => (
              <li key={item} className="flex gap-3 text-ink-soft">
                <span
                  aria-hidden="true"
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold"
                />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-ink-soft">
            {rich(text.notSure, {
              phoneLink: (
                <a href={phone.sms} className="text-link whitespace-nowrap">
                  {phone.display}
                </a>
              ),
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
