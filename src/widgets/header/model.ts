import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

// The mobile menu, a panel that slides in from the right: open/closed; closed again on Escape
// (focus back on the menu button), on a click outside it, on a new page and when the window
// grows to the desktop layout. While it is open the page behind it doesn't scroll, focus starts
// on its close button and Tab stays inside it.
export function useMobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { pathname, hash } = useLocation();

  const closeMenu = () => setMenuOpen(false);

  // A link in the menu (or the browser's back button) took us somewhere: close it.
  useEffect(() => setMenuOpen(false), [pathname, hash]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus(); // focus would otherwise be lost inside the closed menu
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const items = [...panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")];
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        last?.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === last) {
        first?.focus();
        event.preventDefault();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  return {
    menuOpen,
    menuButtonRef,
    panelRef,
    toggleMenu: () => setMenuOpen((open) => !open),
    closeMenu,
  };
}

// Has the page scrolled past the top? The header then gets lower and casts a shadow.
export function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

// A main-nav link is "current" on its own page and on the pages under it.
export function isCurrent(href: string, currentPath: string): "page" | "true" | undefined {
  if (href === currentPath) return "page";
  if (!href.includes("#") && href !== "/" && currentPath.startsWith(href)) return "true";
  return undefined;
}
