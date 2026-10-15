// The loaders of the four rental-request pages: what each step shows, filled in from the
// session. A step whose earlier steps aren't done sends the visitor back to the first open one.
import { data, redirect, type LoaderFunctionArgs } from "react-router";
import { requestI18n } from "~/entities/offer";
import { requestTimeOf } from "~/shared/config";
import { torontoDate } from "~/shared/lib";
import { stepHeads } from "./head";
import { emptyValues } from "~/shared/forms";
import { STEP_PATHS, accessLabel, firstOpenStep, machineChoices, machineLabel, outletLabel, postalCity } from "./model";
import { openRentalSession } from "./session.server";

// The phone bar's second button on these pages: "Text us" (src/app/chrome.tsx).
const smsChrome = { mobileAction: "textUs" as const };

export async function machineLoader(args: LoaderFunctionArgs) {
  const { request, context } = args;
  const i18n = await requestI18n(args);
  const rental = await openRentalSession(request, context, i18n.lang);
  // "Start your rental" on a machine type page preselects that type (/start/?machine=stackable).
  const asked = new URL(request.url).searchParams.get("machine") ?? "";
  const preselect = machineChoices(i18n).some((choice) => choice.value === asked) ? asked : "";
  return {
    head: stepHeads.machine(i18n),
    chrome: smsChrome,
    values: { machine: rental.draft().machine?.machine ?? preselect },
  };
}

export async function detailsLoader(args: LoaderFunctionArgs) {
  const { request, context } = args;
  const i18n = await requestI18n(args);
  const rental = await openRentalSession(request, context, i18n.lang);
  const draft = rental.draft();
  if (!draft.machine) throw redirect(i18n.href(STEP_PATHS.machine));
  const { postalStatus: _status, ...values } = draft.details ?? { ...emptyValues("startDetails", i18n), postalStatus: "invalid" };
  return {
    head: stepHeads.details(i18n),
    chrome: smsChrome,
    machine: machineLabel(i18n, draft.machine.machine),
    values,
  };
}

export async function contactLoader(args: LoaderFunctionArgs) {
  const { request, context } = args;
  const i18n = await requestI18n(args);
  const { summary: labels } = i18n.d.start.contact;
  const rental = await openRentalSession(request, context, i18n.lang);
  const draft = rental.draft();
  const open = firstOpenStep(draft);
  if (open !== "contact") throw redirect(i18n.href(STEP_PATHS[open]));
  const details = draft.details!;
  const city = postalCity(i18n, details.postal);
  return {
    head: stepHeads.contact(i18n),
    chrome: smsChrome,
    // The earliest preferred day: today in Toronto (from the server, so the page and the
    // check agree).
    today: torontoDate(requestTimeOf(context)),
    summary: [
      { label: labels.machine, value: machineLabel(i18n, draft.machine!.machine) },
      {
        label: labels.postal,
        value: city ? i18n.format(labels.postalWithCity, { postal: details.postal, city }) : details.postal,
      },
      { label: labels.width, value: details.closetWidth },
      { label: labels.outlet, value: outletLabel(i18n, details.outlet) },
      { label: labels.access, value: [accessLabel(i18n, details.access), details.floor].filter(Boolean).join(", ") },
    ],
    postalUnsure: details.postalStatus === "unsure",
    values: emptyValues("startContact", i18n),
  };
}

// Shown once, right after sending (a flash message); otherwise back to the start.
export async function doneLoader(args: LoaderFunctionArgs) {
  const { request, context } = args;
  const i18n = await requestI18n(args);
  const rental = await openRentalSession(request, context, i18n.lang);
  const sent = rental.session.get("sent");
  if (!sent) throw redirect(i18n.href(STEP_PATHS.machine));
  return data(
    { head: stepHeads.done(i18n), chrome: smsChrome, sent },
    { headers: { "Set-Cookie": await rental.commit() } },
  );
}
