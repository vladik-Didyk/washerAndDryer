import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Pause, Play } from "lucide-react";
import { testimonials } from "../content/testimonials";

// Not rendered at the moment: add it back to App.jsx once src/content/testimonials.js
// holds real customer reviews. Renders nothing while that list is empty.
export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const intervalRef = useRef(null);
  const total = testimonials.length;
  const canRotate = total > 1;

  const next = useCallback(
    () => setCurrent((i) => (i + 1) % total),
    [total],
  );
  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + total) % total),
    [total],
  );

  // Auto-play
  useEffect(() => {
    if (playing && canRotate) {
      intervalRef.current = setInterval(next, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing, canRotate, next]);

  const restartTimer = () => {
    clearInterval(intervalRef.current);
    if (playing && canRotate) {
      intervalRef.current = setInterval(next, 5000);
    }
  };

  const goTo = (index) => {
    setCurrent(index);
    restartTimer();
  };

  const handlePrev = () => {
    prev();
    restartTimer();
  };

  const handleNext = () => {
    next();
    restartTimer();
  };

  if (total === 0) return null;

  const t = testimonials[current];
  const controlClass =
    "rounded-full border border-line bg-white p-2 text-ink-soft transition-colors hover:bg-brand-mint hover:text-brand-dark";

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="section bg-white"
    >
      <div className="container-page">
        <h2 id="testimonials-title" className="h2">
          What our customers say
        </h2>

        <div className="mt-10 max-w-3xl">
          <div
            className="relative min-h-[240px] rounded-3xl border border-line bg-paper p-8"
            role="region"
            aria-roledescription="carousel"
            aria-label="Customer reviews"
          >
            <div
              key={t.id}
              className="flex flex-col"
              role="group"
              aria-roledescription="slide"
              aria-label={`${current + 1} of ${total}`}
            >
              {t.avatar && (
                <img
                  src={t.avatar}
                  alt={`Photo of ${t.name}`}
                  className="mb-4 h-16 w-16 rounded-full object-cover"
                  loading="lazy"
                  width="64"
                  height="64"
                />
              )}

              {t.rating && (
                <div
                  className="mb-4 flex gap-1"
                  role="img"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      aria-hidden="true"
                      className={`h-5 w-5 ${
                        i < t.rating ? "fill-gold text-gold" : "text-line"
                      }`}
                    />
                  ))}
                </div>
              )}

              <blockquote className="mb-6 text-lg leading-relaxed text-ink">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              <div>
                <p className="font-display font-semibold text-ink">{t.name}</p>
                {t.location && (
                  <p className="text-sm text-ink-muted">{t.location}</p>
                )}
              </div>
            </div>
          </div>

          {canRotate && (
            <div className="mt-6 flex items-center gap-4">
              <button
                type="button"
                onClick={handlePrev}
                className={controlClass}
                aria-label="Previous review"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((item, i) => (
                  <button
                    type="button"
                    key={item.id ?? i}
                    onClick={() => goTo(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === current ? "w-8 bg-brand" : "w-2.5 bg-line hover:bg-ink-muted"
                    }`}
                    aria-label={`Go to review ${i + 1}`}
                    aria-current={i === current ? "true" : undefined}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className={controlClass}
                aria-label="Next review"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className={controlClass}
                aria-label={playing ? "Pause auto-play" : "Resume auto-play"}
              >
                {playing ? (
                  <Pause className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Play className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
