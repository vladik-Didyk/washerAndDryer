import { useId, useState, type FormEvent } from "react";
import { siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { CircleAlert, CircleCheck, CircleHelp, LangLink, MessageSquare } from "~/shared/ui";
import { checkPostalCode, type PostalCheck } from "./model";

const ICONS = { yes: CircleCheck, unsure: CircleHelp, invalid: CircleAlert };
const TONES = {
  yes: "text-brand-dark",
  unsure: "text-ink",
  invalid: "text-red-700",
};

// "Do we deliver to you?" by postal code (logic and FSA lists in ./model.ts).
// Works in the browser after hydration; nothing is sent anywhere. The answer is never "no":
// a code we can't place gets "text us your address".
// `requestHref` is where "Start your rental" goes after a yes (the rental request).
// `label` names the field; `compact` makes the field a little shorter (home hero).
export function PostalCodeChecker({
  requestHref = "/start/",
  label,
  compact = false,
  className = "",
}: {
  requestHref?: string;
  label?: string;
  compact?: boolean;
  className?: string;
}) {
  const id = useId();
  const inputId = `${id}postal`;
  const resultId = `${id}result`;
  const [value, setValue] = useState("");
  const [result, setResult] = useState<PostalCheck | null>(null);
  const { phone } = siteConfig;
  const i18n = useI18n();
  const { d } = i18n;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(checkPostalCode(value, i18n));
  };

  const Icon = result ? ICONS[result.status] : null;

  return (
    <form noValidate onSubmit={onSubmit} className={className}>
      <label htmlFor={inputId} className="label">
        {label ?? d.postalCheck.label}
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id={inputId}
          name="postal"
          type="text"
          autoComplete="postal-code"
          autoCapitalize="characters"
          spellCheck={false}
          maxLength={8}
          placeholder={d.postalCheck.placeholder}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setResult(null);
          }}
          aria-invalid={result?.status === "invalid" ? "true" : undefined}
          aria-describedby={resultId}
          className={`field min-w-0 flex-1 uppercase placeholder:normal-case ${compact ? "min-h-[3rem] py-2.5" : ""}`}
        />
        <button type="submit" className="btn btn-primary shrink-0 px-5">
          {d.postalCheck.check}
        </button>
      </div>

      {/* Always in the page, so screen readers announce the answer when it appears. */}
      <div id={resultId} role="status" className="mt-3">
        {result && Icon && (
          <div className={`flex items-start gap-2 font-semibold ${TONES[result.status]}`}>
            <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p>{result.message}</p>
          </div>
        )}
        {result?.status === "yes" && (
          <LangLink href={requestHref} className="text-link mt-2 inline-block">
            {d.common.startRental}
          </LangLink>
        )}
        {result?.status === "unsure" && (
          <a href={phone.sms} className="btn btn-secondary mt-3">
            <MessageSquare className="h-[18px] w-[18px]" aria-hidden="true" />
            {d.postalCheck.textUs}
          </a>
        )}
      </div>
    </form>
  );
}
