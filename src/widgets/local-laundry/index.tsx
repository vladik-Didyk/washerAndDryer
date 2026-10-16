import type { ReactNode } from "react";
import { siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { Card, Container, DotList, Fold, Heading, LangLink, MapPin, Nest, Section } from "~/shared/ui";

// Local detail for a city or district page: the neighbourhoods we deliver to, what to check
// before calling, and what homes are like there (folded: still on the page for search). `neighbourhoodLinks` maps a neighbourhood name
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
    <Section id="local" aria-labelledby="local-title" className="border-y border-line bg-white">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          {children}
          <Heading id="local-title">{format(text.localTitle, { place: area.name })}</Heading>
          <Nest>
            <Heading variant="item" className="mt-8">
              {format(text.localAreas, { place: area.name })}
            </Heading>
          </Nest>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-ink-soft">
            {area.neighbourhoods.map((name) => (
              <li key={name} className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                {neighbourhoodLinks[name] ? (
                  <LangLink href={neighbourhoodLinks[name]} className="text-link">
                    {name}
                  </LangLink>
                ) : (
                  name
                )}
              </li>
            ))}
          </ul>
          <Fold label={format(text.aboutHomes, { place: area.name })} className="mt-8">
            {area.homes.map((paragraph) => (
              <p key={paragraph} className="mt-3 leading-relaxed text-ink-soft first:mt-0">
                {paragraph}
              </p>
            ))}
          </Fold>
        </div>

        <Card tone="paper" className="lg:col-span-5 lg:self-start">
          <Nest>
            <Heading variant="cardSmall">{text.beforeYouCall}</Heading>
          </Nest>
          <DotList items={area.checklist} className="mt-5 space-y-3" />
          <p className="mt-6 text-ink-soft">
            {rich(text.notSure, {
              phoneLink: (
                <a href={phone.sms} className="text-link whitespace-nowrap">
                  {phone.display}
                </a>
              ),
            })}
          </p>
        </Card>
      </Container>
    </Section>
  );
}
