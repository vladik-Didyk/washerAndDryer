import { useLoaderData } from "react-router";
import { cities, cityPath, districtPath, districts } from "~/entities/area";
import { siteConfig } from "~/shared/config";
import { LinkList } from "~/shared/ui";
import { CtaBand } from "~/widgets/cta-band";
import { DeliveryCheck } from "~/widgets/delivery-check";
import { LocalLaundry } from "~/widgets/local-laundry";
import { MachineFits } from "~/widgets/machine-fits";
import { PageHero } from "~/widgets/page-hero";
import { Prices } from "~/widgets/prices";
import { StartRental } from "~/widgets/start-rental";
import { TrustStrip } from "~/widgets/trust-strip";
import type { loader } from "../loader";

const YORK_REGION = ["vaughan", "markham", "richmond-hill"];

// A Toronto district (entities/area): North York, Etobicoke, Scarborough, East York
// or York. Same structure as a city page, with its own local text and machine suggestions.
export default function DistrictPage() {
  const { district } = useLoaderData<typeof loader>();
  const { prices } = siteConfig;
  const toronto = cities.find((city) => city.slug === "toronto")!;
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
        photo={district.photo}
        price={prices.setText}
        priceLabel="a week for a washer + dryer set"
        otherPrice={`or $${prices.singleText} a week for one machine`}
      />
      <TrustStrip />

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

      <CtaBand title={`Ready to rent in ${district.name}?`} />
      <StartRental />
    </>
  );
}
