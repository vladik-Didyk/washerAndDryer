import { MapPin, Phone } from "lucide-react";
import { siteConfig } from "../content/config";
import { findMachinePhoto } from "../content/machines";
import Photo from "./Photo";

// Header for the city and district pages: the home hero's facts, smaller, beside an example
// photo of one machine type (`photo`, a file from src/content/machines.js). `price` is the
// headline figure; `priceLabel` and `otherPrice` explain it. Phones: text, then the photo.
// The trust strip follows it on the page.
export default function PageHero({ eyebrow, title, intro, price, priceLabel, otherPrice, photo }) {
  const { phone } = siteConfig;
  const shown = photo ? findMachinePhoto(photo) : null;

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
            <span className="font-display text-6xl font-extrabold tracking-tight text-brand">
              ${price}
            </span>
            <span className="font-display text-lg font-bold text-ink">{priceLabel}</span>
          </p>
          {otherPrice && <p className="mt-2 text-lg text-ink-soft">{otherPrice}</p>}
          <p className="mt-2 text-sm text-ink-muted">Prices in Canadian dollars. No HST charged.</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#request" className="btn btn-primary">
              Start your rental
            </a>
            <a href={phone.tel} className="btn btn-secondary">
              <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
              Call or text {phone.display}
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
              Example photo: {shown.machine.title}. Your machine may be a different brand.
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
