// Photos in public/photos/ and their srcset lists. Shared by the Photo component and the
// <head> preloads (shared/seo), so a preload always names the exact files the page uses.
//
// __PHOTOS__ is replaced by Vite (vite.config.ts, scripts/photo-sizes.mjs) with every photo
// present at build time: { "photos/types/stackable-1.jpg": { width, height, webp, widths } }.
// The server bundle and the browser bundle get the same value, so the HTML always matches.
// A photo listed in the content but missing from public/photos/ is simply left out.
export interface PhotoInfo {
  width: number;
  height: number;
  webp: boolean;
  widths: number[];
}

declare const __PHOTOS__: Record<string, PhotoInfo>;
const PHOTOS: Record<string, PhotoInfo> = __PHOTOS__;

export const hasPhotoFile = (src: string) => Boolean(PHOTOS[src]);

export interface PhotoFiles {
  src: string;
  width: number;
  height: number;
  jpegSrcSet: string;
  webpSrcSet: string | null;
}

// The files of one photo: the JPEG (src and srcset) and, when made, the WebP srcset.
export function photoFiles(src: string): PhotoFiles | null {
  const photo = PHOTOS[src];
  if (!photo) return null;
  const stem = src.slice(0, -".jpg".length);
  const srcSet = (extension: string) =>
    [
      ...photo.widths.map((width) => `/${stem}-${width}w.${extension} ${width}w`),
      `/${stem}.${extension} ${photo.width}w`,
    ].join(", ");
  return {
    src: `/${src}`,
    width: photo.width,
    height: photo.height,
    jpegSrcSet: srcSet("jpg"),
    webpSrcSet: photo.webp ? srcSet("webp") : null,
  };
}

// The home page photo. Phones get a portrait crop above the text; from 640px up, the wide
// photo, which takes about half the width beside the text from 1024px (widgets/hero).
// `sizes` must match the layout, and the head preloads use these same values.
export const heroPhoto = {
  alt: "A white front-load washer and dryer side by side in a bright laundry room",
  wide: {
    src: "photos/hero/laundry-room.jpg",
    media: "(min-width: 640px)",
    sizes: "(min-width: 1024px) 52vw, 100vw",
  },
  narrow: {
    src: "photos/hero/laundry-room-mobile.jpg",
    media: "(max-width: 639px)",
    sizes: "100vw",
  },
} as const;

// The main photo on a machine type page (features/machine-gallery), preloaded in its <head>:
// half the page from 1024px, at most 36rem wide on tablets, the full width on phones.
export const galleryPhotoSizes = "(min-width: 1024px) 33rem, (min-width: 640px) 36rem, 100vw";
