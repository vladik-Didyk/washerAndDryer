import { siteConfig } from "~/shared/config";
import { LANGUAGES, useI18n, type Dictionary } from "~/shared/i18n";
import { useSite, type Site } from "~/shared/lib";
import {
  BookOpen,
  Clock,
  CreditCard,
  Logo,
  Menu,
  MessageSquare,
  Phone,
  Wrench,
  X,
  type LucideIcon,
} from "~/shared/ui";
import { isCurrent, useMobileMenu } from "../model";

// Secondary links: in a thin row above the header on wide screens (with the Spanish and
// Russian pages), and in the mobile menu. Guides and Pay / manage appear only when their pages
// exist in this deployment. The main row keeps to the menu, the phone and "Start your rental".
function utilityLinks(site: Site, nav: Dictionary["nav"]) {
  const links: Array<{ label: string; href: string; Icon: LucideIcon }> = [
    { label: nav.repair, href: "/repair/", Icon: Wrench },
  ];
  if (site.has("/guides/")) links.push({ label: nav.guides, href: "/guides/", Icon: BookOpen });
  if (site.has("/account/")) links.push({ label: nav.account, href: "/account/", Icon: CreditCard });
  return links;
}

// The other languages' pages (shared/i18n LANGUAGES).
const languageLinks = LANGUAGES.filter((language) => language.code !== "en").map((language) => ({
  label: language.name,
  lang: language.code,
  href: language.path,
}));

// `requestHref` is where "Start your rental" goes: the rental request (/start/).
export function Header({ currentPath = "/", requestHref = "/start/" }: { currentPath?: string; requestHref?: string }) {
  const { menuOpen, menuButtonRef, toggleMenu, closeMenu } = useMobileMenu();
  const { phone, navigation } = siteConfig;
  const { d, format } = useI18n();
  const utility = utilityLinks(useSite(), d.nav);

  return (
    <>
      {/* Utility row: scrolls away; only the main header below it stays on screen. */}
      <div lang="en" className="hidden border-b border-line bg-white lg:block">
        <div className="container-page flex h-9 items-center justify-between gap-6 text-[13px] text-ink-muted">
          <p className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {format(d.header.utilityLine, { languages: d.common.languages })}
          </p>
          <nav aria-label={d.nav.more}>
            <ul className="flex items-center gap-5">
              {utility.map(({ label, href, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    aria-current={href === currentPath ? "page" : undefined}
                    className="inline-flex items-center gap-1.5 font-medium text-ink-soft transition-colors hover:text-brand aria-[current=page]:text-brand-dark"
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
              {languageLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    lang={link.lang}
                    hrefLang={link.lang}
                    className="font-medium text-ink-soft transition-colors hover:text-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <header
        lang="en"
        className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-md"
      >
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
          <a
            href="/"
            onClick={closeMenu}
            className="flex min-w-0 items-center gap-3 rounded-xl"
          >
            <Logo className="h-11 w-11" />
            {/* The logo's alt text already names the business for screen readers. */}
            {/* Hidden from 1024 to 1279px, where the menu and both buttons need the room. */}
            <span
              aria-hidden="true"
              className="hidden font-display text-[1.0625rem] font-bold leading-tight tracking-tight text-ink sm:block lg:hidden xl:block"
            >
              {siteConfig.companyName}
            </span>
          </a>

          <nav aria-label={d.nav.main} className="hidden lg:block">
            <ul className="flex items-center gap-0.5 xl:gap-1">
              {navigation.map((link) => {
                const current = isCurrent(link.href, currentPath);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={current}
                      className={`whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-medium transition-colors hover:bg-brand-mint hover:text-brand-dark ${
                        current ? "bg-brand-mint text-brand-dark" : "text-ink-soft"
                      }`}
                    >
                      {d.nav[link.key]}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Phones have the call bar at the bottom instead (widgets/mobile-action-bar). From 768px:
              the phone (an icon, then the number from 1024px) and the main call to action. */}
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={phone.tel}
              aria-label={d.header.callAria}
              className="hidden h-11 min-w-[2.75rem] items-center justify-center gap-2 rounded-full border border-line bg-white px-3 font-display text-[15px] font-semibold text-brand transition-colors hover:bg-brand-mint md:inline-flex lg:border-transparent lg:bg-transparent"
            >
              <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
              <span className="hidden whitespace-nowrap lg:inline">{phone.display}</span>
            </a>
            <a href={requestHref} className="btn btn-primary hidden whitespace-nowrap px-5 md:inline-flex">
              {d.common.startRental}
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? d.header.closeMenu : d.header.openMenu}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:bg-brand-mint lg:hidden"
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          hidden={!menuOpen}
          className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-paper lg:hidden"
        >
          {/* Bottom padding on phones keeps the last items clear of the fixed Call bar. */}
          <nav aria-label={d.nav.main} className="container-page pb-24 pt-3 md:pb-3">
            <ul>
              {navigation.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={link.href === currentPath ? "page" : undefined}
                    className="block border-b border-line py-3.5 font-display text-lg font-semibold text-ink transition-colors hover:text-brand"
                  >
                    {d.nav[link.key]}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="border-b border-line py-2">
              {utility.map(({ label, href, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={closeMenu}
                    className="flex items-center gap-2.5 py-2.5 font-medium text-ink-soft transition-colors hover:text-brand"
                  >
                    <Icon className="h-[18px] w-[18px] text-brand" aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="flex gap-6 border-b border-line py-3.5">
              {languageLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    lang={link.lang}
                    hrefLang={link.lang}
                    onClick={closeMenu}
                    className="font-display text-lg font-semibold text-ink transition-colors hover:text-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-3 pb-3 pt-5">
              <a href={requestHref} onClick={closeMenu} className="btn btn-primary col-span-2">
                {d.common.startRental}
              </a>
              <a href={phone.tel} className="btn btn-secondary">
                <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
                {d.common.call}
              </a>
              <a href={phone.sms} className="btn btn-secondary">
                <MessageSquare className="h-[18px] w-[18px]" aria-hidden="true" />
                {d.common.text}
              </a>
            </div>
            <p className="pb-2 text-center text-sm text-ink-muted">
              {d.header.menuContact}
            </p>
          </nav>
        </div>
      </header>
    </>
  );
}
