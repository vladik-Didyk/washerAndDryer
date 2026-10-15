import { useEffect, useRef, useState } from "react";

// The mobile menu: open/closed, closed again on Escape (focus back on the menu button) and
// when the window grows to the desktop layout.
export function useMobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event: KeyboardEvent) => {
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

  return {
    menuOpen,
    menuButtonRef,
    toggleMenu: () => setMenuOpen((open) => !open),
    closeMenu: () => setMenuOpen(false),
  };
}

// A main-nav link is "current" on its own page and on the pages under it.
export function isCurrent(href: string, currentPath: string): "page" | "true" | undefined {
  if (href === currentPath) return "page";
  if (!href.includes("#") && href !== "/" && currentPath.startsWith(href)) return "true";
  return undefined;
}
