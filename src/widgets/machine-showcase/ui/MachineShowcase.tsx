import { TypeCard, hasPhoto, machineTypes } from "~/entities/machine";
import { ViewSwitch, useMachineView } from "~/features/view-switch";
import { TypesAnimation } from "./TypesAnimation";

// The five types as photo cards, each linking to its page. A Drawings/Photos switch swaps every
// card to its drawing; Photos is the default, so the server HTML shows the photos (a type
// without a photo shows its drawing, tagged "Drawing"). From 768px the animated drawing of the
// types stands beside the heading; phones skip it, the cards already show each type.
// `showAllLink` adds a link to /machines/ (off on that page itself).
export function MachineShowcase({ showAllLink = true }: { showAllLink?: boolean }) {
  const { view, setView, showPhotos } = useMachineView();
  const anyPhotos = machineTypes.some(hasPhoto);

  return (
    <section id="machines" aria-labelledby="machines-title" className="section border-y border-line bg-white">
      <div className="container-page">
        <div className="grid gap-8 md:grid-cols-12 md:items-center md:gap-10">
          <div className="md:col-span-7 lg:col-span-8">
            <h2 id="machines-title" className="h2">
              Find the type that fits your space
            </h2>
            <p className="lead mt-4 max-w-2xl">
              Tell us your closet size and outlet type. We find a machine that fits, check it,
              deliver it and hook it up.
            </p>
            {anyPhotos && <ViewSwitch view={view} onChange={setView} className="mt-6" />}
          </div>
          <div className="hidden md:col-span-5 md:block lg:col-span-4">
            <TypesAnimation className="max-w-[16rem] lg:max-w-[17rem]" />
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
