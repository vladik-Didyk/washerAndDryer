import { CreditCard, ExternalLink, MessageSquare, Receipt, Wallet } from "lucide-react";
import { siteConfig } from "../content/config";
import PageIntro from "../components/PageIntro";

// /account/: built only when siteConfig.stripePortalUrl is set (see src/content/routes.js).
// Paying, managing the card, and ending a rental (by text; there is no self-cancel).
export default function AccountPage() {
  const { phone, stripePortalUrl } = siteConfig;

  return (
    <>
      <PageIntro icon={Wallet} eyebrow="For customers renting from us" title="Pay or manage your rental">
        <p className="lead mt-5">
          Card payments go through Stripe. We never see your full card number.
        </p>
      </PageIntro>

      <section aria-label="Your rental" className="pb-16 sm:pb-20 lg:pb-24">
        <div className="container-page grid gap-5 md:grid-cols-3 md:gap-6">
          <article className="flex flex-col rounded-3xl border border-line bg-white p-6 sm:p-8">
            <CreditCard className="h-7 w-7 text-brand" aria-hidden="true" />
            <h2 className="mt-4 font-display text-xl font-bold text-ink">Pay by card</h2>
            <p className="mt-2 text-ink-soft">
              Use the Stripe payment link we sent with your quote. Can't find it? Text us.
            </p>
          </article>

          <article className="flex flex-col rounded-3xl border border-brand bg-white p-6 ring-2 ring-brand sm:p-8">
            <Receipt className="h-7 w-7 text-brand" aria-hidden="true" />
            <h2 className="mt-4 font-display text-xl font-bold text-ink">Your card and receipts</h2>
            <p className="mt-2 text-ink-soft">
              Change your card and see your receipts in the Stripe customer portal.
            </p>
            <a
              href={stripePortalUrl}
              rel="noopener"
              className="btn btn-primary mt-6 self-start"
            >
              Open the customer portal
              <ExternalLink className="h-[18px] w-[18px]" aria-hidden="true" />
            </a>
          </article>

          <article className="flex flex-col rounded-3xl border border-line bg-white p-6 sm:p-8">
            <MessageSquare className="h-7 w-7 text-brand" aria-hidden="true" />
            <h2 className="mt-4 font-display text-xl font-bold text-ink">End a rental</h2>
            <p className="mt-2 text-ink-soft">
              Text us at {phone.display}. After the 52-week minimum, either side can end
              the rental with 30 days' notice, and we pick the machine up.
            </p>
            <a href={phone.sms} className="btn btn-secondary mt-6 self-start">
              <MessageSquare className="h-[18px] w-[18px]" aria-hidden="true" />
              Text us
            </a>
          </article>
        </div>
      </section>
    </>
  );
}
