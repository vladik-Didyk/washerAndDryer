// Server action of /landlords/quote/ (and /es/, /ru/): checks the posted form against its
// definition (shared/forms, form "landlordQuote") and emails it to the business, in English.
import { data, type ActionFunctionArgs } from "react-router";
import { requestI18n } from "~/entities/offer";
import { sendFormEmail } from "~/shared/api/email.server";
import { envOf } from "~/shared/config";
import {
  englishOf,
  formEmail,
  formField,
  isBot,
  sentValue,
  validateForm,
  type FormActionData,
  type FormValues,
} from "~/shared/forms";
import type { I18n } from "~/shared/i18n";

// The email: English labels and values, as the business reads it.
function quoteEmail(values: FormValues, i18n: I18n) {
  const { d, format } = englishOf(i18n);
  return formEmail(i18n, {
    subject: format(d.landlords.quote.subject, { name: values.name }),
    name: values.name,
    phone: values.phone,
    email: values.email || d.forms.notGiven,
    building: values.address,
    units: values.units,
    current_setup: values.setup,
    machine_type: sentValue(formField("landlordQuote", "machineType"), values.machineType, i18n),
    option: values.option,
    notes: values.notes || d.forms.none,
  });
}

export async function action(args: ActionFunctionArgs) {
  const { request, context } = args;
  const i18n = await requestI18n(args);
  const form = await request.formData();
  const checked = validateForm("landlordQuote", form, i18n);
  if (!checked.ok) {
    return data<FormActionData>({ status: "invalid", values: checked.values, errors: checked.errors }, { status: 400 });
  }
  // A bot ticked the hidden box: answer as if sent, send nothing.
  if (isBot(form)) return { status: "sent" } satisfies FormActionData;

  const sent = await sendFormEmail(envOf(context), quoteEmail(checked.values, i18n));
  if (!sent.ok) return data<FormActionData>({ status: "error", values: checked.values }, { status: 502 });
  return { status: "sent" } satisfies FormActionData;
}
