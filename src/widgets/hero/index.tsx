import { PostalCodeChecker } from "~/features/postal-check";
import { siteConfig } from "~/shared/config";
import { heroPhoto, photoFiles } from "~/shared/lib";
import { MapPin, Phone } from "~/shared/ui";

// The laundry-room photo. Phones get the portrait crop as a band above the text; from 640px the
// wide photo; from 1024px it fills the right half of the hero, out to the edge of the window.
// It is the page's largest image, so it loads first (and the home loader preloads the same
// files, from the same `heroPhoto` settings).
function HeroPhoto({ className = "" }: { className?: string }) {
  const { wide, narrow, alt } = heroPhoto;
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
          alt={alt}
          fetchPriority="high"
          className="aspect-[4/3] w-full object-cover object-[50%_88%] sm:aspect-[2/1] sm:object-[40%_60%] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full lg:rounded-bl-[3rem] lg:object-[40%_50%]"
        />
      </picture>
      <figcaption className="absolute bottom-3 right-3 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-medium text-white sm:bottom-4 sm:right-4">
        Example photo
      </figcaption>
    </figure>
  );
}

// Home hero: the weekly price is the headline fact, then the two ways to start (the rental
// request or a call) and the postal-code check. Phones: photo on top, text below it, never over it.
// From 1024px the text keeps to the page's left edge and the photo takes the other half.
export function Hero() {
  const { phone, prices } = siteConfig;

  return (
    <section id="top" aria-labelledby="hero-title" className="overflow-hidden">
      <div className="lg:grid lg:min-h-[37rem] lg:grid-cols-[minmax(2rem,1fr)_minmax(0,35rem)_minmax(0,33rem)_minmax(2rem,1fr)]">
        <HeroPhoto className="lg:col-[3/5] lg:row-start-1" />

        <div className="container-page pb-12 pt-8 sm:pb-14 sm:pt-10 lg:col-[2/3] lg:row-start-1 lg:mx-0 lg:max-w-none lg:self-center lg:px-0 lg:py-14 lg:pr-10">
          <p className="inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-brand">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Local Toronto business
          </p>
          <h1
            id="hero-title"
            className="mt-3 font-display text-[2.375rem] font-extrabold leading-[1.06] tracking-tight text-ink sm:text-[3rem] lg:text-[2.75rem] xl:text-[3rem]"
          >
            Washer &amp; dryer rental in Toronto &amp; the GTA
          </h1>

          <div className="mt-5 sm:mt-6">
            <p className="sr-only">
              ${prices.setText} a week for the set, or ${prices.singleText} a week for
              one machine.
            </p>
            {/* Price tag: small "$", big figure, label hung from the top of the digits.
                Phones have no room beside the figure, so there the label sits under it. */}
            <div
              aria-hidden="true"
              className="flex flex-wrap items-start font-display text-[5.5rem] font-extrabold leading-none text-brand sm:flex-nowrap sm:text-[6.5rem] lg:text-[6rem]"
            >
              <span className="mt-[0.34em] text-[0.36em] leading-none">$</span>
              <span className="tracking-[-0.05em]">{prices.setText}</span>
              <span className="mt-2 flex w-full gap-[0.3em] text-[0.2em] font-bold leading-[1.15] text-ink sm:ml-[0.5em] sm:mt-[0.62em] sm:w-auto sm:flex-col sm:gap-0">
                <span>a week</span>
                <span>for the set</span>
              </span>
            </div>
            <p aria-hidden="true" className="mt-3 text-lg text-ink-soft">
              or{" "}
              <span className="font-semibold text-ink">
                ${prices.singleText} a week
              </span>{" "}
              for one machine
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              Prices in Canadian dollars. No HST charged.
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="/start/" className="btn btn-primary sm:px-5">
              Start your rental
            </a>
            <a href={phone.tel} className="btn btn-secondary sm:px-5">
              <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
              Call or text {phone.display}
            </a>
          </div>

          <PostalCodeChecker
            compact
            label="Do we deliver to you? Enter your postal code"
            className="mt-7 max-w-md border-t border-line pt-6"
          />
        </div>
      </div>
    </section>
  );
}
