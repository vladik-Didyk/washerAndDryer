export interface LinkItem {
  href: string;
  label: string;
}

// A titled row of links to sibling pages (other cities, other machine types).
export function LinkList({
  id,
  title,
  links,
  className = "",
}: {
  id: string;
  title: string;
  links: LinkItem[];
  className?: string;
}) {
  return (
    <nav aria-labelledby={id} className={className}>
      <h2 id={id} className="font-display text-xl font-bold text-ink">
        {title}
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="inline-flex min-h-[2.75rem] items-center rounded-full border border-line bg-white px-4 py-2 font-medium text-ink transition-colors hover:border-brand hover:bg-brand-mint hover:text-brand-dark"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
