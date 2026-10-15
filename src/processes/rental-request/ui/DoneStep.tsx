import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router";
import { siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { CircleCheck, LangLink, MessageSquare } from "~/shared/ui";
import type { doneLoader } from "../loaders.server";
import { StepShell } from "./StepShell";

// After sending: what happens next. Focus moves to the message so screen readers announce it.
export function DoneStep() {
  const { sent } = useLoaderData<typeof doneLoader>();
  const { phone } = siteConfig;
  const { d, rich } = useI18n();
  const text = d.start.done;
  const noteRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    noteRef.current?.focus();
  }, []);

  return (
    <StepShell step="done" title={text.title}>
      <div className="rounded-3xl border border-line bg-white px-6 py-10 text-center sm:px-10">
        <CircleCheck className="mx-auto h-12 w-12 text-brand" strokeWidth={1.75} aria-hidden="true" />
        <p ref={noteRef} tabIndex={-1} className="lead mt-4 outline-none">
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
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={phone.sms} className="btn btn-secondary">
            <MessageSquare className="h-[18px] w-[18px]" aria-hidden="true" />
            {text.textPhoto}
          </a>
          <LangLink href="/" className="btn btn-primary">
            {text.home}
          </LangLink>
        </div>
      </div>
    </StepShell>
  );
}
