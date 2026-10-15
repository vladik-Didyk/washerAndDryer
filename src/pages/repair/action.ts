// Server action of /repair/: checks the posted form and sends it through Web3Forms.
import { data, type ActionFunctionArgs } from "react-router";
import { requestI18n } from "~/entities/offer";
import { readRepair, validateRepair, type RepairValues } from "~/features/repair-form";
import { submitToWeb3Forms } from "~/shared/api/web3forms.server";
import { envOf } from "~/shared/config";
import { isBot, type FormActionData } from "~/shared/lib";

export async function action(args: ActionFunctionArgs) {
  const { request, context } = args;
  const i18n = await requestI18n(args);
  const form = await request.formData();
  const values = readRepair(form, i18n);
  const checked = validateRepair(values, i18n);
  if (!checked.ok) {
    return data<FormActionData<RepairValues>>({ status: "invalid", values, errors: checked.errors }, { status: 400 });
  }
  // A bot ticked the hidden box: answer as if sent, send nothing.
  if (isBot(form)) return { status: "sent" } satisfies FormActionData<RepairValues>;

  const sent = await submitToWeb3Forms(envOf(context), checked.fields);
  if (!sent.ok) return data<FormActionData<RepairValues>>({ status: "error", values }, { status: 502 });
  return { status: "sent" } satisfies FormActionData<RepairValues>;
}
