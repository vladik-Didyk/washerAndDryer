import { useSite } from "~/shared/lib";
import { activePromotions, getPrice, type PriceItem } from "./model";

// The weekly price of a set or one machine for this request (the root loader's time).
// Show a lowered price with shared/ui WasPrice beside it.
export const usePrice = (item: PriceItem) => getPrice(item, useSite().now);

export function usePrices() {
  const { now } = useSite();
  return { set: getPrice("set", now), single: getPrice("single", now) };
}

export const useActivePromotions = () => activePromotions(useSite().now);
