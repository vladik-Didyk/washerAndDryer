import { Phone, Mail, MapPin, WashingMachine } from "lucide-react";
import { siteConfig } from "../content/config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="bg-gray-900 pt-16 pb-8 text-gray-300 dark:bg-gray-950"
    >
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <a
              href="#home"
              className="mb-4 flex items-center gap-2 text-xl font-bold text-white"
            >
              <WashingMachine className="h-7 w-7 text-primary-400" />
              {siteConfig.companyName}
            </a>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              {siteConfig.tagline}. Fast, reliable, and affordable appliance
              installation across the Greater Toronto Area.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {siteConfig.navigation.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-primary-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-primary-400"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary-400" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-primary-400"
                >
                  <Mail className="h-4 w-4 shrink-0 text-primary-400" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                <span>
                  Serving {siteConfig.serviceAreas.join(", ")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>
            &copy; {year} {siteConfig.companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
