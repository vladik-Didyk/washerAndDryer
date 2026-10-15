import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { siteConfig } from "../content/config";

// Phones only: the header shows the full Call button from 768px up.
// Steps aside while the request form or the footer is on screen, so it never covers a
// form field; both of those already show Call and Text buttons.
export default function FloatingCall() {
  const [covered, setCovered] = useState(false);
  const { phone } = siteConfig;

  useEffect(() => {
    const targets = [
      document.getElementById("request"),
      document.querySelector("footer"),
    ].filter(Boolean);
    if (!targets.length || !("IntersectionObserver" in window)) return undefined;

    const onScreen = new Set();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setCovered(onScreen.size > 0);
    });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  // The aside keeps the button inside a landmark; hiding the aside hides both.
  return (
    <aside
      lang="en"
      aria-label="Call us"
      className={`fixed bottom-4 right-4 z-30 transition-[opacity,transform,visibility] duration-200 md:hidden ${
        covered ? "invisible translate-y-4 opacity-0" : "visible opacity-100"
      }`}
    >
      <a
        href={phone.tel}
        aria-label={`Call ${phone.display}`}
        className="btn btn-primary px-5 shadow-[0_8px_24px_rgba(7,63,50,0.35)]"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        Call
      </a>
    </aside>
  );
}
