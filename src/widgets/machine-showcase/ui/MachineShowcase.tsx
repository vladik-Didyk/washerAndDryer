import { TypeCard, getMachineTypes, hasPhoto } from "~/entities/machine";
import { usePrices } from "~/entities/offer";
import { ViewSwitch, useMachineView } from "~/features/view-switch";
import { useI18n } from "~/shared/i18n";
import { pagePaths } from "~/shared/config";
import { Container, CtaRow, LangLink, Section, SectionHeader } from "~/shared/ui";
import { TypesAnimation } from "./TypesAnimation";

// The five types as photo cards, each linking to its page. A Drawings/Photos switch swaps every
// card to its drawing; Photos is the default, so the server HTML shows the photos (a type
// without a photo shows its drawing, tagged "Drawing"). From 768px the animated drawing of the
// types stands beside the heading; phones skip it, the cards already show each type.
// `showAllLink` adds a link to /machines/ (off on that page itself).
// `compact`: cards without their description line (the home page).
export function MachineShowcase({ showAllLink = true, compact = false }: { showAllLink?: boolean; compact?: boolean }) {
  const { view, setView, showPhotos } = useMachineView();
  const { d } = useI18n();
  const { showcase } = d.machines;
  const machineTypes = getMachineTypes(d);
  const prices = usePrices();
  const anyPhotos = machineTypes.some(hasPhoto);

  return (
    <Section id="machines" aria-labelledby="machines-title" className="border-y border-line bg-white">
      <Container>
        <div className="grid gap-8 md:grid-cols-12 md:items-center md:gap-10">
          <div className="md:col-span-7 lg:col-span-8">
            <SectionHeader id="machines-title" title={showcase.title} lead={showcase.lead} leadClassName="mt-4 max-w-2xl">
              {anyPhotos && <ViewSwitch view={view} onChange={setView} className="mt-6" />}
            </SectionHeader>
          </div>
          <div className="hidden md:col-span-5 md:block lg:col-span-4">
            <TypesAnimation className="max-w-[16rem] lg:max-w-[17rem]" />
          </div>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:mt-12 xl:grid-cols-5 xl:gap-4">
          {machineTypes.map((machine) => (
            <TypeCard
              key={machine.slug}
              machine={machine}
              price={prices[machine.item]}
              preferPhoto={showPhotos}
              showDescription={!compact}
            />
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="text-sm text-ink-muted">
            {showPhotos ? showcase.photosNote : showcase.drawingsNote}
            {showcase.availabilityNote}
          </p>
          {showAllLink && (
            <LangLink href={pagePaths.machines} className="text-link shrink-0">
              {d.common.compareAllTypes}
            </LangLink>
          )}
        </div>
        <CtaRow />
      </Container>
    </Section>
  );
}
