import { ArrowRight, CircleHelp, MessageSquare, Phone } from "lucide-react";
import { siteConfig } from "../content/config";
import { faqGroups } from "../content/faqs";
import { hasRoute, requestFormHref } from "../content/routes";

// A link under an answer, only when its page is part of this build (drafts may be missing).
function AnswerLink({ link }) {
  if (!link || !hasRoute(link.href.split("#")[0])) return null;
  return (
    <a href={link.href} className="text-link mt-3 inline-flex items-center gap-1.5">
      {link.label}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

// /faq/: every question, grouped, all answers open. Each question has an id for direct links.
// The FAQPage JSON-LD for this page comes from the same list (src/seo/head.js).
export default function FaqPage() {
  const { phone } = siteConfig;

  return (
    <>
      <section id="top" aria-labelledby="hero-title" className="pb-10 pt-8 sm:pt-10 lg:pb-12">
        <div className="container-page">
          <p className="inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-brand">
            <CircleHelp className="h-4 w-4" aria-hidden="true" />
            FAQ
          </p>
          <h1
            id="hero-title"
            className="mt-3 font-display text-[2.25rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[2.75rem] lg:text-[3rem]"
          >
            Questions and answers
          </h1>
          <p className="lead mt-5 max-w-2xl">
            Renting, prices, delivery, repairs and landlords. Another question? Call
            or text{" "}
            <a href={phone.tel} className="text-link whitespace-nowrap">
              {phone.display}
            </a>
            .
          </p>
          <nav aria-label="Topics" className="mt-8">
            <ul className="flex flex-wrap gap-2.5">
              {faqGroups.map((group) => (
                <li key={group.id}>
                  <a
                    href={`#${group.id}`}
                    className="inline-flex min-h-[2.75rem] items-center rounded-full border border-line bg-white px-4 py-2 font-medium text-ink transition-colors hover:border-brand hover:bg-brand-mint hover:text-brand-dark"
                  >
                    {group.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <div className="border-y border-line bg-white">
        <div className="container-page py-14 sm:py-16 lg:py-20">
          <div className="max-w-4xl space-y-14">
            {faqGroups.map((group) => (
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
        </div>
      </div>

      <section aria-labelledby="faq-cta-title" className="section">
        <div className="container-page">
          <div className="grid gap-6 rounded-3xl bg-brand-mint px-5 py-8 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-7">
              <h2 id="faq-cta-title" className="h2">
                Ready to rent?
              </h2>
              <p className="lead mt-3">
                Tell us your area and your laundry space. We reply with the machine,
                the total and the start date.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-5 lg:justify-end">
              <a href={requestFormHref} className="btn btn-primary">
                Check availability
              </a>
              <a href={phone.tel} className="btn btn-secondary">
                <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
                Call
              </a>
              <a href={phone.sms} className="btn btn-secondary">
                <MessageSquare className="h-[18px] w-[18px]" aria-hidden="true" />
                Text
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
