// Manufacturer how-to videos, embedded from YouTube (they play from the owners' channels;
// nothing is copied). The step notes underneath are ours.
import { useI18n } from "~/shared/i18n";

// The YouTube ids; titles, sources and step notes are in the dictionary (home.videos.items).
const VIDEO_IDS = ["veEH0wF9LEU", "h-co6mCEKNk"] as const;

export function InstallVideos() {
  const { d, format } = useI18n();
  const { videos } = d.home;
  return (
    <section id="install" aria-labelledby="install-title" className="section bg-paper">
      <div className="container-page">
        <h2 id="install-title" className="h2">
          {videos.title}
        </h2>
        <p className="mt-3 max-w-2xl text-ink-soft">{videos.lead}</p>
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
              <h3 className="mt-4 font-display text-xl font-bold text-ink">{video.title}</h3>
              <p className="text-sm text-ink-soft">{format(videos.source, { source: video.source })}</p>
              <ul className="mt-3 space-y-1.5 text-ink-soft">
                {video.steps.map((step) => (
                  <li key={step} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {step}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
