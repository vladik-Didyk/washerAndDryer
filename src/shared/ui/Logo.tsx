// The header and footer show the round icon only, cut from public/brand/logo.png (the full
// logo with the wordmark) at 88 px, twice its 44 px display size. WebP with a PNG fallback.
import { useI18n } from "../i18n";

export function Logo({ className = "" }: { className?: string }) {
  const { d } = useI18n();
  return (
    <picture className="shrink-0">
      <source srcSet="/brand/logo-small.webp" type="image/webp" />
      <img
        src="/brand/logo-small.png"
        alt={d.common.logoAlt}
        width="44"
        height="44"
        className={`shrink-0 object-contain ${className}`}
      />
    </picture>
  );
}
