import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "../content/faqs";
import { siteConfig } from "../content/config";

function FAQItem({ faq, index, isOpen, onToggle }) {
  const buttonId = `faq-question-${index}`;
  const panelId = `faq-answer-${index}`;

  return (
    <div>
      <h3>
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
      </h3>
      {/* Closed answers are inert: hidden from screen readers and keyboard, still animatable. */}
      <div
        id={panelId}
        inert={!isOpen}
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-prose pb-6 pr-12 leading-relaxed text-ink-soft">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState(() => new Set());
  const { phone } = siteConfig;

  const toggle = (index) => {
    setOpenItems((previous) => {
      const next = new Set(previous);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="section border-y border-line bg-white"
    >
      <div className="container-page grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <h2 id="faq-title" className="h2">
            FAQ
          </h2>
          <p className="lead mt-4">
            Another question? Call or text{" "}
            <a href={phone.tel} className="text-link whitespace-nowrap">
              {phone.display}
            </a>
            .
          </p>
        </div>

        <div className="divide-y divide-line rounded-3xl border border-line bg-paper px-5 sm:px-8 lg:col-span-8">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              index={index}
              isOpen={openItems.has(index)}
              onToggle={() => toggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
