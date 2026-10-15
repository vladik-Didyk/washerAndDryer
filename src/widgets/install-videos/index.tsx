// Manufacturer how-to videos, embedded from YouTube (they play from the owners' channels;
// nothing is copied). What an installation includes is on /faq/ (#installation).
import { useI18n } from "~/shared/i18n";
import { Container, Heading, Nest, Section } from "~/shared/ui";

// The YouTube ids; titles and sources are in the dictionary (home.videos.items).
const VIDEO_IDS = ["veEH0wF9LEU", "h-co6mCEKNk"] as const;

export function InstallVideos() {
  const { d, format } = useI18n();
  const { videos } = d.home;
  return (
    <Section id="install" aria-labelledby="install-title" className="bg-paper">
      <Container>
        <Heading id="install-title">{videos.title}</Heading>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          {VIDEO_IDS.map((id) => ({ id, ...videos.items[id] })).map((video) => (
            <article key={video.id}>
              <div className="aspect-video overflow-hidden rounded-2xl bg-ink/5">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <Nest>
                <Heading variant="cardSmall" className="mt-4">
                  {video.title}
                </Heading>
              </Nest>
              <p className="text-sm text-ink-soft">{format(videos.source, { source: video.source })}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
