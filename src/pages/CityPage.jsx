import { siteConfig } from "../content/config";
import { cities } from "../content/cities";
import { districts } from "../content/districts";
import { machineTypes } from "../content/machines";
import { cityPath, districtPath } from "../content/routes";
import PageHero from "../components/PageHero";
import LocalLaundry from "../components/LocalLaundry";
import DeliveryCheck from "../components/DeliveryCheck";
import Machines from "../components/Machines";
import HowItWorks from "../components/HowItWorks";
import Prices from "../components/Prices";
import LinkList from "../components/LinkList";
import BookingForm from "../components/BookingForm";

// Toronto's district names link to their own pages (src/content/districts.js).
const districtLinks = Object.fromEntries(
  districts.map((district) => [district.name, districtPath(district)]),
);

export default function CityPage({ city }) {
  const { prices } = siteConfig;
  const machine = machineTypes.find((type) => type.slug === city.machine);
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
        machine={machine}
        price={prices.setText}
        priceLabel="a week for a washer + dryer set"
        otherPrice={`or $${prices.singleText} a week for one machine`}
      />

      <LocalLaundry area={city} neighbourhoodLinks={isToronto ? districtLinks : {}} />
      <DeliveryCheck />
      <Machines />
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

      <BookingForm />
    </>
  );
}
