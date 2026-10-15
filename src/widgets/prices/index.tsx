import { promotionText, useActivePromotions, usePrices, type PriceInfo } from "~/entities/offer";
import { useI18n } from "~/shared/i18n";
import { Check, LangLink, WasPrice } from "~/shared/ui";

function PriceCard({ title, price, highlighted = false }: { title: string; price: PriceInfo; highlighted?: boolean }) {
  const { d, moneyParts } = useI18n();
  const tag = moneyParts(price.current);
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
          {tag.currency}
          {tag.value}
        </span>
        <span className="font-display text-lg font-semibold text-ink-soft">{d.common.perWeekSuffix}</span>
        <WasPrice price={price} className="ml-2 font-display text-lg font-semibold text-ink-muted" />
      </p>
      <p className="mt-1 text-sm font-medium text-ink-muted">{d.common.priceTagNote}</p>

      <p className="mt-6 font-display text-[15px] font-semibold text-ink">{d.home.prices.included}</p>
      <ul className="mt-3 space-y-3">
        {d.home.prices.includedItems.map((item) => (
          <li key={item} className="flex gap-3 text-pretty text-ink-soft">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold">
              <Check className="h-3.5 w-3.5 text-brand-dark" strokeWidth={3} aria-hidden="true" />
            </span>
            {item}
          </li>
        ))}
      </ul>

      <LangLink href="/start/" className={`btn mt-8 w-full ${highlighted ? "btn-primary" : "btn-secondary"}`}>
        {d.common.startRental}
      </LangLink>
    </article>
  );
}

export function Prices() {
  const i18n = useI18n();
  const { d } = i18n;
  const prices = usePrices();
  const promotions = useActivePromotions();

  return (
    <section id="prices" aria-labelledby="prices-title" className="section">
      <div className="container-page">
        <h2 id="prices-title" className="h2">
          {d.home.prices.title}
        </h2>

        <div className="mt-10 grid max-w-5xl gap-5 md:grid-cols-2 md:gap-6">
          <PriceCard title={d.home.prices.set} price={prices.set} highlighted />
          <PriceCard title={d.home.prices.single} price={prices.single} />
        </div>

        {/* The running promotions drop out when they end (decided per request, entities/offer). */}
        <div className="mt-6 grid max-w-5xl gap-3 md:grid-cols-2 md:gap-6">
          {promotions.map((promotion) => {
            const offer = promotionText(promotion, i18n);
            return (
              <p key={promotion.id} className="rounded-2xl bg-gold/20 px-5 py-4 text-ink">
                <strong className="font-semibold">{offer.title}.</strong> {offer.text} {offer.stillPaid}
              </p>
            );
          })}
          <p className="rounded-2xl bg-gold/20 px-5 py-4 text-ink">
            <strong className="font-semibold">{d.offers.referral.title}.</strong> {d.offers.referral.text}
          </p>
        </div>

        <ul className="mt-6 grid max-w-5xl gap-x-6 gap-y-2 text-sm leading-relaxed text-ink-muted md:grid-cols-2">
          {d.home.prices.terms.map((term) => (
            <li key={term} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {term}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
