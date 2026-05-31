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
        className={`shadow-card flex items-center gap-3 rounded-2xl bg-surface px-4 py-3.5 ring-2 transition-all duration-200 ${
          focused ? "ring-primary" : "ring-transparent"
        }`}
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-lg text-white">
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
          placeholder="Search a city or ask for a vibe…"
          enterKeyHint="search"
          className="min-w-0 flex-1 bg-transparent text-base font-medium text-ink placeholder:font-normal placeholder:text-sub/70 focus:outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              setValue("");
              setHint(null);
            }}
            aria-label="Clear"
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-muted text-sub transition hover:bg-line"
          >
            ✕
          </button>
        )}
      </form>

      {hint && (
        <div className="animate-pop-in shadow-card mt-2 rounded-2xl bg-surface px-4 py-3 text-sm font-medium text-accent">
          {hint}
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
              className="shadow-card rounded-full bg-surface px-3.5 py-2 text-sm font-semibold text-ink transition hover:bg-muted"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
