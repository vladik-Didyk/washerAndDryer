import { Form, useNavigation } from "react-router";
import { pagePaths } from "~/shared/config";
import {
  FormFields,
  Honeypot,
  RequiredNote,
  SendError,
  SentPanel,
  PrivacyNote,
  SubmitButton,
  emptyValues,
  type FormActionData,
} from "~/shared/forms";
import { useI18n } from "~/shared/i18n";
import { Card, Heading } from "~/shared/ui";

// Landlord quote request: the fields of the "landlordQuote" form (shared/forms registry),
// posted to the page's server action, so it works with JavaScript off; with JavaScript on,
// React Router submits it without a page reload.
export function LandlordQuoteForm({ result }: { result?: FormActionData }) {
  const sending = useNavigation().state === "submitting";
  const i18n = useI18n();
  const { quote } = i18n.d.landlords;

  if (result?.status === "sent") {
    return <SentPanel form="landlord-quote" title={quote.sent} resetHref={`${pagePaths.landlordQuote}#landlord-quote`} />;
  }

  return (
    <Card
      as={Form}
      method="post"
      noValidate
      padding="form"
      aria-labelledby="quote-form-title"
    >
      <Heading id="quote-form-title" variant="card">
        {quote.formTitle}
      </Heading>
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
      <PrivacyNote />
    </Card>
  );
}
