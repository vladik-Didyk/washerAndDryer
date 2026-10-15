import { useI18n } from "~/shared/i18n";
import { ArrowRight, Building2, LangLink } from "~/shared/ui";

// Home page: a short pointer to /landlords/. It sits between Prices and About, which bring
// their own padding.
export function LandlordsTeaser() {
  const { landlordsTeaser } = useI18n().d.home;
  return (
    <section aria-labelledby="landlords-teaser-title">
      <div className="container-page">
        <div className="flex flex-col gap-5 rounded-3xl border border-line bg-white p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="flex gap-4">
            <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-mint text-brand sm:flex">
              <Building2 className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h2 id="landlords-teaser-title" className="font-display text-2xl font-bold text-ink">
                {landlordsTeaser.title}
              </h2>
              <p className="mt-2 max-w-2xl text-ink-soft">{landlordsTeaser.text}</p>
            </div>
          </div>
          <LangLink href="/landlords/" className="btn btn-secondary shrink-0">
            {landlordsTeaser.link}
            <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
          </LangLink>
        </div>
      </div>
    </section>
  );
}
