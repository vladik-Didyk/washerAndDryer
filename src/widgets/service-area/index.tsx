import { cityPath, getCities, type City } from "~/entities/area";
import { PostalCodeChecker } from "~/features/postal-check";
import { pagePaths, siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { Container, LangLink, Section, SectionHeader } from "~/shared/ui";

// A drawn map of where we deliver: Toronto on the lake and the five cities around it. It is a
// sketch, not a survey map (our own drawing; no map service, no cookies). Each city is a link to
// its page. The postal-code check sits under it.
type Shape = { points: string; label: [x: number, y: number] };

const SHAPES: Record<City["slug"], Shape> = {
  brampton: { points: "30,40 200,40 210,180 40,190", label: [120, 115] },
  mississauga: { points: "40,190 210,180 240,300 220,330 0,362 0,250", label: [118, 268] },
  vaughan: { points: "200,40 360,40 362,172 210,180", label: [282, 112] },
  "richmond-hill": { points: "360,40 470,40 470,166 362,172", label: [415, 108] },
  markham: { points: "470,40 625,40 628,160 470,166", label: [548, 106] },
  toronto: { points: "210,180 362,172 470,166 628,160 640,268 222,330 240,300", label: [440, 236] },
};

function MapLabel({ name, x, y, light }: { name: string; x: number; y: number; light: boolean }) {
  // Two-word names ("Richmond Hill") go on two lines.
  const lines = name.includes(" ") ? name.split(" ") : [name];
  const lineHeight = 22;
  const top = y - ((lines.length - 1) * lineHeight) / 2;
  return (
    <text
      textAnchor="middle"
      className={`pointer-events-none font-display text-[21px] font-bold group-hover:fill-ink group-focus-visible:fill-ink ${light ? "fill-white" : "fill-ink"}`}
    >
      {lines.map((line, index) => (
        <tspan key={line} x={x} y={top + index * lineHeight}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

export function ServiceArea({ title }: { title?: string }) {
  const { phone } = siteConfig;
  const i18n = useI18n();
  const { d, rich } = i18n;
  const cities = getCities(d);

  return (
    <Section id="areas" aria-labelledby="areas-title">
      <Container>
        <SectionHeader
          id="areas-title"
          title={title ?? d.home.serviceArea.title}
          lead={rich(d.common.fartherAwayCall, {
            phoneLink: (
              <a href={phone.tel} className="text-link whitespace-nowrap">
                {phone.display}
              </a>
            ),
          })}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
          <figure className="lg:col-span-8">
            <svg
              viewBox="0 0 640 420"
              role="group"
              aria-label={d.home.serviceArea.mapLabel}
              className="h-auto w-full overflow-visible rounded-[2rem] bg-paper"
            >
              <path d="M0,362 L222,330 L640,268 L640,420 L0,420 Z" className="fill-sky-100" />
              <text x="430" y="372" textAnchor="middle" className="fill-sky-700/70 font-display text-[18px] font-semibold italic">
                {d.home.serviceArea.lake}
              </text>
              {cities.map((city) => {
                const shape = SHAPES[city.slug];
                const main = city.slug === "toronto";
                return (
                  <a key={city.slug} href={i18n.href(cityPath(city))} aria-label={city.name} className="group outline-none">
                    <polygon
                      points={shape.points}
                      className={`stroke-white stroke-[4] transition-colors duration-150 group-hover:fill-gold group-focus-visible:fill-gold ${
                        main ? "fill-brand" : "fill-brand-mint-strong"
                      }`}
                      strokeLinejoin="round"
                    />
                    <MapLabel name={city.name} x={shape.label[0]} y={shape.label[1]} light={main} />
                  </a>
                );
              })}
            </svg>
          </figure>

          <div className="lg:col-span-4">
            <PostalCodeChecker />
            <p className="mt-6">
              <LangLink href={pagePaths.areas} className="text-link">
                {d.home.serviceArea.allAreas}
              </LangLink>
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
