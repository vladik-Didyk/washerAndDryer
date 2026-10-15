import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { machineTypes } from "../content/machines";

// The hero drawing cycles through the five machine types. All five SVGs share a 400x480
// canvas, so they stack in one box: the next machine slides in from the right and lands,
// the previous one slides out to the left. The width line under the machine moves with it.
//
// `bar` is the machine's footprint as a share of the square stage: the drawing is 83.3% of the
// stage width and centred (8.3% margin), and the machine spans x..x+w of the 400px canvas.
const SLIDES = [
  { slug: "laundry-centre", width: "24″ or 27″ wide", bar: { x: 100, w: 201 } },
  { slug: "stackable", width: "24″ or 27″ wide", bar: { x: 100, w: 201 } },
  { slug: "side-by-side-front-load", width: "About 55″ wide for the pair", bar: { x: 27, w: 348 } },
  { slug: "side-by-side-top-load", width: "About 55″ wide for the pair", bar: { x: 27, w: 348 } },
  { slug: "single-machine", width: "24″ or 27″ wide", bar: { x: 27, w: 174 } },
].map((slide) => ({
  ...slide,
  machine: machineTypes.find((machine) => machine.slug === slide.slug),
}));

const INTERVAL_MS = 3200;
const toStage = (px) => `${8.33 + (px / 400) * 83.33}%`;
const widthOnStage = (px) => `${(px / 400) * 83.33}%`;

export default function HeroMachines() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Respect "reduce motion": no automatic cycling, the dots still switch machines.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const cycling = playing && !hovered && !reducedMotion;
  useEffect(() => {
    if (!cycling) return undefined;
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % SLIDES.length),
      INTERVAL_MS,
    );
    return () => window.clearTimeout(timer);
  }, [cycling, active]);

  const previous = (active - 1 + SLIDES.length) % SLIDES.length;
  const current = SLIDES[active];

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Machine types we rent"
      className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-none"
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
        <div className="absolute inset-0 motion-safe:animate-rise-in">
          {SLIDES.map((slide, index) => {
            const isActive = index === active;
            const position = isActive
              ? "translate-x-0 opacity-100"
              : index === previous
                ? "-translate-x-[22%] opacity-0"
                : "translate-x-[22%] opacity-0";
            return (
              <div
                key={slide.slug}
                aria-hidden={!isActive}
                className={`absolute inset-0 flex justify-center transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${position}`}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${slide.machine.drawing}`}
                  alt={isActive ? `Drawing: ${slide.machine.alt}` : ""}
                  width="400"
                  height="480"
                  fetchPriority={index === 0 ? "high" : undefined}
                  className={`h-full w-auto ${isActive && active !== 0 ? "motion-safe:animate-machine-land" : ""}`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Width callout under the machine, drawn like a dimension line; it follows the machine. */}
      <div className="relative mt-1 h-10 motion-safe:animate-fade-in">
        <div
          aria-hidden="true"
          className="absolute top-0 h-3.5 border-x-2 border-brand transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ left: toStage(current.bar.x), width: widthOnStage(current.bar.w) }}
        >
          <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-brand" />
        </div>
        <p className="absolute inset-x-0 top-5 whitespace-nowrap text-center font-display text-sm font-semibold text-brand">
          {current.width}
        </p>
      </div>

      <div className="mt-2 flex items-center justify-center gap-3 motion-safe:animate-fade-in">
        <a
          href={`#machines`}
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
