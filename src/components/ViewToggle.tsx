"use client";

export type ViewMode = "map" | "haul";

interface Props {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const OPTIONS: { id: ViewMode; label: string; icon: string }[] = [
  { id: "map", label: "Map", icon: "🗺️" },
  { id: "haul", label: "Inflight Haul", icon: "🛍️" },
];

export default function ViewToggle({ mode, onChange }: Props) {
  return (
    <div className="glass pointer-events-auto relative flex rounded-full p-1 ring-1 ring-white/10 shadow-xl">
      {/* sliding thumb */}
      <span
        className="absolute inset-y-1 w-[calc(50%-0.25rem)] rounded-full bg-gradient-to-r from-[var(--color-aurora)] to-[var(--color-aurora-2)] shadow-lg transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]"
        style={{ transform: mode === "haul" ? "translateX(100%)" : "translateX(0)" }}
      />
      {OPTIONS.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`relative z-10 flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            mode === o.id ? "text-white" : "text-white/55"
          }`}
        >
          <span className="text-xs">{o.icon}</span>
          {o.label}
        </button>
      ))}
    </div>
  );
}
