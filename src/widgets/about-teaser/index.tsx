import { pagePaths, siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { Card, Container, DotList, Heading, LangLink, Nest, PhoneButton, Section, SectionHeader } from "~/shared/ui";

// About the business: confirmed facts only, no names or photos of people.
// The full version is the /about/ page.
export function AboutTeaser() {
  const { phone } = siteConfig;
  const { d, rich } = useI18n();
  const { about } = d.home;

  return (
    <Section id="about" aria-labelledby="about-title">
      <Container className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeader id="about-title" title={about.title} lead={about.lead}>
            <p className="mt-4 text-ink-soft">
              {rich(about.questions, {
                phoneLink: (
                  <a href={phone.tel} className="text-link whitespace-nowrap">
                    {phone.display}
                  </a>
                ),
              })}
            </p>
            <p className="mt-4">
              <LangLink href={pagePaths.about} className="text-link">
                {about.more}
              </LangLink>
            </p>
          </SectionHeader>
        </div>

        <Card className="lg:col-span-7">
          <Nest>
            <Heading variant="cardSmall">{about.howWeWork}</Heading>
          </Nest>
          <DotList items={d.common.howWeWork} className="mt-5 space-y-4" />
          <PhoneButton kind="call" variant="secondary" label={d.common.callPhone} className="mt-7" />
        </Card>
      </Container>
    </Section>
  );
}
