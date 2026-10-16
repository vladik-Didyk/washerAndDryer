import { useI18n } from "~/shared/i18n";
import { Carousel, Container, Heading, Photo, Section } from "~/shared/ui";

// Home page: a carousel of laundry spaces (Unsplash examples, docs/photo-credits.md) with a
// short caption each: three in view on desktops, one and a bit of the next on phones.
const PHOTOS = [
  "rooms/stacked-small-room",
  "rooms/washer-shelves",
  "rooms/dark-set-laundry-room",
  "rooms/laundry-room-shirts",
  "rooms/grey-set-laundry-room",
  "rooms/washer-cabinet-plants",
  "rooms/washer-dryer-shelving",
  "rooms/black-washer-basket",
  "rooms/washer-basket-sock",
] as const;

export function RoomsCarousel() {
  const { d } = useI18n();
  const { rooms } = d.home;

  return (
    <Section id="rooms" aria-labelledby="rooms-title" className="bg-paper">
      <Container>
        <Heading id="rooms-title">{rooms.title}</Heading>
        <p className="mt-3 max-w-2xl text-ink-soft">{rooms.lead}</p>
      </Container>
      <Container className="mt-8">
        <Carousel
          label={rooms.title}
          className="[--arrow-top:calc(50%-1.25rem)]"
          trackClassName="-mx-2 gap-0 rounded-3xl"
          slideClassName="w-[85%] px-2 md:w-1/2 lg:w-1/3"
        >
          {PHOTOS.map((name) => (
            <figure key={name}>
              <Photo
                src={`photos/${name}.jpg`}
                alt={d.photos[name]}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
              <figcaption className="mt-3 font-display text-[15px] font-semibold text-ink">{rooms.captions[name]}</figcaption>
            </figure>
          ))}
        </Carousel>
      </Container>
    </Section>
  );
}
