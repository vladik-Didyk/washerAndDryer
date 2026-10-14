// The logo file is public/brand/logo.png (square: green circle icon + wordmark).
export default function Logo({ className = "" }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}brand/logo.png`}
      alt="GTA Washer & Dryer Rentals"
      width="44"
      height="44"
      className={`shrink-0 rounded-lg object-contain ${className}`}
    />
  );
}
