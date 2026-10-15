import { pagePaths } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { ArrowRight, Button, Container, Heading, Languages, MapPin, Section, Wrench, type LucideIcon } from "~/shared/ui";

// About the business in three icon facts: confirmed facts only, no names or photos of people.
// The full version is the /about/ page.
const FACT_ICONS: LucideIcon[] = [MapPin, Wrench, Languages];

export function AboutTeaser() {
  const { d, format } = useI18n();
  const { about } = d.home;

  return (
    <Section id="about" aria-labelledby="about-title">
      <Container>
        <Heading id="about-title" variant="none" className="sr-only">
          {about.title}
        </Heading>
        <ul className="grid gap-4 sm:grid-cols-3 sm:gap-6">
          {about.facts.map((fact, index) => {
            const Icon = FACT_ICONS[index] ?? MapPin;
            return (
              <li key={fact} className="flex items-center gap-4 rounded-3xl bg-brand-mint px-5 py-5 sm:flex-col sm:px-6 sm:py-8 sm:text-center">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white sm:h-16 sm:w-16">
                  <Icon className="h-7 w-7 text-brand sm:h-8 sm:w-8" aria-hidden="true" />
                </span>
                <span className="font-display text-lg font-bold leading-snug text-ink">
                  {format(fact, { languages: d.common.languages })}
                </span>
              </li>
            );
          })}
        </ul>
        <Button href={pagePaths.about} variant="secondary" className="mt-6">
          {about.more}
          <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
        </Button>
      </Container>
    </Section>
  );
}
