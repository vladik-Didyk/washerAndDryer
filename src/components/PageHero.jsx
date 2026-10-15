import { Check, MapPin, Phone } from "lucide-react";
import { siteConfig } from "../content/config";
import MachineImage from "./MachineImage";

const included = ["Repairs included", "Old machine haul-away included"];

// Header for the city and machine type pages: the same facts as the home hero, smaller.
// `price` is the headline figure; `priceLabel` and `otherPrice` explain it.
export default function PageHero({
  eyebrow,
  title,
  intro,
  machine,
  price,
  priceLabel,
  otherPrice,
}) {
  const { phone, languages } = siteConfig;

  return (
    <section id="top" aria-labelledby="hero-title" className="overflow-hidden">
      <div className="container-page grid items-center gap-10 pb-16 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-16">
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
            <span className="font-display text-lg font-bold text-ink">
              {priceLabel}
            </span>
          </p>
          {otherPrice && (
            <p className="mt-2 text-lg text-ink-soft">{otherPrice}</p>
          )}

          <ul className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-7">
            {included.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 font-semibold text-ink"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold">
                  <Check
                    className="h-4 w-4 text-brand-dark"
                    strokeWidth={3}
                    aria-hidden="true"
                  />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-4 text-ink-soft">
            No credit check · Same-week delivery · {languages}
          </p>

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

        {machine && (
          <div className="lg:col-span-5">
            <div className="mx-auto w-full max-w-[20rem] sm:max-w-[24rem] lg:max-w-none">
              <MachineImage
                machine={machine}
                lazy={false}
                priority
                frameClassName="aspect-[5/6] overflow-hidden rounded-3xl bg-brand-mint"
                captionClassName="mt-3 text-center text-sm text-ink-muted"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
