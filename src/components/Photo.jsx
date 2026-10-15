import { photoFiles } from "../content/photos";

// A photo from public/photos/: WebP with the JPEG as fallback, each in every width the build
// found (src/content/photos.js), so the browser picks the smallest file that fills `sizes`.
// `priority` is for the one large photo at the top of a page: it loads first and never lazily.
// The <picture> takes no box of its own (display: contents), so `className` sizes the image as
// if it stood alone. Renders nothing when the file isn't in the build.
export default function Photo({ src, alt, sizes, className = "", priority = false }) {
  const files = photoFiles(src);
  if (!files) return null;
  return (
    <picture className="contents">
      {files.webpSrcSet && <source type="image/webp" srcSet={files.webpSrcSet} sizes={sizes} />}
      <img
        src={files.src}
        srcSet={files.jpegSrcSet}
        sizes={sizes}
        width={files.width}
        height={files.height}
        alt={alt}
        loading={priority ? undefined : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding={priority ? undefined : "async"}
        className={className}
      />
    </picture>
  );
}
