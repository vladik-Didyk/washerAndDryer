import { useState } from "react";
import { Heading, Plus } from "~/shared/ui";
import type { Faq } from "../data";

function FaqItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: Faq;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const buttonId = `faq-question-${index}`;
  const panelId = `faq-answer-${index}`;

  return (
    <div>
      <Heading variant="none">
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="group flex w-full items-center justify-between gap-4 py-5 text-left font-display text-[17px] font-semibold leading-snug text-ink transition-colors hover:text-brand"
        >
          <span>{faq.question}</span>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-mint text-brand transition-colors group-hover:bg-brand group-hover:text-white">
            <Plus
              className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </span>
        </button>
      </Heading>
      {/* Closed answers are inert: hidden from screen readers and keyboard, still animatable. */}
      <div
        id={panelId}
        inert={!isOpen}
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-prose pb-6 pr-12 leading-relaxed text-ink-soft">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

// Questions that open one at a time (any number open). All closed in the server HTML. Each
// question is a heading at the level where the list stands (wrap it in Nest under a title).
export function FaqAccordion({ items, className = "" }: { items: Faq[]; className?: string }) {
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set());

  const toggle = (index: number) => {
    setOpenItems((previous) => {
      const next = new Set(previous);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className={className}>
      {items.map((faq, index) => (
        <FaqItem
          key={faq.question}
          faq={faq}
          index={index}
          isOpen={openItems.has(index)}
          onToggle={() => toggle(index)}
        />
      ))}
    </div>
  );
}
