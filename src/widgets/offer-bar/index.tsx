import { promotionText, useActivePromotions } from "~/entities/offer";
import { useI18n } from "~/shared/i18n";
import { useSite } from "~/shared/lib";
import { Gift, UserPlus, type LucideIcon } from "~/shared/ui";

// Slim bar above the header on every page. Not dismissible.
// Which promotions run is decided on the server for each request (the root loader's time,
// entities/offer), so the HTML and the hydrated page always match and an offer disappears on
// its own when it ends. The referral offer always shows.
// Each offer links to its answer on /faq/, or to the rental terms once those are published.
export function OfferBar() {
  const site = useSite();
  const i18n = useI18n();
  const { d } = i18n;
  const promotions = useActivePromotions();
  const offerHref = (anchor: string) => `${site.isPublished("/terms/") ? "/terms/" : "/faq/"}#${anchor}`;

  const offers: Array<{ id: string; Icon: LucideIcon; text: string }> = [
    ...promotions.map((promotion) => ({ id: promotion.id, Icon: Gift, text: promotionText(promotion, i18n).short })),
    { id: "referral", Icon: UserPlus, text: d.offers.referral.short },
  ];
  if (!offers.length) return null;

  return (
    <aside lang="en" aria-label={d.chrome.offerBar.label} className="on-dark bg-brand-dark text-white">
      <ul className="container-page flex flex-wrap items-center justify-center gap-x-6 gap-y-1 py-2 text-[13px] sm:text-sm">
        {offers.map(({ id, Icon, text }) => (
          <li key={id} className="flex items-center gap-1.5">
            <Icon className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            <a
              href={offerHref(id)}
              className="font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
