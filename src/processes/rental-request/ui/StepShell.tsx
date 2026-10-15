import type { ReactNode } from "react";
import { useI18n } from "~/shared/i18n";
import { CallCard, Check, ChevronLeft, Container, Eyebrow, Heading, LangLink, Nest, Section } from "~/shared/ui";
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
  const { d, format } = useI18n();
  const text = d.start;
  const current = step === "done" ? STEPS.length : STEPS.findIndex((entry) => entry.id === step);

  return (
    <Section
      id="top"
      aria-labelledby="hero-title"
      padded={false}
      nest={false}
      className="bg-brand-mint pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24"
    >
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <Eyebrow>{text.eyebrow}</Eyebrow>
          <Heading
            id="hero-title"
            variant="none"
            className="mt-2 font-display text-[2.25rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[2.75rem]"
          >
            {title}
          </Heading>

          <nav aria-label={text.stepsLabel} className="mt-6">
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
                          {format(text.stepOf, { step: index + 1, steps: STEPS.length })}
                          {done ? text.stepDone : ""}:{" "}
                        </span>
                        {text.steps[entry.id]}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ol>
          </nav>

          {intro && <div className="lead mt-6">{intro}</div>}
          <div className="mt-8">
            <Nest>{children}</Nest>
          </div>

          {backHref && (
            <p className="mt-6">
              <LangLink href={backHref} className="text-link inline-flex items-center gap-1">
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                {text.back}
              </LangLink>
            </p>
          )}
        </div>

        <aside aria-label={text.asideLabel} className="lg:col-span-5 lg:pt-28">
          <CallCard>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">{d.common.closetPhotoHelps}</p>
          </CallCard>
        </aside>
      </Container>
    </Section>
  );
}
