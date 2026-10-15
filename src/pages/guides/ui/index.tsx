import { useLoaderData } from "react-router";
import { useI18n } from "~/shared/i18n";
import { ArrowRight, BookOpen, Card, Container, Heading, LangLink, Section } from "~/shared/ui";
import { PageIntro } from "~/widgets/page-intro";
import type { loader } from "../loader";

// /guides/: every guide this deployment shows. Exists only while at least one guide is shown.
export default function GuidesPage() {
  const { guides } = useLoaderData<typeof loader>();
  const { d } = useI18n();
  return (
    <>
      <PageIntro icon={BookOpen} eyebrow={d.guides.eyebrow} title={d.guides.title}>
        <p className="lead mt-5">{d.guides.lead}</p>
      </PageIntro>

      <Section aria-label={d.guides.listLabel} padded={false} className="border-t border-line bg-white py-14 sm:py-16 lg:py-20">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2 md:gap-6">
            {guides.map((guide) => (
              <Card
                as="li"
                key={guide.slug}
                tone="paper"
                className="relative flex flex-col transition-colors hover:border-brand"
              >
                <Heading variant="cardSmall" className="leading-snug sm:text-2xl">
                  <LangLink
                    href={guide.path}
                    className="underline decoration-brand/30 decoration-2 underline-offset-4 after:absolute after:inset-0 after:rounded-3xl hover:text-brand"
                  >
                    {guide.title}
                  </LangLink>
                </Heading>
                <p className="mt-3 leading-relaxed text-ink-soft">{guide.summary}</p>
                <p
                  aria-hidden="true"
                  className="mt-auto flex items-center gap-1.5 pt-5 font-display font-semibold text-brand"
                >
                  {d.guides.read}
                  <ArrowRight className="h-4 w-4" />
                </p>
              </Card>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
