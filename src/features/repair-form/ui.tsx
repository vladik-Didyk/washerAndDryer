import { Form, useNavigation } from "react-router";
import { useI18n } from "~/shared/i18n";
import type { FormActionData } from "~/shared/lib";
import {
  Honeypot,
  RequiredNote,
  SelectField,
  SendError,
  SentPanel,
  SubmitButton,
  TextAreaField,
  TextField,
} from "~/shared/ui";
import { emptyRepair, repairChoices, type RepairValues } from "./model";

// Repair request for a machine rented from us. A plain form posted to the page's server
// action: it works with JavaScript off.
export function RepairForm({ result }: { result?: FormActionData<RepairValues> }) {
  const navigation = useNavigation();
  const sending = navigation.state === "submitting";
  const i18n = useI18n();
  const { forms, repair } = i18n.d;
  const choices = repairChoices(i18n);

  if (result?.status === "sent") {
    return <SentPanel title={repair.sent} note={repair.sentNote} resetHref="/repair/#repair-request" />;
  }

  const values = result ? result.values : emptyRepair(i18n);
  const errors = result?.status === "invalid" ? result.errors : {};

  return (
    <Form
      method="post"
      noValidate
      aria-labelledby="repair-form-title"
      className="rounded-3xl border border-line bg-white p-5 sm:p-8"
    >
      <h2 id="repair-form-title" className="font-display text-2xl font-bold text-ink">
        {repair.formTitle}
      </h2>
      <div className="mt-2">
        <RequiredNote />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <TextField id="repair-name" name="name" label={forms.name} required autoComplete="name" defaultValue={values.name} error={errors.name} />
        <TextField
          id="repair-phone"
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
          id="repair-address"
          name="address"
          label={repair.address}
          required
          autoComplete="street-address"
          defaultValue={values.address}
          error={errors.address}
          className="sm:col-span-2"
        />
        <SelectField id="repair-machine" name="machine" label={repair.machine} options={choices.machines} defaultValue={values.machine} />
        <SelectField
          id="repair-time"
          name="bestTime"
          label={repair.bestTime}
          options={choices.times}
          defaultValue={values.bestTime}
        />
        <TextAreaField
          id="repair-problem"
          name="problem"
          label={repair.problem}
          required
          rows={5}
          defaultValue={values.problem}
          error={errors.problem}
          className="sm:col-span-2"
          hint={repair.problemHint}
        />
      </div>

      <Honeypot />
      {result?.status === "error" && <SendError />}
      <SubmitButton sending={sending}>{repair.submit}</SubmitButton>
    </Form>
  );
}
