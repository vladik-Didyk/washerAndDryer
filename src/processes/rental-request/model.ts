// The rental request: three steps, then a confirmation.
//   1. /start/          machine type                                       form "startMachine"
//   2. /start/details/  postal code, closet width, dryer outlet, the way in form "startDetails"
//   3. /start/contact/  name, phone, email (optional), preferred day, notes form "startContact"
//   -> /start/done/
// The fields and their checks are in the forms registry (shared/forms); each step posts to its
// own server action, which checks it there and keeps the answers in a signed cookie session
// (./session.server.ts) until the last step sends them. Every path also exists under /es/ and
// /ru/ (i18n.href). Pure functions only: the tests call them directly.
import { checkPostalCode, formatPostalCode, type PostalStatus } from "~/features/postal-check";
import { pagePaths } from "~/shared/config";
import {
  englishOf,
  fieldOptions,
  formEmail,
  formField,
  optionLabel,
  validateForm,
  type FieldErrors,
  type FormKey,
} from "~/shared/forms";
import type { I18n } from "~/shared/i18n";

export const STEP_PATHS = {
  machine: pagePaths.start,
  details: "/start/details/",
  contact: "/start/contact/",
  done: "/start/done/",
} as const;

// The three steps; their names are start.steps.<id> in the dictionary.
export const STEPS = [
  { id: "machine", path: STEP_PATHS.machine },
  { id: "details", path: STEP_PATHS.details },
  { id: "contact", path: STEP_PATHS.contact },
] as const;

export type StepId = (typeof STEPS)[number]["id"];

export interface MachineStepValues {
  machine: string;
}

export interface DetailsStepValues {
  postal: string;
  closetWidth: string;
  outlet: string;
  access: string;
  floor: string;
}

export interface ContactStepValues {
  name: string;
  phone: string;
  email: string;
  preferredDay: string;
  notes: string;
}

// What the session keeps between the steps.
export interface RentalDraft {
  machine?: MachineStepValues;
  details?: DetailsStepValues & { postalStatus: PostalStatus };
}

type StepCheck<Values, Fields> =
  | { ok: true; values: Values; fields: Fields }
  | { ok: false; values: Values; errors: FieldErrors };

function check<Values>(form: FormKey, data: FormData, i18n: I18n, today?: string) {
  const result = validateForm(form, data, i18n, { today });
  return { ...result, values: result.values as unknown as Values };
}

// The machine types, as step 1 offers them (a ?machine= preselect must be one of them).
export const machineChoices = (i18n: I18n) => fieldOptions(formField("startMachine", "machine"), i18n);

// Step 1.
export function validateMachineStep(data: FormData, i18n: I18n): StepCheck<MachineStepValues, MachineStepValues> {
  const result = check<MachineStepValues>("startMachine", data, i18n);
  return result.ok ? { ...result, fields: result.values } : result;
}

// Step 2. The postal code must be a real Canadian one; outside the areas we know, the request
// still goes through (we confirm by text), as the postal-code checker says.
export function validateDetailsStep(
  data: FormData,
  i18n: I18n,
): StepCheck<DetailsStepValues, NonNullable<RentalDraft["details"]>> {
  const result = check<DetailsStepValues>("startDetails", data, i18n);
  if (!result.ok) return result;
  const { values } = result;
  return {
    ...result,
    fields: { ...values, postal: formatPostalCode(values.postal), postalStatus: checkPostalCode(values.postal, i18n).status },
  };
}

// Step 3. `today` is the date in Toronto ("YYYY-MM-DD"): a preferred day can't be earlier.
export function validateContactStep(
  data: FormData,
  today: string,
  i18n: I18n,
): StepCheck<ContactStepValues, ContactStepValues> {
  const result = check<ContactStepValues>("startContact", data, i18n, today);
  return result.ok ? { ...result, fields: result.values } : result;
}

// Where a visitor belongs: the first step not done yet.
export function firstOpenStep(draft: RentalDraft): StepId {
  if (!draft.machine) return "machine";
  if (!draft.details) return "details";
  return "contact";
}

// An answer as the visitor chose it, in the language of `i18n`.
export const machineLabel = (i18n: I18n, value: string | undefined) => optionLabel("startMachine", "machine", value, i18n);
export const outletLabel = (i18n: I18n, value: string | undefined) => optionLabel("startDetails", "outlet", value, i18n);
export const accessLabel = (i18n: I18n, value: string | undefined) => optionLabel("startDetails", "access", value, i18n);

// The city of a postal code, in the language of `i18n` (null when we can't tell).
export const postalCity = (i18n: I18n, postal: string) => checkPostalCode(postal, i18n).city ?? null;

// The email the business gets (through Web3Forms), one line per answer, in English whatever
// the language of the page (with that language on the first line).
export function rentalRequestFields(
  draft: Required<RentalDraft>,
  contact: ContactStepValues,
  i18n: I18n,
): Record<string, string> {
  const { details } = draft;
  const english = englishOf(i18n);
  const { forms, start } = english.d;
  return formEmail(i18n, {
    subject: english.format(start.email.subject, { name: contact.name }),
    name: contact.name,
    phone: contact.phone,
    email: contact.email || forms.notGiven,
    machine_type: machineLabel(english, draft.machine.machine),
    postal_code: details.postal,
    area: postalCity(english, details.postal) ?? start.email.areaUnsure,
    closet_width: details.closetWidth,
    dryer_outlet: outletLabel(english, details.outlet),
    access: accessLabel(english, details.access),
    floor: details.floor || forms.notGiven,
    preferred_day: contact.preferredDay || forms.notGiven,
    notes: contact.notes || forms.none,
  });
}
