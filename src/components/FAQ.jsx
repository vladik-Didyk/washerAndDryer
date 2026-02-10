import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqs } from "../content/faqs";

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-100 last:border-0 dark:border-gray-700">
      <button
        onClick={onToggle}
        className="flex w-full items-start gap-4 py-5 text-left transition-colors hover:text-primary-400"
        aria-expanded={isOpen}
      >
        <ChevronDown
          className={`mt-0.5 h-5 w-5 shrink-0 text-primary-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
        <span className="font-medium text-gray-900 dark:text-white">
          {faq.question}
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pl-9 text-gray-600 dark:text-gray-400">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="section-padding bg-surface dark:bg-gray-800/50">
      <div className="container-main">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-400/10 px-4 py-2 text-sm font-medium text-primary-500 dark:bg-primary-400/20 dark:text-primary-300">
            <HelpCircle className="h-4 w-4" />
            Got Questions?
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
            Everything you need to know about our washer & dryer installation
            service.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="card">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
