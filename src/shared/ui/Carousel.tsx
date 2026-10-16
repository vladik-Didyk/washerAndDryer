import { Children, useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { useI18n } from "~/shared/i18n";
import { ChevronLeft, ChevronRight } from "./icons";

// A row of photos that scrolls sideways. It never moves by itself: a finger swipes it, the
// arrows on the photos step it one slide at a time, and the keyboard's left and right arrows
// do the same while it has focus. A counter ("2 / 7") says where you are. Give the slides a
// width under 100% on phones (`slideClassName`, e.g. "w-[85%]") and the next photo peeks in
// from the edge, so it is plain there is more. The arrow at an end hides; it doesn't wrap.
// Without JavaScript it is a plain scrolling row, so every slide is still reachable. The server
// renders all slides. `index`/`onChange` make it controlled (the machine gallery's thumbnails).
export function Carousel({
  children,
  label,
  index: controlledIndex,
  onChange,
  className = "",
  trackClassName = "",
  slideClassName = "",
}: {
  children: ReactNode;
  label: string;
  index?: number;
  onChange?: (index: number) => void;
  className?: string;
  trackClassName?: string;
  slideClassName?: string;
}) {
  const { d, format } = useI18n();
  const text = d.common.carousel;
  const slides = Children.toArray(children);
  const count = slides.length;
  const id = useId();
  const track = useRef<HTMLUListElement>(null);
  const [ownIndex, setOwnIndex] = useState(0);
  const index = controlledIndex ?? ownIndex;
  // Whether the row is scrolled to its start or its end: the arrow on that side hides.
  const [edges, setEdges] = useState({ start: true, end: count < 2 });
  // The slide a step is scrolling to: until it arrives, the slides passed on the way don't count.
  const heading = useRef<number | null>(null);

  const setIndex = useCallback(
    (next: number) => {
      if (controlledIndex === undefined) setOwnIndex(next);
      if (next !== controlledIndex) onChange?.(next);
    },
    [controlledIndex, onChange],
  );

  // Scroll the row so a slide sits at its left edge (smoothly unless motion is turned off).
  const scrollTo = useCallback((target: number) => {
    const list = track.current;
    const slide = list?.children[target] as HTMLElement | undefined;
    if (!list || !slide) return;
    const left = Math.min(slideLeft(list, slide), list.scrollWidth - list.clientWidth);
    // Already there: no scroll will follow, so nothing to wait for.
    if (Math.abs(left - list.scrollLeft) < 2) return;
    heading.current = target;
    list.scrollTo({ left, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, []);

  const go = (next: number) => {
    const clamped = Math.min(Math.max(next, 0), count - 1);
    setIndex(clamped);
    scrollTo(clamped);
  };

  // After a swipe or a step: the slide nearest the left edge is the current one, and at the
  // very end the last one is (with several in view, the last never reaches the left edge).
  const sync = useCallback(() => {
    const list = track.current;
    if (!list) return;
    const max = list.scrollWidth - list.clientWidth;
    const atStart = list.scrollLeft <= 4;
    const atEnd = list.scrollLeft >= max - 4;
    setEdges((old) => (old.start === atStart && old.end === atEnd ? old : { start: atStart, end: atEnd }));
    const found = atEnd
      ? count - 1
      : [...list.children].reduce(
          (best, child, i) => {
            const distance = Math.abs(slideLeft(list, child as HTMLElement) - list.scrollLeft);
            return distance < best.distance ? { i, distance } : best;
          },
          { i: 0, distance: Infinity },
        ).i;
    if (heading.current !== null) {
      if (found === heading.current || atStart || atEnd) heading.current = null;
      return;
    }
    setIndex(found);
  }, [count, setIndex]);

  // A scroll fires many events: settle once per frame.
  const frame = useRef(0);
  const onScroll = () => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(sync);
  };

  // A controlled index set from outside (a thumbnail) scrolls the row too.
  useEffect(() => {
    if (controlledIndex !== undefined) scrollTo(controlledIndex);
  }, [controlledIndex, scrollTo]);

  // The edges change with the window width (how many slides fit).
  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") go(index - 1);
    else if (event.key === "ArrowRight") go(index + 1);
    else return;
    event.preventDefault();
  };

  return (
    <section aria-roledescription="carousel" aria-label={label} className={`relative ${className}`} onKeyDown={onKeyDown}>
      <ul
        ref={track}
        id={`${id}track`}
        onScroll={onScroll}
        className={`flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${trackClassName}`}
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

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label={text.previous}
            aria-controls={`${id}track`}
            tabIndex={edges.start ? -1 : 0}
            className={`${arrowClass} left-3 ${edges.start ? "pointer-events-none opacity-0" : ""}`}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label={text.next}
            aria-controls={`${id}track`}
            tabIndex={edges.end ? -1 : 0}
            className={`${arrowClass} right-3 ${edges.end ? "pointer-events-none opacity-0" : ""}`}
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
          <p
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-semibold tabular-nums text-white backdrop-blur"
          >
            {index + 1} / {count}
          </p>
          <p aria-live="polite" className="sr-only">
            {format(text.slideOf, { index: index + 1, count })}
          </p>
        </>
      )}
    </section>
  );
}

// Centred on the photos (the `--arrow-top` variable moves them up when captions sit below).
const arrowClass =
  "absolute top-[var(--arrow-top,50%)] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink shadow-lg ring-1 ring-line transition hover:scale-105 hover:bg-white active:scale-95 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand";

// Where a slide starts inside the row, in scroll pixels (offsetLeft would depend on which
// element is the positioned parent).
const slideLeft = (list: HTMLElement, slide: HTMLElement) =>
  slide.getBoundingClientRect().left - list.getBoundingClientRect().left + list.scrollLeft;

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
