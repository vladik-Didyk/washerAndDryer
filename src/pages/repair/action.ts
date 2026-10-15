// Server action of /repair/: checks the posted form and sends it through Web3Forms.
import { data, type ActionFunctionArgs } from "react-router";
import { readRepair, validateRepair, type RepairValues } from "~/features/repair-form";
import { submitToWeb3Forms } from "~/shared/api/web3forms.server";
import { envOf } from "~/shared/config";
import { isBot, type FormActionData } from "~/shared/lib";

export async function action({ request, context }: ActionFunctionArgs) {
  const form = await request.formData();
  const values = readRepair(form);
  const checked = validateRepair(values);
  if (!checked.ok) {
    return data<FormActionData<RepairValues>>({ status: "invalid", values, errors: checked.errors }, { status: 400 });
  }
  // A bot ticked the hidden box: answer as if sent, send nothing.
  if (isBot(form)) return { status: "sent" } satisfies FormActionData<RepairValues>;

  const sent = await submitToWeb3Forms(envOf(context), checked.fields);
  if (!sent.ok) return data<FormActionData<RepairValues>>({ status: "error", values }, { status: 502 });
  return { status: "sent" } satisfies FormActionData<RepairValues>;
}
