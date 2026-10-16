// Server action of /repair/ (and /es/, /ru/): checks the posted form against its definition
// (shared/forms, form "repair") and emails it to the business, in English.
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
function repairEmail(values: FormValues, i18n: I18n) {
  const { d, format } = englishOf(i18n);
  return formEmail(i18n, {
    subject: format(d.repair.subject, { name: values.name }),
    name: values.name,
    phone: values.phone,
    address_or_postal_code: values.address,
    machine: sentValue(formField("repair", "machine"), values.machine, i18n),
    problem: values.problem,
    best_time: sentValue(formField("repair", "bestTime"), values.bestTime, i18n),
  });
}

export async function action(args: ActionFunctionArgs) {
  const { request, context } = args;
  const i18n = await requestI18n(args);
  const form = await request.formData();
  const checked = validateForm("repair", form, i18n);
  if (!checked.ok) {
    return data<FormActionData>({ status: "invalid", values: checked.values, errors: checked.errors }, { status: 400 });
  }
  // A bot ticked the hidden box: answer as if sent, send nothing.
  if (isBot(form)) return { status: "sent" } satisfies FormActionData;

  const sent = await sendFormEmail(envOf(context), repairEmail(checked.values, i18n));
  if (!sent.ok) return data<FormActionData>({ status: "error", values: checked.values }, { status: 502 });
  return { status: "sent" } satisfies FormActionData;
}
