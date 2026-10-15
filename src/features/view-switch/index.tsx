import { useState } from "react";

// Drawings or photos of the machine types. Photos is the default, so the server HTML shows
// the photos; the switch works after hydration.
export type MachineView = "photos" | "drawings";

const VIEWS: Array<{ id: MachineView; label: string }> = [
  { id: "photos", label: "Photos" },
  { id: "drawings", label: "Drawings" },
];

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
  return (
    <div
      role="group"
      aria-label="Show machines as"
      className={`inline-flex rounded-full border border-line bg-paper p-1 ${className}`}
    >
      {VIEWS.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={view === option.id}
          onClick={() => onChange(option.id)}
          className={`min-h-[44px] rounded-full px-5 font-display text-[15px] font-semibold transition-colors sm:min-h-0 sm:py-2 ${
            view === option.id ? "bg-brand text-white shadow-sm" : "text-ink-soft hover:text-brand"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
