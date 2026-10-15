import { useActionData } from "react-router";
import { RepairForm } from "~/features/repair-form";
import { siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { Droplets, MessageSquare, Phone, Wrench } from "~/shared/ui";
import { PageIntro } from "~/widgets/page-intro";
import type { action } from "../action";

// /repair/: repair request for customers renting from us. Repairs are included while they rent.
export default function RepairPage() {
  const result = useActionData<typeof action>();
  const { phone } = siteConfig;
  const { d } = useI18n();
  const text = d.repair;

  return (
    <>
      <PageIntro icon={Wrench} eyebrow={text.eyebrow} title={text.title}>
        <p className="lead mt-5">{text.lead}</p>
      </PageIntro>

      <section aria-label={text.sectionLabel} className="pb-16 sm:pb-20 lg:pb-24">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-3xl border border-brand-mint-strong bg-brand-mint p-6">
              <p className="font-display font-semibold text-ink">{text.fastest}</p>
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
            </div>

            <div className="flex gap-3 rounded-3xl border border-line bg-white p-6">
              <Droplets className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <p className="text-ink-soft">
                <span className="font-semibold text-ink">{text.leakTitle}</span> {text.leakText}
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink">{text.helpsTitle}</h2>
              <ul className="mt-4 space-y-3">
                {text.helps.map((item) => (
                  <li key={item} className="flex gap-3 text-ink-soft">
                    <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-ink-muted">{text.damageNote}</p>
            </div>
          </div>

          <div id="repair-request" className="lg:col-span-7">
            <RepairForm result={result} />
          </div>
        </div>
      </section>
    </>
  );
}
