import type { ReactNode } from "react";
import { siteConfig } from "~/shared/config";
import { heroPhoto } from "~/shared/lib";
import { KeepWordsWhole, Phone, Photo } from "~/shared/ui";

// A closing band near the bottom of the main pages: the home page's laundry-room photo under a
// dark green overlay, one short line, and the two ways to start. By default "Start your
// rental" goes to the rental request (/start/); `action` changes it (landlords: a quote).
// `title` is plain text (words never break at a hyphen); `text` may hold markup.
// The overlay keeps white text well above 4.5:1 wherever it sits: solid enough over the
// whole photo on phones, darkest behind the text from 1024px.
export function CtaBand({
  title = "Ready to rent?",
  text = "Tell us your area and your laundry space. We reply with the machine, the total and the start date.",
  action = { label: "Start your rental", href: "/start/" },
}: {
  title?: string;
  text?: ReactNode;
  action?: { label: string; href: string };
}) {
  const { phone } = siteConfig;

  return (
    <section
      aria-labelledby="cta-band-title"
      className="on-dark relative isolate overflow-hidden border-b border-white/10 bg-brand-dark"
    >
      <Photo
        src={heroPhoto.wide.src}
        alt=""
        sizes="100vw"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[45%_55%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-brand-dark/85 lg:bg-transparent lg:bg-gradient-to-r lg:from-brand-dark/95 lg:via-brand-dark/85 lg:to-brand-dark/40"
      />
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <div className="max-w-xl">
          <h2 id="cta-band-title" className="h2 text-white">
            <KeepWordsWhole text={title} />
          </h2>
          <p className="lead mt-4 text-white/90">{text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={action.href} className="btn btn-gold">
              {action.label}
            </a>
            <a href={phone.tel} className="btn btn-outline-light">
              <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
              Call or text {phone.display}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
