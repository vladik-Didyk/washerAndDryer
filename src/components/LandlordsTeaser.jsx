import { ArrowRight, Building2 } from "lucide-react";

// Home page: a short pointer to /landlords/. It sits between Prices and About, which bring
// their own padding.
export default function LandlordsTeaser() {
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
                Landlord?
              </h2>
              <p className="mt-2 max-w-2xl text-ink-soft">
                Your tenants can rent from us directly, with nothing for you to pay, or
                you can rent machines for your units. Repairs are included either way.
              </p>
            </div>
          </div>
          <a href="/landlords/" className="btn btn-secondary shrink-0">
            Laundry for landlords
            <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
