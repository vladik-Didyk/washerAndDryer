import { Phone } from "lucide-react";
import { siteConfig } from "../content/config";

export default function NotFoundPage() {
  const { phone } = siteConfig;
  return (
    <section aria-labelledby="hero-title" className="section">
      <div className="container-page max-w-3xl">
        <h1 id="hero-title" className="h2">
          Page not found
        </h1>
        <p className="lead mt-4">
          This page doesn't exist. Washer &amp; dryer rental in Toronto and the
          GTA is ${siteConfig.prices.set} a month for a set, ${siteConfig.prices.single} for one machine.
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
