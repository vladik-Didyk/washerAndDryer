import { Form, useNavigation } from "react-router";
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
import { EMPTY_VALUES, MACHINE_OPTIONS, TIME_OPTIONS, type RepairValues } from "./model";

// Repair request for a machine rented from us. A plain form posted to the page's server
// action: it works with JavaScript off.
export function RepairForm({ result }: { result?: FormActionData<RepairValues> }) {
  const navigation = useNavigation();
  const sending = navigation.state === "submitting";

  if (result?.status === "sent") {
    return (
      <SentPanel
        title="Repair request sent."
        note="We'll call or text you to arrange the repair."
        resetHref="/repair/#repair-request"
      />
    );
  }

  const values = result ? result.values : EMPTY_VALUES;
  const errors = result?.status === "invalid" ? result.errors : {};

  return (
    <Form
      method="post"
      noValidate
      aria-labelledby="repair-form-title"
      className="rounded-3xl border border-line bg-white p-5 sm:p-8"
    >
      <h2 id="repair-form-title" className="font-display text-2xl font-bold text-ink">
        What's wrong?
      </h2>
      <div className="mt-2">
        <RequiredNote />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <TextField id="repair-name" name="name" label="Name" required autoComplete="name" defaultValue={values.name} error={errors.name} />
        <TextField
          id="repair-phone"
          name="phone"
          label="Phone"
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
          label="Address or postal code"
          required
          autoComplete="street-address"
          defaultValue={values.address}
          error={errors.address}
          className="sm:col-span-2"
        />
        <SelectField id="repair-machine" name="machine" label="Machine" options={MACHINE_OPTIONS} defaultValue={values.machine} />
        <SelectField
          id="repair-time"
          name="bestTime"
          label="Best time to reach you"
          options={TIME_OPTIONS}
          defaultValue={values.bestTime}
        />
        <TextAreaField
          id="repair-problem"
          name="problem"
          label="What's wrong"
          required
          rows={5}
          defaultValue={values.problem}
          error={errors.problem}
          className="sm:col-span-2"
          hint="For example: won't start, won't drain, leaks, doesn't heat, an error code on the display."
        />
      </div>

      <Honeypot />
      {result?.status === "error" && <SendError />}
      <SubmitButton sending={sending}>Send repair request</SubmitButton>
    </Form>
  );
}
