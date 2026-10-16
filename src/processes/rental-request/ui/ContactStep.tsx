import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import { useI18n } from "~/shared/i18n";
import { Card, Heading } from "~/shared/ui";
import { FormFields, Honeypot, PrivacyNote, RequiredNote, SendError, SubmitButton, type FieldErrors } from "~/shared/forms";
import type { contactAction } from "../actions.server";
import type { contactLoader } from "../loaders.server";
import { STEP_PATHS } from "../model";
import { StepShell } from "./StepShell";

// Step 3 of 3: who we reply to. Sending it sends the whole request.
export function ContactStep() {
  const { values: saved, summary, today, postalUnsure } = useLoaderData<typeof contactLoader>();
  const result = useActionData<typeof contactAction>();
  const sending = useNavigation().state === "submitting";
  const values = result?.values ?? saved;
  const errors: FieldErrors = result?.errors ?? {};
  const { start } = useI18n().d;
  const text = start.contact;

  return (
    <StepShell
      step="contact"
      title={text.title}
      intro={<p>{text.intro}</p>}
      backHref={STEP_PATHS.details}
    >
      <div className="mb-6 rounded-3xl border border-brand-mint-strong bg-white/70 p-5 sm:p-6">
        <Heading variant="item">{text.summaryTitle}</Heading>
        <dl className="mt-3 grid gap-x-6 gap-y-1.5 text-[15px] sm:grid-cols-[auto_1fr]">
          {summary.map((row) => (
            <div key={row.label} className="contents">
              <dt className="text-ink-muted">{row.label}</dt>
              <dd className="font-medium text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
        {postalUnsure && (
          <p className="mt-3 text-sm text-ink-soft">{text.postalUnsure}</p>
        )}
      </div>

      <Card as={Form} method="post" noValidate padding="form">
        <RequiredNote />
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <FormFields form="startContact" values={values} errors={errors} today={today} />
        </div>
        <Honeypot />
        {result && "status" in result && result.status === "error" && <SendError />}
        <SubmitButton sending={sending}>{text.submit}</SubmitButton>
        <PrivacyNote />
      </Card>
    </StepShell>
  );
}
