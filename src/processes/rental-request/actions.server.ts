// The server actions of the three steps. Each checks its fields (./model.ts): errors go back
// to the same page with what was typed (status 400); a valid step is saved in the session and
// the visitor moves on. The last step sends the request through Web3Forms and clears the
// session. No JavaScript needed: these are plain form posts.
import { data, redirect, type ActionFunctionArgs } from "react-router";
import { submitToWeb3Forms } from "~/shared/api/web3forms.server";
import { envOf, requestTimeOf } from "~/shared/config";
import { isBot, torontoDate } from "~/shared/lib";
import {
  STEP_PATHS,
  firstOpenStep,
  rentalRequestFields,
  validateContactStep,
  validateDetailsStep,
  validateMachineStep,
  type RentalDraft,
} from "./model";
import { openRentalSession } from "./session.server";

const goTo = async (path: string, commit: () => Promise<string>) =>
  redirect(path, { headers: { "Set-Cookie": await commit() } });

export async function machineAction({ request, context }: ActionFunctionArgs) {
  const rental = await openRentalSession(request, context);
  const checked = validateMachineStep(await request.formData());
  if (!checked.ok) return data({ errors: checked.errors, values: checked.values }, { status: 400 });
  rental.saveDraft({ ...rental.draft(), machine: checked.fields });
  return goTo(STEP_PATHS.details, rental.commit);
}

export async function detailsAction({ request, context }: ActionFunctionArgs) {
  const rental = await openRentalSession(request, context);
  const draft = rental.draft();
  if (!draft.machine) return redirect(STEP_PATHS.machine);
  const checked = validateDetailsStep(await request.formData());
  if (!checked.ok) return data({ errors: checked.errors, values: checked.values }, { status: 400 });
  rental.saveDraft({ ...draft, details: checked.fields });
  return goTo(STEP_PATHS.contact, rental.commit);
}

export async function contactAction({ request, context }: ActionFunctionArgs) {
  const rental = await openRentalSession(request, context);
  const draft = rental.draft();
  const open = firstOpenStep(draft);
  if (open !== "contact") return redirect(STEP_PATHS[open]);

  const form = await request.formData();
  const checked = validateContactStep(form, torontoDate(requestTimeOf(context)));
  if (!checked.ok) {
    return data({ status: "invalid" as const, errors: checked.errors, values: checked.values }, { status: 400 });
  }

  // A bot ticked the hidden box: finish as if sent, send nothing.
  if (!isBot(form)) {
    const sent = await submitToWeb3Forms(
      envOf(context),
      rentalRequestFields(draft as Required<RentalDraft>, checked.fields),
    );
    if (!sent.ok) {
      return data({ status: "error" as const, errors: {}, values: checked.values }, { status: 502 });
    }
  }
  rental.finish(checked.fields);
  return goTo(STEP_PATHS.done, rental.commit);
}
