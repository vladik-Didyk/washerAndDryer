import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "react-router";
import { siteConfig } from "../config/site";
import { DEFAULT_LANG, isEnglishOnly, useI18n } from "../i18n";
import { MessageSquare, Phone } from "./icons";
import { Card } from "./layout";

// Links that stay in the page's language. Every site link goes through LangLink (or Button):
// on a Spanish page "/faq/" becomes "/es/faq/"; tel:, sms:, https: and #anchors stay as they
// are. A page that exists in English only (the policies) keeps its English address and gets a
// short "Available in English" note, so nobody is surprised by the language change.
// A link to a page of this site in this language is a router <Link>: once the page has
// loaded, the next one comes without a full reload (faster, the spinning logo shows while it
// loads, and the pages cross-fade). It still renders a plain <a href>, so every page works
// without JavaScript. Other links (another language, tel:, #anchors) stay plain <a>.

export type LangLinkProps = ComponentPropsWithoutRef<"a"> & { href: string };

export function LangLink({ href, children, ...rest }: LangLinkProps) {
  const i18n = useI18n();
  const englishOnly = i18n.lang !== DEFAULT_LANG && isEnglishOnly(href);
  const target = i18n.href(href);
  if (href.startsWith("/") && !englishOnly && !rest.target && !rest.download) {
    return (
      <Link to={target} prefetch="intent" viewTransition {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={target} {...(englishOnly ? { hrefLang: DEFAULT_LANG } : {})} {...rest}>
      {children}
      {englishOnly && (
        <span className="font-normal">
          {" ("}
          {i18n.d.common.availableInEnglish}
          {")"}
        </span>
      )}
    </a>
  );
}

// Button looks, as class names (defined in src/app/app.css), for <a> and <button> alike.
export const buttonClass = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  gold: "btn btn-gold",
  outlineLight: "btn btn-outline-light",
} as const;

export type ButtonVariant = keyof typeof buttonClass;

type ButtonOwnProps = { variant?: ButtonVariant; className?: string; children: ReactNode };

export type ButtonProps = ButtonOwnProps &
  (
    | ({ href: string } & Omit<ComponentPropsWithoutRef<"a">, "className" | "children">)
    | ({ href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">)
  );

// A button-looking control: a link with `href` (a site path stays in the page's language;
// tel:/sms: links as they are), otherwise a <button> (type="button" unless given).
export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const classes = className ? `${buttonClass[variant]} ${className}` : buttonClass[variant];
  if (props.href !== undefined) {
    return (
      <LangLink {...props} href={props.href} className={classes}>
        {children}
      </LangLink>
    );
  }
  const { type = "button", ...rest } = props as ComponentPropsWithoutRef<"button">;
  return (
    <button type={type} {...rest} className={classes}>
      {children}
    </button>
  );
}

// A button to call or text the business. The label is "Call" / "Text" unless given
// (common.callOrText, "Call {phone}"...).
export function PhoneButton({
  kind = "call",
  variant = kind === "call" ? "primary" : "secondary",
  label,
  className,
  ...rest
}: {
  kind?: "call" | "text";
  variant?: ButtonVariant;
  label?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">) {
  const { d } = useI18n();
  const { phone } = siteConfig;
  const Icon = kind === "call" ? Phone : MessageSquare;
  return (
    <Button href={kind === "call" ? phone.tel : phone.sms} variant={variant} className={className} {...rest}>
      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      {label ?? (kind === "call" ? d.common.call : d.common.text)}
    </Button>
  );
}

// "Prefer to call or text?": the phone number, the hours and the two buttons, in a card.
// `title` replaces the question; `children` go under the buttons.
export function CallCard({
  title,
  tone = "mintEdge",
  className,
  children,
}: {
  title?: string;
  tone?: "mintEdge" | "mintBordered";
  className?: string;
  children?: ReactNode;
}) {
  const { d } = useI18n();
  return (
    <Card tone={tone} padding="sm" className={className}>
      <p className="font-display font-semibold text-ink">{title ?? d.common.preferCallOrText}</p>
      <p className="mt-1 font-display text-2xl font-bold text-brand">{siteConfig.phone.display}</p>
      <p className="mt-1 text-sm text-ink-muted">{d.common.hoursSentence}</p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <PhoneButton kind="call" />
        <PhoneButton kind="text" />
      </div>
      {children}
    </Card>
  );
}
