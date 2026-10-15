import { useI18n } from "../i18n";

// Beside a price lowered by a promotion: the list price struck through, read out as
// "was $12.50". Renders nothing while the price isn't lowered.
export function WasPrice({ price, className = "" }: { price: { base: number; current: number }; className?: string }) {
  const { d, format, money } = useI18n();
  if (!(price.current < price.base)) return null;
  return (
    <span className={className}>
      <span className="sr-only">{format(d.common.wasPrice, { price: money(price.base) })}</span>
      <s aria-hidden="true">{money(price.base)}</s>
    </span>
  );
}
