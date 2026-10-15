import { machineTypes } from "../content/machines";
import TypeCard, { TYPE_CARD_SIZES_4UP } from "./TypeCard";

// "Machines that usually fit here": a photo card per type with the reason, linking to the type
// page. `fits` is [{ machine: slug, note }]. The photos are examples, and the line under the
// cards says so (a type without a photo shows its drawing, tagged "Drawing").
export default function MachineFits({ title, fits }) {
  return (
    <section aria-labelledby="fits-title" className="section pb-0 sm:pb-0 lg:pb-0">
      <div className="container-page">
        <h2 id="fits-title" className="h2 max-w-3xl">
          {title}
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-4">
          {fits.map((fit) => (
            <TypeCard
              key={fit.machine}
              machine={machineTypes.find((type) => type.slug === fit.machine)}
              note={fit.note}
              sizes={TYPE_CARD_SIZES_4UP}
            />
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink-muted">
          Photos are examples of each type, not our machines. Brand and model depend on
          what's available.
        </p>
      </div>
    </section>
  );
}
