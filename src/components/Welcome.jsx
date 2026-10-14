import { Check, MapPin, Phone } from "lucide-react";
import { siteConfig } from "../content/config";

const included = ["Repairs included", "Old machine haul-away included"];

// Hero: the monthly price is the headline fact; the drawing shows the usual condo-closet machine.
export default function Welcome() {
  const { phone, prices } = siteConfig;

  return (
    <section id="top" aria-labelledby="hero-title" className="overflow-hidden">
      <div className="container-page grid items-center gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-brand">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Toronto &amp; the GTA
          </p>
          <h1
            id="hero-title"
            className="mt-3 font-display text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-[3.25rem] lg:text-[3.5rem]"
          >
            Washer &amp; dryer rental
          </h1>

          <div className="mt-5 sm:mt-7">
            <p className="sr-only">
              ${prices.set} a month for the set, or ${prices.single} a month for
              one machine.
            </p>
            {/* Price tag: small "$", big figure, label hung from the top of the digits. */}
            <div
              aria-hidden="true"
              className="flex items-start font-display text-[7rem] font-extrabold leading-none text-brand sm:text-[9rem]"
            >
              <span className="mt-[0.34em] text-[0.36em] leading-none">$</span>
              <span className="tracking-[-0.05em]">{prices.set}</span>
              <span className="ml-[0.55em] mt-[0.7em] flex flex-col text-[0.165em] font-bold leading-[1.15] text-ink">
                <span>a month</span>
                <span>for the set</span>
              </span>
            </div>
            <p aria-hidden="true" className="mt-3 text-lg text-ink-soft sm:text-xl">
              or{" "}
              <span className="font-semibold text-ink">
                ${prices.single} a month
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
            No credit check · Same-week delivery · English &amp; Spanish
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
          <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-none">
            <div className="relative aspect-square">
              <div
                aria-hidden="true"
                className="absolute inset-[7%] rounded-full bg-gold motion-safe:animate-disc-in"
              />
              <div className="absolute inset-0 flex justify-center motion-safe:animate-rise-in">
                <img
                  src={`${import.meta.env.BASE_URL}types/one-piece.svg`}
                  alt="Drawing of a one-piece laundry centre, 24″ or 27″ wide: a dryer above a top-load washer in one cabinet"
                  width="400"
                  height="480"
                  fetchPriority="high"
                  className="h-full w-auto"
                />
              </div>
            </div>
            {/* Width callout under the machine, drawn like a dimension line. */}
            <div
              aria-hidden="true"
              className="mx-auto mt-1 w-[41.7%] motion-safe:animate-fade-in"
            >
              <div className="relative h-3.5 border-x-2 border-brand">
                <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-brand" />
              </div>
              <p className="mt-2 whitespace-nowrap text-center font-display text-sm font-semibold text-brand">
                24″ or 27″ wide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
