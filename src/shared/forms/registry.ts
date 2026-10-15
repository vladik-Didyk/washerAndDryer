// Every form field of the site, and every form, in one place. A field is data: its control
// (`kind`), its words (dictionary keys, never text), its options, its checks and its HTML
// attributes. The same definition renders the control (./ui.tsx Field / FormFields) and
// checks the post on the server (./model.ts validateForm), so the two never drift apart.
//
// Add a field: one entry in `fields` (its label and error messages go in the dictionary
// first, shared/i18n/locales/en.ts). Add it to a form: its key in that form's `fields`, or
// `{ field, ...overrides }` where one form needs a different label, message or layout.
// Add a form: one entry in `forms`, then <FormFields form="..."> in its page and
// validateForm("...", formData, i18n) in its action.
import type { Dictionary, TextKey } from "../i18n";

export type FieldKind = "text" | "tel" | "email" | "number" | "date" | "textarea" | "select" | "choice";

export interface FieldOption {
  /** What is posted. Without it, the English text of `label` (the email reads in English
   *  whatever language the page is in). */
  value?: string;
  label: TextKey;
  note?: TextKey;
}

// Error messages, by the check that failed. `long` may use {max}.
export interface FieldMessages {
  /** Empty (or, for a choice, not one of the options). */
  required?: TextKey;
  /** Fails `pattern`, `integer` or `min`. */
  invalid?: TextKey;
  /** Shorter than `minLength`. */
  short?: TextKey;
  /** Longer than `maxLength`. */
  long?: TextKey;
  /** Before `notBefore`. */
  early?: TextKey;
}

export type FieldPattern = "phone" | "email" | "postalCode" | "isoDate";

export interface FieldDef {
  /** The posted name. */
  name: string;
  /** The id after the form's prefix, when it isn't `name`. */
  id?: string;
  kind: FieldKind;
  /** The label (the legend of a choice). */
  label: TextKey;
  hint?: TextKey;
  placeholder?: TextKey;
  options?: readonly FieldOption[];
  /** The option posted when the field is left empty or holds something else (a select
   *  that isn't required). */
  defaultOption?: number;

  // Server checks, in this order: required, pattern, integer, min, minLength, maxLength,
  // notBefore. An empty optional field is never checked further.
  required?: boolean;
  pattern?: FieldPattern;
  integer?: boolean;
  min?: number;
  minLength?: number;
  maxLength?: number;
  /** A date field: not before this day ("today" in Toronto, given by the action). */
  notBefore?: "today";
  messages?: FieldMessages;

  // HTML
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
  autoCapitalize?: string;
  spellCheck?: boolean;
  /** The maxlength attribute (the server check is `maxLength`). */
  inputMaxLength?: number;
  /** The min attribute: a number, or "today" for a date. */
  inputMin?: number | "today";
  rows?: number;
  /** Grid classes of a choice's tiles. */
  columns?: string;
  /** Classes of the field's box (its place in the form's grid). */
  className?: string;
  inputClassName?: string;
}

// The four sets, in the order of entities/machine (a test keeps them in step).
const SET_TYPES = ["stackable", "laundry-centre", "side-by-side-front-load", "side-by-side-top-load"] as const satisfies ReadonlyArray<
  keyof Dictionary["machines"]["types"]
>;
const titleOf = (slug: keyof Dictionary["machines"]["types"]) => `machines.types.${slug}.title` as const;

export const fields = {
  name: {
    name: "name",
    kind: "text",
    label: "forms.name",
    required: true,
    minLength: 2,
    autoComplete: "name",
    messages: { required: "forms.errors.nameMissing", short: "forms.errors.nameShort" },
  },
  phone: {
    name: "phone",
    kind: "tel",
    label: "forms.phone",
    required: true,
    pattern: "phone",
    inputMode: "tel",
    autoComplete: "tel",
    messages: { required: "forms.errors.phoneMissing", invalid: "forms.errors.phoneInvalid" },
  },
  email: {
    name: "email",
    kind: "email",
    label: "forms.email",
    pattern: "email",
    inputMode: "email",
    autoComplete: "email",
    messages: { invalid: "forms.errors.emailInvalid" },
  },
  address: {
    name: "address",
    kind: "text",
    label: "repair.address",
    required: true,
    autoComplete: "street-address",
    messages: { required: "repair.errors.address" },
  },
  notes: {
    name: "notes",
    kind: "textarea",
    label: "forms.notes",
    className: "sm:col-span-2",
  },

  // The rental request (processes/rental-request).
  machine: {
    name: "machine",
    kind: "choice",
    label: "start.machine.legend",
    required: true,
    options: [
      ...SET_TYPES.map((slug) => ({ value: slug, label: titleOf(slug), note: "start.machine.setNote" as const })),
      { value: "washer-only", label: "start.machine.washerOnly", note: "start.machine.singleNote" },
      { value: "dryer-only", label: "start.machine.dryerOnly", note: "start.machine.singleNote" },
      { value: "not-sure", label: "start.machine.notSure", note: "start.machine.notSureNote" },
    ],
    columns: "sm:grid-cols-2",
    className: "",
    messages: { required: "start.machine.error" },
  },
  postal: {
    name: "postal",
    kind: "text",
    label: "start.details.postal",
    placeholder: "start.details.postalPlaceholder",
    required: true,
    pattern: "postalCode",
    autoComplete: "postal-code",
    autoCapitalize: "characters",
    inputMaxLength: 8,
    inputClassName: "uppercase placeholder:normal-case",
    messages: { required: "start.details.errors.postal", invalid: "postalCheck.invalid" },
  },
  closetWidth: {
    name: "closetWidth",
    kind: "text",
    label: "start.details.width",
    placeholder: "start.details.widthPlaceholder",
    hint: "start.details.widthHint",
    required: true,
    maxLength: 60,
    messages: { required: "start.details.errors.widthMissing", long: "start.details.errors.widthLong" },
  },
  outlet: {
    name: "outlet",
    kind: "choice",
    label: "start.details.outlet",
    required: true,
    options: [
      { value: "3-prong", label: "start.details.outlets.3-prong" },
      { value: "4-prong", label: "start.details.outlets.4-prong" },
      { value: "not-sure", label: "start.details.outlets.not-sure" },
    ],
    messages: { required: "start.details.errors.outlet" },
  },
  access: {
    name: "access",
    kind: "choice",
    label: "start.details.access",
    required: true,
    options: [
      { value: "ground", label: "start.details.accessChoices.ground.label", note: "start.details.accessChoices.ground.note" },
      { value: "stairs", label: "start.details.accessChoices.stairs.label", note: "start.details.accessChoices.stairs.note" },
      { value: "elevator", label: "start.details.accessChoices.elevator.label", note: "start.details.accessChoices.elevator.note" },
    ],
    messages: { required: "start.details.errors.access" },
  },
  floor: {
    name: "floor",
    kind: "text",
    label: "start.details.floor",
    placeholder: "start.details.floorPlaceholder",
    hint: "start.details.floorHint",
    maxLength: 60,
    className: "sm:col-span-2",
    messages: { long: "start.details.errors.floorLong" },
  },
  preferredDay: {
    name: "preferredDay",
    kind: "date",
    label: "start.contact.preferredDay",
    hint: "start.contact.preferredDayHint",
    pattern: "isoDate",
    notBefore: "today",
    inputMin: "today",
    inputClassName: "text-left [&::-webkit-date-and-time-value]:text-left",
    messages: { invalid: "start.contact.errors.date", early: "start.contact.errors.dateEarly" },
  },

  // The landlord quote (features/landlord-quote-form).
  units: {
    name: "units",
    kind: "number",
    label: "landlords.quote.units",
    required: true,
    integer: true,
    min: 1,
    inputMode: "numeric",
    inputMin: 1,
    messages: { required: "landlords.quote.errors.unitsMissing", invalid: "landlords.quote.errors.unitsInvalid" },
  },
  setup: {
    name: "setup",
    kind: "choice",
    label: "landlords.quote.setup",
    required: true,
    options: [
      { label: "landlords.quote.setupOptions.none" },
      { label: "landlords.quote.setupOptions.replace" },
      { label: "landlords.quote.setupOptions.hookupsOnly" },
    ],
    messages: { required: "landlords.quote.errors.setup" },
  },
  machineType: {
    name: "machineType",
    id: "machine",
    kind: "select",
    label: "landlords.quote.machineType",
    options: [
      { label: "landlords.quote.notSure" },
      { label: titleOf("stackable") },
      { label: titleOf("laundry-centre") },
      { label: titleOf("side-by-side-front-load") },
      { label: titleOf("side-by-side-top-load") },
      { label: titleOf("single-machine") },
      { label: "landlords.quote.differentEachUnit" },
    ],
    defaultOption: 0,
    className: "sm:col-span-2",
  },
  option: {
    name: "option",
    kind: "choice",
    label: "landlords.quote.option",
    required: true,
    options: [
      { label: "landlords.quote.optionChoices.tenants" },
      { label: "landlords.quote.optionChoices.landlord" },
      { label: "landlords.quote.optionChoices.notSure" },
    ],
    messages: { required: "landlords.quote.errors.option" },
  },

  // The repair request (features/repair-form).
  repairMachine: {
    name: "machine",
    kind: "select",
    label: "repair.machine",
    options: [
      { label: "repair.machineOptions.washer" },
      { label: "repair.machineOptions.dryer" },
      { label: "repair.machineOptions.stackable" },
      { label: "repair.machineOptions.laundryCentre" },
      { label: "repair.machineOptions.notSure" },
    ],
    defaultOption: 4,
  },
  bestTime: {
    name: "bestTime",
    id: "time",
    kind: "select",
    label: "repair.bestTime",
    options: [
      { label: "repair.timeOptions.any" },
      { label: "repair.timeOptions.morning" },
      { label: "repair.timeOptions.afternoon" },
      { label: "repair.timeOptions.evening" },
    ],
    defaultOption: 0,
  },
  problem: {
    name: "problem",
    kind: "textarea",
    label: "repair.problem",
    hint: "repair.problemHint",
    required: true,
    minLength: 5,
    rows: 5,
    className: "sm:col-span-2",
    messages: { required: "repair.errors.problemMissing", short: "repair.errors.problemShort" },
  },
} satisfies Record<string, FieldDef>;

export type FieldKey = keyof typeof fields;

// A field of a form: its key, or its key with what this form changes.
export type FormEntry = FieldKey | ({ field: FieldKey } & Partial<FieldDef>);

export interface FormDef {
  /** Put before every field id ("quote-" -> "quote-name"); the ids of the HTML. */
  idPrefix: string;
  fields: readonly FormEntry[];
}

export const forms = {
  startMachine: { idPrefix: "", fields: ["machine"] },
  startDetails: { idPrefix: "", fields: ["postal", "closetWidth", "outlet", "access", "floor"] },
  startContact: {
    idPrefix: "",
    fields: [
      "name",
      "phone",
      { field: "email", hint: "forms.optional" },
      "preferredDay",
      { field: "notes", hint: "start.contact.notesHint", maxLength: 2000, messages: { long: "start.contact.errors.notesLong" } },
    ],
  },
  landlordQuote: {
    idPrefix: "quote-",
    fields: [
      "name",
      "phone",
      { field: "email", className: "sm:col-span-2" },
      { field: "address", label: "landlords.quote.address", messages: { required: "landlords.quote.errors.address" } },
      "units",
      "setup",
      "machineType",
      "option",
      { field: "notes", hint: "landlords.quote.notesHint" },
    ],
  },
  repair: {
    idPrefix: "repair-",
    fields: ["name", "phone", { field: "address", className: "sm:col-span-2" }, "repairMachine", "bestTime", "problem"],
  },
  // The "Do we deliver to you?" checker (features/postal-check): checked in the browser only.
  postalCheck: {
    idPrefix: "",
    fields: [
      {
        field: "postal",
        label: "postalCheck.label",
        placeholder: "postalCheck.placeholder",
        required: false,
        spellCheck: false,
        inputClassName: "min-w-0 flex-1 uppercase placeholder:normal-case",
      },
    ],
  },
} satisfies Record<string, FormDef>;

export type FormKey = keyof typeof forms;

// The fields of a form, each with this form's changes applied, in order.
export function formFields(form: FormKey): FieldDef[] {
  return (forms[form].fields as readonly FormEntry[]).map((entry) => {
    if (typeof entry === "string") return fields[entry];
    const { field, ...overrides } = entry;
    const base: FieldDef = fields[field];
    return { ...base, ...overrides, messages: { ...base.messages, ...overrides.messages } };
  });
}

// One field of a form by its posted name.
export function formField(form: FormKey, name: string): FieldDef {
  const found = formFields(form).find((field) => field.name === name);
  if (!found) throw new Error(`No field "${name}" in the form "${form}".`);
  return found;
}
