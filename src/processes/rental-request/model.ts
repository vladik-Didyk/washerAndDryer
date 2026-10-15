// The rental request: three steps, then a confirmation.
//   1. /start/          machine type
//   2. /start/details/  postal code, closet width, dryer outlet, the way in (floor/elevator)
//   3. /start/contact/  name, phone, email (optional), preferred day, notes
//   -> /start/done/
// Each step posts to its own server action, which checks the fields here and keeps the
// answers in a signed cookie session (./session.server.ts) until the last step sends them.
// Pure functions only: the tests call them directly.
import { getMachineTypes } from "~/entities/machine";
import { checkPostalCode, formatPostalCode, type PostalStatus } from "~/features/postal-check";
import type { I18n } from "~/shared/i18n";
import { EMAIL_PATTERN, PHONE_PATTERN, field, type FieldErrorMap, type Validation } from "~/shared/lib/form-data";

export const STEP_PATHS = {
  machine: "/start/",
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

export interface Choice {
  value: string;
  label: string;
  note?: string;
}

// The four sets by type, then one machine (a washer or a dryer), then "not sure".
export function machineChoices({ d }: I18n): Choice[] {
  const text = d.start.machine;
  return [
    ...getMachineTypes(d)
      .filter((machine) => machine.slug !== "single-machine")
      .map((machine) => ({ value: machine.slug, label: machine.title, note: text.setNote })),
    { value: "washer-only", label: text.washerOnly, note: text.singleNote },
    { value: "dryer-only", label: text.dryerOnly, note: text.singleNote },
    { value: "not-sure", label: text.notSure, note: text.notSureNote },
  ];
}

export function outletChoices({ d }: I18n): Choice[] {
  const { outlets } = d.start.details;
  return (["3-prong", "4-prong", "not-sure"] as const).map((value) => ({ value, label: outlets[value] }));
}

export function accessChoices({ d }: I18n): Choice[] {
  const { accessChoices: text } = d.start.details;
  return (["ground", "stairs", "elevator"] as const).map((value) => ({ value, ...text[value] }));
}

const labelOf = (choices: Choice[], value: string | undefined) =>
  choices.find((choice) => choice.value === value)?.label ?? value ?? "";

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
  details?: DetailsStepValues & { city: string | null; postalStatus: PostalStatus };
}

export const EMPTY_MACHINE: MachineStepValues = { machine: "" };
export const EMPTY_DETAILS: DetailsStepValues = { postal: "", closetWidth: "", outlet: "", access: "", floor: "" };
export const EMPTY_CONTACT: ContactStepValues = { name: "", phone: "", email: "", preferredDay: "", notes: "" };

const isChoice = (choices: Choice[], value: string) => choices.some((choice) => choice.value === value);

// Step 1.
export function validateMachineStep(form: FormData, i18n: I18n): Validation<MachineStepValues, MachineStepValues> {
  const values = { machine: field(form, "machine") };
  if (!isChoice(machineChoices(i18n), values.machine)) {
    return { ok: false, values, errors: { machine: i18n.d.start.machine.error } };
  }
  return { ok: true, values, fields: values };
}

// Step 2. The postal code must be a real Canadian one; outside the areas we know, the request
// still goes through (we confirm by text), as the postal-code checker says.
export function validateDetailsStep(
  form: FormData,
  i18n: I18n,
): Validation<DetailsStepValues, NonNullable<RentalDraft["details"]>> {
  const { errors: text } = i18n.d.start.details;
  const values: DetailsStepValues = {
    postal: field(form, "postal"),
    closetWidth: field(form, "closetWidth"),
    outlet: field(form, "outlet"),
    access: field(form, "access"),
    floor: field(form, "floor"),
  };
  const errors: FieldErrorMap = {};
  const postal = checkPostalCode(values.postal, i18n);
  if (!values.postal) errors.postal = text.postal;
  else if (postal.status === "invalid") errors.postal = postal.message;
  if (!values.closetWidth) errors.closetWidth = text.widthMissing;
  else if (values.closetWidth.length > 60) errors.closetWidth = text.widthLong;
  if (!isChoice(outletChoices(i18n), values.outlet)) errors.outlet = text.outlet;
  if (!isChoice(accessChoices(i18n), values.access)) errors.access = text.access;
  if (values.floor.length > 60) errors.floor = text.floorLong;

  if (Object.keys(errors).length) return { ok: false, values, errors };
  return {
    ok: true,
    values,
    fields: {
      ...values,
      postal: formatPostalCode(values.postal),
      city: postal.city ?? null,
      postalStatus: postal.status,
    },
  };
}

// The longest notes we take.
export const NOTES_MAX = 2000;

// Step 3. `today` is the date in Toronto ("YYYY-MM-DD"): a preferred day can't be earlier.
export function validateContactStep(
  form: FormData,
  today: string,
  i18n: I18n,
): Validation<ContactStepValues, ContactStepValues> {
  const { forms, start } = i18n.d;
  const values: ContactStepValues = {
    name: field(form, "name"),
    phone: field(form, "phone"),
    email: field(form, "email"),
    preferredDay: field(form, "preferredDay"),
    notes: field(form, "notes"),
  };
  const errors: FieldErrorMap = {};
  if (!values.name) errors.name = forms.errors.nameMissing;
  else if (values.name.length < 2) errors.name = forms.errors.nameShort;
  if (!values.phone) errors.phone = forms.errors.phoneMissing;
  else if (!PHONE_PATTERN.test(values.phone)) errors.phone = forms.errors.phoneInvalid;
  if (values.email && !EMAIL_PATTERN.test(values.email)) errors.email = forms.errors.emailInvalid;
  if (values.preferredDay) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(values.preferredDay)) errors.preferredDay = start.contact.errors.date;
    else if (values.preferredDay < today) errors.preferredDay = start.contact.errors.dateEarly;
  }
  if (values.notes.length > NOTES_MAX) errors.notes = i18n.format(start.contact.errors.notesLong, { max: NOTES_MAX });

  if (Object.keys(errors).length) return { ok: false, values, errors };
  return { ok: true, values, fields: values };
}

// Where a visitor belongs: the first step not done yet.
export function firstOpenStep(draft: RentalDraft): StepId {
  if (!draft.machine) return "machine";
  if (!draft.details) return "details";
  return "contact";
}

export const machineLabel = (i18n: I18n, value: string | undefined) => labelOf(machineChoices(i18n), value);
export const outletLabel = (i18n: I18n, value: string | undefined) => labelOf(outletChoices(i18n), value);
export const accessLabel = (i18n: I18n, value: string | undefined) => labelOf(accessChoices(i18n), value);

// The email the business gets (through Web3Forms), one line per answer.
export function rentalRequestFields(
  draft: Required<RentalDraft>,
  contact: ContactStepValues,
  i18n: I18n,
): Record<string, string> {
  const { details } = draft;
  const { forms, start } = i18n.d;
  return {
    subject: i18n.format(start.email.subject, { name: contact.name }),
    name: contact.name,
    phone: contact.phone,
    email: contact.email || forms.notGiven,
    machine_type: machineLabel(i18n, draft.machine.machine),
    postal_code: details.postal,
    area: details.city ?? start.email.areaUnsure,
    closet_width: details.closetWidth,
    dryer_outlet: outletLabel(i18n, details.outlet),
    access: accessLabel(i18n, details.access),
    floor: details.floor || forms.notGiven,
    preferred_day: contact.preferredDay || forms.notGiven,
    notes: contact.notes || forms.none,
  };
}
