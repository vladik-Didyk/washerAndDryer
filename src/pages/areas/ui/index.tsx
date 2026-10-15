import { AreaCard, cityPath, districtPath, getCities, getDistricts } from "~/entities/area";
import { PostalCodeChecker } from "~/features/postal-check";
import { siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { MapPin, MessageSquare } from "~/shared/ui";
import { PageIntro } from "~/widgets/page-intro";
import { StartRental } from "~/widgets/start-rental";

// /areas/: every city and Toronto district we deliver to, with the postal-code checker.
export default function AreasPage() {
  const { phone } = siteConfig;
  const { d, rich } = useI18n();
  const text = d.areas.index;
  const [toronto, ...otherCities] = getCities(d);

  return (
    <>
      <PageIntro
        icon={MapPin}
        eyebrow={text.eyebrow}
        title={text.title}
        aside={
          <div className="rounded-3xl bg-brand-mint p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-ink">{text.checkTitle}</h2>
            <PostalCodeChecker className="mt-5" />
          </div>
        }
      >
        <p className="lead mt-5 max-w-2xl">{text.lead}</p>
        <p className="mt-4 font-display text-lg font-bold text-brand">{text.samePrice}</p>
        <p className="mt-1 text-sm text-ink-muted">{d.common.pricesNote}</p>
        <p className="mt-3 text-ink-soft">{text.fartherText}</p>
        <a href={phone.sms} className="btn btn-secondary mt-6">
          <MessageSquare className="h-[18px] w-[18px]" aria-hidden="true" />
          {d.common.textPhone}
        </a>
      </PageIntro>

      <section
        aria-labelledby="toronto-title"
        className="section border-y border-line bg-white"
      >
        <div className="container-page">
          <h2 id="toronto-title" className="h2">
            {text.torontoTitle}
          </h2>
          <p className="lead mt-4 max-w-3xl">{text.torontoLead}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AreaCard href={cityPath(toronto)} name={toronto.name} label={text.wholeCity} teaser={toronto.teaser} />
            {getDistricts(d).map((district) => (
              <AreaCard
                key={district.slug}
                href={districtPath(district)}
                name={district.name}
                label={text.district}
                teaser={district.teaser}
              />
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="gta-title" className="section">
        <div className="container-page">
          <h2 id="gta-title" className="h2">
            {text.aroundTitle}
          </h2>
          <p className="lead mt-4 max-w-3xl">{text.aroundLead}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherCities.map((city) => (
              <AreaCard key={city.slug} href={cityPath(city)} name={city.name} teaser={city.teaser} />
            ))}
          </ul>
          <p className="mt-6 text-ink-soft">
            {rich(d.common.fartherAwayCall, {
              phoneLink: (
                <a href={phone.tel} className="text-link whitespace-nowrap">
                  {phone.display}
                </a>
              ),
            })}
          </p>
        </div>
      </section>

      <StartRental />
    </>
  );
}
