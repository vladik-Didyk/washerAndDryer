import { useEffect, useState } from "react";
import { Gift, UserPlus } from "lucide-react";
import {
  firstWeekFreeActive,
  firstWeekFreeOffer,
  isFirstWeekFreeOver,
  referralOffer,
} from "../content/offers";
import { isPublished } from "../content/routes";

// Each offer links to its answer on /faq/, or to the rental terms once those are published.
const offerHref = (anchor) => `${isPublished("/terms/") ? "/terms/" : "/faq/"}#${anchor}`;

// Slim bar above the header on every page. Not dismissible.
// The first-week offer is decided by the build date first, so the prerendered HTML and the
// hydrated page match; after hydration the browser's clock hides it once the offer is over,
// in case the site isn't rebuilt in time. With nothing left to show, there is no bar.
export default function OfferBar() {
  const [showFirstWeek, setShowFirstWeek] = useState(firstWeekFreeActive);

  useEffect(() => {
    if (isFirstWeekFreeOver(Date.now())) setShowFirstWeek(false);
  }, []);

  const offers = [
    showFirstWeek && { id: "first-week-free", Icon: Gift, text: firstWeekFreeOffer.short },
    { id: "referral", Icon: UserPlus, text: referralOffer.short },
  ].filter(Boolean);
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
