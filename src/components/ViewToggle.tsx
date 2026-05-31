"use client";

export type ViewMode = "map" | "haul";

interface Props {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const OPTIONS: { id: ViewMode; label: string; icon: string }[] = [
  { id: "map", label: "Map", icon: "🗺️" },
  { id: "haul", label: "Haul", icon: "🛍️" },
];

export default function ViewToggle({ mode, onChange }: Props) {
  return (
    <div className="shadow-card pointer-events-auto relative flex rounded-full bg-surface p-1">
      {/* sliding thumb */}
      <span
        className="absolute inset-y-1 w-[calc(50%-0.25rem)] rounded-full bg-ink shadow-sm transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]"
        style={{ transform: mode === "haul" ? "translateX(100%)" : "translateX(0)" }}
      />
      {OPTIONS.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`relative z-10 flex items-center gap-1.5 whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold transition-colors ${
            mode === o.id ? "text-white" : "text-sub"
          }`}
        >
          <span className="text-xs">{o.icon}</span>
          {o.label}
        </button>
      ))}
    </div>
  );
}
