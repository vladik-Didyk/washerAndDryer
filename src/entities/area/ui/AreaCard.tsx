import { Heading, LangLink, MapPin, Nest } from "~/shared/ui";

// One card per area; the link covers the whole card. Its heading is one level below the
// section it sits in.
export function AreaCard({
  href,
  name,
  label,
  teaser,
}: {
  href: string;
  name: string;
  label?: string;
  teaser: string;
}) {
  return (
    <li className="relative rounded-2xl border border-line bg-white p-5 transition-colors hover:border-brand hover:bg-brand-mint/40">
      {label && <p className="text-sm font-semibold text-ink-muted">{label}</p>}
      <Nest>
        <Heading variant="cardSmall" className="flex items-center gap-2">
        <MapPin className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
        <LangLink
          href={href}
          className="underline decoration-brand/30 decoration-2 underline-offset-4 after:absolute after:inset-0 after:rounded-2xl hover:text-brand"
        >
          {name}
        </LangLink>
        </Heading>
      </Nest>
      <p className="mt-2 text-ink-soft">{teaser}</p>
    </li>
  );
}
