// A machine type's picture: the photo when public/photos/types/<slug>.jpg existed at build
// time (see vite.config.js), otherwise the drawing from public/types/. Pass preferPhoto=false
// to get the drawing even when a photo exists (the Drawings/Photos toggle in Machines).
// __MACHINE_PHOTOS__ is replaced by Vite with { "photos/types/<slug>.jpg": { width, height } }.
const PHOTOS = __MACHINE_PHOTOS__;

export const PHOTO_CAPTION =
  "Example of this type. Your machine may be a different brand.";

export const hasPhoto = (machine) => Boolean(PHOTOS[machine.photo]);

export function machinePicture(machine, preferPhoto = true) {
  const photo = PHOTOS[machine.photo];
  if (photo && preferPhoto) {
    return {
      isPhoto: true,
      src: machine.photo,
      width: photo.width,
      height: photo.height,
      alt: `Photo: ${machine.alt}`,
    };
  }
  return {
    isPhoto: false,
    src: machine.drawing,
    width: 400,
    height: 480,
    alt: `Drawing: ${machine.alt}`,
  };
}

// `frameClassName` sizes the box; a photo fills it, a drawing is centred at full height.
// `showCaption={false}` lets a parent place the photo caption itself.
export default function MachineImage({
  showCaption = true,
  machine,
  preferPhoto = true,
  frameClassName = "",
  captionClassName = "mt-2 text-xs leading-snug text-ink-muted",
  lazy = true,
  priority = false,
}) {
  const picture = machinePicture(machine, preferPhoto);
  return (
    <figure>
      <div className={frameClassName}>
        <img
          src={`${import.meta.env.BASE_URL}${picture.src}`}
          alt={picture.alt}
          width={picture.width}
          height={picture.height}
          loading={lazy ? "lazy" : undefined}
          fetchPriority={priority ? "high" : undefined}
          className={
            picture.isPhoto
              ? "h-full w-full object-cover"
              : "mx-auto h-full w-auto"
          }
        />
      </div>
      {showCaption && picture.isPhoto && (
        <figcaption className={captionClassName}>{PHOTO_CAPTION}</figcaption>
      )}
    </figure>
  );
}
