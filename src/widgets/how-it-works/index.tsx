import { useI18n } from "~/shared/i18n";
import { Container, CtaRow, FileText, Heading, Nest, Ruler, Section, Truck, Wrench, type LucideIcon } from "~/shared/ui";

// The four steps of renting, on the brand-green band (home, city and machine pages): one icon
// and a few words each. The details are on the FAQ page.
const STEP_ICONS: LucideIcon[] = [Ruler, FileText, Truck, Wrench];

export function HowItWorks() {
  const { d } = useI18n();
  const { steps } = d.home.how;
  return (
    <Section id="how" aria-labelledby="how-title" className="on-dark bg-brand text-white">
      <Container>
        <Heading id="how-title" className="text-white">
          {d.common.howItWorks}
        </Heading>

        <ol className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 lg:mt-12 lg:grid-cols-4 lg:gap-x-6">
          {steps.map((step, index) => {
            const Icon = STEP_ICONS[index] ?? Wrench;
            return (
              <li key={step} className="flex flex-col items-center text-center">
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/10 sm:h-24 sm:w-24">
                  <Icon className="h-9 w-9 text-gold sm:h-11 sm:w-11" aria-hidden="true" />
                  <span
                    aria-hidden="true"
                    className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-gold font-display text-sm font-bold text-brand"
                  >
                    {index + 1}
                  </span>
                </span>
                <Nest>
                  <Heading variant="none" className="mt-4 font-display text-lg font-bold leading-snug text-white sm:text-xl">
                    {step}
                  </Heading>
                </Nest>
              </li>
            );
          })}
        </ol>
        <CtaRow tone="dark" align="center" />
      </Container>
    </Section>
  );
}
