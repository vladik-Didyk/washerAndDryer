import { useState } from "react";
import { DrawingTag, machinePhotos, type MachineType } from "~/entities/machine";
import { useI18n } from "~/shared/i18n";
import { galleryPhotoSizes } from "~/shared/lib";
import { Carousel, Photo } from "~/shared/ui";

const frame = "relative aspect-[5/6] overflow-hidden rounded-3xl bg-brand-mint";

// The photos of a machine type page: the main photo, which swipes (a carousel), and, when
// there are more, a row of thumbnail buttons that switch it. The buttons are ordinary buttons (Tab, then Enter or Space);
// the one showing is marked aria-current. The server HTML shows the first photo. A type with
// no photo in the build shows its drawing, tagged and captioned as a drawing.
// Every photo here is an example, and the caption says so.
export function MachineGallery({ machine, className = "" }: { machine: MachineType; className?: string }) {
  const { d, format } = useI18n();
  const photos = machinePhotos(machine);
  const [shown, setShown] = useState(0);
  if (!photos.length) {
    return (
      <figure className={className}>
        <div className={frame}>
          <img
            src={`/${machine.drawing}`}
            alt={format(d.machines.drawingAlt, { alt: machine.alt })}
            width={400}
            height={480}
            className="mx-auto h-full w-auto"
          />
          <DrawingTag className="left-4 top-4" />
        </div>
        <figcaption className="mt-3 text-sm text-ink-muted">
          {d.machines.drawingCaption}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className={className}>
      <div className="relative">
        <Carousel label={d.machines.galleryLabel} index={shown} onChange={setShown} trackClassName={`${frame} rounded-3xl`}>
          {photos.map((item, index) => (
            <Photo
              key={item.src}
              src={item.src}
              alt={item.alt}
              sizes={galleryPhotoSizes}
              priority={index === 0}
              className="aspect-[5/6] h-full w-full object-cover"
            />
          ))}
        </Carousel>
        {photos.length > 1 && (
          <p
            aria-hidden="true"
            className="pointer-events-none absolute bottom-16 right-3 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-semibold text-white"
          >
            {format(d.machines.galleryCounter, { index: shown + 1, count: photos.length })}
          </p>
        )}
      </div>

      {photos.length > 1 && (
        <ul aria-label={d.machines.galleryLabel} className="mt-3 flex flex-wrap gap-3">
          {photos.map((thumb, index) => (
            <li key={thumb.src}>
              <button
                type="button"
                onClick={() => setShown(index)}
                aria-current={index === shown ? "true" : undefined}
                aria-label={format(d.machines.galleryShow, { index: index + 1, count: photos.length })}
                className={`block w-20 overflow-hidden rounded-xl transition sm:w-24 ${
                  index === shown
                    ? "ring-[3px] ring-brand ring-offset-2 ring-offset-paper"
                    : "opacity-75 ring-1 ring-line hover:opacity-100"
                }`}
              >
                {/* The button's label names the action; the alt still describes the photo. */}
                <Photo src={thumb.src} alt={thumb.alt} sizes="6rem" className="aspect-[5/6] w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <figcaption className="mt-3 text-sm text-ink-muted">{d.machines.photoCaption}</figcaption>
    </figure>
  );
}
