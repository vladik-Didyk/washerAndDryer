import { Droplets, MessageSquare, Phone, Wrench } from "lucide-react";
import { siteConfig } from "../content/config";
import PageIntro from "../components/PageIntro";
import RepairForm from "../components/RepairForm";

const HELPFUL = [
  "What the machine does, or doesn't do",
  "Any error code on the display",
  "When it started",
  "A photo or a short video, sent by text",
];

// /repair/: repair request for customers renting from us. Repairs are included while they rent.
export default function RepairPage() {
  const { phone, hours } = siteConfig;

  return (
    <>
      <PageIntro icon={Wrench} eyebrow="For customers renting from us" title="Request a repair">
        <p className="lead mt-5">
          Is a machine you rent from us not working right? Repairs are included while
          you rent: we repair it or replace it at no charge.
        </p>
      </PageIntro>

      <section aria-label="Repair request" className="pb-16 sm:pb-20 lg:pb-24">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-3xl border border-brand-mint-strong bg-brand-mint p-6">
              <p className="font-display font-semibold text-ink">Fastest: call or text</p>
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
            </div>

            <div className="flex gap-3 rounded-3xl border border-line bg-white p-6">
              <Droplets className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <p className="text-ink-soft">
                <span className="font-semibold text-ink">Water leaking?</span> Turn off the
                water taps behind the washer if you can reach them safely, then call us.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink">What helps us</h2>
              <ul className="mt-4 space-y-3">
                {HELPFUL.map((item) => (
                  <li key={item} className="flex gap-3 text-ink-soft">
                    <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-ink-muted">
                Repairs from normal use are included. Damage beyond normal wear is the
                renter's responsibility.
              </p>
            </div>
          </div>

          <div id="repair-request" className="lg:col-span-7">
            <RepairForm />
          </div>
        </div>
      </section>
    </>
  );
}
