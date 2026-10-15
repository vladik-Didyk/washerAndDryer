import { useLoaderData } from "react-router";
import { useI18n } from "~/shared/i18n";
import { Button, Card, Container, CreditCard, ExternalLink, Heading, MessageSquare, PhoneButton, Receipt, Section, Wallet } from "~/shared/ui";
import { PageIntro } from "~/widgets/page-intro";
import type { loader } from "../loader";

// /account/: exists only when the STRIPE_PORTAL_URL variable is set (../loader.ts).
// Paying, managing the card, and ending a rental (by text; there is no self-cancel).
export default function AccountPage() {
  const { stripePortalUrl } = useLoaderData<typeof loader>();
  const text = useI18n().d.account;

  return (
    <>
      <PageIntro icon={Wallet} eyebrow={text.eyebrow} title={text.title}>
        <p className="lead mt-5">{text.lead}</p>
      </PageIntro>

      <Section aria-label={text.sectionLabel} padded={false} className="pb-16 sm:pb-20 lg:pb-24">
        <Container className="grid gap-5 md:grid-cols-3 md:gap-6">
          <Card as="article" className="flex flex-col">
            <CreditCard className="h-7 w-7 text-brand" aria-hidden="true" />
            <Heading variant="cardSmall" className="mt-4">
              {text.payTitle}
            </Heading>
            <p className="mt-2 text-ink-soft">{text.payText}</p>
          </Card>

          <Card as="article" tone="highlight" className="flex flex-col">
            <Receipt className="h-7 w-7 text-brand" aria-hidden="true" />
            <Heading variant="cardSmall" className="mt-4">
              {text.portalTitle}
            </Heading>
            <p className="mt-2 text-ink-soft">{text.portalText}</p>
            <Button href={stripePortalUrl} rel="noopener" className="mt-6 self-start">
              {text.portalButton}
              <ExternalLink className="h-[18px] w-[18px]" aria-hidden="true" />
            </Button>
          </Card>

          <Card as="article" className="flex flex-col">
            <MessageSquare className="h-7 w-7 text-brand" aria-hidden="true" />
            <Heading variant="cardSmall" className="mt-4">
              {text.endTitle}
            </Heading>
            <p className="mt-2 text-ink-soft">{text.endText}</p>
            <PhoneButton kind="text" label={text.textUs} className="mt-6 self-start" />
          </Card>
        </Container>
      </Section>
    </>
  );
}
