import { ArrowRight, Card, Heading, LangLink, Nest, Section } from "~/shared/ui";
import { useSite } from "~/shared/lib";
import type { FaqGroup } from "../data";

// A link under an answer, only when its page exists in this deployment (drafts may be missing).
function AnswerLink({ link }: { link?: { href: string; label: string } }) {
  const site = useSite();
  if (!link || !site.has(link.href)) return null;
  return (
    <LangLink href={link.href} className="text-link mt-3 inline-flex items-center gap-1.5">
      {link.label}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </LangLink>
  );
}

// Every question of every group, all answers open. Each question has an id for direct links.
export function FaqList({ groups }: { groups: FaqGroup[] }) {
  return (
    <div className="max-w-4xl space-y-14">
      {groups.map((group) => (
        <Section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`} padded={false}>
          <Heading id={`${group.id}-title`}>{group.title}</Heading>
          <Card tone="paper" padding="none" className="mt-6 divide-y divide-line px-5 sm:px-8">
            {group.items.map((faq) => (
              <div key={faq.id} id={faq.id} className="py-6">
                <Nest>
                  <Heading variant="question">{faq.question}</Heading>
                </Nest>
                <p className="mt-2 max-w-prose leading-relaxed text-ink-soft">{faq.answer}</p>
                <AnswerLink link={faq.link} />
              </div>
            ))}
          </Card>
        </Section>
      ))}
    </div>
  );
}
