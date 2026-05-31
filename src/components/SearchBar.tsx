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
        className={`glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xl ring-1 transition-all duration-300 ${
          focused ? "ring-[var(--color-aurora-2)]/70 shadow-[0_10px_40px_-8px_rgba(193,75,255,.45)]" : "ring-white/10"
        }`}
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-aurora)] to-[var(--color-aurora-2)] text-base shadow-lg">
          ✨
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
          className="min-w-0 flex-1 bg-transparent text-[15px] text-white placeholder:text-white/40 focus:outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              setValue("");
              setHint(null);
            }}
            aria-label="Clear"
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20"
          >
            ✕
          </button>
        )}
      </form>

      {hint && (
        <div className="animate-pop-in glass mt-2 rounded-xl px-4 py-2.5 text-[13px] text-coral ring-1 ring-white/10">
          <span className="text-[var(--color-coral)]">{hint}</span>
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
              className="glass rounded-full px-3 py-1.5 text-xs font-medium text-white/80 ring-1 ring-white/10 transition hover:text-white hover:ring-[var(--color-aurora-2)]/60"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
