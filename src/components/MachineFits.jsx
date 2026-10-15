import { machineTypes } from "../content/machines";
import { machinePath } from "../content/routes";
import MachineImage from "./MachineImage";

// "Machines that usually fit here": a card per type with the reason, linking to the type page.
// `fits` is [{ machine: slug, note }]. Drawings only: a photo here could be read as our machine.
export default function MachineFits({ title, fits }) {
  return (
    <section aria-labelledby="fits-title" className="section pb-0 sm:pb-0 lg:pb-0">
      <div className="container-page">
        <h2 id="fits-title" className="h2 max-w-3xl">
          {title}
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-5">
          {fits.map((fit) => {
            const machine = machineTypes.find((type) => type.slug === fit.machine);
            return (
              <li
                key={fit.machine}
                className="relative flex gap-4 rounded-2xl border border-line bg-white p-4 transition-colors hover:border-brand sm:flex-col sm:p-5"
              >
                <div className="w-20 shrink-0 sm:w-auto">
                  <MachineImage
                    machine={machine}
                    preferPhoto={false}
                    showCaption={false}
                    frameClassName="aspect-[5/6] overflow-hidden rounded-xl bg-brand-mint sm:aspect-[4/3]"
                  />
                </div>
                <div className="min-w-0 sm:flex sm:flex-1 sm:flex-col">
                  <h3 className="font-display text-lg font-bold leading-snug text-ink">
                    {/* The link covers the whole card. */}
                    <a
                      href={machinePath(machine)}
                      className="underline decoration-brand/30 decoration-2 underline-offset-4 after:absolute after:inset-0 after:rounded-2xl hover:text-brand"
                    >
                      {machine.title}
                    </a>
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{fit.note}</p>
                  <p className="mt-2 font-display font-bold text-brand sm:mt-auto sm:pt-3">
                    ${machine.price.toFixed(2)}/week
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
