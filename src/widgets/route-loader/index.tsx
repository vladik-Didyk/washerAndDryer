import { useEffect, useState } from "react";
import { useNavigation } from "react-router";
import { useI18n } from "~/shared/i18n";

// While a page or a form takes a moment, the round logo spins in the middle of the screen. It
// waits 300 ms first, so a quick click shows nothing and nothing flickers. With reduced motion
// the logo pulses instead of spinning. The page underneath stays as it was until the next one
// is ready (React Router keeps it), so there is no blank screen either way.
const DELAY = 300;

export function RouteLoader() {
  const { d } = useI18n();
  const busy = useNavigation().state !== "idle";
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!busy) {
      setShown(false);
      return;
    }
    const timer = window.setTimeout(() => setShown(true), DELAY);
    return () => window.clearTimeout(timer);
  }, [busy]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-paper/60 backdrop-blur-[2px] transition-opacity duration-200 ${
        shown ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {shown && (
        <div className="flex flex-col items-center gap-3 rounded-3xl bg-white px-8 py-6 shadow-xl ring-1 ring-line">
          <picture>
            <source srcSet="/brand/logo-small.webp" type="image/webp" />
            <img
              src="/brand/logo-small.png"
              alt=""
              width="56"
              height="56"
              className="h-14 w-14 animate-[spin_1.1s_linear_infinite] motion-reduce:animate-pulse"
            />
          </picture>
          <span className="font-display text-sm font-semibold text-ink">{d.chrome.loading}</span>
        </div>
      )}
    </div>
  );
}
