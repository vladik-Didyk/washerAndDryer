// The site's form controls, drawn from the field definitions of ./registry.ts:
// <FormFields form="repair" values errors /> renders every field of a form in order, and
// <Field form="repair" name="phone" ... /> one of them. The control follows the field's
// `kind`; the text inputs, text area, select and choice tiles below are its internals.
// Plain HTML form controls: every form posts to a server action and works without
// JavaScript. Errors come back from the server, keyed by field name.
import { useEffect, useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { siteConfig } from "../config/site";
import { useI18n, type I18n } from "../i18n";
import { trackEvent } from "../lib/analytics";
import { describedBy } from "../lib/format";
import { useSite } from "../lib/site-context";
import { Button, LangLink } from "../ui/actions";
import { Card, Heading, Nest } from "../ui/layout";
import { ChevronDown, CircleAlert, CircleCheck, LoaderCircle, type LucideIcon } from "../ui/icons";
import { fieldOptions, type FieldErrors, type FormValues, type ResolvedOption } from "./model";
import { formFields, forms, type FieldDef, type FormKey } from "./registry";

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="field-error">
      <CircleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

function Required() {
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

// Under the send button: what happens to what you send, with the privacy policy once it is
// published.
export function PrivacyNote() {
  const site = useSite();
  const { d, rich } = useI18n();
  if (!site.isPublished("/privacy/")) return null;
  return (
    <p className="mt-3 text-sm text-ink-muted">
      {rich(d.forms.privacyNote, {
        privacyLink: (
          <LangLink href="/privacy/" className="text-link">
            {d.forms.privacyLink}
          </LangLink>
        ),
      })}
    </p>
  );
}

// Honeypot: hidden from people and screen readers; bots tick it, and the server then
// drops the submission without sending it.
export function Honeypot() {
  return <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" />;
}

export function SendError() {
  const { phone } = siteConfig;
  const { d, rich } = useI18n();
  return (
    <div role="alert" className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
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

// The form's submit button. `sending`: the form is on its way (the button is disabled and,
// for a form that sends, says "Sending…"). A step that only moves on (`next`) keeps its
// label and shows `icon` after it.
export function SubmitButton({
  sending,
  next = false,
  icon: Icon,
  children,
}: {
  sending: boolean;
  next?: boolean;
  icon?: LucideIcon;
  children: ReactNode;
}) {
  const { d } = useI18n();
  return (
    <Button
      type="submit"
      disabled={sending}
      className={next ? "mt-6 w-full disabled:opacity-70" : "mt-6 w-full disabled:cursor-wait disabled:opacity-70"}
    >
      {sending && !next ? (
        <>
          <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
          {d.forms.sending}
        </>
      ) : (
        <>
          {children}
          {Icon && <Icon className="h-[18px] w-[18px]" aria-hidden="true" />}
        </>
      )}
    </Button>
  );
}

// Shown in place of the form once it's sent. Focus moves to the heading so screen readers
// announce it. "Send another" reloads the page with an empty form. With consent, the visit
// statistics get a "generate_lead" event naming the form (shared/lib/analytics).
export function SentPanel({
  title,
  note,
  resetHref,
  form,
}: {
  title?: string;
  note?: string;
  resetHref: string;
  form: "repair" | "landlord-quote";
}) {
  const { d } = useI18n();
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus();
    trackEvent("generate_lead", { form });
  }, [form]);

  return (
    <Card padding="none" className="px-6 py-12 text-center sm:px-10">
      <CircleCheck className="mx-auto h-12 w-12 text-brand" strokeWidth={1.75} aria-hidden="true" />
      {/* One level below the form's own title, which it replaces. */}
      <Nest>
        <Heading ref={headingRef} tabIndex={-1} aria-describedby="form-sent-note" variant="card" className="mt-4">
          {title ?? d.forms.sentTitle}
        </Heading>
      </Nest>
      <p id="form-sent-note" className="lead mt-2">
        {note ?? d.forms.sentNote}
      </p>
      <Button href={resetHref} variant="secondary" className="mt-8">
        {d.forms.sendAnother}
      </Button>
    </Card>
  );
}

// ---------------------------------------------------------------------------------------
// The controls

const errorIdOf = (id: string) => `${id}-error`;
const hintIdOf = (id: string) => `${id}-hint`;

interface ControlProps {
  id: string;
  def: FieldDef;
  i18n: I18n;
  value: string;
  error?: string;
  /** Runtime values of the definition: "today" for a date's min. */
  today?: string;
  /** Controlled input (the postal-code checker): these props go on the <input> as they are. */
  control?: ComponentPropsWithoutRef<"input">;
  /** Beside the input, in one row (the checker's button). */
  after?: ReactNode;
  /** No box around the field: its parent is the box (the checker's <form>). */
  bare?: boolean;
  label?: string;
  className?: string;
}

function FieldShell({ id, def, i18n, error, bare, label, className, children }: ControlProps & { children: ReactNode }) {
  const hint = def.hint ? i18n.t(def.hint) : null;
  const content = (
    <>
      <label htmlFor={id} className="label">
        {label ?? i18n.t(def.label)}
        {def.required && <Required />}
      </label>
      {children}
      {hint && (
        <p id={hintIdOf(id)} className="field-hint">
          {hint}
        </p>
      )}
      <FieldError id={errorIdOf(id)} message={error} />
    </>
  );
  return bare ? content : <div className={className ?? def.className ?? ""}>{content}</div>;
}

const ariaOf = (props: ControlProps) => ({
  "aria-invalid": props.error ? ("true" as const) : ("false" as const),
  "aria-describedby": describedBy(props.def.hint ? hintIdOf(props.id) : null, props.error && errorIdOf(props.id)),
});

function TextInput(props: ControlProps) {
  const { id, def, i18n, value, today, control, after } = props;
  const input = (
    <input
      id={id}
      name={def.name}
      type={def.kind}
      autoComplete={def.autoComplete}
      inputMode={def.inputMode}
      placeholder={def.placeholder ? i18n.t(def.placeholder) : undefined}
      min={def.inputMin === "today" ? today : def.inputMin}
      maxLength={def.inputMaxLength}
      autoCapitalize={def.autoCapitalize}
      spellCheck={def.spellCheck}
      required={def.required}
      {...(control ? {} : { defaultValue: value })}
      {...ariaOf(props)}
      {...control}
      className={[after ? "field" : "field mt-2", def.inputClassName, control?.className].filter(Boolean).join(" ")}
    />
  );
  return (
    <FieldShell {...props}>
      {after ? (
        <div className="mt-2 flex gap-2">
          {input}
          {after}
        </div>
      ) : (
        input
      )}
    </FieldShell>
  );
}

function TextArea(props: ControlProps) {
  const { id, def, value } = props;
  return (
    <FieldShell {...props}>
      <textarea
        id={id}
        name={def.name}
        rows={def.rows ?? 4}
        required={def.required}
        defaultValue={value}
        {...ariaOf(props)}
        className="field mt-2 resize-y"
      />
    </FieldShell>
  );
}

function Select(props: ControlProps & { options: ResolvedOption[] }) {
  const { id, def, value, error, options } = props;
  return (
    <FieldShell {...props}>
      <div className="relative mt-2">
        <select
          id={id}
          name={def.name}
          required={def.required}
          defaultValue={value}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={describedBy(error && errorIdOf(id))}
          className="field pr-11"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft"
          aria-hidden="true"
        />
      </div>
    </FieldShell>
  );
}

// A row of radio buttons styled as tiles.
function ChoiceTiles({ id, def, i18n, value, error, options, className }: ControlProps & { options: ResolvedOption[] }) {
  const errorId = errorIdOf(id);
  const required = def.required ?? true;
  return (
    <fieldset className={className ?? def.className ?? "sm:col-span-2"} aria-describedby={describedBy(error && errorId)}>
      <legend className="label">
        {i18n.t(def.label)}
        {required && <Required />}
      </legend>
      <div className={`mt-2 grid gap-2 ${def.columns ?? "sm:grid-cols-3"}`}>
        {options.map((choice) => (
          <label key={choice.value} className="relative block cursor-pointer">
            <input
              type="radio"
              name={def.name}
              value={choice.value}
              required={required}
              defaultChecked={value === choice.value}
              className="peer sr-only"
            />
            <span className="flex min-h-[3.125rem] flex-col items-center justify-center rounded-xl border border-line bg-white px-3 py-2 text-center font-medium text-ink transition-colors hover:border-brand peer-checked:border-brand peer-checked:bg-brand-mint peer-checked:font-semibold peer-checked:text-brand-dark peer-checked:ring-1 peer-checked:ring-brand peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand">
              {choice.label}
              {choice.note && <span className="mt-0.5 text-sm font-normal text-ink-muted">{choice.note}</span>}
            </span>
          </label>
        ))}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}

// ---------------------------------------------------------------------------------------
// The API

export interface FieldProps {
  form: FormKey;
  /** The field's posted name in this form. */
  name: string;
  /** The values to show, by field name (FormValues, or a step's typed values). */
  values?: object;
  errors?: FieldErrors;
  today?: string;
  /** The id, when the form's prefix + name won't do (a checker that appears twice on a page). */
  id?: string;
  label?: string;
  className?: string;
  control?: ComponentPropsWithoutRef<"input">;
  after?: ReactNode;
  bare?: boolean;
}

function render(def: FieldDef, props: Omit<FieldProps, "name">, i18n: I18n, prefix: string) {
  const control: ControlProps = {
    id: props.id ?? `${prefix}${def.id ?? def.name}`,
    def,
    i18n,
    value: (props.values as FormValues | undefined)?.[def.name] ?? "",
    error: props.errors?.[def.name],
    today: props.today,
    control: props.control,
    after: props.after,
    bare: props.bare,
    label: props.label,
    className: props.className,
  };
  switch (def.kind) {
    case "textarea":
      return <TextArea key={def.name} {...control} />;
    case "select":
      return <Select key={def.name} {...control} options={fieldOptions(def, i18n)} />;
    case "choice":
      return <ChoiceTiles key={def.name} {...control} options={fieldOptions(def, i18n)} />;
    default:
      return <TextInput key={def.name} {...control} />;
  }
}

const prefixOf = (form: FormKey): string => forms[form].idPrefix;

// One field of a form, by its posted name.
export function Field({ name, ...props }: FieldProps) {
  const i18n = useI18n();
  const def = formFields(props.form).find((entry) => entry.name === name);
  if (!def) throw new Error(`No field "${name}" in the form "${props.form}".`);
  return render(def, props, i18n, prefixOf(props.form));
}

// Every field of a form, in the order of its definition.
export function FormFields(props: Omit<FieldProps, "name" | "id" | "label" | "className" | "control" | "after" | "bare">) {
  const i18n = useI18n();
  // A send came back with errors: take the visitor to the first field that needs fixing (its
  // message is tied to it with aria-describedby, so a screen reader reads it out).
  const errorKeys = Object.keys(props.errors ?? {}).join();
  useEffect(() => {
    if (!errorKeys) return;
    // The first message on the page, then its field: a group of choices (a fieldset) gets
    // its first choice, any other field is the one the message describes.
    const message = document.querySelector<HTMLElement>("main .field-error");
    const group = message?.closest("fieldset");
    const first = group
      ? group.querySelector<HTMLElement>("input")
      : (message?.id && document.querySelector<HTMLElement>(`[aria-describedby~="${message.id}"]`)) ||
        document.querySelector<HTMLElement>('[aria-invalid="true"]');
    first?.focus({ preventScroll: true });
    first?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [errorKeys]);
  return <>{formFields(props.form).map((def) => render(def, props, i18n, prefixOf(props.form)))}</>;
}
