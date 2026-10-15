import { ArrowRight } from "~/shared/ui";
import { useSite } from "~/shared/lib";
import type { FaqGroup } from "../data";

// A link under an answer, only when its page exists in this deployment (drafts may be missing).
function AnswerLink({ link }: { link?: { href: string; label: string } }) {
  const site = useSite();
  if (!link || !site.has(link.href)) return null;
  return (
    <a href={link.href} className="text-link mt-3 inline-flex items-center gap-1.5">
      {link.label}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

// Every question of every group, all answers open. Each question has an id for direct links.
export function FaqList({ groups }: { groups: FaqGroup[] }) {
  return (
    <div className="max-w-4xl space-y-14">
      {groups.map((group) => (
        <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`}>
          <h2 id={`${group.id}-title`} className="h2">
            {group.title}
          </h2>
          <div className="mt-6 divide-y divide-line rounded-3xl border border-line bg-paper px-5 sm:px-8">
            {group.items.map((faq) => (
              <div key={faq.id} id={faq.id} className="py-6">
                <h3 className="font-display text-[17px] font-semibold leading-snug text-ink sm:text-lg">
                  {faq.question}
                </h3>
                <p className="mt-2 max-w-prose leading-relaxed text-ink-soft">{faq.answer}</p>
                <AnswerLink link={faq.link} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
