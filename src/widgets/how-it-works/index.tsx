import { useI18n } from "~/shared/i18n";
import { Container, Heading, Nest, NumberBadge, Section } from "~/shared/ui";

// The four steps of renting, on the brand-green band (home, city and machine pages).

export function HowItWorks() {
  const { d, number } = useI18n();
  const { steps } = d.home.how;
  return (
    <Section id="how" aria-labelledby="how-title" className="on-dark bg-brand text-white">
      <Container>
        <Heading id="how-title" className="text-white">
          {d.common.howItWorks}
        </Heading>

        <div className="relative mt-10 lg:mt-12">
          {/* Desktop: one line joining the four step numbers (4 columns, 24px gaps). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-6 top-6 hidden h-0.5 w-[calc(75%+18px)] bg-white/25 lg:block"
          />
          <ol className="relative grid gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {steps.map((step, index) => (
              <li key={step.title} className="relative flex gap-4 sm:block">
                {/* Phones: a vertical line down to the next number. */}
                {index < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-6 left-6 top-14 w-0.5 -translate-x-1/2 bg-white/25 sm:hidden"
                  />
                )}
                <NumberBadge className="relative">{number(index + 1)}</NumberBadge>
                <div className="pt-2.5 sm:pt-0">
                  <Nest>
                    <Heading variant="none" className="font-display text-xl font-bold leading-snug text-white sm:mt-5">
                      {step.title}
                    </Heading>
                  </Nest>
                  <p className="mt-2 leading-relaxed text-white/85">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
