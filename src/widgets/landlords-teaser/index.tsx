import { pagePaths } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { ArrowRight, Building2, Button, Card, Container, Heading, Section } from "~/shared/ui";

// Home page: a short pointer to /landlords/ and /buildings/. It sits between Prices and About, which bring
// their own padding.
export function LandlordsTeaser() {
  const { landlordsTeaser } = useI18n().d.home;
  return (
    <Section aria-labelledby="landlords-teaser-title" padded={false}>
      <Container>
        <Card className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="flex gap-4">
            <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-mint text-brand sm:flex">
              <Building2 className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <Heading id="landlords-teaser-title" variant="card">
                {landlordsTeaser.title}
              </Heading>
              <p className="mt-2 max-w-2xl text-ink-soft">{landlordsTeaser.text}</p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button href={pagePaths.landlords} variant="secondary">
              {landlordsTeaser.link}
              <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
            </Button>
            <Button href={pagePaths.buildings} variant="secondary">
              {landlordsTeaser.buildingsLink}
              <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
            </Button>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
