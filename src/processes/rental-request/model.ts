// The rental request: three steps, then a confirmation.
//   1. /start/          machine type
//   2. /start/details/  postal code, closet width, dryer outlet, the way in (floor/elevator)
//   3. /start/contact/  name, phone, email (optional), preferred day, notes
//   -> /start/done/
// Each step posts to its own server action, which checks the fields here and keeps the
// answers in a signed cookie session (./session.server.ts) until the last step sends them.
// Pure functions only: the tests call them directly.
import { machineTypes } from "~/entities/machine";
import { checkPostalCode, formatPostalCode, type PostalStatus } from "~/features/postal-check";
import { siteConfig } from "~/shared/config";
import { EMAIL_PATTERN, PHONE_PATTERN, field, type FieldErrorMap, type Validation } from "~/shared/lib/form-data";

export const STEP_PATHS = {
  machine: "/start/",
  details: "/start/details/",
  contact: "/start/contact/",
  done: "/start/done/",
} as const;

export const STEPS = [
  { id: "machine", title: "Machine type", path: STEP_PATHS.machine },
  { id: "details", title: "Your space", path: STEP_PATHS.details },
  { id: "contact", title: "How to reach you", path: STEP_PATHS.contact },
] as const;

export type StepId = (typeof STEPS)[number]["id"];

export interface Choice {
  value: string;
  label: string;
  note?: string;
}

const { prices } = siteConfig;

// The four sets by type, then one machine (a washer or a dryer), then "not sure".
export const MACHINE_CHOICES: Choice[] = [
  ...machineTypes
    .filter((machine) => machine.slug !== "single-machine")
    .map((machine) => ({ value: machine.slug, label: machine.title, note: `$${prices.setText}/week for the set` })),
  { value: "washer-only", label: "Washer only", note: `$${prices.singleText}/week` },
  { value: "dryer-only", label: "Dryer only", note: `$${prices.singleText}/week` },
  { value: "not-sure", label: "Not sure yet", note: "We'll help you choose" },
];

export const OUTLET_CHOICES: Choice[] = [
  { value: "3-prong", label: "3-prong" },
  { value: "4-prong", label: "4-prong" },
  { value: "not-sure", label: "Not sure" },
];

export const ACCESS_CHOICES: Choice[] = [
  { value: "ground", label: "No stairs", note: "Ground floor or a step or two" },
  { value: "stairs", label: "Stairs", note: "Basement or upstairs, no elevator" },
  { value: "elevator", label: "Elevator", note: "Condo or apartment building" },
];

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
export function validateMachineStep(form: FormData): Validation<MachineStepValues, MachineStepValues> {
  const values = { machine: field(form, "machine") };
  if (!isChoice(MACHINE_CHOICES, values.machine)) {
    return { ok: false, values, errors: { machine: "Choose a machine type, or \"Not sure yet\"." } };
  }
  return { ok: true, values, fields: values };
}

// Step 2. The postal code must be a real Canadian one; outside the areas we know, the request
// still goes through (we confirm by text), as the postal-code checker says.
export function validateDetailsStep(form: FormData): Validation<DetailsStepValues, NonNullable<RentalDraft["details"]>> {
  const values: DetailsStepValues = {
    postal: field(form, "postal"),
    closetWidth: field(form, "closetWidth"),
    outlet: field(form, "outlet"),
    access: field(form, "access"),
    floor: field(form, "floor"),
  };
  const errors: FieldErrorMap = {};
  const postal = checkPostalCode(values.postal);
  if (!values.postal) errors.postal = "Enter your postal code.";
  else if (postal.status === "invalid") errors.postal = postal.message;
  if (!values.closetWidth) errors.closetWidth = "Enter the width of the space, or write \"not sure\".";
  else if (values.closetWidth.length > 60) errors.closetWidth = "Keep it short, like 24\" or 61 cm.";
  if (!isChoice(OUTLET_CHOICES, values.outlet)) errors.outlet = "Choose the dryer outlet, or \"Not sure\".";
  if (!isChoice(ACCESS_CHOICES, values.access)) errors.access = "Choose how we get the machine in.";
  if (values.floor.length > 60) errors.floor = "Keep it short, like \"3rd floor\" or \"basement\".";

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

// Step 3. `today` is the date in Toronto ("YYYY-MM-DD"): a preferred day can't be earlier.
export function validateContactStep(form: FormData, today: string): Validation<ContactStepValues, ContactStepValues> {
  const values: ContactStepValues = {
    name: field(form, "name"),
    phone: field(form, "phone"),
    email: field(form, "email"),
    preferredDay: field(form, "preferredDay"),
    notes: field(form, "notes"),
  };
  const errors: FieldErrorMap = {};
  if (!values.name) errors.name = "Enter your name.";
  else if (values.name.length < 2) errors.name = "Name must be at least 2 characters.";
  if (!values.phone) errors.phone = "Enter your phone number.";
  else if (!PHONE_PATTERN.test(values.phone)) errors.phone = "Enter a valid phone number, with area code.";
  if (values.email && !EMAIL_PATTERN.test(values.email)) errors.email = "Enter a valid email address, or leave it empty.";
  if (values.preferredDay) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(values.preferredDay)) errors.preferredDay = "Choose a date.";
    else if (values.preferredDay < today) errors.preferredDay = "Choose today or a later date.";
  }
  if (values.notes.length > 2000) errors.notes = "Keep the notes under 2,000 characters.";

  if (Object.keys(errors).length) return { ok: false, values, errors };
  return { ok: true, values, fields: values };
}

// Where a visitor belongs: the first step not done yet.
export function firstOpenStep(draft: RentalDraft): StepId {
  if (!draft.machine) return "machine";
  if (!draft.details) return "details";
  return "contact";
}

export const machineLabel = (value: string | undefined) => labelOf(MACHINE_CHOICES, value);
export const outletLabel = (value: string | undefined) => labelOf(OUTLET_CHOICES, value);
export const accessLabel = (value: string | undefined) => labelOf(ACCESS_CHOICES, value);

// The email the business gets (through Web3Forms), one line per answer.
export function rentalRequestFields(draft: Required<RentalDraft>, contact: ContactStepValues): Record<string, string> {
  const { details } = draft;
  return {
    subject: `New rental request — ${contact.name}`,
    name: contact.name,
    phone: contact.phone,
    email: contact.email || "Not given",
    machine_type: machineLabel(draft.machine.machine),
    postal_code: details.postal,
    area: details.city ?? "Not sure from the postal code: confirm by text",
    closet_width: details.closetWidth,
    dryer_outlet: outletLabel(details.outlet),
    access: accessLabel(details.access),
    floor: details.floor || "Not given",
    preferred_day: contact.preferredDay || "Not given",
    notes: contact.notes || "None",
  };
}
