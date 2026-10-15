import { PostalCodeChecker } from "~/features/postal-check";
import { useI18n } from "~/shared/i18n";

// The postal-code checker in a mint band, for city and district pages. `spacing` sets the
// section's padding (drop the bottom when the next section brings its own).
export function DeliveryCheck({
  requestHref = "/start/",
  spacing = "py-16 sm:py-20",
}: {
  requestHref?: string;
  spacing?: string;
}) {
  const { page } = useI18n().d.areas;
  return (
    <section aria-labelledby="delivery-check-title" className={spacing}>
      <div className="container-page">
        <div className="grid gap-6 rounded-3xl bg-brand-mint px-5 py-8 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-5">
            <h2 id="delivery-check-title" className="h2">
              {page.deliveryTitle}
            </h2>
            <p className="lead mt-3">{page.deliveryLead}</p>
          </div>
          <PostalCodeChecker requestHref={requestHref} className="lg:col-span-7" />
        </div>
      </div>
    </section>
  );
}
