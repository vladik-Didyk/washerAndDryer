import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import { useI18n } from "~/shared/i18n";
import type { FieldErrorMap } from "~/shared/lib";
import { Honeypot, RequiredNote, SendError, SubmitButton, TextAreaField, TextField } from "~/shared/ui";
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
  const errors: FieldErrorMap = result?.errors ?? {};
  const { forms, start } = useI18n().d;
  const text = start.contact;

  return (
    <StepShell
      step="contact"
      title={text.title}
      intro={<p>{text.intro}</p>}
      backHref={STEP_PATHS.details}
    >
      <div className="mb-6 rounded-3xl border border-brand-mint-strong bg-white/70 p-5 sm:p-6">
        <h2 className="font-display text-lg font-bold text-ink">{text.summaryTitle}</h2>
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

      <Form method="post" noValidate className="rounded-3xl border border-line bg-white p-5 sm:p-8">
        <RequiredNote />
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <TextField id="name" name="name" label={forms.name} required autoComplete="name" defaultValue={values.name} error={errors.name} />
          <TextField
            id="phone"
            name="phone"
            label={forms.phone}
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            defaultValue={values.phone}
            error={errors.phone}
          />
          <TextField
            id="email"
            name="email"
            label={forms.email}
            type="email"
            inputMode="email"
            autoComplete="email"
            defaultValue={values.email}
            error={errors.email}
            hint={forms.optional}
          />
          <TextField
            id="preferredDay"
            name="preferredDay"
            label={text.preferredDay}
            type="date"
            min={today}
            defaultValue={values.preferredDay}
            error={errors.preferredDay}
            hint={text.preferredDayHint}
            inputClassName="text-left [&::-webkit-date-and-time-value]:text-left"
          />
          <TextAreaField
            id="notes"
            name="notes"
            label={forms.notes}
            defaultValue={values.notes}
            error={errors.notes}
            className="sm:col-span-2"
            hint={text.notesHint}
          />
        </div>
        <Honeypot />
        {result && "status" in result && result.status === "error" && <SendError />}
        <SubmitButton sending={sending}>{text.submit}</SubmitButton>
      </Form>
    </StepShell>
  );
}
