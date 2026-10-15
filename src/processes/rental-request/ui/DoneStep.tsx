import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router";
import { siteConfig } from "~/shared/config";
import { CircleCheck, MessageSquare } from "~/shared/ui";
import type { doneLoader } from "../loaders.server";
import { StepShell } from "./StepShell";

// After sending: what happens next. Focus moves to the message so screen readers announce it.
export function DoneStep() {
  const { sent } = useLoaderData<typeof doneLoader>();
  const { phone } = siteConfig;
  const noteRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    noteRef.current?.focus();
  }, []);

  return (
    <StepShell step="done" title="Request sent.">
      <div className="rounded-3xl border border-line bg-white px-6 py-10 text-center sm:px-10">
        <CircleCheck className="mx-auto h-12 w-12 text-brand" strokeWidth={1.75} aria-hidden="true" />
        <p ref={noteRef} tabIndex={-1} className="lead mt-4 outline-none">
          Thank you, {sent.name}. We'll call or text you at{" "}
          <span className="whitespace-nowrap font-semibold text-ink">{sent.phone}</span> with the
          machine, the total and the start date.
        </p>
        <p className="mt-4 text-ink-soft">
          A photo of the space helps. Text it to{" "}
          <a href={phone.sms} className="text-link whitespace-nowrap">
            {phone.display}
          </a>
          .
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={phone.sms} className="btn btn-secondary">
            <MessageSquare className="h-[18px] w-[18px]" aria-hidden="true" />
            Text a photo
          </a>
          <a href="/" className="btn btn-primary">
            Back to the home page
          </a>
        </div>
      </div>
    </StepShell>
  );
}
