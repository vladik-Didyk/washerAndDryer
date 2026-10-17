import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router";
import { pagePaths, siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { trackEvent } from "~/shared/lib";
import { Button, Card, CircleCheck, Heading, PhoneButton } from "~/shared/ui";
import type { doneLoader } from "../loaders.server";
import { StepShell } from "./StepShell";

// After sending: thanks, the three steps that follow, and a way to send a photo. Focus moves to the message so screen readers announce it.
// With consent, the visit statistics get a "generate_lead" event (shared/lib/analytics); the
// customer's name and phone are masked from Clarity's recordings.
export function DoneStep() {
  const { sent } = useLoaderData<typeof doneLoader>();
  const { phone } = siteConfig;
  const { d, rich } = useI18n();
  const text = d.start.done;
  const noteRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    noteRef.current?.focus();
    trackEvent("generate_lead", { form: "rental-request" });
  }, []);

  return (
    <StepShell step="done" title={text.title}>
      <Card padding="none" className="px-6 py-10 text-center sm:px-10">
        <CircleCheck className="mx-auto h-12 w-12 text-brand" strokeWidth={1.75} aria-hidden="true" />
        <p ref={noteRef} tabIndex={-1} data-clarity-mask="true" className="lead mt-4 outline-none">
          {rich(text.thanks, {
            name: sent.name,
            customerPhone: <span className="whitespace-nowrap font-semibold text-ink">{sent.phone}</span>,
          })}
        </p>
        <p className="mt-4 text-ink-soft">
          {rich(text.photo, {
            phoneLink: (
              <a href={phone.sms} className="text-link whitespace-nowrap">
                {phone.display}
              </a>
            ),
          })}
        </p>
        <div className="mx-auto mt-8 max-w-md text-left">
          <Heading variant="item">{text.nextTitle}</Heading>
          <ol className="mt-4 space-y-4">
            {text.next.map((line, index) => (
              <li key={line} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-white"
                >
                  {index + 1}
                </span>
                <span className="pt-1 text-ink-soft">{line}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <PhoneButton kind="text" label={text.textPhoto} />
          <Button href={pagePaths.home}>{text.home}</Button>
        </div>
      </Card>
    </StepShell>
  );
}
