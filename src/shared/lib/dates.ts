// The calendar date in Toronto for a moment, as "YYYY-MM-DD" (the business's own day).
// Written-out dates come from shared/i18n (i18n.date).
export function torontoDate(time: number): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(time));
  const part = (type: string) => parts.find((entry) => entry.type === type)?.value ?? "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export const torontoYear = (time: number): number => Number(torontoDate(time).slice(0, 4));

// "2026-10-15" as an ISO calendar date, checked (sitemap <lastmod>).
export function isoDate(value: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value))) {
    throw new Error(`Not a calendar date: "${value}"`);
  }
  return value;
}
