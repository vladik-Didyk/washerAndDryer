import { pagePaths } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import {
  ArrowRight,
  Building2,
  Button,
  Card,
  CheckList,
  Container,
  Heading,
  LangLink,
  Nest,
  NumberBadge,
  PhoneButton,
  Section,
  SectionHeader,
} from "~/shared/ui";
import { CtaBand } from "~/widgets/cta-band";
import { PageIntro } from "~/widgets/page-intro";
import { SharedRooms } from "~/widgets/shared-rooms";

const QUOTE_PATH = pagePaths.landlordQuote;

// /landlords/: the two ways landlords work with us, what's included, how it goes for a
// building, and landlord questions. Facts only: no income claims and no numbers beyond the
// list price.
export default function LandlordsPage() {
  const { d, format, number, rich } = useI18n();
  const text = d.landlords;

  return (
    <>
      <PageIntro
        icon={Building2}
        eyebrow={text.eyebrow}
        title={text.title}
        aside={
          <ol className="space-y-3">
            {text.options.map((option, index) => (
              <Card as="li" key={option.title} tone="mint" padding="sm">
                <p className="font-display text-sm font-semibold text-brand">
                  {format(text.option, { number: index + 1 })}
                </p>
                <p className="mt-1 font-display text-xl font-bold text-ink">{option.title}</p>
                <p className="mt-2 font-display text-lg font-bold text-brand">{option.headline}</p>
              </Card>
            ))}
          </ol>
        }
      >
        <p className="lead mt-5 max-w-2xl">{text.lead}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href={QUOTE_PATH}>{d.common.getQuote}</Button>
          <PhoneButton kind="call" variant="secondary" label={d.common.callOrText} />
        </div>
      </PageIntro>

      <Section aria-labelledby="options-title" className="border-y border-line bg-white">
        <Container>
          <Heading id="options-title">{text.optionsTitle}</Heading>
          <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            {text.options.map((option, index) => (
              <Card as="article" key={option.title} tone="paper" className="flex flex-col">
                <p className="font-display text-sm font-semibold text-brand">
                  {format(text.option, { number: index + 1 })}
                </p>
                <Nest>
                  <Heading variant="card" className="mt-1">
                    {option.title}
                  </Heading>
                </Nest>
                <CheckList items={option.points} className="mt-5 space-y-3" />
              </Card>
            ))}
          </div>
          <p className="mt-8 text-ink-soft">
            {rich(text.buildingsNote, {
              buildingsLink: (
                <LangLink href={pagePaths.buildings} className="text-link">
                  {text.buildingsLink}
                </LangLink>
              ),
            })}
          </p>
        </Container>
      </Section>

      <SharedRooms />

      <Section aria-labelledby="included-title">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeader id="included-title" title={text.includedTitle} lead={text.includedLead} />
          </div>
          <CheckList items={text.included} className="space-y-3 lg:col-span-7 lg:pt-2" />
        </Container>
      </Section>

      <Section aria-labelledby="steps-title" className="on-dark bg-brand text-white">
        <Container>
          <Heading id="steps-title" className="text-white">
            {text.stepsTitle}
          </Heading>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
            {text.steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <NumberBadge>{number(index + 1)}</NumberBadge>
                <div className="pt-2.5">
                  <Nest>
                    <Heading variant="none" className="font-display text-xl font-bold leading-snug text-white">
                      {step.title}
                    </Heading>
                  </Nest>
                  <p className="mt-2 leading-relaxed text-white/85">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <Button href={QUOTE_PATH} variant="gold" className="mt-12">
            {text.startWithQuote}
            <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
          </Button>
        </Container>
      </Section>

      <Section aria-labelledby="landlord-faq-title">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Card>
              <Heading variant="cardSmall">{text.unitNeedsTitle}</Heading>
              <CheckList items={d.common.hookups} className="mt-5 space-y-3" />
              <p className="mt-6 text-ink-soft">{text.unitNeedsNote}</p>
            </Card>
          </div>
          <div className="lg:col-span-7">
            <Heading id="landlord-faq-title">{text.faqTitle}</Heading>
            <Card padding="none" className="mt-6 divide-y divide-line px-5 sm:px-8">
              {text.faqs.map((faq) => (
                <div key={faq.question} className="py-6">
                  <Nest>
                    <Heading variant="question">{faq.question}</Heading>
                  </Nest>
                  <p className="mt-2 leading-relaxed text-ink-soft">{faq.answer}</p>
                </div>
              ))}
            </Card>
            <p className="mt-6 text-ink-soft">
              {rich(text.moreAnswers, {
                faqLink: (
                  <LangLink href={pagePaths.faq} className="text-link">
                    {text.faqLink}
                  </LangLink>
                ),
              })}
            </p>
          </div>
        </Container>
      </Section>

      <CtaBand title={text.ctaTitle} text={text.ctaText} action={{ label: d.common.getQuote, href: QUOTE_PATH }} />
    </>
  );
}
