import { Check, MapPin, Phone } from "lucide-react";
import { siteConfig } from "../content/config";
import HeroMachines from "./HeroMachines";

const included = ["Repairs included", "Old machine haul-away included"];

// Hero: the weekly price is the headline fact; the drawing cycles through the five machine types.
export default function Welcome() {
  const { phone, prices, owner, languages } = siteConfig;

  return (
    <section id="top" aria-labelledby="hero-title" className="overflow-hidden">
      <div className="container-page grid items-center gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-brand">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Run by {owner} in Toronto
          </p>
          <h1
            id="hero-title"
            className="mt-3 font-display text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-[3.25rem] lg:text-[3.5rem]"
          >
            Washer &amp; dryer rental in Toronto &amp; the GTA
          </h1>

          <div className="mt-5 sm:mt-7">
            <p className="sr-only">
              ${prices.setText} a week for the set, or ${prices.singleText} a week for
              one machine.
            </p>
            {/* Price tag: small "$", big figure, label hung from the top of the digits.
                Phones have no room beside the figure, so there the label sits under it. */}
            <div
              aria-hidden="true"
              className="flex flex-wrap items-start font-display text-[7rem] font-extrabold leading-none text-brand sm:flex-nowrap sm:text-[9rem]"
            >
              <span className="mt-[0.34em] text-[0.36em] leading-none">$</span>
              <span className="tracking-[-0.05em]">{prices.setText}</span>
              <span className="mt-2 flex w-full gap-[0.3em] text-[0.165em] font-bold leading-[1.15] text-ink sm:ml-[0.55em] sm:mt-[0.7em] sm:w-auto sm:flex-col sm:gap-0">
                <span>a week</span>
                <span>for the set</span>
              </span>
            </div>
            <p aria-hidden="true" className="mt-3 text-lg text-ink-soft sm:text-xl">
              or{" "}
              <span className="font-semibold text-ink">
                ${prices.singleText} a week
              </span>{" "}
              for one machine
            </p>
          </div>

          <ul className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-7">
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

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#request" className="btn btn-primary">
              Check availability
            </a>
            <a href={phone.tel} className="btn btn-secondary">
              <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
              Call or text {phone.display}
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <HeroMachines />
        </div>
      </div>
    </section>
  );
}
