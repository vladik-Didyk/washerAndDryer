import { pagePaths } from "../config/site";
import { useI18n } from "../i18n";
import { Button, PhoneButton } from "./actions";
import { ArrowRight } from "./icons";

// The closing buttons of a section: the main action and the phone beside it, so every section
// ends with a next step. `goal` picks the main action (a rental, or a quote for landlords and
// buildings); `tone="dark"` is for the green bands (a gold main button, a light outline phone).
export function CtaRow({
  goal = "rent",
  tone = "light",
  align = "start",
  className = "",
}: {
  goal?: "rent" | "quote";
  tone?: "light" | "dark";
  align?: "start" | "center";
  className?: string;
}) {
  const { d } = useI18n();
  return (
    <div
      className={`mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap ${align === "center" ? "sm:justify-center" : ""} ${className}`}
    >
      <Button
        href={goal === "quote" ? pagePaths.landlordQuote : pagePaths.start}
        variant={tone === "dark" ? "gold" : "primary"}
        className="sm:px-6"
      >
        {goal === "quote" ? d.common.getQuote : d.common.startRental}
        <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
      </Button>
      <PhoneButton
        kind="call"
        variant={tone === "dark" ? "outlineLight" : "secondary"}
        label={d.common.callOrText}
        className="sm:px-6"
      />
    </div>
  );
}
