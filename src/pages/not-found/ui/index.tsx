import { siteConfig } from "~/shared/config";
import { Phone } from "~/shared/ui";

// The 404 page: rendered by the root error boundary for any unknown URL (and for drafts in a
// normal deployment), with the status 404.
export function NotFoundPage() {
  const { phone, prices } = siteConfig;
  return (
    <section aria-labelledby="hero-title" className="section">
      <div className="container-page max-w-3xl">
        <h1 id="hero-title" className="h2">
          Page not found
        </h1>
        <p className="lead mt-4">
          This page doesn't exist. Washer &amp; dryer rental in Toronto and the GTA is $
          {prices.setText} a week for a set, ${prices.singleText} for one machine.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="/" className="btn btn-primary">
            Go to the home page
          </a>
          <a href={phone.tel} className="btn btn-secondary">
            <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
            Call {phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
