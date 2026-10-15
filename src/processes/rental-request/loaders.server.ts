// The loaders of the four rental-request pages: what each step shows, filled in from the
// session. A step whose earlier steps aren't done sends the visitor back to the first open one.
import { data, redirect, type LoaderFunctionArgs } from "react-router";
import { requestTimeOf, siteConfig } from "~/shared/config";
import { torontoDate } from "~/shared/lib";
import { stepHeads } from "./head";
import {
  EMPTY_CONTACT,
  EMPTY_DETAILS,
  MACHINE_CHOICES,
  STEP_PATHS,
  accessLabel,
  firstOpenStep,
  machineLabel,
  outletLabel,
} from "./model";
import { openRentalSession } from "./session.server";

const smsChrome = {
  mobileAction: { label: "Text us", href: siteConfig.phone.sms, icon: "sms" as const },
};

export async function machineLoader({ request, context }: LoaderFunctionArgs) {
  const rental = await openRentalSession(request, context);
  // "Start your rental" on a machine type page preselects that type (/start/?machine=stackable).
  const asked = new URL(request.url).searchParams.get("machine") ?? "";
  const preselect = MACHINE_CHOICES.some((choice) => choice.value === asked) ? asked : "";
  return {
    head: stepHeads.machine(),
    chrome: smsChrome,
    values: { machine: rental.draft().machine?.machine ?? preselect },
  };
}

export async function detailsLoader({ request, context }: LoaderFunctionArgs) {
  const rental = await openRentalSession(request, context);
  const draft = rental.draft();
  if (!draft.machine) throw redirect(STEP_PATHS.machine);
  const { city: _city, postalStatus: _status, ...values } = draft.details ?? { ...EMPTY_DETAILS, city: null, postalStatus: "invalid" };
  return {
    head: stepHeads.details(),
    chrome: smsChrome,
    machine: machineLabel(draft.machine.machine),
    values,
  };
}

export async function contactLoader({ request, context }: LoaderFunctionArgs) {
  const rental = await openRentalSession(request, context);
  const draft = rental.draft();
  const open = firstOpenStep(draft);
  if (open !== "contact") throw redirect(STEP_PATHS[open]);
  const details = draft.details!;
  return {
    head: stepHeads.contact(),
    chrome: smsChrome,
    // The earliest preferred day: today in Toronto (from the server, so the page and the
    // check agree).
    today: torontoDate(requestTimeOf(context)),
    summary: [
      { label: "Machine", value: machineLabel(draft.machine!.machine) },
      { label: "Postal code", value: details.city ? `${details.postal} (${details.city})` : details.postal },
      { label: "Closet width", value: details.closetWidth },
      { label: "Dryer outlet", value: outletLabel(details.outlet) },
      { label: "Way in", value: [accessLabel(details.access), details.floor].filter(Boolean).join(", ") },
    ],
    postalUnsure: details.postalStatus === "unsure",
    values: EMPTY_CONTACT,
  };
}

// Shown once, right after sending (a flash message); otherwise back to the start.
export async function doneLoader({ request, context }: LoaderFunctionArgs) {
  const rental = await openRentalSession(request, context);
  const sent = rental.session.get("sent");
  if (!sent) throw redirect(STEP_PATHS.machine);
  return data(
    { head: stepHeads.done(), chrome: smsChrome, sent },
    { headers: { "Set-Cookie": await rental.commit() } },
  );
}
