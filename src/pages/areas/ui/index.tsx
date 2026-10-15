import { AreaCard, cities, cityPath, districtPath, districts } from "~/entities/area";
import { PostalCodeChecker } from "~/features/postal-check";
import { siteConfig } from "~/shared/config";
import { MapPin, MessageSquare } from "~/shared/ui";
import { PageIntro } from "~/widgets/page-intro";
import { StartRental } from "~/widgets/start-rental";

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

      <StartRental />
    </>
  );
}
