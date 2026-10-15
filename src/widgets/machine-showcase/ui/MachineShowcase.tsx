import { TypeCard, getMachineTypes, hasPhoto } from "~/entities/machine";
import { usePrices } from "~/entities/offer";
import { ViewSwitch, useMachineView } from "~/features/view-switch";
import { useI18n } from "~/shared/i18n";
import { TypesAnimation } from "./TypesAnimation";

// The five types as photo cards, each linking to its page. A Drawings/Photos switch swaps every
// card to its drawing; Photos is the default, so the server HTML shows the photos (a type
// without a photo shows its drawing, tagged "Drawing"). From 768px the animated drawing of the
// types stands beside the heading; phones skip it, the cards already show each type.
// `showAllLink` adds a link to /machines/ (off on that page itself).
export function MachineShowcase({ showAllLink = true }: { showAllLink?: boolean }) {
  const { view, setView, showPhotos } = useMachineView();
  const { d } = useI18n();
  const { showcase } = d.machines;
  const machineTypes = getMachineTypes(d);
  const prices = usePrices();
  const anyPhotos = machineTypes.some(hasPhoto);

  return (
    <section id="machines" aria-labelledby="machines-title" className="section border-y border-line bg-white">
      <div className="container-page">
        <div className="grid gap-8 md:grid-cols-12 md:items-center md:gap-10">
          <div className="md:col-span-7 lg:col-span-8">
            <h2 id="machines-title" className="h2">
              {showcase.title}
            </h2>
            <p className="lead mt-4 max-w-2xl">{showcase.lead}</p>
            {anyPhotos && <ViewSwitch view={view} onChange={setView} className="mt-6" />}
          </div>
          <div className="hidden md:col-span-5 md:block lg:col-span-4">
            <TypesAnimation className="max-w-[16rem] lg:max-w-[17rem]" />
          </div>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:mt-12 xl:grid-cols-5 xl:gap-4">
          {machineTypes.map((machine) => (
            <TypeCard key={machine.slug} machine={machine} price={prices[machine.item]} preferPhoto={showPhotos} />
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="text-sm text-ink-muted">
            {showPhotos ? showcase.photosNote : showcase.drawingsNote}
            {showcase.availabilityNote}
          </p>
          {showAllLink && (
            <a href="/machines/" className="text-link shrink-0">
              {d.common.compareAllTypes}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
