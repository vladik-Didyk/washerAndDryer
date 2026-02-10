import {
  ShieldCheck,
  Clock,
  Wrench,
  Truck,
  ArrowRight,
  CheckCircle2,
  Droplets,
  Wind,
  PlugZap,
} from "lucide-react";
import { siteConfig } from "../content/config";

const features = [
  {
    icon: ShieldCheck,
    title: "Licensed & Insured",
    description: "Fully insured professionals you can trust with your home.",
  },
  {
    icon: Clock,
    title: "Same-Week Booking",
    description: "Quick turnaround — most installs booked within days.",
  },
  {
    icon: Wrench,
    title: "Expert Hookup",
    description: "Hoses, vents, leveling, and a full test cycle included.",
  },
  {
    icon: Truck,
    title: "Old Unit Removal",
    description: "We can haul away your old machines on the same visit.",
  },
];

const checklist = [
  { text: "Water hose connection", icon: Droplets },
  { text: "Drain hose placement", icon: Droplets },
  { text: "Dryer vent attachment", icon: Wind },
  { text: "Machine leveling", icon: Wrench },
  { text: "Full test cycle", icon: PlugZap },
  { text: "Usage walkthrough", icon: CheckCircle2 },
];

/* Animated washer drum SVG */
function WasherDrum() {
  return (
    <div className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80">
      {/* Outer shell - neumorphic */}
      <div className="absolute inset-0 rounded-full bg-neu-bg shadow-neu-raised dark:bg-dark-surface dark:shadow-neu-dark-raised" />
      {/* Chrome ring */}
      <div className="absolute inset-3 rounded-full bg-gradient-to-br from-washer-chrome to-neu-dark dark:from-dark-border dark:to-dark-bg" />
      {/* Glass door */}
      <div className="absolute inset-6 rounded-full bg-gradient-to-br from-washer-display via-washer-glass to-washer-display shadow-neu-pressed dark:from-dark-elevated dark:via-dark-surface dark:to-dark-elevated dark:shadow-neu-dark-pressed">
        {/* Inner drum pattern */}
        <div className="absolute inset-4 flex items-center justify-center rounded-full">
          <div className="animate-drum-spin">
            {/* Drum holes pattern */}
            <svg viewBox="0 0 100 100" className="h-32 w-32 sm:h-40 sm:w-40 text-sage-400/30 dark:text-sage-400/20">
              <circle cx="50" cy="15" r="3" fill="currentColor" />
              <circle cx="85" cy="50" r="3" fill="currentColor" />
              <circle cx="50" cy="85" r="3" fill="currentColor" />
              <circle cx="15" cy="50" r="3" fill="currentColor" />
              <circle cx="73" cy="23" r="2.5" fill="currentColor" />
              <circle cx="77" cy="73" r="2.5" fill="currentColor" />
              <circle cx="27" cy="77" r="2.5" fill="currentColor" />
              <circle cx="23" cy="27" r="2.5" fill="currentColor" />
              <circle cx="50" cy="35" r="2" fill="currentColor" />
              <circle cx="65" cy="50" r="2" fill="currentColor" />
              <circle cx="50" cy="65" r="2" fill="currentColor" />
              <circle cx="35" cy="50" r="2" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
      {/* Power indicator */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2">
        <div className="h-2 w-2 rounded-full bg-sage-400 shadow-[0_0_6px_2px_rgba(107,154,107,0.5)] animate-pulse-dot" />
      </div>
    </div>
  );
}

/* Washer control panel display */
function ControlPanel() {
  return (
    <div className="washer-display">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-sage-400 animate-pulse-dot" />
          <span className="text-[10px] font-medium tracking-widest text-gray-400 uppercase">
            Power
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-washer-chrome" />
          <span className="text-[10px] font-medium tracking-widest text-gray-400 uppercase">
            Ready
          </span>
        </div>
      </div>
      <div className="flex items-baseline justify-center gap-2 py-3">
        <span className="font-display text-4xl font-bold tracking-wider text-gray-600 dark:text-gray-300">
          500+
        </span>
        <span className="text-xs font-medium text-gray-400">installs</span>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-3 border-t border-washer-chrome/20 pt-3 dark:border-dark-border">
        <div className="text-center">
          <p className="font-display text-sm font-semibold text-gray-600 dark:text-gray-300">24h</p>
          <p className="text-[10px] text-gray-400">Response</p>
        </div>
        <div className="text-center">
          <p className="font-display text-sm font-semibold text-gray-600 dark:text-gray-300">GTA</p>
          <p className="text-[10px] text-gray-400">Coverage</p>
        </div>
        <div className="text-center">
          <p className="font-display text-sm font-semibold text-gray-600 dark:text-gray-300">4.9</p>
          <p className="text-[10px] text-gray-400">Rating</p>
        </div>
      </div>
    </div>
  );
}

export default function Welcome() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Hero */}
      <div className="relative bg-neu-bg dark:bg-dark-bg">
        <div className="container-main relative px-4 pt-28 pb-16 sm:px-6 md:pt-36 md:pb-24 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Content */}
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-sage-50 px-4 py-2 text-sm font-medium text-sage-600 shadow-neu-subtle dark:bg-dark-elevated dark:text-sage-300 dark:shadow-neu-dark-subtle">
                <div className="h-1.5 w-1.5 rounded-full bg-sage-400 animate-pulse-dot" />
                Trusted by 500+ GTA homeowners
              </div>

              <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-800 dark:text-white sm:text-5xl md:text-6xl">
                Professional{" "}
                <span className="text-sage-400">Washer & Dryer</span>{" "}
                Installation
              </h1>

              <p className="mb-10 text-lg leading-relaxed text-gray-500 dark:text-gray-400 sm:text-xl">
                We deliver, connect, level, and test your new washer and dryer —
                so you don&apos;t have to lift a finger. Serving{" "}
                {siteConfig.serviceAreas.slice(0, 3).join(", ")} and more across
                the GTA.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <a href="#booking" className="btn-primary text-lg">
                  Book Installation
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a href="#faq" className="btn-secondary text-lg">
                  How It Works
                </a>
              </div>

              {/* Control Panel - visible under hero text */}
              <div className="mt-12 hidden lg:block">
                <ControlPanel />
              </div>
            </div>

            {/* Right: Washer Drum Visual */}
            <div className="flex flex-col items-center gap-8">
              <WasherDrum />
              {/* Mobile control panel */}
              <div className="w-full max-w-xs lg:hidden">
                <ControlPanel />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="services" className="section-padding bg-neu-bg dark:bg-dark-bg">
        <div className="container-main">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-2xl font-bold tracking-wide text-gray-800 uppercase dark:text-white sm:text-3xl">
              Why Choose Us
            </h2>
            <p className="mx-auto max-w-2xl text-gray-500 dark:text-gray-400">
              Everything you need for a hassle-free washer & dryer installation.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="neu-card group cursor-default hover:shadow-neu-raised dark:hover:shadow-neu-dark-raised"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sage-50 text-sage-400 shadow-neu-subtle transition-all group-hover:bg-sage-400 group-hover:text-white group-hover:shadow-none dark:bg-dark-elevated dark:shadow-neu-dark-subtle dark:group-hover:bg-sage-500">
                  <feature.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-base font-semibold text-gray-800 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Checklist */}
          <div className="neu-card-raised mt-16">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 font-display text-xl font-bold tracking-wide text-gray-800 uppercase dark:text-white">
                  Every Install Includes
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Every installation comes with a complete setup so your
                  machines are ready to use the moment we leave.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {checklist.map(({ text, icon: Icon }) => (
                  <div
                    key={text}
                    className="flex items-center gap-3 rounded-xl p-2"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sage-50 text-sage-400 dark:bg-dark-elevated">
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
