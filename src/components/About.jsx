import { Phone } from "lucide-react";
import { siteConfig } from "../content/config";

// Facts about the owner only: no photo, no numbers beyond what he has confirmed.
const howHeWorks = [
  "Checks each machine before it goes out.",
  "Connects the water, drain, power and vent properly.",
  "Runs a test cycle before leaving.",
  "Answers calls in English, Spanish and Russian.",
];

export default function About() {
  const { phone, owner, companyName } = siteConfig;

  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-page grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="about-title" className="h2">
            About us
          </h2>
          <p className="lead mt-4">
            {companyName} is run by {owner} in Toronto. He has more than 3 years
            of experience installing and fixing washers and dryers.
          </p>
          <p className="mt-4 text-ink-soft">
            Questions about a machine or your hookups? Call or text{" "}
            <a href={phone.tel} className="text-link whitespace-nowrap">
              {phone.display}
            </a>
            .
          </p>
        </div>

        <div className="rounded-3xl border border-line bg-white p-6 sm:p-8 lg:col-span-7">
          <h3 className="font-display text-xl font-bold text-ink">
            How {owner} works
          </h3>
          <ul className="mt-5 space-y-4">
            {howHeWorks.map((item) => (
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
