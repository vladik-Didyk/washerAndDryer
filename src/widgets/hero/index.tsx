import { usePrices } from "~/entities/offer";
import { pagePaths } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { heroPhoto, photoFiles } from "~/shared/lib";
import { Button, Container, Eyebrow, Heading, MapPin, PhoneButton, Section, WasPrice } from "~/shared/ui";

// The laundry-room photo. Phones get the portrait crop as a band above the text; from 640px the
// wide photo; from 1024px it fills the right half of the hero, out to the edge of the window.
// It is the page's largest image, so it loads first (and the home loader preloads the same
// files, from the same `heroPhoto` settings).
function HeroPhoto({ className = "" }: { className?: string }) {
  const { wide, narrow } = heroPhoto;
  const { d } = useI18n();
  const wideFiles = photoFiles(wide.src);
  const narrowFiles = photoFiles(narrow.src);
  if (!wideFiles || !narrowFiles) return null;

  return (
    <figure className={`relative ${className}`}>
      <picture className="contents">
        {wideFiles.webpSrcSet && (
          <source media={wide.media} type="image/webp" srcSet={wideFiles.webpSrcSet} sizes={wide.sizes} />
        )}
        <source media={wide.media} srcSet={wideFiles.jpegSrcSet} sizes={wide.sizes} />
        {narrowFiles.webpSrcSet && (
          <source type="image/webp" srcSet={narrowFiles.webpSrcSet} sizes={narrow.sizes} />
        )}
        <img
          src={narrowFiles.src}
          srcSet={narrowFiles.jpegSrcSet}
          sizes={narrow.sizes}
          width={narrowFiles.width}
          height={narrowFiles.height}
          alt={d.home.hero.photoAlt}
          fetchPriority="high"
          className="aspect-[4/3] w-full object-cover object-[50%_88%] sm:aspect-[2/1] sm:object-[40%_60%] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full lg:rounded-bl-[3rem] lg:object-[40%_50%]"
        />
      </picture>
      <figcaption className="absolute bottom-3 right-3 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-medium text-white sm:bottom-4 sm:right-4">
        {d.home.hero.photoCaption}
      </figcaption>
    </figure>
  );
}

// Home hero: the weekly price is the headline fact, then the two ways to start (the rental
// request or a call). The postal-code check sits under the service-area map. Phones: photo on top, text below it, never over it.
// From 1024px the text keeps to the page's left edge and the photo takes the other half.
export function Hero() {
  const { d, rich, moneyParts } = useI18n();
  const { hero } = d.home;
  const prices = usePrices();
  // The big figure, with its currency sign drawn smaller beside it: "$" and "12.50".
  const tag = moneyParts(prices.set.current);

  return (
    <Section id="top" aria-labelledby="hero-title" padded={false} nest={false} className="overflow-hidden">
      <div className="lg:grid lg:min-h-[37rem] lg:grid-cols-[minmax(2rem,1fr)_minmax(0,35rem)_minmax(0,33rem)_minmax(2rem,1fr)]">
        <HeroPhoto className="lg:col-[3/5] lg:row-start-1" />

        <Container className="pb-12 pt-8 sm:pb-14 sm:pt-10 lg:col-[2/3] lg:row-start-1 lg:mx-0 lg:max-w-none lg:self-center lg:px-0 lg:py-14 lg:pr-10">
          <Eyebrow icon={MapPin}>{hero.eyebrow}</Eyebrow>
          <Heading
            id="hero-title"
            variant="none"
            className="mt-3 font-display text-[2.375rem] font-extrabold leading-[1.06] tracking-tight text-ink sm:text-[3rem] lg:text-[2.75rem] xl:text-[3rem]"
          >
            {hero.title}
          </Heading>

          <div className="mt-5 sm:mt-6">
            <p className="sr-only">{hero.priceSummary}</p>
            {/* Price tag: small "$", big figure, label hung from the top of the digits.
                Phones have no room beside the figure, so there the label sits under it. */}
            <div
              aria-hidden="true"
              className="flex flex-wrap items-start font-display text-[5.5rem] font-extrabold leading-none text-brand sm:flex-nowrap sm:text-[6.5rem] lg:text-[6rem]"
            >
              <span className="mt-[0.34em] text-[0.36em] leading-none">{tag.currency}</span>
              <span className="tracking-[-0.05em]">{tag.value}</span>
              <span className="mt-2 flex w-full gap-[0.3em] text-[0.2em] font-bold leading-[1.15] text-ink sm:ml-[0.5em] sm:mt-[0.62em] sm:w-auto sm:flex-col sm:gap-0">
                <span>{hero.aWeek}</span>
                <span>{hero.forTheSet}</span>
              </span>
            </div>
            <WasPrice price={prices.set} className="mt-2 block font-display text-2xl font-bold text-ink-muted" />
            <p aria-hidden="true" className="mt-3 text-lg text-ink-soft">
              {rich(hero.orSingle, { price: <span className="font-semibold text-ink">{hero.singlePrice}</span> })}
            </p>
            <p className="mt-2 text-sm text-ink-muted">{d.common.pricesNote}</p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={pagePaths.start} className="sm:px-5">
              {d.common.startRental}
            </Button>
            <PhoneButton kind="call" variant="secondary" label={d.common.callOrText} className="sm:px-5" />
          </div>
        </Container>
      </div>
    </Section>
  );
}
