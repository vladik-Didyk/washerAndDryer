import { useLoaderData } from "react-router";
import { siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { CreditCard, ExternalLink, MessageSquare, Receipt, Wallet } from "~/shared/ui";
import { PageIntro } from "~/widgets/page-intro";
import type { loader } from "../loader";

// /account/: exists only when the STRIPE_PORTAL_URL variable is set (../loader.ts).
// Paying, managing the card, and ending a rental (by text; there is no self-cancel).
export default function AccountPage() {
  const { stripePortalUrl } = useLoaderData<typeof loader>();
  const { phone } = siteConfig;
  const text = useI18n().d.account;

  return (
    <>
      <PageIntro icon={Wallet} eyebrow={text.eyebrow} title={text.title}>
        <p className="lead mt-5">{text.lead}</p>
      </PageIntro>

      <section aria-label={text.sectionLabel} className="pb-16 sm:pb-20 lg:pb-24">
        <div className="container-page grid gap-5 md:grid-cols-3 md:gap-6">
          <article className="flex flex-col rounded-3xl border border-line bg-white p-6 sm:p-8">
            <CreditCard className="h-7 w-7 text-brand" aria-hidden="true" />
            <h2 className="mt-4 font-display text-xl font-bold text-ink">{text.payTitle}</h2>
            <p className="mt-2 text-ink-soft">{text.payText}</p>
          </article>

          <article className="flex flex-col rounded-3xl border border-brand bg-white p-6 ring-2 ring-brand sm:p-8">
            <Receipt className="h-7 w-7 text-brand" aria-hidden="true" />
            <h2 className="mt-4 font-display text-xl font-bold text-ink">{text.portalTitle}</h2>
            <p className="mt-2 text-ink-soft">{text.portalText}</p>
            <a href={stripePortalUrl} rel="noopener" className="btn btn-primary mt-6 self-start">
              {text.portalButton}
              <ExternalLink className="h-[18px] w-[18px]" aria-hidden="true" />
            </a>
          </article>

          <article className="flex flex-col rounded-3xl border border-line bg-white p-6 sm:p-8">
            <MessageSquare className="h-7 w-7 text-brand" aria-hidden="true" />
            <h2 className="mt-4 font-display text-xl font-bold text-ink">{text.endTitle}</h2>
            <p className="mt-2 text-ink-soft">{text.endText}</p>
            <a href={phone.sms} className="btn btn-secondary mt-6 self-start">
              <MessageSquare className="h-[18px] w-[18px]" aria-hidden="true" />
              {text.textUs}
            </a>
          </article>
        </div>
      </section>
    </>
  );
}
