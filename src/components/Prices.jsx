import { Check } from "lucide-react";
import { siteConfig } from "../content/config";
import { firstWeekFreeActive, firstWeekFreeOffer, referralOffer } from "../content/offers";

const included = [
  "Repairs, or a replacement machine, at no charge",
  "Old machine haul-away at no charge",
];

function PriceCard({ title, price, highlighted = false }) {
  return (
    <article
      // The ring thickens the highlighted border without shifting the card's content.
      className={`flex flex-col rounded-3xl border bg-white p-6 sm:p-8 ${
        highlighted ? "border-brand ring-2 ring-brand" : "border-line"
      }`}
    >
      <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
      <p className="mt-3 flex items-baseline gap-1">
        <span className="font-display text-6xl font-extrabold tracking-tight text-brand">
          ${price}
        </span>
        <span className="font-display text-lg font-semibold text-ink-soft">
          /week
        </span>
      </p>

      <p className="mt-6 font-display text-[15px] font-semibold text-ink">
        Included
      </p>
      <ul className="mt-3 space-y-3">
        {included.map((item) => (
          <li key={item} className="flex gap-3 text-pretty text-ink-soft">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold">
              <Check
                className="h-3.5 w-3.5 text-brand-dark"
                strokeWidth={3}
                aria-hidden="true"
              />
            </span>
            {item}
          </li>
        ))}
      </ul>

      <a
        href="#request"
        className={`btn mt-8 w-full ${highlighted ? "btn-primary" : "btn-secondary"}`}
      >
        Check availability
      </a>
    </article>
  );
}

export default function Prices() {
  const { prices } = siteConfig;

  return (
    <section id="prices" aria-labelledby="prices-title" className="section">
      <div className="container-page">
        <h2 id="prices-title" className="h2">
          Prices
        </h2>

        <div className="mt-10 grid max-w-5xl gap-5 md:grid-cols-2 md:gap-6">
          <PriceCard title="Washer + dryer set" price={prices.setText} highlighted />
          <PriceCard title="One machine" price={prices.singleText} />
        </div>

        {/* The first-week offer drops out of builds made after it ends (offers.js). */}
        <div className="mt-6 grid max-w-5xl gap-3 md:grid-cols-2 md:gap-6">
          {firstWeekFreeActive && (
            <p className="rounded-2xl bg-gold/20 px-5 py-4 text-ink">
              <strong className="font-semibold">{firstWeekFreeOffer.title}.</strong>{" "}
              {firstWeekFreeOffer.text} {firstWeekFreeOffer.stillPaid}
            </p>
          )}
          <p className="rounded-2xl bg-gold/20 px-5 py-4 text-ink">
            <strong className="font-semibold">{referralOffer.title}.</strong> {referralOffer.text}
          </p>
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink-muted">
          ${prices.deposit} refundable deposit, returned when the machine comes
          back working. 52-week minimum, then week to week with 30 days'
          notice. Delivery and installation quoted per job, before you pay. Pay
          by e-Transfer or card.
        </p>
      </div>
    </section>
  );
}
