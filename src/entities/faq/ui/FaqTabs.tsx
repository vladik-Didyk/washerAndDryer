import { useEffect, useState } from "react";
import { useI18n } from "~/shared/i18n";
import { useSite } from "~/shared/lib";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  Gift,
  Info,
  LangLink,
  Truck,
  Wallet,
  Wrench,
  type LucideIcon,
} from "~/shared/ui";
import type { Faq, FaqGroup } from "../data";

// The /faq/ page: one icon tab per group, and each group's questions with their answers folded
// (native <details>, so search engines and visitors without JavaScript still get every answer).
// The server renders every group; after loading, only the chosen tab's group shows. A link to
// /faq/#<question> or #<group> (the offer bar, other pages) opens that tab and that answer.
const ICONS: Record<string, LucideIcon> = {
  renting: Info,
  "prices-and-payment": Wallet,
  "delivery-and-installation": Truck,
  repairs: Wrench,
  "for-landlords": Building2,
  "first-week-free-offer": Gift,
};

function AnswerLink({ link }: { link?: Faq["link"] }) {
  const site = useSite();
  if (!link || !site.has(link.href)) return null;
  return (
    <LangLink href={link.href} className="text-link mt-3 inline-flex items-center gap-1.5">
      {link.label}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </LangLink>
  );
}

export function FaqTabs({ groups }: { groups: FaqGroup[] }) {
  const { d } = useI18n();
  // null until hydrated: every group shows (the server HTML), then one tab at a time.
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const fromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const group = groups.find((g) => g.id === id || g.items.some((item) => item.id === id));
      setActive(group?.id ?? groups[0]?.id ?? null);
      if (group && group.id !== id) {
        setOpen(id);
        requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "center" }));
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [groups]);

  return (
    <div>
      <div role="tablist" aria-label={d.faq.page.topics} className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {groups.map((group) => {
          const Icon = ICONS[group.id] ?? Info;
          const selected = active === group.id;
          return (
            <button
              key={group.id}
              type="button"
              role="tab"
              id={`${group.id}-tab`}
              aria-selected={selected}
              aria-controls={group.id}
              onClick={() => {
                setActive(group.id);
                history.replaceState(null, "", `#${group.id}`);
              }}
              className={`flex flex-col items-center gap-2 rounded-2xl border px-3 py-4 text-center font-display text-[15px] font-semibold leading-tight transition-colors ${
                selected
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-white text-ink hover:border-brand hover:bg-brand-mint"
              }`}
            >
              <Icon className={`h-7 w-7 ${selected ? "text-gold" : "text-brand"}`} aria-hidden="true" />
              {group.title}
            </button>
          );
        })}
      </div>

      <div className="mt-10 max-w-4xl">
        {groups.map((group) => (
          <section
            key={group.id}
            id={group.id}
            role="tabpanel"
            aria-labelledby={`${group.id}-tab`}
            hidden={active !== null && active !== group.id}
            className="mb-12 last:mb-0"
          >
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{group.title}</h2>
            <div className="mt-5 divide-y divide-line rounded-3xl border border-line bg-paper px-5 sm:px-8">
              {group.items.map((faq) => (
                <details
                  key={faq.id}
                  id={faq.id}
                  open={open === faq.id || undefined}
                  className="group py-1"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <ChevronDown className="h-5 w-5 shrink-0 text-brand transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <div className="pb-5">
                    <p className="max-w-prose leading-relaxed text-ink-soft">{faq.answer}</p>
                    <AnswerLink link={faq.link} />
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
