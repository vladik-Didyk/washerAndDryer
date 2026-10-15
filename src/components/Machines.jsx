import { useState } from "react";
import { machineTypes } from "../content/machines";
import { hasPhoto } from "./MachineImage";
import MachineTypesAnimation from "./MachineTypesAnimation";
import TypeCard from "./TypeCard";

// The five types as photo cards, each linking to its page. A Drawings/Photos switch swaps every
// card to its drawing; Photos is the default, so the prerendered page shows the photos (a type
// without a photo shows its drawing, tagged "Drawing"). From 768px the animated drawing of the
// types stands beside the heading; phones skip it, the cards already show each type.

const VIEWS = [
  { id: "photos", label: "Photos" },
  { id: "drawings", label: "Drawings" },
];

function ViewSwitch({ view, onChange, className = "" }) {
  return (
    <div
      role="group"
      aria-label="Show machines as"
      className={`inline-flex rounded-full border border-line bg-paper p-1 ${className}`}
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

// `showAllLink` adds a link to /machines/ (off on that page itself).
export default function Machines({ showAllLink = true }) {
  const [view, setView] = useState("photos");
  const showPhotos = view === "photos";
  const anyPhotos = machineTypes.some(hasPhoto);

  return (
    <section
      id="machines"
      aria-labelledby="machines-title"
      className="section border-y border-line bg-white"
    >
      <div className="container-page">
        <div className="grid gap-8 md:grid-cols-12 md:items-center md:gap-10">
          <div className="md:col-span-7 lg:col-span-8">
            <h2 id="machines-title" className="h2">
              Find the type that fits your space
            </h2>
            <p className="lead mt-4 max-w-2xl">
              Tell us your closet size and outlet type. We find a machine that
              fits, check it, deliver it and hook it up.
            </p>
            {anyPhotos && <ViewSwitch view={view} onChange={setView} className="mt-6" />}
          </div>
          <div className="hidden md:col-span-5 md:block lg:col-span-4">
            <MachineTypesAnimation className="max-w-[16rem] lg:max-w-[17rem]" />
          </div>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:mt-12 xl:grid-cols-5 xl:gap-4">
          {machineTypes.map((machine) => (
            <TypeCard key={machine.slug} machine={machine} preferPhoto={showPhotos} />
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="text-sm text-ink-muted">
            {showPhotos
              ? "Photos are examples of each type, not our machines. "
              : "Drawings show the type, not a specific machine. "}
            Brand and model depend on what's available.
          </p>
          {showAllLink && (
            <a href="/machines/" className="text-link shrink-0">
              Compare all machine types
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
