import { Form, useActionData, useNavigation } from "react-router";
import { pagePaths, siteConfig } from "~/shared/config";
import { FieldError } from "~/shared/forms";
import { useI18n } from "~/shared/i18n";
import {
  Button,
  Card,
  CircleCheck,
  Container,
  CreditCard,
  Eyebrow,
  ExternalLink,
  Heading,
  LangLink,
  LoaderCircle,
  Lock,
  LogIn,
  Logo,
  MessageSquare,
  Nest,
  Section,
  WashingMachine,
  Wrench,
  type LucideIcon,
} from "~/shared/ui";
import type { action } from "../action";

// /account/: the customer sign-in. Accounts are not built yet (docs/customer-dashboard-plan.md):
// the form answers "opening soon" and points to what works today, the Stripe billing portal
// and a text. Beside it, what the account will hold; only billing is marked as available.
export default function AccountPage() {
  const result = useActionData<typeof action>();
  const sending = useNavigation().state === "submitting";
  const { d, rich } = useI18n();
  const text = d.account;

  const features: Array<{ key: keyof typeof text.features; Icon: LucideIcon; now: boolean }> = [
    { key: "billing", Icon: CreditCard, now: true },
    { key: "machines", Icon: WashingMachine, now: false },
    { key: "repairs", Icon: Wrench, now: false },
    { key: "messages", Icon: MessageSquare, now: false },
  ];

  return (
    <Section aria-labelledby="hero-title" padded={false} nest={false} className="pb-16 pt-8 sm:pb-20 sm:pt-12 lg:pb-24">
      <Container className="grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
        <Card padding="none" className="flex flex-col p-6 shadow-[0_20px_50px_-30px_rgb(7_63_50/0.45)] sm:p-10">
          <Logo className="h-12 w-12" />
          <Eyebrow icon={Lock} className="mt-6">
            {text.eyebrow}
          </Eyebrow>
          <Heading id="hero-title" variant="page" className="mt-2">
            {text.title}
          </Heading>

          {result?.status === "soon" ? (
            <div role="status" className="mt-6 rounded-2xl bg-brand-mint p-5 sm:p-6">
              <p className="flex items-center gap-2 font-display text-lg font-bold text-brand-dark">
                <CircleCheck className="h-5 w-5 shrink-0" aria-hidden="true" />
                {text.soonTitle}
              </p>
              <p className="mt-2 text-ink-soft">{text.soonText}</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button href={siteConfig.stripePortalUrl} rel="noopener">
                  {text.portalButton}
                  <ExternalLink className="h-[18px] w-[18px]" aria-hidden="true" />
                </Button>
                <Button href={siteConfig.phone.sms} variant="secondary">
                  {text.textUs}
                </Button>
              </div>
              <LangLink href={pagePaths.account} className="text-link mt-5 inline-block text-sm">
                {text.tryAgain}
              </LangLink>
            </div>
          ) : (
            <>
              <p className="lead mt-3">{text.lead}</p>
              <Form method="post" noValidate data-clarity-mask="true" aria-label={text.formLabel} className="mt-6">
                <label htmlFor="account-email" className="label">
                  {text.emailLabel}
                </label>
                <input
                  id="account-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  defaultValue={result?.status === "invalid" ? result.email : undefined}
                  aria-invalid={result?.status === "invalid" || undefined}
                  aria-describedby={result?.status === "invalid" ? "account-email-error" : undefined}
                  autoFocus={result?.status === "invalid"}
                  className="field mt-2"
                />
                <FieldError id="account-email-error" message={result?.status === "invalid" ? text.emailInvalid : undefined} />
                <button type="submit" disabled={sending} className="btn btn-primary mt-5 w-full">
                  {sending ? (
                    <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
                  ) : (
                    <LogIn className="h-5 w-5" aria-hidden="true" />
                  )}
                  {text.submit}
                </button>
              </Form>
            </>
          )}

          <p className="mt-auto pt-8 text-ink-soft">
            {rich(text.newCustomer, {
              startLink: (
                <LangLink href={pagePaths.start} className="text-link">
                  {d.common.startRental}
                </LangLink>
              ),
            })}
          </p>
          <p className="mt-3 flex items-start gap-2 text-sm text-ink-muted">
            <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {text.secure}
          </p>
        </Card>

        <div className="on-dark relative isolate overflow-hidden rounded-3xl bg-brand-dark p-6 text-white sm:p-10">
          <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-brand/60 blur-2xl" />
          <div aria-hidden="true" className="absolute -bottom-32 -left-20 -z-10 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
          <Nest>
            <Heading variant="card" className="text-white">
              {text.panelTitle}
            </Heading>
            <ul className="mt-6 space-y-4">
              {features.map(({ key, Icon, now }) => (
                <li key={key} className="flex gap-4 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-display font-semibold text-white">
                      {text.features[key].title}
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          now ? "bg-gold text-ink" : "bg-white/10 text-white/80"
                        }`}
                      >
                        {now ? text.available : text.coming}
                      </span>
                    </p>
                    <p className="mt-1 text-white/75">{text.features[key].text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Nest>
        </div>
      </Container>
    </Section>
  );
}
