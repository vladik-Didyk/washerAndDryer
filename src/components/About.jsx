import { Phone } from "lucide-react";
import { siteConfig } from "../content/config";
import { howWeWork } from "../content/about";

// About the business: confirmed facts only, no names or photos of people.
// The full version is the /about/ page.

export default function About() {
  const { phone, companyName } = siteConfig;

  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-page grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="about-title" className="h2">
            About us
          </h2>
          <p className="lead mt-4">
            {companyName} is a local Toronto business. We bring more than 3 years
            of hands-on experience installing and fixing washers and dryers.
          </p>
          <p className="mt-4 text-ink-soft">
            Questions about a machine or your hookups? Call or text{" "}
            <a href={phone.tel} className="text-link whitespace-nowrap">
              {phone.display}
            </a>
            .
          </p>
          <p className="mt-4">
            <a href="/about/" className="text-link">
              More about us
            </a>
          </p>
        </div>

        <div className="rounded-3xl border border-line bg-white p-6 sm:p-8 lg:col-span-7">
          <h3 className="font-display text-xl font-bold text-ink">
            How we work
          </h3>
          <ul className="mt-5 space-y-4">
            {howWeWork.map((item) => (
              <li key={item} className="flex gap-3 text-ink-soft">
                <span
                  aria-hidden="true"
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold"
                />
                {item}
              </li>
            ))}
          </ul>
          <a href={phone.tel} className="btn btn-secondary mt-7">
            <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
            Call {phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
