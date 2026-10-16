import { useI18n } from "~/shared/i18n";
import { Carousel, Container, Heading, Photo, Section } from "~/shared/ui";

// /buildings/ and /landlords/: a carousel of shared laundry rooms (Unsplash examples,
// docs/photo-credits.md). Two in view on tablets, three on desktops, one and a peek on phones.
const PHOTOS = [
  "shared/stacked-dryers-tiles",
  "shared/washers-and-dryers-rows",
  "shared/washers-row-silver",
  "shared/stacked-dryers-row",
  "shared/washers-row-wood-front",
  "shared/washers-row-beige",
  "shared/washers-row-wide",
] as const;

export function SharedRooms() {
  const { d } = useI18n();
  const { sharedRooms } = d.common;

  return (
    <Section id="shared-rooms" aria-labelledby="shared-rooms-title" className="bg-paper">
      <Container>
        <Heading id="shared-rooms-title">{sharedRooms.title}</Heading>
      </Container>
      <Container className="mt-8">
        <Carousel
          label={sharedRooms.title}
          trackClassName="-mx-2 rounded-3xl"
          slideClassName="w-[85%] px-2 md:w-1/2 lg:w-1/3"
        >
          {PHOTOS.map((name) => (
            <Photo
              key={name}
              src={`photos/${name}.jpg`}
              alt={d.photos[name]}
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
          ))}
        </Carousel>
        <p className="mt-4 text-sm text-ink-muted">{sharedRooms.note}</p>
      </Container>
    </Section>
  );
}
