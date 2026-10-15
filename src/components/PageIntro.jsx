// The heading block of an inner page: eyebrow line, the page's one h1, then `children`
// (intro text, buttons). `aside` fills a right-hand column on wide screens; without it the
// text keeps to `textWidth`.
export default function PageIntro({ icon: Icon, eyebrow, title, aside, textWidth = "max-w-3xl", children }) {
  const text = (
    <>
      {eyebrow && (
        <p className="inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-brand">
          {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
          {eyebrow}
        </p>
      )}
      <h1
        id="hero-title"
        className="mt-3 font-display text-[2.25rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[2.75rem] lg:text-[3rem]"
      >
        {title}
      </h1>
      {children}
    </>
  );

  return (
    <section id="top" aria-labelledby="hero-title" className="overflow-hidden pb-12 pt-8 sm:pt-10 lg:pb-14">
      {aside ? (
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">{text}</div>
          <div className="lg:col-span-5">{aside}</div>
        </div>
      ) : (
        <div className="container-page">
          <div className={textWidth}>{text}</div>
        </div>
      )}
    </section>
  );
}
