import { useLoaderData } from "react-router";
import { YORK_REGION, cityPath, districtPath, findDistrict, getCities, getDistricts } from "~/entities/area";
import { usePrices } from "~/entities/offer";
import { useI18n } from "~/shared/i18n";
import { pagePaths } from "~/shared/config";
import { Container, LangLink, LinkList, Section, WasPrice } from "~/shared/ui";
import { CtaBand } from "~/widgets/cta-band";
import { DeliveryCheck } from "~/widgets/delivery-check";
import { LocalLaundry } from "~/widgets/local-laundry";
import { MachineFits } from "~/widgets/machine-fits";
import { PageHero } from "~/widgets/page-hero";
import { Prices } from "~/widgets/prices";
import { StartRental } from "~/widgets/start-rental";
import { TrustStrip } from "~/widgets/trust-strip";
import type { loader } from "../loader";

// A Toronto district (entities/area): North York, Etobicoke, Scarborough, East York
// or York. Same structure as a city page, with its own local text and machine suggestions.
export default function DistrictPage() {
  const { slug } = useLoaderData<typeof loader>();
  const { d, format, money, rich } = useI18n();
  const text = d.areas.page;
  const district = findDistrict(d, slug)!;
  const prices = usePrices();
  const cities = getCities(d);
  const toronto = cities.find((city) => city.slug === "toronto")!;
  const torontoLinks = [
    { href: cityPath(toronto), label: text.allOfToronto },
    ...getDistricts(d)
      .filter((other) => other.slug !== district.slug)
      .map((other) => ({ href: districtPath(other), label: other.name })),
  ];
  const cityLinks = [
    ...cities.filter((city) => city.slug !== "toronto").map((city) => ({ href: cityPath(city), label: city.name })),
    { href: pagePaths.areas, label: d.common.allAreas },
  ];
  const yorkRegion = cities.filter((city) => YORK_REGION.includes(city.slug));

  return (
    <>
      <PageHero
        eyebrow={format(text.districtEyebrow, { place: district.name })}
        title={format(text.title, { place: district.name })}
        intro={district.intro}
        photo={district.photo}
        price={money(prices.set.current)}
        wasPrice={<WasPrice price={prices.set} className="font-display text-lg font-bold text-ink-muted" />}
        priceLabel={text.priceLabel}
        otherPrice={text.otherPrice}
      />
      <TrustStrip />

      <LocalLaundry area={district}>
        {district.regionNote && (
          <p className="mb-8 rounded-2xl bg-brand-mint px-5 py-4 text-ink-soft">
            {rich(text.yorkNote, {
              cities: yorkRegion.map((city, index) => (
                <span key={city.slug}>
                  {index > 0 && (index === yorkRegion.length - 1 ? text.listAnd : text.listComma)}
                  <LangLink href={cityPath(city)} className="text-link">
                    {city.name}
                  </LangLink>
                </span>
              )),
            })}
          </p>
        )}
      </LocalLaundry>

      <MachineFits title={format(text.fitsTitle, { place: district.name })} fits={district.fits} />
      <DeliveryCheck spacing="pt-16 sm:pt-20" />
      <Prices />

      <Section aria-label={text.otherAreasLabel} className="pt-0 sm:pt-0 lg:pt-0">
        <Container className="grid gap-10 lg:grid-cols-2">
          <LinkList id="toronto-links-title" title={text.otherToronto} links={torontoLinks} />
          <LinkList id="city-links-title" title={text.aroundToronto} links={cityLinks} />
        </Container>
      </Section>

      <CtaBand title={format(text.ctaTitle, { place: district.name })} />
      <StartRental />
    </>
  );
}
