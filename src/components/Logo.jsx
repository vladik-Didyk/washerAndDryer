// The header and footer show the round icon only, cut from public/brand/logo.png (the full
// logo with the wordmark) at 88 px, twice its 44 px display size. WebP with a PNG fallback.
export default function Logo({ className = "" }) {
  const base = import.meta.env.BASE_URL;
  return (
    <picture className="shrink-0">
      <source srcSet={`${base}brand/logo-small.webp`} type="image/webp" />
      <img
        src={`${base}brand/logo-small.png`}
        alt="GTA Washer & Dryer Rentals"
        width="44"
        height="44"
        className={`shrink-0 object-contain ${className}`}
      />
    </picture>
  );
}
