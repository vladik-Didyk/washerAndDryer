import { Form, useNavigation } from "react-router";
import type { FormActionData } from "~/shared/lib";
import {
  ChoiceTiles,
  Honeypot,
  RequiredNote,
  SelectField,
  SendError,
  SentPanel,
  SubmitButton,
  TextAreaField,
  TextField,
} from "~/shared/ui";
import {
  EMPTY_VALUES,
  MACHINE_OPTIONS,
  OPTION_CHOICES,
  SETUP_OPTIONS,
  type LandlordQuoteValues,
} from "./model";

// Landlord quote request. A plain form posted to the page's server action, so it works with
// JavaScript off; with JavaScript on, React Router submits it without a page reload.
export function LandlordQuoteForm({ result }: { result?: FormActionData<LandlordQuoteValues> }) {
  const navigation = useNavigation();
  const sending = navigation.state === "submitting";

  if (result?.status === "sent") {
    return <SentPanel title="Quote request sent." resetHref="/landlords/quote/#landlord-quote" />;
  }

  const values = result ? result.values : EMPTY_VALUES;
  const errors = result?.status === "invalid" ? result.errors : {};

  return (
    <Form
      method="post"
      noValidate
      aria-labelledby="quote-form-title"
      className="rounded-3xl border border-line bg-white p-5 sm:p-8"
    >
      <h2 id="quote-form-title" className="font-display text-2xl font-bold text-ink">
        Your building
      </h2>
      <div className="mt-2">
        <RequiredNote />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <TextField id="quote-name" name="name" label="Name" required autoComplete="name" defaultValue={values.name} error={errors.name} />
        <TextField
          id="quote-phone"
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
          id="quote-email"
          name="email"
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          defaultValue={values.email}
          error={errors.email}
          className="sm:col-span-2"
        />
        <TextField
          id="quote-address"
          name="address"
          label="Building address or city"
          required
          autoComplete="street-address"
          defaultValue={values.address}
          error={errors.address}
        />
        <TextField
          id="quote-units"
          name="units"
          label="Number of units"
          required
          type="number"
          inputMode="numeric"
          min={1}
          defaultValue={values.units}
          error={errors.units}
        />
        <ChoiceTiles
          id="quote-setup"
          name="setup"
          legend="What's there now"
          choices={SETUP_OPTIONS}
          defaultValue={values.setup}
          error={errors.setup}
        />
        <SelectField
          id="quote-machine"
          name="machineType"
          label="Machine type"
          options={MACHINE_OPTIONS}
          defaultValue={values.machineType}
          className="sm:col-span-2"
        />
        <ChoiceTiles
          id="quote-option"
          name="option"
          legend="How you'd like to do it"
          choices={OPTION_CHOICES}
          defaultValue={values.option}
          error={errors.option}
        />
        <TextAreaField
          id="quote-notes"
          name="notes"
          label="Notes"
          defaultValue={values.notes}
          className="sm:col-span-2"
          hint="For example: where the laundry is in each unit, stairs or elevator, a good time to see the building."
        />
      </div>

      <Honeypot />
      {result?.status === "error" && <SendError />}
      <SubmitButton sending={sending}>Send quote request</SubmitButton>
    </Form>
  );
}
