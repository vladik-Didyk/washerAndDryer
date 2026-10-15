// Manufacturer how-to videos, embedded from YouTube (they play from the owners' channels;
// nothing is copied). The step notes underneath are ours.
const videos = [
  {
    id: "veEH0wF9LEU",
    title: "Installing a laundry centre (washer and dryer in one unit)",
    source: "W Service on YouTube",
    steps: [
      "Check the space: a 24-inch unit is about 70 inches tall.",
      "Power: the dryer needs its own 240-volt outlet, 3- or 4-prong.",
      "Vent: a 4-inch metal duct from the dryer to the outside, as short as possible.",
      "Water: hot and cold hoses go to the matching inlets on the washer.",
      "Drain: the drain hose goes into the standpipe or laundry tub and is tied in place.",
      "Level: the feet are adjusted until the machine sits level and doesn't rock.",
    ],
  },
  {
    id: "h-co6mCEKNk",
    title: "Connecting the dryer vent duct with clamps",
    source: "Imperial Manufacturing Group on YouTube",
    steps: [
      "The duct slides over the round exhaust on the back of the dryer.",
      "A clamp holds each end tight, so lint and hot air don't leak.",
      "The duct runs in one smooth curve to the wall vent, with no kinks or crushed spots.",
      "A blocked or crushed duct is a fire risk, so we check it on every install.",
    ],
  },
];

export function InstallVideos() {
  return (
    <section id="install" aria-labelledby="install-title" className="section bg-paper">
      <div className="container-page">
        <h2 id="install-title" className="h2">
          How installation works
        </h2>
        <p className="mt-3 max-w-2xl text-ink-soft">
          We do all of this for you. These manufacturer videos show what goes into a proper hookup.
        </p>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          {videos.map((video) => (
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
              <p className="text-sm text-ink-soft">Video: {video.source}</p>
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
