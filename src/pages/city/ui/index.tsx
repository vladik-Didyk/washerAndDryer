import { useLoaderData } from "react-router";
import { cities, cityPath, districtPath, districts } from "~/entities/area";
import { siteConfig } from "~/shared/config";
import { LinkList } from "~/shared/ui";
import { CtaBand } from "~/widgets/cta-band";
import { DeliveryCheck } from "~/widgets/delivery-check";
import { HowItWorks } from "~/widgets/how-it-works";
import { LocalLaundry } from "~/widgets/local-laundry";
import { MachineShowcase } from "~/widgets/machine-showcase";
import { PageHero } from "~/widgets/page-hero";
import { Prices } from "~/widgets/prices";
import { StartRental } from "~/widgets/start-rental";
import { TrustStrip } from "~/widgets/trust-strip";
import type { loader } from "../loader";

// Toronto's district names link to their own pages (entities/area).
const districtLinks = Object.fromEntries(
  districts.map((district) => [district.name, districtPath(district)]),
);

// /<city>/: one city we deliver to.
export default function CityPage() {
  const { city } = useLoaderData<typeof loader>();
  const { prices } = siteConfig;
  const isToronto = city.slug === "toronto";
  const otherCities = [
    ...cities
      .filter((other) => other.slug !== city.slug)
      .map((other) => ({ href: cityPath(other), label: other.name })),
    { href: "/areas/", label: "All areas" },
  ];

  return (
    <>
      <PageHero
        eyebrow={`${city.name} · ${siteConfig.companyName}`}
        title={`Washer & dryer rental in ${city.name}`}
        intro={city.intro}
        photo={city.photo}
        price={prices.setText}
        priceLabel="a week for a washer + dryer set"
        otherPrice={`or $${prices.singleText} a week for one machine`}
      />
      <TrustStrip />

      <LocalLaundry area={city} neighbourhoodLinks={isToronto ? districtLinks : {}} />
      <DeliveryCheck />
      <MachineShowcase />
      <Prices />
      <HowItWorks />

      <section aria-label="Other areas" className="section">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          {isToronto && (
            <LinkList
              id="districts-title"
              title="Toronto districts"
              links={districts.map((district) => ({
                href: districtPath(district),
                label: district.name,
              }))}
            />
          )}
          <div>
            <LinkList id="other-areas-title" title="Other areas we serve" links={otherCities} />
            <p className="mt-4 text-ink-soft">Farther away? Ask us.</p>
          </div>
        </div>
      </section>

      <CtaBand title={`Ready to rent in ${city.name}?`} />
      <StartRental />
    </>
  );
}
