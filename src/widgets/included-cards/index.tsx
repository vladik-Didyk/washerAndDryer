import { useI18n } from "~/shared/i18n";
import { Container, Heading, Nest, Photo, Section } from "~/shared/ui";

// Three photo cards under the home hero: what every rental includes. The photos are
// examples (Unsplash, docs/photo-credits.md).
const PHOTOS = ["rooms/laundry-room-shirts", "rooms/drum-empty", "rooms/washer-basket-sock"] as const;

export function IncludedCards() {
  const { d } = useI18n();
  const { included } = d.home;

  return (
    <Section id="included" aria-labelledby="included-cards-title" className="border-y border-line bg-white">
      <Container>
        <Heading id="included-cards-title">{included.title}</Heading>
        <ul className="mt-8 grid gap-5 sm:grid-cols-3 sm:gap-6">
          {included.items.map((item, index) => {
            const name = PHOTOS[index] ?? PHOTOS[0];
            return (
              <li key={item.title} className="overflow-hidden rounded-3xl border border-line bg-paper">
                <Photo
                  src={`photos/${name}.jpg`}
                  alt={d.photos[name]}
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-5 sm:p-6">
                  <Nest>
                    <Heading variant="cardSmall">{item.title}</Heading>
                  </Nest>
                  <p className="mt-2 leading-relaxed text-ink-soft">{item.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
