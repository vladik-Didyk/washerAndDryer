import { Clock, Facebook, MapPin, MessageSquare, Phone } from "lucide-react";
import { siteConfig } from "../content/config";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  const { phone, hours, facebook, serviceAreas, companyName, tagline, location } =
    siteConfig;
  const areaList = serviceAreas
    .map((area) =>
      area.districts ? `${area.name} (${area.districts.join(", ")})` : area.name,
    )
    .join(", ");

  return (
    <footer className="on-dark bg-brand-dark text-white/85">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div className="lg:col-span-4">
          <a href="#top" className="inline-flex items-center gap-3 rounded-xl">
            {/* White tile keeps the green logo visible on the dark footer. */}
            <span className="rounded-xl bg-white p-1">
              <Logo className="h-11 w-11" />
            </span>
            <span
              aria-hidden="true"
              className="font-display text-lg font-bold leading-tight text-white"
            >
              {companyName}
            </span>
          </a>
          <p className="mt-5">{tagline}</p>
          <p className="mt-2 flex items-center gap-2 text-white/70">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
            {location}
          </p>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-display text-sm font-semibold text-gold">
            Phone
          </h2>
          <p className="mt-3 font-display text-xl font-bold text-white">
            {phone.display}
          </p>
          <ul className="mt-3 flex gap-5">
            <li>
              <a
                href={phone.tel}
                className="inline-flex items-center gap-2 font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call
              </a>
            </li>
            <li>
              <a
                href={phone.sms}
                className="inline-flex items-center gap-2 font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                Text
              </a>
            </li>
          </ul>

          <h2 className="mt-8 font-display text-sm font-semibold text-gold">
            Hours
          </h2>
          <ul className="mt-3 space-y-1">
            {hours.map((entry) => (
              <li key={entry.days} className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-white/60" aria-hidden="true" />
                {entry.days}: {entry.time.toLowerCase()}
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-5">
          <h2 className="font-display text-sm font-semibold text-gold">
            Service area
          </h2>
          <p className="mt-3 leading-relaxed">{areaList}.</p>
          <p className="mt-1 text-white/70">Farther away? Ask us.</p>

          <a
            href={facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
          >
            <Facebook className="h-4 w-4" aria-hidden="true" />
            Facebook page
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>

      <div className="border-t border-white/15">
        <p className="container-page py-6 text-sm text-white/70">
          © {year} {companyName}
        </p>
      </div>
    </footer>
  );
}
