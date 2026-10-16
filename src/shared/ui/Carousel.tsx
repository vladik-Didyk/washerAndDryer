import { Children, useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useI18n } from "~/shared/i18n";
import { ChevronLeft, ChevronRight, Pause, Play } from "./icons";

// A row of slides that scrolls sideways, one slide per step: a finger swipes it, the arrows
// and dots move it, and (when `auto` is set and the visitor hasn't asked for reduced motion)
// it moves on by itself every `interval` ms, pausing while the pointer or focus is on it.
// Without JavaScript it is a plain scrolling row, so every slide is still reachable. The
// server renders all slides; nothing is hidden from screen readers (the slides are an
// ordinary list). `index`/`onChange` make it controlled (the machine gallery's thumbnails).
export function Carousel({
  children,
  label,
  auto = false,
  interval = 6000,
  index: controlledIndex,
  onChange,
  className = "",
  trackClassName = "",
  slideClassName = "",
  controls = "inside",
}: {
  children: ReactNode;
  label: string;
  auto?: boolean;
  interval?: number;
  index?: number;
  onChange?: (index: number) => void;
  className?: string;
  trackClassName?: string;
  slideClassName?: string;
  /** Where the arrows sit: over the slides, or in a row under them with the dots. */
  controls?: "inside" | "below";
}) {
  const { d, format } = useI18n();
  const text = d.common.carousel;
  const slides = Children.toArray(children);
  const count = slides.length;
  const id = useId();
  const track = useRef<HTMLUListElement>(null);
  const [ownIndex, setOwnIndex] = useState(0);
  const index = controlledIndex ?? ownIndex;
  const [playing, setPlaying] = useState(false);
  const [held, setHeld] = useState(false);
  const scrollingTo = useRef<number | null>(null);

  const setIndex = useCallback(
    (next: number) => {
      const wrapped = ((next % count) + count) % count;
      if (controlledIndex === undefined) setOwnIndex(wrapped);
      onChange?.(wrapped);
    },
    [count, controlledIndex, onChange],
  );

  // Scroll the track to a slide (smoothly unless the visitor asked for reduced motion).
  const scrollTo = useCallback((target: number, smooth: boolean) => {
    const list = track.current;
    const slide = list?.children[target] as HTMLElement | undefined;
    if (!list || !slide) return;
    scrollingTo.current = target;
    list.scrollTo({ left: slide.offsetLeft - list.offsetLeft, behavior: smooth ? "smooth" : "auto" });
  }, []);

  const go = useCallback(
    (next: number) => {
      const wrapped = ((next % count) + count) % count;
      setIndex(wrapped);
      scrollTo(wrapped, !prefersReducedMotion());
    },
    [count, setIndex, scrollTo],
  );

  // Keep the index in step with a swipe: the slide nearest the left edge is the current one.
  const onScroll = () => {
    const list = track.current;
    if (!list) return;
    const nearest = [...list.children].reduce(
      (best, child, i) => {
        const distance = Math.abs((child as HTMLElement).offsetLeft - list.offsetLeft - list.scrollLeft);
        return distance < best.distance ? { i, distance } : best;
      },
      { i: 0, distance: Infinity },
    ).i;
    if (scrollingTo.current !== null) {
      if (nearest === scrollingTo.current) scrollingTo.current = null;
      return;
    }
    if (nearest !== index) setIndex(nearest);
  };

  // A controlled index set from outside (a thumbnail) scrolls the track too.
  useEffect(() => {
    if (controlledIndex !== undefined) scrollTo(controlledIndex, !prefersReducedMotion());
  }, [controlledIndex, scrollTo]);

  // Autoplay: only after hydration, only with more than one slide, never with reduced motion.
  useEffect(() => {
    if (!auto || count < 2 || prefersReducedMotion()) return;
    setPlaying(true);
  }, [auto, count]);

  useEffect(() => {
    if (!playing || held || count < 2) return;
    if (typeof document !== "undefined" && document.hidden) return;
    const timer = window.setInterval(() => go(index + 1), interval);
    return () => window.clearInterval(timer);
  }, [playing, held, count, index, interval, go]);

  const hold = (on: boolean) => () => setHeld(on);

  const arrows = count > 1 && (
    <>
      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label={text.previous}
        className={`${arrowClass} ${controls === "inside" ? "absolute left-3 top-1/2 -translate-y-1/2 sm:left-4" : ""}`}
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label={text.next}
        className={`${arrowClass} ${controls === "inside" ? "absolute right-3 top-1/2 -translate-y-1/2 sm:right-4" : ""}`}
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </>
  );

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className={`relative ${className}`}
      onMouseEnter={hold(true)}
      onMouseLeave={hold(false)}
      onFocus={hold(true)}
      onBlur={hold(false)}
      onTouchStart={hold(true)}
      onTouchEnd={hold(false)}
    >
      <ul
        ref={track}
        id={`${id}track`}
        onScroll={onScroll}
        aria-live={playing && !held ? "off" : "polite"}
        className={`flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden motion-reduce:scroll-auto ${trackClassName}`}
      >
        {slides.map((slide, i) => (
          <li
            key={i}
            aria-roledescription="slide"
            aria-label={format(text.slideOf, { index: i + 1, count })}
            className={`w-full shrink-0 snap-start ${slideClassName}`}
          >
            {slide}
          </li>
        ))}
      </ul>

      {controls === "inside" && arrows}

      {count > 1 && (
        <div className={`flex items-center justify-center gap-3 ${controls === "below" ? "mt-5" : "mt-4"}`}>
          {controls === "below" && arrows}
          <ul className="flex items-center gap-2" aria-label={text.slides}>
            {slides.map((_, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={format(text.goTo, { index: i + 1, count })}
                  aria-current={i === index ? "true" : undefined}
                  className={`block h-2.5 rounded-full transition-all ${
                    i === index ? "w-7 bg-brand" : "w-2.5 bg-ink/25 hover:bg-ink/40"
                  }`}
                />
              </li>
            ))}
          </ul>
          {auto && (
            <button
              type="button"
              onClick={() => setPlaying((on) => !on)}
              aria-label={playing ? text.pause : text.play}
              className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft hover:bg-ink/5 hover:text-ink"
            >
              {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
            </button>
          )}
        </div>
      )}
    </section>
  );
}

const arrowClass =
  "flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-md ring-1 ring-line backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
