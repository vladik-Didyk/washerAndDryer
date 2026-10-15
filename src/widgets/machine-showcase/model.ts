import { useEffect, useRef, useState } from "react";
import { machineTypes, type MachineType } from "~/entities/machine";
import { MACHINE_PARTS, type PartId } from "./parts";

// The slides of the machine-type animation (./ui/TypesAnimation.tsx): a drawing that changes
// type every few seconds, one physical step at a time: the two machines of a side-by-side pair
// lift into a stack, the stack fuses into a one-piece cabinet, the cabinet splits into a
// top-load pair, the dryer fades to an outline (one machine only), and the pair comes back.
// Two "slots" do this: each moves to its spot in the next layout and turns a quarter on its
// vertical axis to change face (3D flip).
//
// Coordinates are the 400x480 canvas of the drawings in public/types/; a slot's box is the
// part's viewBox, so in each layout the machines stand exactly where the full drawing has them.
export interface SlotBox {
  part: PartId;
  x: number;
  y: number;
  w: number;
  h: number;
  hidden?: boolean;
}

const box = (part: PartId, x: number, y: number): SlotBox => {
  const [, , w, h] = MACHINE_PARTS[part].viewBox.split(" ").map(Number);
  return { part, x, y, w, h };
};

interface SlideSpec {
  slug: string;
  width: string;
  bar: { x: number; w: number };
  a: SlotBox;
  b: SlotBox;
}

export interface Slide extends SlideSpec {
  machine: MachineType;
}

const SLIDE_SPECS: SlideSpec[] = [
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
];

export const SLIDES: Slide[] = SLIDE_SPECS.map((slide) => ({
  ...slide,
  machine: machineTypes.find((machine) => machine.slug === slide.slug)!,
}));

export const INTERVAL_MS = 3400;
export const MOVE_MS = 900;
export const MOVE_EASING = "cubic-bezier(0.65, 0, 0.35, 1)";
export const FLIP_MS = 760; // keep equal to the machine-flip duration in tailwind.config.ts
export const pctX = (px: number) => `${(px / 400) * 100}%`;
export const pctY = (px: number) => `${(px / 480) * 100}%`;
// The stage (400x480) is centred in the square box: 83.3% of its width, 8.3% margin.
export const toBox = (px: number) => `${8.33 + (px / 400) * 83.33}%`;
export const widthOnBox = (px: number) => `${(px / 400) * 83.33}%`;

// "Reduce motion": no automatic cycling and no movement; the dots still switch types.
export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reducedMotion;
}

// The slideshow: which slide shows, playing or paused, paused while hovered or focused, and
// cycling only while on screen (it sits below the fold, and is hidden on phones).
export function useSlideshow(count: number, reducedMotion: boolean) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      setOnScreen(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const cycling = playing && !hovered && !reducedMotion && onScreen;
  useEffect(() => {
    if (!cycling) return undefined;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % count), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [cycling, active, count]);

  return { active, setActive, playing, setPlaying, setHovered, rootRef };
}

// One slot's drawing: when the target part changes, a flip starts and the drawing swaps at
// half-time (edge-on). The flip key restarts the CSS animation.
export function useSlotFlip(targetPart: PartId, reducedMotion: boolean) {
  const [shown, setShown] = useState<PartId>(targetPart);
  const [flips, setFlips] = useState(0);

  useEffect(() => {
    if (targetPart === shown) return undefined;
    if (reducedMotion) {
      setShown(targetPart);
      return undefined;
    }
    setFlips((count) => count + 1);
    const timer = window.setTimeout(() => setShown(targetPart), FLIP_MS / 2);
    return () => window.clearTimeout(timer);
    // `shown` is left out on purpose: the flip runs when the target changes, not when it lands.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetPart, reducedMotion]);

  return { shown, flips };
}
