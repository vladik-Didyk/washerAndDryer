import { useI18n, type I18n } from "~/shared/i18n";
import { Photo } from "~/shared/ui";
import { machinePhotos, type MachineType } from "../data";

export const hasPhoto = (machine: MachineType) => machinePhotos(machine).length > 0;

// The type's main picture: its first photo in this build (../data.ts), otherwise its drawing
// from public/types/. Pass preferPhoto=false to get the drawing even when a photo exists (the
// Drawings/Photos switch, features/view-switch).
export function machinePicture(machine: MachineType, i18n: I18n, preferPhoto = true) {
  const [photo] = preferPhoto ? machinePhotos(machine) : [];
  if (photo) return { isPhoto: true, src: photo.src, alt: photo.alt };
  return { isPhoto: false, src: machine.drawing, alt: i18n.format(i18n.d.machines.drawingAlt, { alt: machine.alt }) };
}

// A small "Drawing" tag over a drawing, so it isn't taken for a photo. Screen readers get the
// same from the alt text ("Drawing: ..."), so the tag itself is hidden from them.
export function DrawingTag({ className = "left-2.5 top-2.5" }: { className?: string }) {
  const { d } = useI18n();
  return (
    <span
      aria-hidden="true"
      className={`absolute rounded-full bg-white px-2.5 py-0.5 font-display text-xs font-semibold text-ink shadow-sm ring-1 ring-line ${className}`}
    >
      {d.machines.drawingTag}
    </span>
  );
}

// `frameClassName` sizes the box: a photo fills it, a drawing is centred at full height.
// `sizes` is the photo's display width for srcset (shared/ui Photo).
export function MachineImage({
  machine,
  preferPhoto = true,
  sizes,
  frameClassName = "",
  priority = false,
  tagDrawing = true,
}: {
  machine: MachineType;
  preferPhoto?: boolean;
  sizes: string;
  frameClassName?: string;
  priority?: boolean;
  tagDrawing?: boolean;
}) {
  const picture = machinePicture(machine, useI18n(), preferPhoto);
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
            src={`/${picture.src}`}
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
