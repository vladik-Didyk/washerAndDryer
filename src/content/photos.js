// Photos in public/photos/ and their srcset lists. Shared by the Photo component and the
// <head> preloads (src/seo/head.js), so a preload always names the exact files the page uses.
//
// __PHOTOS__ is replaced by Vite (vite.config.js, scripts/photo-sizes.mjs) with every photo
// present at build time: { "photos/types/stackable-1.jpg": { width, height, webp, widths } }.
// A photo listed in the content but missing from public/photos/ is simply left out.
const PHOTOS = __PHOTOS__;

export const hasPhotoFile = (src) => Boolean(PHOTOS[src]);

// The files of one photo: the JPEG (src and srcset) and, when made, the WebP srcset.
export function photoFiles(src) {
  const photo = PHOTOS[src];
  if (!photo) return null;
  const base = import.meta.env.BASE_URL;
  const stem = src.slice(0, -".jpg".length);
  const srcSet = (extension) =>
    [
      ...photo.widths.map((width) => `${base}${stem}-${width}w.${extension} ${width}w`),
      `${base}${stem}.${extension} ${photo.width}w`,
    ].join(", ");
  return {
    src: `${base}${src}`,
    width: photo.width,
    height: photo.height,
    jpegSrcSet: srcSet("jpg"),
    webpSrcSet: photo.webp ? srcSet("webp") : null,
  };
}

// The home page photo. Phones get a portrait crop above the text; from 640px up, the wide
// photo, which takes about half the width beside the text from 1024px (Welcome.jsx).
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
};

// The main photo on a machine type page (MachineGallery.jsx), preloaded in its <head>.
export const galleryPhotoSizes = "(min-width: 1024px) 36rem, (min-width: 640px) 34rem, 100vw";
