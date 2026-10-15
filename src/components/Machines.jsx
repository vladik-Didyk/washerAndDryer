import { Fragment, useState } from "react";
import { machineTypes } from "../content/machines";
import { machinePath } from "../content/routes";
import MachineImage, {
  PHOTO_CAPTION,
  hasPhoto,
  machinePicture,
} from "./MachineImage";

// On wide screens the five drawings stand on one continuous mint stage, like a lineup.
// A Drawings/Photos switch above the row swaps every card to its example photo (types without
// a photo keep their drawing). Drawings are the default, so the prerendered page shows them.
// Below that each type is its own panel: a row on phones, a card from 640px up.

// Lines may break between words but never at a hyphen ("Side-by- / side").
function KeepWordsWhole({ text }) {
  return text.split(" ").map((word, index) => (
    <Fragment key={index}>
      {index > 0 && " "}
      <span className="whitespace-nowrap">{word}</span>
    </Fragment>
  ));
}

function stageCorners(index, count) {
  if (index === 0) return "lg:rounded-none lg:rounded-l-3xl";
  if (index === count - 1) return "lg:rounded-none lg:rounded-r-3xl";
  return "lg:rounded-none";
}

const VIEWS = [
  { id: "drawings", label: "Drawings" },
  { id: "photos", label: "Photos" },
];

function ViewSwitch({ view, onChange }) {
  return (
    <div
      role="group"
      aria-label="Show machines as"
      className="inline-flex rounded-full border border-line bg-paper p-1"
    >
      {VIEWS.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={view === option.id}
          onClick={() => onChange(option.id)}
          className={`min-h-[44px] rounded-full px-5 font-display text-[15px] font-semibold transition-colors sm:min-h-0 sm:py-2 ${
            view === option.id
              ? "bg-brand text-white shadow-sm"
              : "text-ink-soft hover:text-brand"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default function Machines() {
  const [view, setView] = useState("drawings");
  const showPhotos = view === "photos";
  const anyPhotos = machineTypes.some(hasPhoto);

  return (
    <section
      id="machines"
      aria-labelledby="machines-title"
      className="section border-y border-line bg-white"
    >
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 id="machines-title" className="h2">
              Pick the type that fits your space
            </h2>
            <p className="lead mt-4">
              Tell us your closet size and outlet type. We find a machine that
              fits, check it, deliver it and hook it up.
            </p>
          </div>
          {anyPhotos && <ViewSwitch view={view} onChange={setView} />}
        </div>

        <ul className="mt-10 grid gap-y-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:mt-12 lg:grid-cols-5 lg:gap-x-0">
          {machineTypes.map((machine, index) => (
            <li
              key={machine.slug}
              className="flex items-center gap-4 sm:flex-col sm:items-stretch sm:gap-0"
            >
              <div className="w-28 shrink-0 sm:w-auto">
                {/* The photo caption sits in the text column, so titles stay level across the row. */}
                <MachineImage
                  machine={machine}
                  preferPhoto={showPhotos}
                  showCaption={false}
                  frameClassName={`aspect-[5/6] overflow-hidden rounded-2xl bg-brand-mint sm:aspect-[4/3] sm:rounded-3xl lg:aspect-[5/6] ${stageCorners(index, machineTypes.length)}`}
                />
              </div>
              {/* From 640px up the price sits at the bottom, so prices line up across a row. */}
              <div className="min-w-0 sm:mt-5 sm:flex sm:flex-1 sm:flex-col lg:px-4">
                <h3 className="font-display text-lg font-bold leading-snug text-ink">
                  <a
                    href={machinePath(machine)}
                    className="underline decoration-brand/30 decoration-2 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                  >
                    <KeepWordsWhole text={machine.title} />
                  </a>
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
                  {machine.description}
                </p>
                <p className="mt-2.5 font-display text-lg font-bold text-brand sm:mt-auto sm:pt-3">
                  ${machine.price}/month
                  {machine.priceNote && (
                    <span className="ml-1.5 font-sans text-sm font-medium text-ink-muted">
                      {machine.priceNote}
                    </span>
                  )}
                </p>
                {machinePicture(machine, showPhotos).isPhoto && (
                  <p className="mt-1.5 text-xs leading-snug text-ink-muted">
                    {PHOTO_CAPTION}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-ink-muted">
          {showPhotos
            ? "Photos are examples of each type, not our machines. "
            : "Drawings show the type, not a specific machine. "}
          Brand and model depend on what's available.
        </p>
      </div>
    </section>
  );
}
