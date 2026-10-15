// Reading and checking posted forms on the server, from the field definitions of
// ./registry.ts: one validateForm for every form of the site. Pure functions (the tests call
// them directly). Messages are in the page's language; posted option values are English.
import { DEFAULT_LANG, createI18n, type I18n } from "../i18n";
import { formFields, type FieldDef, type FieldPattern, type FormKey } from "./registry";

// A posted field: always a trimmed string ("" when missing).
export const field = (form: FormData, name: string): string => {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
};

// The honeypot box (./ui.tsx Honeypot) is only ever ticked by bots.
export const isBot = (form: FormData) => form.get("botcheck") !== null;

export const PHONE_PATTERN = /^[\d\s()+-]{10,}$/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Canadian postal codes: letter-digit-letter digit-letter-digit. D, F, I, O, Q and U are never
// used, and W and Z never come first. The second half is optional: "M5V" is enough to answer.
const POSTAL_CODE = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z](\d[ABCEGHJ-NPRSTV-Z]\d)?$/;

// "m5v 2t6", " M5V-2T6 " -> "M5V2T6"
export const normalizePostalCode = (input: unknown) =>
  String(input ?? "")
    .toUpperCase()
    .replace(/[\s-]+/g, "");

export const isPostalCode = (input: unknown) => POSTAL_CODE.test(normalizePostalCode(input));

// "M5V2T6" -> "M5V 2T6" (a full code); anything else unchanged.
export const formatPostalCode = (input: unknown) => {
  const code = normalizePostalCode(input);
  return code.length === 6 ? `${code.slice(0, 3)} ${code.slice(3)}` : code;
};

const PATTERNS: Record<FieldPattern, (value: string) => boolean> = {
  phone: (value) => PHONE_PATTERN.test(value),
  email: (value) => EMAIL_PATTERN.test(value),
  postalCode: isPostalCode,
  isoDate: (value) => /^\d{4}-\d{2}-\d{2}$/.test(value),
};

// The values of a form, by field name, as typed (to fill the form again).
export type FormValues = Record<string, string>;

// A message per field that needs fixing, by field name.
export type FieldErrors = Partial<Record<string, string>>;

// What a form action returns to its page.
export type FormActionData<Values = FormValues> =
  | { status: "invalid"; values: Values; errors: FieldErrors }
  | { status: "error"; values: Values }
  | { status: "sent" };

export type Validation<Values = FormValues> =
  | { ok: true; values: Values }
  | { ok: false; values: Values; errors: FieldErrors };

export interface ResolvedOption {
  value: string;
  label: string;
  note?: string;
}

// English text of the same request: option values and the emails are always English.
export const englishOf = (i18n: I18n): I18n =>
  i18n.lang === DEFAULT_LANG ? i18n : createI18n(DEFAULT_LANG, i18n.facts);

// A field's options: labels in the page's language, values as posted (English text unless
// the option names its own value).
export function fieldOptions(def: FieldDef, i18n: I18n): ResolvedOption[] {
  const english = englishOf(i18n);
  return (def.options ?? []).map((option) => ({
    value: option.value ?? english.t(option.label),
    label: i18n.t(option.label),
    ...(option.note ? { note: i18n.t(option.note) } : {}),
  }));
}

const defaultValue = (def: FieldDef, i18n: I18n) =>
  def.defaultOption === undefined ? "" : (fieldOptions(def, i18n)[def.defaultOption]?.value ?? "");

// A choice's value as sent: the posted one if it is an option, else the default option.
export function sentValue(def: FieldDef, value: string, i18n: I18n): string {
  return fieldOptions(def, i18n).some((option) => option.value === value) ? value : defaultValue(def, i18n);
}

// The label of a posted option value in the language of `i18n` (the value itself if unknown).
export function optionLabel(form: FormKey, name: string, value: string | undefined, i18n: I18n): string {
  const def = formFields(form).find((entry) => entry.name === name);
  const option = def ? fieldOptions(def, i18n).find((entry) => entry.value === value) : undefined;
  return option?.label ?? value ?? "";
}

// An empty form: every field "", a select on its default option.
export function emptyValues(form: FormKey, i18n: I18n): FormValues {
  return Object.fromEntries(formFields(form).map((def) => [def.name, defaultValue(def, i18n)]));
}

// The posted values of a form; an empty select takes its default option.
export function readForm(form: FormKey, data: FormData, i18n: I18n): FormValues {
  return Object.fromEntries(
    formFields(form).map((def) => [def.name, field(data, def.name) || defaultValue(def, i18n)]),
  );
}

export interface ValidationContext {
  /** Today in Toronto, "YYYY-MM-DD" (a date field's `notBefore`). */
  today?: string;
}

// The first problem with one field, as a message, or null.
function checkField(def: FieldDef, value: string, i18n: I18n, context: ValidationContext): string | null {
  const message = (key: keyof NonNullable<FieldDef["messages"]>, vars?: Record<string, number>) => {
    const textKey = def.messages?.[key];
    if (!textKey) throw new Error(`The field "${def.name}" has no "${key}" message.`);
    return i18n.t(textKey, vars);
  };
  if (def.options) {
    if (fieldOptions(def, i18n).some((option) => option.value === value)) return null;
    return def.required ? message("required") : null;
  }
  if (!value) return def.required ? message("required") : null;
  if (def.pattern && !PATTERNS[def.pattern](value)) return message("invalid");
  if (def.integer && !/^\d+$/.test(value)) return message("invalid");
  if (def.min !== undefined && Number(value) < def.min) return message("invalid");
  if (def.minLength !== undefined && value.length < def.minLength) return message("short");
  if (def.maxLength !== undefined && value.length > def.maxLength) return message("long", { max: def.maxLength });
  if (def.notBefore === "today" && context.today && value < context.today) return message("early");
  return null;
}

// Checks a posted form against its definition (./registry.ts): the values as typed, and
// either ok or a message per field that needs fixing.
export function validateForm(
  form: FormKey,
  data: FormData,
  i18n: I18n,
  context: ValidationContext = {},
): Validation {
  const values = readForm(form, data, i18n);
  const errors: FieldErrors = {};
  for (const def of formFields(form)) {
    const problem = checkField(def, values[def.name], i18n, context);
    if (problem) errors[def.name] = problem;
  }
  return Object.keys(errors).length ? { ok: false, values, errors } : { ok: true, values };
}

// The email the business gets (Web3Forms): English whatever the page's language, with the
// language the visitor wrote in on the first line.
export function formEmail(i18n: I18n, fields: Record<string, string>): Record<string, string> {
  return { language: i18n.language.englishName, ...fields };
}
