import { machinePhotos } from "../content/machines";
import Photo from "./Photo";

// Shown with every example photo of a machine type (once per card grid or gallery).
export const PHOTO_CAPTION =
  "Example of this type. Your machine may be a different brand.";

export const hasPhoto = (machine) => machinePhotos(machine).length > 0;

// The type's main picture: its first photo in this build (src/content/machines.js), otherwise
// its drawing from public/types/. Pass preferPhoto=false to get the drawing even when a photo
// exists (the Drawings/Photos switch in Machines.jsx).
export function machinePicture(machine, preferPhoto = true) {
  const [photo] = preferPhoto ? machinePhotos(machine) : [];
  if (photo) return { isPhoto: true, src: photo.src, alt: photo.alt };
  return { isPhoto: false, src: machine.drawing, alt: `Drawing: ${machine.alt}` };
}

// A small "Drawing" tag over a drawing, so it isn't taken for a photo. Screen readers get the
// same from the alt text ("Drawing: ..."), so the tag itself is hidden from them.
export function DrawingTag({ className = "left-2.5 top-2.5" }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute rounded-full bg-white px-2.5 py-0.5 font-display text-xs font-semibold text-ink shadow-sm ring-1 ring-line ${className}`}
    >
      Drawing
    </span>
  );
}

// `frameClassName` sizes the box: a photo fills it, a drawing is centred at full height.
// `sizes` is the photo's display width for srcset (src/components/Photo.jsx).
export default function MachineImage({
  machine,
  preferPhoto = true,
  sizes,
  frameClassName = "",
  priority = false,
  tagDrawing = true,
}) {
  const picture = machinePicture(machine, preferPhoto);
  return (
    <div className={`relative ${frameClassName}`}>
      {picture.isPhoto ? (
        <Photo
          src={picture.src}
          alt={picture.alt}
          sizes={sizes}
          priority={priority}
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          <img
            src={`${import.meta.env.BASE_URL}${picture.src}`}
            alt={picture.alt}
            width={400}
            height={480}
            loading={priority ? undefined : "lazy"}
            className="mx-auto h-full w-auto"
          />
          {tagDrawing && <DrawingTag />}
        </>
      )}
    </div>
  );
}
