import { useEffect, useRef } from "react";
import { ChevronDown, CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { siteConfig } from "../content/config";

// Pieces shared by the site's forms (rental request, landlord quote, repair request). All of
// them are sent through web3forms with the same access key, as email to the owner.

// Posts the fields to web3forms. Resolves true when web3forms accepted them.
// `botcheck` is the web3forms honeypot: only bots tick the hidden box, and web3forms rejects those.
export async function sendForm(fields, botcheck) {
  const payload = {
    access_key: siteConfig.web3formsKey,
    from_name: "GTA Washer & Dryer Rentals website",
    ...fields,
  };
  if (botcheck) payload.botcheck = true;
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    return Boolean(response.ok && result.success);
  } catch {
    return false;
  }
}

// ids joined for aria-describedby, or undefined when there are none.
export const describedBy = (...ids) => ids.filter(Boolean).join(" ") || undefined;

export function FieldError({ id, error }) {
  if (!error) return null;
  return (
    <p id={id} className="field-error">
      <CircleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
      {error.message}
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
  return (
    <p className="text-sm text-ink-muted">
      Fields marked <span className="text-red-700">*</span> are required.
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

// Hidden checkbox for web3forms. Hidden from people and screen readers; bots tick it.
export function Honeypot({ register }) {
  return <input type="checkbox" autoComplete="off" className="hidden" {...register("botcheck")} />;
}

export function SendError() {
  const { phone } = siteConfig;
  return (
    <div
      role="alert"
      className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800"
    >
      <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <p>
        Couldn't send. Call or text{" "}
        <a href={phone.tel} className="font-semibold underline underline-offset-2">
          {phone.display}
        </a>
        .
      </p>
    </div>
  );
}

export function SubmitButton({ sending, children }) {
  return (
    <button
      type="submit"
      disabled={sending}
      className="btn btn-primary mt-6 w-full disabled:cursor-wait disabled:opacity-70"
    >
      {sending ? (
        <>
          <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
          Sending…
        </>
      ) : (
        children
      )}
    </button>
  );
}

// Shown in place of the form once it's sent. Focus moves to the heading so screen readers
// announce it.
export function SentPanel({ title = "Request sent.", note = "We'll call or text you.", onReset }) {
  const headingRef = useRef(null);
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
        {title}
      </h3>
      <p id="form-sent-note" className="lead mt-2">
        {note}
      </p>
      <button type="button" onClick={onReset} className="btn btn-secondary mt-8">
        Send another
      </button>
    </div>
  );
}
