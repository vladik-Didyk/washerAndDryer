import type { ReactNode } from "react";
import { pagePaths } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { heroPhoto } from "~/shared/lib";
import { Button, Card, Container, Heading, KeepWordsWhole, PhoneButton, Photo, Section } from "~/shared/ui";

// The closing call to action of a page, in one of two shapes:
// - "photo" (default): a band near the bottom of the main pages, the home page's laundry-room
//   photo under a dark green overlay, one short line, and the two ways to start. The overlay
//   keeps white text well above 4.5:1 wherever it sits: solid enough over the whole photo on
//   phones, darkest behind the text from 1024px.
// - "panel": a mint card, heading and lead on the left, `children` on the right (buttons, the
//   postal-code checker).
// By default the button is "Start your rental" to the rental request; `action` changes it
// (landlords: a quote). `title` is plain text (words never break at a hyphen); `text` may hold
// markup. Without them, the common "Ready to rent?".
export function CtaBand({
  variant = "photo",
  id = "cta-band-title",
  title,
  text,
  action,
  className,
  textClassName = "lg:col-span-7",
  children,
}: {
  variant?: "photo" | "panel";
  /** The heading's id (the section is labelled by it). */
  id?: string;
  title?: string;
  text?: ReactNode;
  action?: { label: string; href: string };
  /** The panel's section classes (its padding). */
  className?: string;
  /** The panel's text column. */
  textClassName?: string;
  /** The panel's right-hand side; without it, the start and call buttons. */
  children?: ReactNode;
}) {
  const { d } = useI18n();
  const button = action ?? { label: d.common.startRental, href: pagePaths.start };
  const heading = title ?? d.common.readyToRent;
  const lead = text ?? d.common.readyToRentText;

  if (variant === "panel") {
    return (
      <Section aria-labelledby={id} padded={!className} className={className}>
        <Container>
          <Card tone="mint" padding="none" className="grid gap-6 px-5 py-8 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className={textClassName}>
              <Heading id={id}>{heading}</Heading>
              <p className="lead mt-3">{lead}</p>
            </div>
            {children ?? (
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-5 lg:justify-end">
                <Button href={button.href}>{button.label}</Button>
                <PhoneButton kind="call" variant="secondary" />
                <PhoneButton kind="text" />
              </div>
            )}
          </Card>
        </Container>
      </Section>
    );
  }

  return (
    <Section
      aria-labelledby={id}
      padded={false}
      className="on-dark relative isolate overflow-hidden border-b border-white/10 bg-brand-dark"
    >
      <Photo
        src={heroPhoto.wide.src}
        alt=""
        sizes="100vw"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[45%_55%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-brand-dark/85 lg:bg-transparent lg:bg-gradient-to-r lg:from-brand-dark/95 lg:via-brand-dark/85 lg:to-brand-dark/40"
      />
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-xl">
          <Heading id={id} className="text-white">
            <KeepWordsWhole text={heading} />
          </Heading>
          <p className="lead mt-4 text-white/90">{lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={button.href} variant="gold">
              {button.label}
            </Button>
            <PhoneButton kind="call" variant="outlineLight" label={d.common.callOrText} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
