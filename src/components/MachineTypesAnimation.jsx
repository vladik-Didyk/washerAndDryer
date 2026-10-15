import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { machineTypes } from "../content/machines";
import { MACHINE_PARTS } from "../content/machineParts";
import { machinePath } from "../content/routes";

// Beside the heading of the Machines section (Machines.jsx): a drawing that changes type every
// few seconds, one physical step at a time: the two machines of a side-by-side pair lift into a
// stack, the stack fuses into a one-piece cabinet, the cabinet splits into a top-load pair, the
// dryer fades to an outline (one machine only), and the pair comes back. Two "slots" do this:
// each moves to its spot in the next layout and turns a quarter on its vertical axis to change
// face (3D flip, see Slot). It only changes while it is on screen.
//
// Coordinates are the 400x480 canvas of the drawings in public/types/; a slot's box is the
// part's viewBox, so in each layout the machines stand exactly where the full drawing has them.
const box = (part, x, y) => {
  const [, , w, h] = MACHINE_PARTS[part].viewBox.split(" ").map(Number);
  return { part, x, y, w, h };
};

const SLIDES = [
  {
    slug: "laundry-centre",
    width: "24″ or 27″ wide",
    bar: { x: 100, w: 201 },
    a: box("OP", 96, 16),
    b: { ...box("SD", 96, 16), hidden: true },
  },
  {
    slug: "side-by-side-top-load",
    width: "About 55″ wide for the pair",
    bar: { x: 27, w: 348 },
    a: box("TW", 22, 144),
    b: box("TD", 202, 144),
  },
  {
    slug: "single-machine",
    width: "24″ or 27″ wide",
    bar: { x: 27, w: 168 },
    a: box("FW", 22, 178),
    b: box("GH", 202, 178),
  },
  {
    slug: "side-by-side-front-load",
    width: "About 55″ wide for the pair",
    bar: { x: 27, w: 348 },
    a: box("FW", 22, 178),
    b: box("FD", 202, 178),
  },
  {
    slug: "stackable",
    width: "24″ or 27″ wide",
    bar: { x: 100, w: 201 },
    a: box("SW", 96, 244),
    b: box("SD", 96, 16),
  },
].map((slide) => ({
  ...slide,
  machine: machineTypes.find((machine) => machine.slug === slide.slug),
}));

const INTERVAL_MS = 3400;
const MOVE_MS = 900;
const MOVE_EASING = "cubic-bezier(0.65, 0, 0.35, 1)";
const FLIP_MS = 760; // keep equal to the machine-flip duration in tailwind.config.js
const pctX = (px) => `${(px / 400) * 100}%`;
const pctY = (px) => `${(px / 480) * 100}%`;
// The stage (400x480) is centred in the square box: 83.3% of its width, 8.3% margin.
const toBox = (px) => `${8.33 + (px / 400) * 83.33}%`;
const widthOnBox = (px) => `${(px / 400) * 83.33}%`;

// The markup is static SVG from src/content/machineParts.js (our own drawings), never user input.
function Part({ part }) {
  const { viewBox, markup } = MACHINE_PARTS[part];
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      className="block h-full w-full overflow-visible"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}

// One machine on the stage. Moving between layouts is a CSS transition on its box. Changing
// type is a 3D flip (keyframes `machine-flip` in tailwind.config.js): it turns edge-on, the
// drawing is swapped at that moment, and it turns back to face front. The keyframes always end
// at 0°, so even if a background tab delays the swap the machine never stays edge-on.
function Slot({ target, reducedMotion, front }) {
  const [shown, setShown] = useState(target.part);
  const [flips, setFlips] = useState(0);

  useEffect(() => {
    if (target.part === shown) return undefined;
    if (reducedMotion) {
      setShown(target.part);
      return undefined;
    }
    setFlips((count) => count + 1);
    const timer = window.setTimeout(() => setShown(target.part), FLIP_MS / 2);
    return () => window.clearTimeout(timer);
    // `shown` is left out on purpose: the flip runs when the target changes, not when it lands.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.part, reducedMotion]);

  const motion = reducedMotion
    ? "none"
    : ["left", "top", "width", "height", "opacity"]
        .map((property) => `${property} ${MOVE_MS}ms ${MOVE_EASING}`)
        .join(", ");

  return (
    <div
      className="absolute"
      style={{
        left: pctX(target.x),
        top: pctY(target.y),
        width: pctX(target.w),
        height: pctY(target.h),
        opacity: target.hidden ? 0 : 1,
        zIndex: front ? 2 : 1,
        transition: motion,
      }}
    >
      <div
        key={flips}
        className={`h-full w-full ${flips > 0 && !reducedMotion ? "animate-machine-flip" : ""}`}
      >
        <Part part={shown} />
      </div>
    </div>
  );
}

// `className` sets the width (the drawing is square, plus the width line and the dots).
export default function MachineTypesAnimation({ className = "" }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const rootRef = useRef(null);

  // Cycle only while visible: it sits below the fold, and is hidden on phones.
  useEffect(() => {
    const node = rootRef.current;
    if (!("IntersectionObserver" in window)) {
      setOnScreen(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Respect "reduce motion": no automatic cycling and no movement; the dots still switch types.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const cycling = playing && !hovered && !reducedMotion && onScreen;
  useEffect(() => {
    if (!cycling) return undefined;
    const timer = window.setTimeout(
      () => setActive((index) => (index + 1) % SLIDES.length),
      INTERVAL_MS,
    );
    return () => window.clearTimeout(timer);
  }, [cycling, active]);

  const current = SLIDES[active];

  return (
    <div
      ref={rootRef}
      role="group"
      aria-roledescription="carousel"
      aria-label="Machine types we rent"
      className={`relative mx-auto w-full ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className="relative aspect-square">
        <div
          aria-hidden="true"
          className="absolute inset-[7%] rounded-full bg-gold motion-safe:animate-disc-in"
        />
        <div
          role="img"
          aria-label={`Drawing: ${current.machine.alt}`}
          className="absolute inset-y-0 left-[8.33%] w-[83.33%] motion-safe:animate-rise-in"
          style={{ perspective: "1100px" }}
        >
          {/* Floor shadow, as wide as what stands on it. */}
          <div
            aria-hidden="true"
            className="absolute rounded-[50%] bg-brand/[0.12] motion-reduce:transition-none"
            style={{
              left: pctX(current.bar.x - 6),
              width: pctX(current.bar.w + 12),
              top: pctY(446),
              height: pctY(14),
              transition: `left ${MOVE_MS}ms ${MOVE_EASING}, width ${MOVE_MS}ms ${MOVE_EASING}`,
            }}
          />
          <Slot target={current.a} reducedMotion={reducedMotion} />
          <Slot target={current.b} reducedMotion={reducedMotion} front />
        </div>
      </div>

      {/* Width callout under the machine, drawn like a dimension line; it follows the machine. */}
      <div className="relative mt-1 h-10 motion-safe:animate-fade-in">
        <div
          aria-hidden="true"
          className="absolute top-0 h-3.5 border-x-2 border-brand transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ left: toBox(current.bar.x), width: widthOnBox(current.bar.w) }}
        >
          <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-brand" />
        </div>
        <p className="absolute inset-x-0 top-5 whitespace-nowrap text-center font-display text-sm font-semibold text-brand">
          {current.width}
        </p>
      </div>

      <div className="mt-2 flex items-center justify-center motion-safe:animate-fade-in">
        <a
          href={machinePath(current.machine)}
          className="font-display text-[15px] font-bold text-ink underline decoration-brand/30 decoration-2 underline-offset-4 hover:text-brand"
        >
          {current.machine.title}
        </a>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 motion-safe:animate-fade-in">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.slug}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show ${slide.machine.title}`}
            aria-current={index === active ? "true" : undefined}
            className="group flex h-8 w-8 items-center justify-center rounded-full"
          >
            <span
              className={`block h-2.5 rounded-full transition-all duration-300 ${
                index === active
                  ? "w-6 bg-brand"
                  : "w-2.5 bg-brand/25 group-hover:bg-brand/50"
              }`}
            />
          </button>
        ))}
        {!reducedMotion && (
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? "Pause machine slideshow" : "Play machine slideshow"}
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-brand hover:bg-brand/10"
          >
            {playing ? (
              <Pause className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Play className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
