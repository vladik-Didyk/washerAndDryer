import { TYPE_CARD_SIZES_4UP, TypeCard, findMachine } from "~/entities/machine";
import { usePrices } from "~/entities/offer";
import { useI18n } from "~/shared/i18n";
import { Container, Heading, Section } from "~/shared/ui";

// "Machines that usually fit here": a photo card per type with the reason, linking to the type
// page. `fits` is [{ machine: slug, note }]. The photos are examples, and the line under the
// cards says so (a type without a photo shows its drawing, tagged "Drawing").
export function MachineFits({ title, fits }: { title: string; fits: Array<{ machine: string; note: string }> }) {
  const { d } = useI18n();
  const prices = usePrices();
  return (
    <Section aria-labelledby="fits-title" className="pb-0 sm:pb-0 lg:pb-0">
      <Container>
        <Heading id="fits-title" className="max-w-3xl">
          {title}
        </Heading>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-4">
          {fits.map((fit) => {
            const machine = findMachine(d, fit.machine);
            return machine ? (
              <TypeCard
                key={fit.machine}
                machine={machine}
                price={prices[machine.item]}
                note={fit.note}
                sizes={TYPE_CARD_SIZES_4UP}
              />
            ) : null;
          })}
        </ul>
        <p className="mt-6 text-sm text-ink-muted">{d.common.examplePhotosNote}</p>
      </Container>
    </Section>
  );
}
