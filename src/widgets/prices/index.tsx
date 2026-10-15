import { promotionText, useActivePromotions, usePrices } from "~/entities/offer";
import { pagePaths } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { ArrowRight, Button, Check, Container, Gift, Heading, LangLink, Section, UserPlus, WasPrice } from "~/shared/ui";

// The prices as one big price card (like the Facebook price card): the set price, the single
// machine price in a gold pill, what's included, and the running offers as links to their
// answers on /faq/. The deposit, the minimum term and payment are answered on /faq/ too.
export function Prices() {
  const i18n = useI18n();
  const { d, moneyParts, money, rich } = i18n;
  const { prices: text } = d.home;
  const prices = usePrices();
  const promotions = useActivePromotions();
  const tag = moneyParts(prices.set.current);

  return (
    <Section id="prices" aria-labelledby="prices-title">
      <Container>
        <Heading id="prices-title">{text.title}</Heading>

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="relative overflow-hidden rounded-[2rem] bg-white p-6 shadow-[0_24px_60px_-30px_rgba(7,63,50,0.45)] ring-1 ring-line sm:p-10 lg:col-span-7">
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-brand sm:h-48 sm:w-48" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full border-[10px] border-gold/70 sm:h-64 sm:w-64" />

            <div className="relative">
              <p className="sr-only">{d.home.hero.priceSummary}</p>
              <div aria-hidden="true" className="flex flex-wrap items-end gap-x-4 gap-y-1 sm:flex-nowrap">
                <span className="flex items-start font-display font-extrabold leading-none text-brand">
                  <span className="mt-[0.3em] text-[2.25rem] sm:text-[2.75rem]">{tag.currency}</span>
                  <span className="text-[5.5rem] tracking-[-0.05em] sm:text-[6rem] xl:text-[7rem]">{tag.value}</span>
                </span>
                <span className="pb-3 font-display leading-tight">
                  <span className="block text-2xl font-extrabold text-ink sm:text-3xl">{text.perWeek}</span>
                  <span className="block text-lg font-semibold text-ink-soft">{text.forSet}</span>
                </span>
              </div>
              <WasPrice price={prices.set} className="mt-1 block font-display text-xl font-bold text-ink-muted" />

              <p aria-hidden="true" className="mt-5 inline-block rounded-full bg-gold px-5 py-2.5 font-display text-lg font-bold text-ink sm:text-xl">
                {rich(text.orSingle, { price: <span>{money(prices.single.current)}</span> })}
              </p>

              <ul className="mt-7 space-y-3">
                {text.checks.map((item) => (
                  <li key={item} className="flex items-center gap-3 font-display text-lg font-bold text-ink sm:text-xl">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand">
                      <Check className="h-4 w-4 text-gold" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Button href={pagePaths.start} className="mt-8 w-full sm:w-auto">
                {d.common.startRental}
                <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* The running promotions drop out when they end (decided per request, entities/offer). */}
          <div className="space-y-3 lg:col-span-5">
            {promotions.map((promotion) => (
              <LangLink
                key={promotion.id}
                href={`${pagePaths.faq}#${promotion.id}`}
                className="flex items-center gap-4 rounded-2xl bg-gold/20 px-5 py-4 font-display text-lg font-bold text-ink transition-colors hover:bg-gold/30"
              >
                <Gift className="h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
                {promotionText(promotion, i18n).short}
              </LangLink>
            ))}
            <LangLink
              href={`${pagePaths.faq}#referral`}
              className="flex items-center gap-4 rounded-2xl bg-gold/20 px-5 py-4 font-display text-lg font-bold text-ink transition-colors hover:bg-gold/30"
            >
              <UserPlus className="h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
              {d.offers.referral.short}
            </LangLink>
            <p className="pt-2">
              <LangLink href={`${pagePaths.faq}#prices-and-payment`} className="text-link">
                {text.details}
              </LangLink>
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
