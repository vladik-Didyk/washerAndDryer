import { useActionData } from "react-router";
import { LandlordQuoteForm } from "~/features/landlord-quote-form";
import { pagePaths } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { Building2, CallCard, Container, Eyebrow, Heading, LangLink, Nest, NumberBadge, Section } from "~/shared/ui";
import type { action } from "../action";

// /landlords/quote/: the landlord quote form, with what happens after sending it.
export default function LandlordQuotePage() {
  const result = useActionData<typeof action>();
  const { d, number } = useI18n();
  const { quote } = d.landlords;

  return (
    <Section id="top" aria-labelledby="hero-title" padded={false} nest={false} className="pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Eyebrow icon={Building2}>{quote.eyebrow}</Eyebrow>
          <Heading
            id="hero-title"
            variant="none"
            className="mt-3 font-display text-[2.25rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[2.75rem]"
          >
            {quote.title}
          </Heading>
          <p className="lead mt-5">
            {quote.lead}{" "}
            <LangLink href={pagePaths.landlords} className="text-link">
              {quote.howOptionsWork}
            </LangLink>
          </p>

          <Nest>
            <Heading variant="cardSmall" className="mt-10">
              {quote.nextTitle}
            </Heading>
          </Nest>
          <ol className="mt-4 space-y-3">
            {quote.next.map((step, index) => (
              <li key={step} className="flex gap-3 text-ink-soft">
                <NumberBadge size="sm">{number(index + 1)}</NumberBadge>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>

          <CallCard tone="mintBordered" className="mt-10" />
        </div>

        <div id="landlord-quote" className="lg:col-span-7">
          <Nest>
            <LandlordQuoteForm result={result} />
          </Nest>
        </div>
      </Container>
    </Section>
  );
}
