import { usePrices } from "~/entities/offer";
import { pagePaths } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { heroPhoto, photoFiles } from "~/shared/lib";
import {
  ArrowRight,
  Building2,
  Button,
  Container,
  Eyebrow,
  Heading,
  LangLink,
  MapPin,
  PhoneButton,
  Photo,
  Section,
  WasPrice,
  Wrench,
} from "~/shared/ui";

// The hero's laundry-room photo. Phones get the portrait crop as a band under the text;
// from 640px the wide photo; from 1024px it fills the right half of the slide, out to the edge
// of the window. It is the page's largest image on desktop, so it loads first (and the home loader
// preloads the same files, from the same `heroPhoto` settings).
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
          className={photoClass + " object-[50%_88%] sm:object-[40%_60%] lg:object-[40%_50%]"}
        />
      </picture>
      <figcaption className={captionClass}>{d.home.hero.photoCaption}</figcaption>
    </figure>
  );
}

const photoClass =
  "aspect-[16/10] w-full object-cover sm:aspect-[2/1] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full lg:rounded-bl-[3rem]";
const captionClass =
  "absolute bottom-3 right-3 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-medium text-white sm:bottom-4 sm:right-4";

// Home hero: the weekly price and the two ways to start, beside the laundry-room photo. It
// stands still (no carousel): phones get the text first, so the price and both buttons fit
// the first screen, and the photo as a band under them; from 1024px the photo fills the right
// half, out to the edge of the window. Repairs and buildings follow as two tiles (HeroTiles).
export function Hero() {
  const { d, rich, moneyParts } = useI18n();
  const { hero } = d.home;
  const prices = usePrices();
  // The big figure, with its currency sign drawn smaller beside it: "$" and "12.50".
  const tag = moneyParts(prices.set.current);

  return (
    <Section id="top" aria-labelledby="hero-title" padded={false} nest={false} className="overflow-hidden">
      <div className="lg:grid lg:min-h-[34rem] lg:grid-cols-[minmax(2rem,1fr)_minmax(0,35rem)_minmax(0,33rem)_minmax(2rem,1fr)]">
        <Container className="pb-8 pt-6 sm:pb-12 sm:pt-10 lg:col-[2/3] lg:row-start-1 lg:mx-0 lg:max-w-none lg:self-center lg:px-0 lg:py-14 lg:pr-10">
          <Eyebrow icon={MapPin}>{hero.eyebrow}</Eyebrow>
          <Heading
            id="hero-title"
            variant="none"
            className="mt-3 font-display text-[2.125rem] font-extrabold leading-[1.06] tracking-tight text-ink sm:text-[3rem] lg:text-[2.75rem] xl:text-[3rem]"
          >
            {hero.title}
          </Heading>

          <div className="mt-4 sm:mt-6">
            <p className="sr-only">{hero.priceSummary}</p>
            {/* Price tag: small "$", big figure, label hung from the top of the digits.
                Phones have no room beside the figure, so there the label sits under it. */}
            <div
              aria-hidden="true"
              className="flex flex-wrap items-start font-display text-[4.5rem] font-extrabold leading-none text-brand sm:flex-nowrap sm:text-[6.5rem] lg:text-[6rem]"
            >
              <span className="mt-[0.34em] text-[0.36em] leading-none">{tag.currency}</span>
              <span className="tracking-[-0.05em]">{tag.value}</span>
              <span className="mt-2 flex w-full gap-[0.3em] text-[0.24em] font-bold leading-[1.15] text-ink sm:ml-[0.5em] sm:mt-[0.62em] sm:w-auto sm:flex-col sm:gap-0 sm:text-[0.2em]">
                <span>{hero.aWeek}</span>
                <span>{hero.forTheSet}</span>
              </span>
            </div>
            <WasPrice price={prices.set} className="mt-2 block font-display text-2xl font-bold text-ink-muted" />
            <p aria-hidden="true" className="mt-2 text-lg text-ink-soft sm:mt-3">
              {rich(hero.orSingle, { price: <span className="font-semibold text-ink">{hero.singlePrice}</span> })}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
            <Button href={pagePaths.start} className="px-4 sm:px-5">
              {d.common.startRental}
            </Button>
            <PhoneButton kind="call" variant="secondary" label={d.common.callOrText} className="px-4 sm:px-5" />
          </div>
        </Container>
        <div className="lg:col-[3/5] lg:row-start-1">
          <HeroPhoto className="lg:h-full" />
        </div>
      </div>
    </Section>
  );
}

// Repairs and buildings, the two things the price doesn't say: one tile each, right under the
// hero. The whole tile is the link.
export function HeroTiles() {
  const { d } = useI18n();
  const { heroSlides } = d.home;
  const tiles = [
    { icon: Wrench, href: `${pagePaths.faq}#repairs`, photo: "rooms/drum-open-door", ...heroSlides.repairs },
    { icon: Building2, href: pagePaths.buildings, photo: "shared/stacked-dryers-tiles", ...heroSlides.buildings },
  ] as const;

  return (
    <Section aria-label={heroSlides.label} padded={false} className="pb-10 pt-6 sm:pb-14 sm:pt-8 lg:pt-10">
      <Container>
        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {tiles.map((tile) => (
            <li key={tile.href}>
              <LangLink
                href={tile.href}
                className="press group flex h-full items-stretch overflow-hidden rounded-3xl border border-line bg-white transition hover:-translate-y-0.5 hover:border-brand hover:shadow-lg focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand"
              >
                <Photo
                  src={`photos/${tile.photo}.jpg`}
                  alt=""
                  sizes="(min-width: 640px) 20vw, 35vw"
                  className="w-[35%] shrink-0 object-cover sm:w-2/5"
                />
                <span className="flex flex-col justify-center gap-1.5 p-4 sm:p-6">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-brand">
                    <tile.icon className="h-4 w-4" aria-hidden="true" />
                    {tile.eyebrow}
                  </span>
                  <span className="font-display text-lg font-bold leading-snug text-ink sm:text-xl">{tile.title}</span>
                  <span className="hidden text-ink-soft sm:block">{tile.text}</span>
                  <span className="mt-1 inline-flex items-center gap-1.5 font-semibold text-brand">
                    {tile.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </span>
              </LangLink>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
