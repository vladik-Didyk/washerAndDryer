import { pagePaths } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { Button, Container, Heading, PhoneButton, Section } from "~/shared/ui";

// The 404 page: rendered by the root error boundary for any unknown URL (and for drafts in a
// normal deployment), with the status 404, in the language of the URL.
export function NotFoundPage() {
  const { d } = useI18n();
  return (
    <Section aria-labelledby="hero-title" nest={false}>
      <Container className="max-w-3xl">
        <Heading id="hero-title">{d.notFound.title}</Heading>
        <p className="lead mt-4">{d.notFound.text}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={pagePaths.home}>{d.notFound.home}</Button>
          <PhoneButton kind="call" variant="secondary" label={d.common.callPhone} />
        </div>
      </Container>
    </Section>
  );
}
