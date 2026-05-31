"use client";

import { useState } from "react";
import { matchPlace, PLACES } from "@/lib/geo";

interface Props {
  onResolve: (lat: number, lng: number, zoom: number, label: string) => void;
}

const SUGGESTIONS = ["Late night food in Tokyo", "Early coffee in New York", "Paris", "Dubai"];

export default function SearchBar({ onResolve }: Props) {
  const [value, setValue] = useState("");
  const [hint, setHint] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);

  const run = (raw: string) => {
    const place = matchPlace(raw);
    if (place) {
      setHint(null);
      onResolve(place.lat, place.lng, place.zoom, place.name);
    } else if (raw.trim()) {
      setHint(`Hmm, no crew gems indexed for "${raw.trim()}" yet — try ${PLACES.map((p) => p.name).slice(0, 3).join(", ")}.`);
    }
  };

  return (
    <div className="pointer-events-auto w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(value);
        }}
        className={`parchment-glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl ring-1 transition-all duration-300 ${
          focused ? "ring-pink/60 shadow-[0_10px_40px_-8px_rgba(255,46,126,.35)]" : "ring-forest/15"
        }`}
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-pink to-rose text-base text-white shadow-md">
          ✦
        </span>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (hint) setHint(null);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Ask Crew Pocket — “late night food in Tokyo”"
          enterKeyHint="search"
          className="min-w-0 flex-1 bg-transparent text-[15px] text-ink placeholder:text-ink/40 focus:outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              setValue("");
              setHint(null);
            }}
            aria-label="Clear"
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forest/10 text-ink/60 transition hover:bg-forest/20"
          >
            ✕
          </button>
        )}
      </form>

      {hint && (
        <div className="animate-pop-in parchment-glass mt-2 rounded-xl px-4 py-2.5 text-[13px] ring-1 ring-forest/15">
          <span className="text-pink">{hint}</span>
        </div>
      )}

      {focused && !value && (
        <div className="animate-pop-in mt-2 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                setValue(s);
                run(s);
              }}
              className="parchment-glass rounded-full px-3 py-1.5 text-xs font-medium text-ink/80 ring-1 ring-forest/15 transition hover:text-ink hover:ring-pink/60"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
