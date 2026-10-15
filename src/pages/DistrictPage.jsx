import { siteConfig } from "../content/config";
import { cities } from "../content/cities";
import { districts } from "../content/districts";
import { machineTypes } from "../content/machines";
import { cityPath, districtPath } from "../content/routes";
import PageHero from "../components/PageHero";
import LocalLaundry from "../components/LocalLaundry";
import MachineFits from "../components/MachineFits";
import DeliveryCheck from "../components/DeliveryCheck";
import Prices from "../components/Prices";
import LinkList from "../components/LinkList";
import BookingForm from "../components/BookingForm";

const YORK_REGION = ["vaughan", "markham", "richmond-hill"];

// A Toronto district (src/content/districts.js): North York, Etobicoke, Scarborough, East York
// or York. Same structure as a city page, with its own local text and machine suggestions.
export default function DistrictPage({ district }) {
  const { prices } = siteConfig;
  const machine = machineTypes.find((type) => type.slug === district.machine);
  const toronto = cities.find((city) => city.slug === "toronto");
  const torontoLinks = [
    { href: cityPath(toronto), label: "All of Toronto" },
    ...districts
      .filter((other) => other.slug !== district.slug)
      .map((other) => ({ href: districtPath(other), label: other.name })),
  ];
  const cityLinks = [
    ...cities
      .filter((city) => city.slug !== "toronto")
      .map((city) => ({ href: cityPath(city), label: city.name })),
    { href: "/areas/", label: "All areas" },
  ];
  const yorkRegion = cities.filter((city) => YORK_REGION.includes(city.slug));

  return (
    <>
      <PageHero
        eyebrow={`${district.name} · Toronto`}
        title={`Washer & dryer rental in ${district.name}`}
        intro={district.intro}
        machine={machine}
        price={prices.setText}
        priceLabel="a week for a washer + dryer set"
        otherPrice={`or $${prices.singleText} a week for one machine`}
      />

      <LocalLaundry area={district}>
        {district.regionNote && (
          <p className="mb-8 rounded-2xl bg-brand-mint px-5 py-4 text-ink-soft">
            This page is about York in Toronto. Looking for York Region? See{" "}
            {yorkRegion.map((city, index) => (
              <span key={city.slug}>
                {index > 0 && (index === yorkRegion.length - 1 ? " and " : ", ")}
                <a href={cityPath(city)} className="text-link">
                  {city.name}
                </a>
              </span>
            ))}
            .
          </p>
        )}
      </LocalLaundry>

      <MachineFits title={`Machines that usually fit in ${district.name}`} fits={district.fits} />
      <DeliveryCheck spacing="pt-16 sm:pt-20" />
      <Prices />

      <section aria-label="Other areas" className="section pt-0 sm:pt-0 lg:pt-0">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <LinkList id="toronto-links-title" title="Other parts of Toronto" links={torontoLinks} />
          <LinkList id="city-links-title" title="Around Toronto" links={cityLinks} />
        </div>
      </section>

      <BookingForm />
    </>
  );
}
