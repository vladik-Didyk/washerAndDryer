import { siteConfig } from "~/shared/config";
import { ArrowRight, MessageSquare, Phone } from "~/shared/ui";

const STEPS = [
  { title: "Machine type", text: "Which type you'd like, or \"not sure\"." },
  { title: "Your space", text: "Postal code, closet width, dryer outlet and the way in." },
  { title: "How to reach you", text: "Name, phone and a preferred day." },
];

// The "Start your rental" band near the bottom of the main pages (id="request", where the old
// request form stood, so links to #request still land here). The request itself is the
// three-step form at /start/ (processes/rental-request).
export function StartRental() {
  const { phone, hours } = siteConfig;

  return (
    <section id="request" aria-labelledby="request-title" className="section bg-brand-mint">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 id="request-title" className="h2">
            Start your rental
          </h2>
          <p className="lead mt-4">
            Tell us what you need. We reply with the machine, the total and the start date.
          </p>

          <div className="mt-8 rounded-3xl border border-brand-mint-strong bg-white p-6">
            <p className="font-display font-semibold text-ink">Prefer to call or text?</p>
            <p className="mt-1 font-display text-2xl font-bold text-brand">{phone.display}</p>
            <p className="mt-1 text-sm text-ink-muted">
              {hours.map((entry) => `${entry.days} ${entry.time.toLowerCase()}`).join(". ")}.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <a href={phone.tel} className="btn btn-primary">
                <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
                Call
              </a>
              <a href={phone.sms} className="btn btn-secondary">
                <MessageSquare className="h-[18px] w-[18px]" aria-hidden="true" />
                Text
              </a>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              A photo of the closet helps. You can text it to us.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-line bg-white p-5 sm:p-8">
            <h3 className="font-display text-2xl font-bold text-ink">Three short steps</h3>
            <ol className="mt-6 space-y-5">
              {STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold font-display text-lg font-extrabold text-ink"
                  >
                    {index + 1}
                  </span>
                  <div className="pt-1">
                    <p className="font-display text-lg font-semibold text-ink">{step.title}</p>
                    <p className="mt-0.5 text-ink-soft">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <a href="/start/" className="btn btn-primary mt-8 w-full">
              Start your rental
              <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
            </a>
            <p className="mt-4 text-center text-sm text-ink-muted">
              Nothing to pay now. We confirm the machine, the total and the start date first.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
