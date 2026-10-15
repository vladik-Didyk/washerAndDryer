import type { ReactNode } from "react";
import { findMachinePhoto } from "~/entities/machine";
import { siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { MapPin, Phone, Photo } from "~/shared/ui";

// Header for the city and district pages: the home hero's facts, smaller, beside an example
// photo of one machine type (`photo`, a file from entities/machine). `price` is the
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
  photo,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  price: string;
  wasPrice?: ReactNode;
  priceLabel: string;
  otherPrice?: string;
  photo?: string;
}) {
  const { phone } = siteConfig;
  const { d, format } = useI18n();
  const shown = photo ? findMachinePhoto(d, photo) : null;

  return (
    <section id="top" aria-labelledby="hero-title" className="overflow-hidden">
      <div className="container-page grid items-center gap-10 pb-14 pt-8 sm:pt-10 lg:grid-cols-12 lg:gap-12 lg:pb-16 lg:pt-12">
        <div className="lg:col-span-7">
          {eyebrow && (
            <p className="inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-brand">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {eyebrow}
            </p>
          )}
          <h1
            id="hero-title"
            className="mt-3 font-display text-[2.25rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[2.75rem] lg:text-[3rem]"
          >
            {title}
          </h1>
          {intro && <p className="lead mt-5 max-w-2xl">{intro}</p>}

          <p className="mt-6 flex flex-wrap items-baseline gap-x-2">
            <span className="font-display text-6xl font-extrabold tracking-tight text-brand">{price}</span>
            <span className="font-display text-lg font-bold text-ink">{priceLabel}</span>
            {wasPrice}
          </p>
          {otherPrice && <p className="mt-2 text-lg text-ink-soft">{otherPrice}</p>}
          <p className="mt-2 text-sm text-ink-muted">{d.common.pricesNote}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="/start/" className="btn btn-primary">
              {d.common.startRental}
            </a>
            <a href={phone.tel} className="btn btn-secondary">
              <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
              {d.common.callOrText}
            </a>
          </div>
        </div>

        {shown && (
          <figure className="mx-auto w-full max-w-[22rem] sm:max-w-[24rem] lg:col-span-5 lg:max-w-none">
            <div className="aspect-[5/6] overflow-hidden rounded-3xl bg-brand-mint">
              <Photo
                src={shown.src}
                alt={shown.alt}
                sizes="(min-width: 1024px) 27rem, 24rem"
                priority
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-center text-sm text-ink-muted lg:text-left">
              {format(d.areas.page.photoCaption, { title: shown.machine.title })}
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
