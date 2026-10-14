const steps = [
  {
    title: "Tell us what fits",
    text: "Send your area, closet width and outlet type (3- or 4-prong). A photo of the closet helps.",
  },
  {
    title: "Get a quote",
    text: "We confirm the machine, the delivery and installation price and the start date before you pay anything.",
  },
  {
    title: "We deliver and hook it up",
    text: "Your old machine goes with us at no charge.",
  },
  {
    title: "Repairs on us",
    text: "If it breaks while you rent it, we repair or replace it.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      aria-labelledby="how-title"
      className="on-dark section bg-brand text-white"
    >
      <div className="container-page">
        <h2 id="how-title" className="h2 text-white">
          How it works
        </h2>

        <div className="relative mt-10 lg:mt-12">
          {/* Desktop: one line joining the four step numbers (4 columns, 24px gaps). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-6 top-6 hidden h-0.5 w-[calc(75%+18px)] bg-white/25 lg:block"
          />
          <ol className="relative grid gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {steps.map((step, index) => (
              <li key={step.title} className="relative flex gap-4 sm:block">
                {/* Phones: a vertical line down to the next number. */}
                {index < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-6 left-6 top-14 w-0.5 -translate-x-1/2 bg-white/25 sm:hidden"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold font-display text-xl font-extrabold text-ink"
                >
                  {index + 1}
                </span>
                <div className="pt-2.5 sm:pt-0">
                  <h3 className="font-display text-xl font-bold leading-snug text-white sm:mt-5">
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-white/85">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
