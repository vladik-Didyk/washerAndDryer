import type { ReactNode } from "react";
import { pagePaths } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { Button, Container, Eyebrow, Heading, MapPin, PhoneButton, Section } from "~/shared/ui";

// Header for the city and district pages: the home hero's facts, smaller, beside `visual`
// (the service map with the place lit up). `price` is the
// headline figure (written out, e.g. "$12.50", with `wasPrice` beside it while a promotion
// lowers it); `priceLabel` and `otherPrice` explain it. Phones: text, then the photo.
// The trust strip follows it on the page.
export function PageHero({
  eyebrow,
  title,
  intro,
  price,
  wasPrice,
  priceLabel,
  otherPrice,
  visual,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  price: string;
  wasPrice?: ReactNode;
  priceLabel: string;
  otherPrice?: string;
  visual?: ReactNode;
}) {
  const { d } = useI18n();

  return (
    <Section id="top" aria-labelledby="hero-title" padded={false} nest={false} className="overflow-hidden">
      <Container className="grid items-center gap-10 pb-14 pt-8 sm:pt-10 lg:grid-cols-12 lg:gap-12 lg:pb-16 lg:pt-12">
        <div className="lg:col-span-7">
          {eyebrow && <Eyebrow icon={MapPin}>{eyebrow}</Eyebrow>}
          <Heading id="hero-title" variant="page" className="mt-3">
            {title}
          </Heading>
          {intro && <p className="lead mt-5 max-w-2xl">{intro}</p>}

          <p className="mt-6 flex flex-wrap items-baseline gap-x-2">
            <span className="font-display text-6xl font-extrabold tracking-tight text-brand">{price}</span>
            <span className="font-display text-lg font-bold text-ink">{priceLabel}</span>
            {wasPrice}
          </p>
          {otherPrice && <p className="mt-2 text-lg text-ink-soft">{otherPrice}</p>}
          <p className="mt-2 text-sm text-ink-muted">{d.common.pricesNote}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={pagePaths.start}>{d.common.startRental}</Button>
            <PhoneButton kind="call" variant="secondary" label={d.common.callOrText} />
          </div>
        </div>

        {visual && <div className="lg:col-span-5">{visual}</div>}
      </Container>
    </Section>
  );
}
