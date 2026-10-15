import type { ReactNode } from "react";
import { siteConfig } from "~/shared/config";
import { ChevronLeft, Check, MessageSquare, Phone } from "~/shared/ui";
import { STEPS, type StepId } from "../model";

// The frame of every step: the heading, a progress line (3 steps), the step's form, a link
// back to the previous step, and the phone for anyone who would rather call or text.
export function StepShell({
  step,
  title,
  intro,
  backHref,
  children,
}: {
  step: StepId | "done";
  title: string;
  intro?: ReactNode;
  backHref?: string;
  children: ReactNode;
}) {
  const { phone, hours } = siteConfig;
  const current = step === "done" ? STEPS.length : STEPS.findIndex((entry) => entry.id === step);

  return (
    <section id="top" aria-labelledby="hero-title" className="bg-brand-mint pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <p className="font-display text-[15px] font-semibold text-brand">Start your rental</p>
          <h1
            id="hero-title"
            className="mt-2 font-display text-[2.25rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[2.75rem]"
          >
            {title}
          </h1>

          <nav aria-label="Rental request steps" className="mt-6">
            <ol className="grid grid-cols-3 gap-2">
              {STEPS.map((entry, index) => {
                const done = index < current;
                const here = index === current;
                return (
                  <li key={entry.id} aria-current={here ? "step" : undefined}>
                    <span
                      className={`block h-1.5 rounded-full ${done || here ? "bg-brand" : "bg-brand/20"}`}
                      aria-hidden="true"
                    />
                    <span
                      className={`mt-2 flex items-center gap-1.5 text-sm ${
                        here ? "font-semibold text-ink" : done ? "text-brand-dark" : "text-ink-muted"
                      }`}
                    >
                      {done && <Check className="h-4 w-4 shrink-0" strokeWidth={3} aria-hidden="true" />}
                      <span>
                        <span className="sr-only">
                          Step {index + 1} of {STEPS.length}
                          {done ? ", done" : ""}:{" "}
                        </span>
                        {entry.title}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ol>
          </nav>

          {intro && <div className="lead mt-6">{intro}</div>}
          <div className="mt-8">{children}</div>

          {backHref && (
            <p className="mt-6">
              <a href={backHref} className="text-link inline-flex items-center gap-1">
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Back to the previous step
              </a>
            </p>
          )}
        </div>

        <aside aria-label="Call or text instead" className="lg:col-span-5 lg:pt-28">
          <div className="rounded-3xl border border-brand-mint-strong bg-white p-6">
            <p className="font-display font-semibold text-ink">Prefer to call or text?</p>
            <p className="mt-1 font-display text-2xl font-bold text-brand">{phone.display}</p>
            <p className="mt-1 text-sm text-ink-muted">
              {hours.map((entry) => `${entry.days} ${entry.time.toLowerCase()}`).join(". ")}.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <a href={phone.tel} className="btn btn-primary">
                <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
                Call
              </a>
              <a href={phone.sms} className="btn btn-secondary">
                <MessageSquare className="h-[18px] w-[18px]" aria-hidden="true" />
                Text
              </a>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              A photo of the closet helps. You can text it to us.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
