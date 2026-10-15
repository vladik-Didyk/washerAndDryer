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
import { Card, Heading } from "~/shared/ui";

// Repair request for a machine rented from us: the fields of the "repair" form (shared/forms
// registry), posted to the page's server action. It works with JavaScript off.
export function RepairForm({ result }: { result?: FormActionData }) {
  const sending = useNavigation().state === "submitting";
  const i18n = useI18n();
  const { repair } = i18n.d;

  if (result?.status === "sent") {
    return <SentPanel title={repair.sent} note={repair.sentNote} resetHref={`${pagePaths.repair}#repair-request`} />;
  }

  return (
    <Card
      as={Form}
      method="post"
      noValidate
      padding="form"
      aria-labelledby="repair-form-title"
    >
      <Heading id="repair-form-title" variant="card">
        {repair.formTitle}
      </Heading>
      <div className="mt-2">
        <RequiredNote />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <FormFields
          form="repair"
          values={result ? result.values : emptyValues("repair", i18n)}
          errors={result?.status === "invalid" ? result.errors : {}}
        />
      </div>

      <Honeypot />
      {result?.status === "error" && <SendError />}
      <SubmitButton sending={sending}>{repair.submit}</SubmitButton>
    </Card>
  );
}
