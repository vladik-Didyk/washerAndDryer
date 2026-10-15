import { useState } from "react";
import { useI18n } from "~/shared/i18n";

// Drawings or photos of the machine types. Photos is the default, so the server HTML shows
// the photos; the switch works after hydration.
export type MachineView = "photos" | "drawings";

const VIEWS: MachineView[] = ["photos", "drawings"];

export function useMachineView(initial: MachineView = "photos") {
  const [view, setView] = useState<MachineView>(initial);
  return { view, setView, showPhotos: view === "photos" };
}

export function ViewSwitch({
  view,
  onChange,
  className = "",
}: {
  view: MachineView;
  onChange: (view: MachineView) => void;
  className?: string;
}) {
  const { d } = useI18n();
  return (
    <div
      role="group"
      aria-label={d.machines.view.label}
      className={`inline-flex rounded-full border border-line bg-paper p-1 ${className}`}
    >
      {VIEWS.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={view === option}
          onClick={() => onChange(option)}
          className={`min-h-[44px] rounded-full px-5 font-display text-[15px] font-semibold transition-colors sm:min-h-0 sm:py-2 ${
            view === option ? "bg-brand text-white shadow-sm" : "text-ink-soft hover:text-brand"
          }`}
        >
          {d.machines.view[option]}
        </button>
      ))}
    </div>
  );
}
