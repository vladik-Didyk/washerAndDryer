import { machinePath } from "~/entities/machine";
import { useI18n } from "~/shared/i18n";
import { Pause, Play } from "~/shared/ui";
import {
  MOVE_EASING,
  MOVE_MS,
  SLIDE_COUNT,
  slidesFor,
  pctX,
  pctY,
  toBox,
  useReducedMotion,
  useSlideshow,
  useSlotFlip,
  widthOnBox,
  type SlotBox,
} from "../model";
import { MACHINE_PARTS, type PartId } from "../parts";

// The markup is static SVG from ../parts.ts (our own drawings), never user input.
function Part({ part }: { part: PartId }) {
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
// type is a 3D flip (keyframes `machine-flip` in tailwind.config.ts): it turns edge-on, the
// drawing is swapped at that moment, and it turns back to face front. The keyframes always end
// at 0°, so even if a background tab delays the swap the machine never stays edge-on.
function Slot({ target, reducedMotion, front = false }: { target: SlotBox; reducedMotion: boolean; front?: boolean }) {
  const { shown, flips } = useSlotFlip(target.part, reducedMotion);

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
      <div key={flips} className={`h-full w-full ${flips > 0 && !reducedMotion ? "animate-machine-flip" : ""}`}>
        <Part part={shown} />
      </div>
    </div>
  );
}

// Beside the heading of the machines section: the five types, one after another.
// `className` sets the width (the drawing is square, plus the width line and the dots).
export function TypesAnimation({ className = "" }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const { d, format } = useI18n();
  const { animation } = d.machines;
  const slides = slidesFor(d);
  const { active, setActive, playing, setPlaying, setHovered, rootRef } = useSlideshow(SLIDE_COUNT, reducedMotion);
  const current = slides[active];

  return (
    <div
      ref={rootRef}
      role="group"
      aria-roledescription="carousel"
      aria-label={animation.label}
      className={`relative mx-auto w-full ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className="relative aspect-square">
        <div aria-hidden="true" className="absolute inset-[7%] rounded-full bg-gold motion-safe:animate-disc-in" />
        <div
          role="img"
          aria-label={format(d.machines.drawingAlt, { alt: current.machine.alt })}
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
        {slides.map((slide, index) => (
          <button
            key={slide.slug}
            type="button"
            onClick={() => setActive(index)}
            aria-label={format(animation.show, { title: slide.machine.title })}
            aria-current={index === active ? "true" : undefined}
            className="group flex h-8 w-8 items-center justify-center rounded-full"
          >
            <span
              className={`block h-2.5 rounded-full transition-all duration-300 ${
                index === active ? "w-6 bg-brand" : "w-2.5 bg-brand/25 group-hover:bg-brand/50"
              }`}
            />
          </button>
        ))}
        {!reducedMotion && (
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? animation.pause : animation.play}
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-brand hover:bg-brand/10"
          >
            {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
          </button>
        )}
      </div>
    </div>
  );
}
