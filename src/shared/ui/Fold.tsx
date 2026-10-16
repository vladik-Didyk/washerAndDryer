import type { ReactNode } from "react";
import { useI18n } from "~/shared/i18n";
import { ChevronDown } from "./icons";

// Longer text folded under "More details": a native <details>, so it opens without JavaScript
// and search engines still read what is inside. `label` replaces "More details".
export function Fold({ label, className = "", children }: { label?: string; className?: string; children: ReactNode }) {
  const { d } = useI18n();
  return (
    <details className={`group rounded-3xl border border-line bg-white ${className}`}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-3xl px-5 py-4 font-display text-lg font-semibold text-ink transition-colors hover:bg-brand-mint/50 sm:px-8 [&::-webkit-details-marker]:hidden">
        {label ?? d.common.moreDetails}
        <ChevronDown className="h-5 w-5 shrink-0 text-brand transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="border-t border-line px-5 pb-6 pt-5 sm:px-8">{children}</div>
    </details>
  );
}
