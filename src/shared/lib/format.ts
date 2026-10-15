// $12.5 -> "12.50"
export const money = (amount: number) => amount.toFixed(2);

// ids joined for aria-describedby, or undefined when there are none.
export const describedBy = (...ids: Array<string | false | null | undefined>) =>
  ids.filter(Boolean).join(" ") || undefined;
