import { pagePaths } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { ArrowRight, Button, CallCard, Card, Container, Heading, Nest, NumberBadge, Section, SectionHeader } from "~/shared/ui";

// The "Start your rental" band near the bottom of the main pages (id="request", where the old
// request form stood, so links to #request still land here). The request itself is the
// three-step form at /start/ (processes/rental-request).
export function StartRental() {
  const { d, number } = useI18n();
  const { startRental } = d.home;

  return (
    <Section id="request" aria-labelledby="request-title" className="bg-brand-mint">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeader id="request-title" title={startRental.title} />
          <CallCard className="mt-8" />
        </div>

        <div className="lg:col-span-7">
          <Card padding="form">
            <Nest>
              <Heading variant="card">{startRental.stepsTitle}</Heading>
            </Nest>
            <ol className="mt-6 space-y-5">
              {startRental.steps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <NumberBadge size="md">{number(index + 1)}</NumberBadge>
                  <p className="pt-2 font-display text-lg font-semibold text-ink">{step}</p>
                </li>
              ))}
            </ol>
            <Button href={pagePaths.start} className="mt-8 w-full">
              {d.common.startRental}
              <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
            </Button>
            <p className="mt-4 text-center text-sm text-ink-muted">{startRental.nothingToPay}</p>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
