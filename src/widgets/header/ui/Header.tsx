import { pagePaths, siteConfig } from "~/shared/config";
import { LANGUAGES, pathInLanguage, useI18n, type Dictionary } from "~/shared/i18n";
import { useSite, type Site } from "~/shared/lib";
import {
  BookOpen,
  Building2,
  Button,
  ChevronRight,
  CircleHelp,
  Clock,
  Container,
  CreditCard,
  LangLink,
  Logo,
  MapPin,
  Menu,
  Phone,
  PhoneButton,
  Wallet,
  WashingMachine,
  Wrench,
  X,
  type LucideIcon,
} from "~/shared/ui";
import { isCurrent, useMobileMenu, useScrolled } from "../model";

// The main links' icons in the phone menu.
const NAV_ICONS: Record<(typeof siteConfig.navigation)[number]["key"], LucideIcon> = {
  machines: WashingMachine,
  prices: Wallet,
  areas: MapPin,
  landlords: Building2,
  faq: CircleHelp,
};

// Secondary links: in a thin row above the header on wide screens (with the language
// switcher), and in the mobile menu. Guides and Pay / manage appear only when their pages
// exist in this deployment. The main row keeps to the menu, the phone and "Start your rental".
function utilityLinks(site: Site, nav: Dictionary["nav"]) {
  const links: Array<{ label: string; href: string; Icon: LucideIcon }> = [
    { label: nav.repair, href: "/repair/", Icon: Wrench },
  ];
  if (site.has("/guides/")) links.push({ label: nav.guides, href: "/guides/", Icon: BookOpen });
  if (site.has("/account/")) links.push({ label: nav.account, href: "/account/", Icon: CreditCard });
  return links;
}

// EN · ES · RU: the same page in each language (shared/i18n pathInLanguage), the current one
// marked. Plain links: the new language loads with the page.
function LanguageSwitch({
  currentPath,
  className,
  linkClassName,
  onNavigate,
}: {
  currentPath: string;
  className: string;
  linkClassName: string;
  onNavigate?: () => void;
}) {
  const { lang, d } = useI18n();
  return (
    <ul aria-label={d.header.language} className={className}>
      {LANGUAGES.map((language, index) => (
        <li key={language.code} className="flex items-center gap-2">
          {index > 0 && <span aria-hidden="true">·</span>}
          <a
            href={pathInLanguage(currentPath, language.code)}
            lang={language.code}
            hrefLang={language.code}
            aria-current={language.code === lang ? "page" : undefined}
            onClick={onNavigate}
            className={linkClassName}
          >
            <span aria-hidden="true">{language.code.toUpperCase()}</span>
            <span className="sr-only">{language.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

// `requestHref` is where "Start your rental" goes: the rental request (/start/).
export function Header({ currentPath = "/", requestHref = pagePaths.start }: { currentPath?: string; requestHref?: string }) {
  const { menuOpen, menuButtonRef, panelRef, toggleMenu, closeMenu } = useMobileMenu();
  // Once the page scrolls, the header gets lower and casts a shadow.
  const scrolled = useScrolled();
  const { phone, navigation } = siteConfig;
  const { d, format, href: localize } = useI18n();
  // Is this link the page being shown? (currentPath carries the language prefix.)
  const here = (href: string) => (localize(href) === currentPath ? "page" : undefined);
  const utility = utilityLinks(useSite(), d.nav);

  return (
    <>
      {/* Utility row: scrolls away; only the main header below it stays on screen. */}
      <div className="hidden border-b border-line bg-white lg:block">
        <Container className="flex h-9 items-center justify-between gap-6 text-[13px] text-ink-muted">
          <p className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {format(d.header.utilityLine, { languages: d.common.languages })}
          </p>
          <nav aria-label={d.nav.more}>
            <ul className="flex items-center gap-5">
              {utility.map(({ label, href, Icon }) => (
                <li key={href}>
                  <LangLink
                    href={href}
                    aria-current={here(href)}
                    className="inline-flex items-center gap-1.5 font-medium text-ink-soft transition-colors hover:text-brand aria-[current=page]:text-brand-dark"
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {label}
                  </LangLink>
                </li>
              ))}
              <li>
                <LanguageSwitch
                  currentPath={currentPath}
                  className="flex items-center gap-2"
                  linkClassName="font-medium text-ink-soft transition-colors hover:text-brand aria-[current=page]:font-semibold aria-[current=page]:text-brand-dark"
                />
              </li>
            </ul>
          </nav>
        </Container>
      </div>

      <header
        className={`sticky top-0 z-40 border-b bg-paper/95 backdrop-blur-md transition-shadow duration-200 ${
          scrolled ? "border-transparent shadow-[0_6px_20px_-12px_rgb(16_42_110/0.30)]" : "border-line"
        }`}
      >
        <Container
          className={`flex items-center justify-between gap-4 transition-[height] duration-200 motion-reduce:transition-none ${
            scrolled ? "h-16" : "h-[4.5rem]"
          }`}
        >
          <LangLink
            href={pagePaths.home}
            onClick={closeMenu}
            className="flex min-w-0 items-center gap-3 rounded-xl"
          >
            <Logo className={`transition-[width,height] duration-200 motion-reduce:transition-none ${scrolled ? "h-9 w-9" : "h-11 w-11"}`} />
            {/* The logo's alt text already names the business for screen readers. */}
            {/* Hidden from 1024 to 1279px, where the menu and both buttons need the room. */}
            <span
              aria-hidden="true"
              className="font-display text-[15px] font-bold leading-tight tracking-tight text-ink sm:text-[1.0625rem] lg:hidden xl:block"
            >
              {siteConfig.companyName}
            </span>
          </LangLink>

          <nav aria-label={d.nav.main} className="hidden lg:block">
            <ul className="flex items-center gap-0.5 xl:gap-1">
              {navigation.map((link) => {
                const current = isCurrent(localize(link.href), currentPath);
                return (
                  <li key={link.href}>
                    <LangLink
                      href={link.href}
                      aria-current={current}
                      className={`whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-medium transition-colors hover:bg-brand-mint hover:text-brand-dark ${
                        current ? "bg-brand-mint text-brand-dark" : "text-ink-soft"
                      }`}
                    >
                      {d.nav[link.key]}
                    </LangLink>
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
            <Button href={requestHref} className="hidden whitespace-nowrap px-5 md:inline-flex">
              {d.common.startRental}
            </Button>
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
        </Container>

      </header>

      {/* The phone menu: a panel from the right over a dimmed page. It sits outside the header,
          whose backdrop blur would otherwise trap a fixed element inside it. */}
      <div
        className={`fixed inset-0 z-50 transition-[visibility] duration-300 lg:hidden ${menuOpen ? "visible" : "pointer-events-none invisible"}`}
        inert={!menuOpen}
      >
        <div
          aria-hidden="true"
          onClick={closeMenu}
          className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
        />
        <div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={d.nav.main}
          className={`absolute inset-y-0 right-0 flex w-[min(23rem,90vw)] flex-col bg-paper shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
            <Logo className="h-9 w-9" />
            <button
              type="button"
              data-autofocus
              onClick={() => {
                closeMenu();
                menuButtonRef.current?.focus();
              }}
              aria-label={d.header.closeMenu}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:bg-brand-mint active:scale-95"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label={d.nav.main} className="flex-1 overflow-y-auto overscroll-contain px-3 py-3">
            <ul className="space-y-1">
              {navigation.map((link) => {
                const Icon = NAV_ICONS[link.key];
                const current = isCurrent(localize(link.href), currentPath);
                return (
                  <li key={link.href}>
                    <LangLink
                      href={link.href}
                      onClick={closeMenu}
                      aria-current={current}
                      className={`flex items-center gap-3.5 rounded-2xl px-3 py-3 font-display text-lg font-semibold transition-colors active:bg-brand-mint ${
                        current ? "bg-brand-mint text-brand-dark" : "text-ink hover:bg-white"
                      }`}
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand ring-1 ring-line">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="flex-1">{d.nav[link.key]}</span>
                      <ChevronRight className="h-5 w-5 text-ink-muted" aria-hidden="true" />
                    </LangLink>
                  </li>
                );
              })}
            </ul>
            <ul className="mt-3 border-t border-line px-3 pt-3">
              {utility.map(({ label, href, Icon }) => (
                <li key={href}>
                  <LangLink
                    href={href}
                    onClick={closeMenu}
                    aria-current={here(href)}
                    className="flex items-center gap-2.5 py-2.5 font-medium text-ink-soft transition-colors hover:text-brand aria-[current=page]:text-brand-dark"
                  >
                    <Icon className="h-[18px] w-[18px] text-brand" aria-hidden="true" />
                    {label}
                  </LangLink>
                </li>
              ))}
            </ul>
            <LanguageSwitch
              currentPath={currentPath}
              onNavigate={closeMenu}
              className="mx-3 mt-2 flex gap-2 border-t border-line py-3.5 font-display text-lg"
              linkClassName="px-1 font-semibold text-ink transition-colors hover:text-brand aria-[current=page]:text-brand aria-[current=page]:underline aria-[current=page]:underline-offset-4"
            />
          </nav>

          <div className="shrink-0 border-t border-line bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
            <div className="grid grid-cols-2 gap-3">
              <Button href={requestHref} onClick={closeMenu} className="col-span-2">
                {d.common.startRental}
              </Button>
              <PhoneButton kind="call" variant="secondary" />
              <PhoneButton kind="text" />
            </div>
            <p className="pt-3 text-center text-sm text-ink-muted">{d.header.menuContact}</p>
          </div>
        </div>
      </div>
    </>
  );
}
