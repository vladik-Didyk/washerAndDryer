import { useLoaderData } from "react-router";
import { pagePaths } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { sectionId } from "~/shared/lib";
import { BookOpen, Button, Card, Container, Heading, LinkList, Nest, PhoneButton, Section } from "~/shared/ui";
import { ArticleBody } from "~/widgets/article-body";
import { PageIntro } from "~/widgets/page-intro";
import type { loader } from "../loader";

// One guide (entities/guide). The author is the business; there are no author bios.
export default function GuidePage() {
  const { guide, otherGuides } = useLoaderData<typeof loader>();
  const { d, rich, date } = useI18n();

  return (
    <>
      <PageIntro icon={BookOpen} eyebrow={d.guides.guideEyebrow} title={guide.title}>
        <p className="lead mt-5">{guide.summary}</p>
        <p className="mt-4 text-sm text-ink-muted">
          {rich(d.guides.byline, {
            date: (
              <time dateTime={guide.updated} className="whitespace-nowrap">
                {date(guide.updated)}
              </time>
            ),
          })}
        </p>
      </PageIntro>

      <div className="border-t border-line bg-white">
        <Container className="grid gap-10 py-12 sm:py-14 lg:grid-cols-12 lg:gap-12 lg:py-16">
          <nav aria-label={d.guides.onThisPage} className="hidden lg:col-span-4 lg:block">
            <Card tone="paper" padding="sm" className="sticky top-28">
              <p className="font-display text-sm font-semibold text-ink-muted">{d.guides.onThisPage}</p>
              <ol className="mt-3 space-y-2.5">
                {guide.sections.map((section) => (
                  <li key={sectionId(section)}>
                    <a
                      href={`#${sectionId(section)}`}
                      className="text-[15px] text-ink-soft underline decoration-transparent underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </Card>
          </nav>

          <div className="lg:col-span-8">
            <div className="max-w-[46rem]">
              <ArticleBody sections={guide.sections} />
            </div>

            <Nest>
              <Card as="aside" tone="mint" aria-labelledby="guide-cta-title" className="mt-14 max-w-[46rem]">
                <Heading id="guide-cta-title" variant="card">
                  {d.common.readyToRent}
                </Heading>
                <p className="mt-2 text-ink-soft">{d.guides.ctaText}</p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button href={pagePaths.start}>{d.common.startRental}</Button>
                  <PhoneButton kind="call" variant="secondary" label={d.common.callOrText} />
                </div>
              </Card>
            </Nest>
          </div>
        </Container>
      </div>

      {otherGuides.length > 0 && (
        <Section aria-label={d.guides.more}>
          <Container>
            <LinkList id="more-guides-title" title={d.guides.more} links={otherGuides} />
          </Container>
        </Section>
      )}
    </>
  );
}
