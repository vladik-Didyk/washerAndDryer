import { useId, useState, type FormEvent } from "react";
import { pagePaths, siteConfig } from "~/shared/config";
import { Field } from "~/shared/forms";
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
  requestHref = pagePaths.start,
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
      <Field
        form="postalCheck"
        name="postal"
        id={inputId}
        label={label}
        bare
        control={{
          value,
          onChange: (event) => {
            setValue(event.target.value);
            setResult(null);
          },
          "aria-invalid": result?.status === "invalid" ? "true" : undefined,
          "aria-describedby": resultId,
          className: compact ? "min-h-[3rem] py-2.5" : undefined,
        }}
        after={
          <button type="submit" className="btn btn-primary shrink-0 px-5">
            {d.postalCheck.check}
          </button>
        }
      />

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
