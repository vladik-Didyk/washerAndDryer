// The server actions of the three steps. Each checks its fields (./model.ts): errors go back
// to the same page with what was typed (status 400); a valid step is saved in the session and
// the visitor moves on. The last step sends the request through Web3Forms and clears the
// session. No JavaScript needed: these are plain form posts.
import { data, redirect, type ActionFunctionArgs } from "react-router";
import { requestI18n } from "~/entities/offer";
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

// Every redirect stays in the page's language (/es/start/ -> /es/start/details/).
const goTo = async (path: string, commit: () => Promise<string>) =>
  redirect(path, { headers: { "Set-Cookie": await commit() } });

export async function machineAction(args: ActionFunctionArgs) {
  const { request, context } = args;
  const i18n = await requestI18n(args);
  const rental = await openRentalSession(request, context, i18n.lang);
  const checked = validateMachineStep(await request.formData(), i18n);
  if (!checked.ok) return data({ errors: checked.errors, values: checked.values }, { status: 400 });
  rental.saveDraft({ ...rental.draft(), machine: checked.fields });
  return goTo(i18n.href(STEP_PATHS.details), rental.commit);
}

export async function detailsAction(args: ActionFunctionArgs) {
  const { request, context } = args;
  const i18n = await requestI18n(args);
  const rental = await openRentalSession(request, context, i18n.lang);
  const draft = rental.draft();
  if (!draft.machine) return redirect(i18n.href(STEP_PATHS.machine));
  const checked = validateDetailsStep(await request.formData(), i18n);
  if (!checked.ok) return data({ errors: checked.errors, values: checked.values }, { status: 400 });
  rental.saveDraft({ ...draft, details: checked.fields });
  return goTo(i18n.href(STEP_PATHS.contact), rental.commit);
}

export async function contactAction(args: ActionFunctionArgs) {
  const { request, context } = args;
  const i18n = await requestI18n(args);
  const rental = await openRentalSession(request, context, i18n.lang);
  const draft = rental.draft();
  const open = firstOpenStep(draft);
  if (open !== "contact") return redirect(i18n.href(STEP_PATHS[open]));

  const form = await request.formData();
  const checked = validateContactStep(form, torontoDate(requestTimeOf(context)), i18n);
  if (!checked.ok) {
    return data({ status: "invalid" as const, errors: checked.errors, values: checked.values }, { status: 400 });
  }

  // A bot ticked the hidden box: finish as if sent, send nothing.
  if (!isBot(form)) {
    const sent = await submitToWeb3Forms(
      envOf(context),
      rentalRequestFields(draft as Required<RentalDraft>, checked.fields, i18n),
    );
    if (!sent.ok) {
      return data({ status: "error" as const, errors: {}, values: checked.values }, { status: 502 });
    }
  }
  rental.finish(checked.fields);
  return goTo(i18n.href(STEP_PATHS.done), rental.commit);
}
