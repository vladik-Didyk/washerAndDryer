import { pagePaths } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { Button, Card, Container, DotList, Heading, LinkList, MapPin, PhoneButton, Section } from "~/shared/ui";
import { CtaBand } from "~/widgets/cta-band";
import { PageIntro } from "~/widgets/page-intro";

// /about/: who we are and how we work. Confirmed facts only: no names, photos of people or history.
export default function AboutPage() {
  const { d } = useI18n();
  const text = d.about;

  return (
    <>
      <PageIntro icon={MapPin} eyebrow={text.eyebrow} title={text.title}>
        <p className="lead mt-5">{text.lead}</p>
      </PageIntro>

      <Section aria-labelledby="how-title" className="border-y border-line bg-white">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Card tone="paper" className="lg:col-span-5 lg:self-start">
            <Heading id="how-title" variant="card">
              {text.howWeWork}
            </Heading>
            <DotList items={d.common.howWeWork} className="mt-5 space-y-4" />
          </Card>

          <div className="lg:col-span-7">
            <Heading>{text.whatWeDo}</Heading>
            {text.whatWeDoItems.map((paragraph) => (
              <p key={paragraph} className="lead mt-4">
                {paragraph}
              </p>
            ))}
            <LinkList
              id="about-links-title"
              title={text.readMore}
              className="mt-10"
              links={[
                { href: pagePaths.machines, label: text.links.machines },
                { href: "/#prices", label: text.links.prices },
                { href: pagePaths.areas, label: text.links.areas },
                { href: pagePaths.landlords, label: text.links.landlords },
                { href: pagePaths.faq, label: text.links.faq },
              ]}
            />
          </div>
        </Container>
      </Section>

      <CtaBand variant="panel" id="about-contact-title" title={text.talkTitle} text={text.talkText} textClassName="lg:col-span-6">
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end">
          <PhoneButton kind="call" />
          <PhoneButton kind="text" />
          <Button href={pagePaths.contact} variant="secondary">
            {text.contactPage}
          </Button>
        </div>
      </CtaBand>
    </>
  );
}
