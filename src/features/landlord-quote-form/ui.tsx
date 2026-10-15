import { Form, useNavigation } from "react-router";
import { pagePaths } from "~/shared/config";
import {
  FormFields,
  Honeypot,
  RequiredNote,
  SendError,
  SentPanel,
  SubmitButton,
  emptyValues,
  type FormActionData,
} from "~/shared/forms";
import { useI18n } from "~/shared/i18n";

// Landlord quote request: the fields of the "landlordQuote" form (shared/forms registry),
// posted to the page's server action, so it works with JavaScript off; with JavaScript on,
// React Router submits it without a page reload.
export function LandlordQuoteForm({ result }: { result?: FormActionData }) {
  const sending = useNavigation().state === "submitting";
  const i18n = useI18n();
  const { quote } = i18n.d.landlords;

  if (result?.status === "sent") {
    return <SentPanel title={quote.sent} resetHref={`${pagePaths.landlordQuote}#landlord-quote`} />;
  }

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
        <FormFields
          form="landlordQuote"
          values={result ? result.values : emptyValues("landlordQuote", i18n)}
          errors={result?.status === "invalid" ? result.errors : {}}
        />
      </div>

      <Honeypot />
      {result?.status === "error" && <SendError />}
      <SubmitButton sending={sending}>{quote.submit}</SubmitButton>
    </Form>
  );
}
