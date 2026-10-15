import { MapPin, MessageSquare } from "lucide-react";
import { siteConfig } from "../content/config";
import { cities } from "../content/cities";
import { districts } from "../content/districts";
import { cityPath, districtPath } from "../content/routes";
import PageIntro from "../components/PageIntro";
import PostalCodeChecker from "../components/PostalCodeChecker";
import BookingForm from "../components/BookingForm";

// One card per area; the link covers the whole card.
function AreaCard({ href, name, label, teaser }) {
  return (
    <li className="relative rounded-2xl border border-line bg-white p-5 transition-colors hover:border-brand hover:bg-brand-mint/40">
      {label && <p className="text-sm font-semibold text-ink-muted">{label}</p>}
      <h3 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
        <MapPin className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
        <a
          href={href}
          className="underline decoration-brand/30 decoration-2 underline-offset-4 after:absolute after:inset-0 after:rounded-2xl hover:text-brand"
        >
          {name}
        </a>
      </h3>
      <p className="mt-2 text-ink-soft">{teaser}</p>
    </li>
  );
}

// /areas/: every city and Toronto district we deliver to, with the postal-code checker.
export default function AreasPage() {
  const { phone, prices } = siteConfig;
  const [toronto, ...otherCities] = cities;

  return (
    <>
      <PageIntro
        icon={MapPin}
        eyebrow="Toronto & the GTA"
        title="Where we deliver"
        aside={
          <div className="rounded-3xl bg-brand-mint p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-ink">Do we deliver to you?</h2>
            <PostalCodeChecker className="mt-5" />
          </div>
        }
      >
        <p className="lead mt-5 max-w-2xl">
          We deliver rental washers and dryers across Toronto and five cities around
          it. Type your postal code to check, or find your area below.
        </p>
        <p className="mt-4 font-display text-lg font-bold text-brand">
          {`Same price in every area: $${prices.setText} a week for a set, $${prices.singleText} for one machine.`}
        </p>
        <p className="mt-1 text-sm text-ink-muted">Prices in Canadian dollars. No HST charged.</p>
        <p className="mt-3 text-ink-soft">Farther away? Text us your address and we'll tell you.</p>
        <a href={phone.sms} className="btn btn-secondary mt-6">
          <MessageSquare className="h-[18px] w-[18px]" aria-hidden="true" />
          Text {phone.display}
        </a>
      </PageIntro>

      <section
        aria-labelledby="toronto-title"
        className="section border-y border-line bg-white"
      >
        <div className="container-page">
          <h2 id="toronto-title" className="h2">
            Toronto
          </h2>
          <p className="lead mt-4 max-w-3xl">
            All of the City of Toronto. North York, Etobicoke, Scarborough, East
            York and York each have their own page.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AreaCard href={cityPath(toronto)} name={toronto.name} label="Whole city" teaser={toronto.teaser} />
            {districts.map((district) => (
              <AreaCard
                key={district.slug}
                href={districtPath(district)}
                name={district.name}
                label="Toronto district"
                teaser={district.teaser}
              />
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="gta-title" className="section">
        <div className="container-page">
          <h2 id="gta-title" className="h2">
            Around Toronto
          </h2>
          <p className="lead mt-4 max-w-3xl">
            West into Peel Region and north into York Region.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherCities.map((city) => (
              <AreaCard key={city.slug} href={cityPath(city)} name={city.name} teaser={city.teaser} />
            ))}
          </ul>
          <p className="mt-6 text-ink-soft">
            Farther away? Call or text{" "}
            <a href={phone.tel} className="text-link whitespace-nowrap">
              {phone.display}
            </a>{" "}
            and ask.
          </p>
        </div>
      </section>

      <BookingForm />
    </>
  );
}
