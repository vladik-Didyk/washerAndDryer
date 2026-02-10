import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, WashingMachine } from "lucide-react";
import { siteConfig } from "../content/config";

export default function Header({ darkMode, toggleDarkMode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = () => setMobileOpen(false);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-neu-bg/80 shadow-neu-subtle backdrop-blur-xl dark:bg-dark-bg/80 dark:shadow-neu-dark-subtle"
          : "bg-transparent"
      }`}
    >
      <nav className="container-main flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2.5"
          aria-label={`${siteConfig.companyName} - Home`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-400 shadow-neu-subtle dark:shadow-neu-dark-subtle">
            <WashingMachine className="h-5 w-5 text-white" />
          </div>
          <span className="hidden font-display text-sm font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-200 sm:inline">
            {siteConfig.companyName}
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {siteConfig.navigation.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-xl px-4 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-neu-dark/30 hover:text-sage-600 dark:text-gray-400 dark:hover:bg-dark-elevated dark:hover:text-sage-300"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={toggleDarkMode}
            className="ml-2 rounded-xl p-2.5 text-gray-500 shadow-neu-subtle transition-all hover:shadow-neu-pressed dark:text-gray-400 dark:shadow-neu-dark-subtle dark:hover:shadow-neu-dark-pressed"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleDarkMode}
            className="rounded-xl p-2.5 text-gray-500 shadow-neu-subtle dark:text-gray-400 dark:shadow-neu-dark-subtle"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-xl p-2.5 text-gray-500 shadow-neu-subtle dark:text-gray-400 dark:shadow-neu-dark-subtle"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="animate-slide-down bg-neu-bg dark:bg-dark-surface md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {siteConfig.navigation.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all hover:bg-neu-dark/30 hover:text-sage-600 dark:text-gray-300 dark:hover:bg-dark-elevated dark:hover:text-sage-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
