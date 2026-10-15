import { siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { MessageSquare, Phone } from "~/shared/ui";
import { useTypingInField, type MobileAction } from "./model";

// Phones only (from 768px the header has the phone and "Start your rental"): a bar fixed to
// the bottom with Call and one more action, set per page by the root ("Start rental" unless the
// page has its own, such as "Get a quote" for landlords). The footer keeps room for it at the
// end of every page, so it never covers content there. It steps aside while a form field has
// focus, so it can't sit over the field being typed in. Its words follow the page's language
// (the Spanish and Russian pages translate it).
export function MobileActionBar({ action, lang = "en" }: { action: MobileAction; lang?: string }) {
  const typing = useTypingInField();
  const { phone } = siteConfig;
  const { mobileBar } = useI18n().d.chrome;

  // The aside keeps the buttons inside a landmark; hiding the aside hides both.
  return (
    <aside
      lang={lang}
      aria-label={mobileBar.label}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-6px_20px_rgba(7,63,50,0.08)] backdrop-blur-md transition-[transform,visibility] duration-200 md:hidden ${
        typing ? "invisible translate-y-full" : "visible"
      }`}
    >
      <div className="mx-auto grid max-w-md grid-cols-[2fr_3fr] gap-3">
        <a href={phone.tel} aria-label={mobileBar.callAria} className="btn btn-primary px-4">
          <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
          {mobileBar.call}
        </a>
        <a href={action.href} className="btn btn-secondary whitespace-nowrap px-4">
          {action.icon === "sms" && <MessageSquare className="h-[18px] w-[18px]" aria-hidden="true" />}
          {action.label}
        </a>
      </div>
    </aside>
  );
}
