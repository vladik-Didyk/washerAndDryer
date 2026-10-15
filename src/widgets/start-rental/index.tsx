import { siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { ArrowRight, LangLink, MessageSquare, Phone } from "~/shared/ui";

// The "Start your rental" band near the bottom of the main pages (id="request", where the old
// request form stood, so links to #request still land here). The request itself is the
// three-step form at /start/ (processes/rental-request).
export function StartRental() {
  const { phone } = siteConfig;
  const { d, number } = useI18n();
  const { startRental } = d.home;

  return (
    <section id="request" aria-labelledby="request-title" className="section bg-brand-mint">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 id="request-title" className="h2">
            {startRental.title}
          </h2>
          <p className="lead mt-4">{startRental.lead}</p>

          <div className="mt-8 rounded-3xl border border-brand-mint-strong bg-white p-6">
            <p className="font-display font-semibold text-ink">{d.common.preferCallOrText}</p>
            <p className="mt-1 font-display text-2xl font-bold text-brand">{phone.display}</p>
            <p className="mt-1 text-sm text-ink-muted">{d.common.hoursSentence}</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <a href={phone.tel} className="btn btn-primary">
                <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
                {d.common.call}
              </a>
              <a href={phone.sms} className="btn btn-secondary">
                <MessageSquare className="h-[18px] w-[18px]" aria-hidden="true" />
                {d.common.text}
              </a>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">{d.common.closetPhotoHelps}</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-line bg-white p-5 sm:p-8">
            <h3 className="font-display text-2xl font-bold text-ink">{startRental.stepsTitle}</h3>
            <ol className="mt-6 space-y-5">
              {startRental.steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold font-display text-lg font-extrabold text-ink"
                  >
                    {number(index + 1)}
                  </span>
                  <div className="pt-1">
                    <p className="font-display text-lg font-semibold text-ink">{step.title}</p>
                    <p className="mt-0.5 text-ink-soft">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <LangLink href="/start/" className="btn btn-primary mt-8 w-full">
              {d.common.startRental}
              <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
            </LangLink>
            <p className="mt-4 text-center text-sm text-ink-muted">{startRental.nothingToPay}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
