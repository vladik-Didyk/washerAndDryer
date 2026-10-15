import { LangLink } from "./LangLink";
import { useEffect, useRef, type ReactNode } from "react";
import { ChevronDown, CircleAlert, CircleCheck, LoaderCircle } from "./icons";
import { siteConfig } from "../config/site";
import { useI18n } from "../i18n";
import { describedBy } from "../lib/format";

// Pieces shared by the site's forms (rental request, landlord quote, repair request). They
// are plain HTML form controls: every form posts to a server action and works without
// JavaScript. Errors come back from the server, keyed by field name.

export type FieldErrors = Partial<Record<string, string>>;

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="field-error">
      <CircleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

export function Required() {
  return (
    <span aria-hidden="true" className="text-red-700">
      {" "}
      *
    </span>
  );
}

export function RequiredNote() {
  const { d, rich } = useI18n();
  return (
    <p className="text-sm text-ink-muted">
      {rich(d.forms.requiredNote, { star: <span className="text-red-700">*</span> })}
    </p>
  );
}

// The arrow on a styled <select>; the select needs a `relative` wrapper and `pr-11`.
export function SelectChevron() {
  return (
    <ChevronDown
      className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft"
      aria-hidden="true"
    />
  );
}

// Honeypot: hidden from people and screen readers; bots tick it, and the server then
// drops the submission without sending it.
export function Honeypot() {
  return (
    <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" />
  );
}

export function SendError() {
  const { phone } = siteConfig;
  const { d, rich } = useI18n();
  return (
    <div
      role="alert"
      className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800"
    >
      <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <p>
        {rich(d.forms.sendError, {
          phoneLink: (
            <a href={phone.tel} className="font-semibold underline underline-offset-2">
              {phone.display}
            </a>
          ),
        })}
      </p>
    </div>
  );
}

export function SubmitButton({ sending, children }: { sending: boolean; children: ReactNode }) {
  const { d } = useI18n();
  return (
    <button
      type="submit"
      disabled={sending}
      className="btn btn-primary mt-6 w-full disabled:cursor-wait disabled:opacity-70"
    >
      {sending ? (
        <>
          <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
          {d.forms.sending}
        </>
      ) : (
        children
      )}
    </button>
  );
}

// Shown in place of the form once it's sent. Focus moves to the heading so screen readers
// announce it. "Send another" reloads the page with an empty form.
export function SentPanel({
  title,
  note,
  resetHref,
}: {
  title?: string;
  note?: string;
  resetHref: string;
}) {
  const { d } = useI18n();
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="rounded-3xl border border-line bg-white px-6 py-12 text-center sm:px-10">
      <CircleCheck className="mx-auto h-12 w-12 text-brand" strokeWidth={1.75} aria-hidden="true" />
      <h3
        ref={headingRef}
        tabIndex={-1}
        aria-describedby="form-sent-note"
        className="mt-4 font-display text-2xl font-bold text-ink"
      >
        {title ?? d.forms.sentTitle}
      </h3>
      <p id="form-sent-note" className="lead mt-2">
        {note ?? d.forms.sentNote}
      </p>
      <LangLink href={resetHref} className="btn btn-secondary mt-8">
        {d.forms.sendAnother}
      </LangLink>
    </div>
  );
}

interface FieldBase {
  id: string;
  name: string;
  label: ReactNode;
  required?: boolean;
  error?: string;
  hint?: ReactNode;
  defaultValue?: string;
  className?: string;
}

const errorIdOf = (id: string) => `${id}-error`;
const hintIdOf = (id: string) => `${id}-hint`;

function FieldShell({ id, label, required, error, hint, className = "", children }: Omit<FieldBase, "name"> & { children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
        {required && <Required />}
      </label>
      {children}
      {hint && (
        <p id={hintIdOf(id)} className="field-hint">
          {hint}
        </p>
      )}
      <FieldError id={errorIdOf(id)} message={error} />
    </div>
  );
}

type InputExtras = {
  type?: "text" | "tel" | "email" | "number" | "date";
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
  placeholder?: string;
  min?: string | number;
  maxLength?: number;
  autoCapitalize?: string;
  inputClassName?: string;
};

export function TextField(props: FieldBase & InputExtras) {
  const { id, name, required, error, hint, defaultValue, type = "text", inputClassName = "" } = props;
  return (
    <FieldShell {...props}>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={props.autoComplete}
        inputMode={props.inputMode}
        placeholder={props.placeholder}
        min={props.min}
        maxLength={props.maxLength}
        autoCapitalize={props.autoCapitalize}
        required={required}
        defaultValue={defaultValue}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={describedBy(hint ? hintIdOf(id) : null, error && errorIdOf(id))}
        className={`field mt-2 ${inputClassName}`}
      />
    </FieldShell>
  );
}

export function TextAreaField(props: FieldBase & { rows?: number }) {
  const { id, name, required, error, hint, defaultValue, rows = 4 } = props;
  return (
    <FieldShell {...props}>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        defaultValue={defaultValue}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={describedBy(hint ? hintIdOf(id) : null, error && errorIdOf(id))}
        className="field mt-2 resize-y"
      />
    </FieldShell>
  );
}

export function SelectField(props: FieldBase & { options: readonly string[]; placeholder?: string }) {
  const { id, name, required, error, defaultValue, options, placeholder } = props;
  return (
    <FieldShell {...props}>
      <div className="relative mt-2">
        <select
          id={id}
          name={name}
          required={required}
          defaultValue={defaultValue}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={describedBy(error && errorIdOf(id))}
          className="field pr-11"
        >
          {placeholder !== undefined && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <SelectChevron />
      </div>
    </FieldShell>
  );
}

export interface Choice {
  value: string;
  label: ReactNode;
  note?: ReactNode;
}

// A row of radio buttons styled as tiles.
export function ChoiceTiles({
  id,
  name,
  legend,
  choices,
  defaultValue,
  error,
  required = true,
  columns = "sm:grid-cols-3",
  className = "sm:col-span-2",
}: {
  id: string;
  name: string;
  legend: ReactNode;
  choices: readonly (string | Choice)[];
  defaultValue?: string;
  error?: string;
  required?: boolean;
  columns?: string;
  className?: string;
}) {
  const errorId = errorIdOf(id);
  return (
    <fieldset className={className} aria-describedby={describedBy(error && errorId)}>
      <legend className="label">
        {legend}
        {required && <Required />}
      </legend>
      <div className={`mt-2 grid gap-2 ${columns}`}>
        {choices.map((entry) => {
          const choice = typeof entry === "string" ? { value: entry, label: entry } : entry;
          return (
            <label key={choice.value} className="relative block cursor-pointer">
              <input
                type="radio"
                name={name}
                value={choice.value}
                required={required}
                defaultChecked={defaultValue === choice.value}
                className="peer sr-only"
              />
              <span className="flex min-h-[3.125rem] flex-col items-center justify-center rounded-xl border border-line bg-white px-3 py-2 text-center font-medium text-ink transition-colors hover:border-brand peer-checked:border-brand peer-checked:bg-brand-mint peer-checked:font-semibold peer-checked:text-brand-dark peer-checked:ring-1 peer-checked:ring-brand peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand">
                {choice.label}
                {choice.note && (
                  <span className="mt-0.5 text-sm font-normal text-ink-muted">{choice.note}</span>
                )}
              </span>
            </label>
          );
        })}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}
