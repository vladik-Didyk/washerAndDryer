// Reading posted form fields on the server: always a trimmed string ("" when missing).
export const field = (form: FormData, name: string): string => {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
};

// The honeypot box (shared/ui Honeypot) is only ever ticked by bots.
export const isBot = (form: FormData) => form.get("botcheck") !== null;

export const PHONE_PATTERN = /^[\d\s()+-]{10,}$/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type FieldErrorMap = Partial<Record<string, string>>;

// The outcome of checking a posted form: the values as typed (to fill the form again) and
// either the fields to send or a message per field that needs fixing.
export type Validation<Values, Fields = Record<string, string>> =
  | { ok: true; values: Values; fields: Fields }
  | { ok: false; values: Values; errors: FieldErrorMap };

// What a form action returns to its page.
export type FormActionData<Values> =
  | { status: "invalid"; values: Values; errors: FieldErrorMap }
  | { status: "error"; values: Values }
  | { status: "sent" };
