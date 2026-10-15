// The building blocks of every page: the horizontal frame (Container), sections that know their
// depth (Section, Nest) and headings that take their level from it (Heading), the eyebrow +
// heading + lead block (SectionHeader), the card shell (Card), and the site's bullet lists.
//
// Heading levels follow the page's structure, never typed by hand: the page itself is level 1
// (its hero's <Heading> is the h1), each <Section> inside it is one level deeper (h2), and a
// <Nest> or a nested <Section> deeper again (h3). The look is the `variant`, chosen apart from
// the level, so a heading can move without changing its size.
import {
  createContext,
  useContext,
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { Check, type LucideIcon } from "./icons";

const join = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

// ---------------------------------------------------------------------------------------
// Frame and depth

// The page's horizontal frame (the .container-page class in src/app/app.css).
export function Container({
  as: Tag = "div",
  className,
  children,
  ...rest
}: { as?: ElementType; className?: string; children?: ReactNode } & Record<string, unknown>) {
  return (
    <Tag className={join("container-page", className)} {...rest}>
      {children}
    </Tag>
  );
}

const LevelContext = createContext(1);

// The heading level of what is inside (1 at the page root).
export const useHeadingLevel = () => useContext(LevelContext);

// One level deeper for the headings inside, without any markup (a card's title, a list of
// questions under a section heading).
export function Nest({ children }: { children: ReactNode }) {
  const level = useContext(LevelContext);
  return <LevelContext.Provider value={level + 1}>{children}</LevelContext.Provider>;
}

type SectionProps = {
  as?: ElementType;
  /** The standard vertical rhythm (.section); off for a section with its own padding. */
  padded?: boolean;
  /** Headings inside are one level deeper (default). Off for a page's hero, whose heading
   *  is the page's h1. */
  nest?: boolean;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<"section">, "className" | "children">;

// A band of the page (a <section> unless `as` says otherwise).
export function Section({ as: Tag = "section", padded = true, nest = true, className, children, ...rest }: SectionProps) {
  const content = (
    <Tag className={join(padded && "section", className) || undefined} {...rest}>
      {children}
    </Tag>
  );
  return nest ? <Nest>{content}</Nest> : content;
}

// ---------------------------------------------------------------------------------------
// Headings

export const headingVariants = {
  /** A page's h1. */
  page: "font-display text-[2.25rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[2.75rem] lg:text-[3rem]",
  /** A section's title (the .h2 class). */
  section: "h2",
  /** A card or form title. */
  card: "font-display text-2xl font-bold text-ink",
  /** A smaller card title. */
  cardSmall: "font-display text-xl font-bold text-ink",
  /** A list item's title. */
  item: "font-display text-lg font-bold text-ink",
  /** A question. */
  question: "font-display text-[17px] font-semibold leading-snug text-ink sm:text-lg",
  /** A label above a group ("Phone and text"). */
  label: "font-display text-sm font-semibold text-ink-muted",
  /** No look of its own (the content brings it). */
  none: "",
} as const;

export type HeadingVariant = keyof typeof headingVariants;

// h1–h4 from the depth (Section / Nest), the look from `variant` (+ `className`).
export function Heading({
  variant = "section",
  className,
  children,
  ...rest
}: { variant?: HeadingVariant; className?: string; children: ReactNode } & Omit<
  ComponentProps<"h2">,
  "className" | "children"
>) {
  const level = Math.min(Math.max(useContext(LevelContext), 1), 4);
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  return (
    <Tag className={join(headingVariants[variant], className) || undefined} {...rest}>
      {children}
    </Tag>
  );
}

// The small line above a heading, with an optional icon.
export function Eyebrow({ icon: Icon, className, children }: { icon?: LucideIcon; className?: string; children: ReactNode }) {
  return (
    <p
      className={join(
        Icon && "inline-flex items-center gap-1.5",
        "font-display text-[15px] font-semibold text-brand",
        className,
      )}
    >
      {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
      {children}
    </p>
  );
}

// Eyebrow, heading and lead paragraph: the top of most sections.
export function SectionHeader({
  id,
  eyebrow,
  icon,
  title,
  lead,
  variant = "section",
  titleClassName,
  leadClassName = "mt-4",
  children,
}: {
  id?: string;
  eyebrow?: ReactNode;
  icon?: LucideIcon;
  title: ReactNode;
  lead?: ReactNode;
  variant?: HeadingVariant;
  titleClassName?: string;
  /** Classes beside "lead" on the paragraph. */
  leadClassName?: string;
  /** After the lead (buttons, notes). */
  children?: ReactNode;
}) {
  return (
    <>
      {eyebrow && <Eyebrow icon={icon}>{eyebrow}</Eyebrow>}
      <Heading id={id} variant={variant} className={titleClassName}>
        {title}
      </Heading>
      {lead && <p className={join("lead", leadClassName)}>{lead}</p>}
      {children}
    </>
  );
}

// ---------------------------------------------------------------------------------------
// Cards

const cardTones = {
  white: "border border-line bg-white",
  // The ring thickens the border without shifting the card's content.
  highlight: "border border-brand bg-white ring-2 ring-brand",
  paper: "border border-line bg-paper",
  mint: "bg-brand-mint",
  mintBordered: "border border-brand-mint-strong bg-brand-mint",
  mintEdge: "border border-brand-mint-strong bg-white",
} as const;

const cardPadding = {
  md: "p-6 sm:p-8",
  sm: "p-6",
  form: "p-5 sm:p-8",
  none: "",
} as const;

// The rounded card shell of the site: `tone` its border and background, `padding` its inside.
export function Card({
  as: Tag = "div",
  tone = "white",
  padding = "md",
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  tone?: keyof typeof cardTones;
  padding?: keyof typeof cardPadding;
  className?: string;
  children?: ReactNode;
} & Record<string, unknown>) {
  return (
    <Tag className={join("rounded-3xl", cardTones[tone], cardPadding[padding], className)} {...rest}>
      {children}
    </Tag>
  );
}

// ---------------------------------------------------------------------------------------
// Lists

// A gold dot, the site's bullet.
export function Bullet({ className = "mt-2 h-2 w-2" }: { className?: string }) {
  return <span aria-hidden="true" className={`${className} shrink-0 rounded-full bg-gold`} />;
}

// Items with a gold check mark.
export function CheckList({
  items,
  className,
  itemClassName = "text-ink-soft",
}: {
  items: readonly ReactNode[];
  className?: string;
  itemClassName?: string;
}) {
  return (
    <ul className={className}>
      {items.map((item, index) => (
        <li key={typeof item === "string" ? item : index} className={join("flex gap-3", itemClassName)}>
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold">
            <Check className="h-3.5 w-3.5 text-brand-dark" strokeWidth={3} aria-hidden="true" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

// Items with a gold dot.
export function DotList({
  items,
  className,
  itemClassName = "flex gap-3 text-ink-soft",
  bullet,
}: {
  items: readonly ReactNode[];
  className?: string;
  itemClassName?: string;
  /** The dot's size and offset (Bullet). */
  bullet?: string;
}) {
  return (
    <ul className={className}>
      {items.map((item, index) => (
        <li key={typeof item === "string" ? item : index} className={itemClassName}>
          <Bullet className={bullet} />
          {item}
        </li>
      ))}
    </ul>
  );
}

// A numbered step's gold disc.
const badgeSizes = {
  sm: "h-7 w-7 text-sm font-bold",
  md: "h-10 w-10 text-lg font-extrabold",
  lg: "h-12 w-12 text-xl font-extrabold",
} as const;

export function NumberBadge({
  children,
  size = "lg",
  className,
}: {
  children: ReactNode;
  size?: keyof typeof badgeSizes;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={join("flex shrink-0 items-center justify-center rounded-full bg-gold font-display text-ink", badgeSizes[size], className)}
    >
      {children}
    </span>
  );
}
