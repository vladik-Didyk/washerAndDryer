import { useId, useState } from "react";
import { CircleAlert, CircleCheck, CircleHelp, MessageSquare } from "lucide-react";
import { siteConfig } from "../content/config";
import { checkPostalCode } from "../content/areas";

const ICONS = { yes: CircleCheck, unsure: CircleHelp, invalid: CircleAlert };
const TONES = {
  yes: "text-brand-dark",
  unsure: "text-ink",
  invalid: "text-red-700",
};

// "Do we deliver to you?" by postal code (logic and FSA lists in src/content/areas.js).
// Works in the browser after hydration; nothing is sent anywhere. The answer is never "no":
// a code we can't place gets "text us your address".
// `requestHref` is where "Check availability" goes after a yes (the request form).
export default function PostalCodeChecker({ requestHref = "#request", className = "" }) {
  const id = useId();
  const inputId = `${id}postal`;
  const resultId = `${id}result`;
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);
  const { phone } = siteConfig;

  const onSubmit = (event) => {
    event.preventDefault();
    setResult(checkPostalCode(value));
  };

  const Icon = result ? ICONS[result.status] : null;

  return (
    <form noValidate onSubmit={onSubmit} className={className}>
      <label htmlFor={inputId} className="label">
        Your postal code
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
          placeholder="e.g. M5V 2T6"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setResult(null);
          }}
          aria-invalid={result?.status === "invalid" ? "true" : undefined}
          aria-describedby={resultId}
          className="field min-w-0 flex-1 uppercase placeholder:normal-case"
        />
        <button type="submit" className="btn btn-primary shrink-0 px-5">
          Check
        </button>
      </div>

      {/* Always in the page, so screen readers announce the answer when it appears. */}
      <div id={resultId} role="status" className="mt-3">
        {result && (
          <div className={`flex items-start gap-2 font-semibold ${TONES[result.status]}`}>
            <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p>{result.message}</p>
          </div>
        )}
        {result?.status === "yes" && (
          <a href={requestHref} className="text-link mt-2 inline-block">
            Check availability
          </a>
        )}
        {result?.status === "unsure" && (
          <a href={phone.sms} className="btn btn-secondary mt-3">
            <MessageSquare className="h-[18px] w-[18px]" aria-hidden="true" />
            Text {phone.display}
          </a>
        )}
      </div>
    </form>
  );
}
