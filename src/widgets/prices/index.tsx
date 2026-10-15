import { promotionText, useActivePromotions, usePrices, type PriceInfo } from "~/entities/offer";
import { useI18n } from "~/shared/i18n";
import { pagePaths } from "~/shared/config";
import { Button, Card, CheckList, Container, DotList, Heading, Nest, Section, WasPrice } from "~/shared/ui";

function PriceCard({ title, price, highlighted = false }: { title: string; price: PriceInfo; highlighted?: boolean }) {
  const { d, moneyParts } = useI18n();
  const tag = moneyParts(price.current);
  return (
    <Card as="article" tone={highlighted ? "highlight" : "white"} className="flex flex-col">
      <Heading variant="cardSmall">{title}</Heading>
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
      <CheckList items={d.home.prices.includedItems} className="mt-3 space-y-3" itemClassName="text-pretty text-ink-soft" />

      <Button href={pagePaths.start} variant={highlighted ? "primary" : "secondary"} className="mt-8 w-full">
        {d.common.startRental}
      </Button>
    </Card>
  );
}

export function Prices() {
  const i18n = useI18n();
  const { d } = i18n;
  const prices = usePrices();
  const promotions = useActivePromotions();

  return (
    <Section id="prices" aria-labelledby="prices-title">
      <Container>
        <Heading id="prices-title">{d.home.prices.title}</Heading>

        <div className="mt-10 grid max-w-5xl gap-5 md:grid-cols-2 md:gap-6">
          <Nest>
            <PriceCard title={d.home.prices.set} price={prices.set} highlighted />
            <PriceCard title={d.home.prices.single} price={prices.single} />
          </Nest>
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

        <DotList
          items={d.home.prices.terms}
          className="mt-6 grid max-w-5xl gap-x-6 gap-y-2 text-sm leading-relaxed text-ink-muted md:grid-cols-2"
          itemClassName="flex gap-2.5"
          bullet="mt-2 h-1.5 w-1.5"
        />
      </Container>
    </Section>
  );
}
