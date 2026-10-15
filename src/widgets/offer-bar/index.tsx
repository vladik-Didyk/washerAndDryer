import { firstWeekFreeOffer, referralOffer } from "~/entities/offer";
import { useSite } from "~/shared/lib";
import { Gift, UserPlus, type LucideIcon } from "~/shared/ui";

// Slim bar above the header on every page. Not dismissible.
// Whether the first-week offer still runs is decided on the server for each request (the
// root loader), so the HTML and the hydrated page always match and the offer disappears on
// its own after November 30, 2026 (Toronto time). With nothing left to show, there is no bar.
// Each offer links to its answer on /faq/, or to the rental terms once those are published.
export function OfferBar() {
  const site = useSite();
  const offerHref = (anchor: string) => `${site.isPublished("/terms/") ? "/terms/" : "/faq/"}#${anchor}`;

  const offers: Array<{ id: string; Icon: LucideIcon; text: string }> = [
    ...(site.offerActive ? [{ id: "first-week-free", Icon: Gift, text: firstWeekFreeOffer.short }] : []),
    { id: "referral", Icon: UserPlus, text: referralOffer.short },
  ];
  if (!offers.length) return null;

  return (
    <aside lang="en" aria-label="Current offers" className="on-dark bg-brand-dark text-white">
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
