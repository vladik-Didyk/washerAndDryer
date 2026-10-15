import { Form, useNavigation } from "react-router";
import { useI18n } from "~/shared/i18n";
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
import { emptyLandlordQuote, quoteChoices, type LandlordQuoteValues } from "./model";

// Landlord quote request. A plain form posted to the page's server action, so it works with
// JavaScript off; with JavaScript on, React Router submits it without a page reload.
export function LandlordQuoteForm({ result }: { result?: FormActionData<LandlordQuoteValues> }) {
  const navigation = useNavigation();
  const sending = navigation.state === "submitting";
  const i18n = useI18n();
  const { forms, landlords } = i18n.d;
  const { quote } = landlords;
  const choices = quoteChoices(i18n);

  if (result?.status === "sent") {
    return <SentPanel title={quote.sent} resetHref="/landlords/quote/#landlord-quote" />;
  }

  const values = result ? result.values : emptyLandlordQuote(i18n);
  const errors = result?.status === "invalid" ? result.errors : {};

  return (
    <Form
      method="post"
      noValidate
      aria-labelledby="quote-form-title"
      className="rounded-3xl border border-line bg-white p-5 sm:p-8"
    >
      <h2 id="quote-form-title" className="font-display text-2xl font-bold text-ink">
        {quote.formTitle}
      </h2>
      <div className="mt-2">
        <RequiredNote />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <TextField id="quote-name" name="name" label={forms.name} required autoComplete="name" defaultValue={values.name} error={errors.name} />
        <TextField
          id="quote-phone"
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
          id="quote-email"
          name="email"
          label={forms.email}
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
          label={quote.address}
          required
          autoComplete="street-address"
          defaultValue={values.address}
          error={errors.address}
        />
        <TextField
          id="quote-units"
          name="units"
          label={quote.units}
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
          legend={quote.setup}
          choices={choices.setup}
          defaultValue={values.setup}
          error={errors.setup}
        />
        <SelectField
          id="quote-machine"
          name="machineType"
          label={quote.machineType}
          options={choices.machine}
          defaultValue={values.machineType}
          className="sm:col-span-2"
        />
        <ChoiceTiles
          id="quote-option"
          name="option"
          legend={quote.option}
          choices={choices.option}
          defaultValue={values.option}
          error={errors.option}
        />
        <TextAreaField
          id="quote-notes"
          name="notes"
          label={forms.notes}
          defaultValue={values.notes}
          className="sm:col-span-2"
          hint={quote.notesHint}
        />
      </div>

      <Honeypot />
      {result?.status === "error" && <SendError />}
      <SubmitButton sending={sending}>{quote.submit}</SubmitButton>
    </Form>
  );
}
