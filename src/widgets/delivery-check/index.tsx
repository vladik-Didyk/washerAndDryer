import { PostalCodeChecker } from "~/features/postal-check";

// The postal-code checker in a mint band, for city and district pages. `spacing` sets the
// section's padding (drop the bottom when the next section brings its own).
export function DeliveryCheck({
  requestHref = "/start/",
  spacing = "py-16 sm:py-20",
}: {
  requestHref?: string;
  spacing?: string;
}) {
  return (
    <section aria-labelledby="delivery-check-title" className={spacing}>
      <div className="container-page">
        <div className="grid gap-6 rounded-3xl bg-brand-mint px-5 py-8 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-5">
            <h2 id="delivery-check-title" className="h2">
              Do we deliver to you?
            </h2>
            <p className="lead mt-3">
              Type your postal code. If the code doesn't tell us, text us your
              address and we'll confirm.
            </p>
          </div>
          <PostalCodeChecker requestHref={requestHref} className="lg:col-span-7" />
        </div>
      </div>
    </section>
  );
}
