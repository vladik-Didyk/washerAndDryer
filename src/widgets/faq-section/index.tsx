import { FaqAccordion, homeFaqs, type Faq } from "~/entities/faq";
import { pagePaths, siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { ArrowRight, Button, Container, Nest, Section, SectionHeader } from "~/shared/ui";

// Accordion of a few common questions; the full list is on /faq/ (pages/faq).
export function FaqSection({ items, moreHref = pagePaths.faq }: { items?: Faq[]; moreHref?: string | null }) {
  const { phone } = siteConfig;
  const i18n = useI18n();
  const { d, rich } = i18n;

  return (
    <Section id="faq" aria-labelledby="faq-title" className="border-y border-line bg-white">
      <Container className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <SectionHeader
            id="faq-title"
            title={d.home.faq.title}
            lead={rich(d.home.faq.another, {
              phoneLink: (
                <a href={phone.tel} className="text-link whitespace-nowrap">
                  {phone.display}
                </a>
              ),
            })}
          >
            {moreHref && (
              <Button href={moreHref} variant="secondary" className="mt-6">
                {d.home.faq.all}
                <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
              </Button>
            )}
          </SectionHeader>
        </div>

        <Nest>
          <FaqAccordion
            items={items ?? homeFaqs(i18n)}
            className="divide-y divide-line rounded-3xl border border-line bg-paper px-5 sm:px-8 lg:col-span-8"
          />
        </Nest>
      </Container>
    </Section>
  );
}
