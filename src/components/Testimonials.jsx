import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Pause, Play } from "lucide-react";
import { testimonials } from "../content/testimonials";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const intervalRef = useRef(null);
  const total = testimonials.length;

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
    if (playing) {
      intervalRef.current = setInterval(next, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing, next]);

  const goTo = (index) => {
    setCurrent(index);
    // Reset timer on manual navigation
    clearInterval(intervalRef.current);
    if (playing) {
      intervalRef.current = setInterval(next, 5000);
    }
  };

  const handlePrev = () => {
    prev();
    clearInterval(intervalRef.current);
    if (playing) {
      intervalRef.current = setInterval(next, 5000);
    }
  };

  const handleNext = () => {
    next();
    clearInterval(intervalRef.current);
    if (playing) {
      intervalRef.current = setInterval(next, 5000);
    }
  };

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      className="section-padding bg-white dark:bg-gray-900"
    >
      <div className="container-main">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
            Real feedback from homeowners across the Greater Toronto Area.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          {/* Testimonial Card */}
          <div className="card relative min-h-[280px] text-center" role="region" aria-roledescription="carousel" aria-label="Customer testimonials">
            <div
              key={t.id}
              className="animate-fade-in flex flex-col items-center"
              role="group"
              aria-roledescription="slide"
              aria-label={`${current + 1} of ${total}`}
            >
              <img
                src={t.avatar}
                alt={`Photo of ${t.name}`}
                className="mb-4 h-16 w-16 rounded-full object-cover ring-2 ring-primary-400/30"
                loading="lazy"
                width="64"
                height="64"
              />

              {/* Stars */}
              <div className="mb-4 flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < t.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>

              <blockquote className="mb-6 text-lg leading-relaxed text-gray-700 italic dark:text-gray-300">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {t.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t.location}
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={handlePrev}
              className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-400 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-primary-950/50 dark:hover:text-primary-400"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-primary-400"
                      : "w-2.5 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === current ? "true" : undefined}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-400 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-primary-950/50 dark:hover:text-primary-400"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <button
              onClick={() => setPlaying((p) => !p)}
              className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-400 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-primary-950/50 dark:hover:text-primary-400"
              aria-label={playing ? "Pause auto-play" : "Resume auto-play"}
            >
              {playing ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
