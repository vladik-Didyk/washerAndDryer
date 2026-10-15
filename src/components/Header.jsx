import { useEffect, useRef, useState } from "react";
import { Menu, MessageSquare, Phone, X } from "lucide-react";
import { siteConfig } from "../content/config";
import Logo from "./Logo";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const { phone, navigation, languageLinks } = siteConfig;

  // Close the mobile menu on Escape, and when the window grows to the desktop layout.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus(); // focus would otherwise be lost inside the hidden menu
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
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
          <span
            aria-hidden="true"
            className="hidden font-display text-[1.0625rem] font-bold leading-tight tracking-tight text-ink sm:block"
          >
            GTA Washer &amp; Dryer Rentals
          </span>
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {navigation.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-medium text-ink-soft transition-colors hover:bg-brand-mint hover:text-brand-dark xl:px-4"
                >
                  {link.label}
                </a>
              </li>
            ))}
            {languageLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  lang={link.lang}
                  hrefLang={link.lang}
                  aria-label={link.label}
                  className="rounded-full px-2.5 py-2 text-[15px] font-semibold text-ink-soft transition-colors hover:bg-brand-mint hover:text-brand-dark"
                >
                  {link.short}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a href={phone.tel} className="btn btn-primary hidden md:inline-flex">
            <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
            Call {phone.display}
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
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
        className="border-t border-line bg-paper lg:hidden"
      >
        <nav aria-label="Main" className="container-page py-3">
          <ul>
            {navigation.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block border-b border-line py-3.5 font-display text-lg font-semibold text-ink transition-colors hover:text-brand"
                >
                  {link.label}
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
            <a href={phone.tel} className="btn btn-primary">
              <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
              Call
            </a>
            <a href={phone.sms} className="btn btn-secondary">
              <MessageSquare className="h-[18px] w-[18px]" aria-hidden="true" />
              Text
            </a>
          </div>
          <p className="pb-2 text-center text-sm text-ink-muted">
            {phone.display}, Mon–Sat 9 am – 7 pm
          </p>
        </nav>
      </div>
    </header>
  );
}
