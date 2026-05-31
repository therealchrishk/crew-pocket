"use client";

import Image from "next/image";
import type { CrewSpot } from "@/types";

interface Props {
  spot: CrewSpot | null;
  onClose: () => void;
}

export default function BottomSheet({ spot, onClose }: Props) {
  if (!spot) return null;

  return (
    <>
      {/* scrim */}
      <button
        aria-label="Close details"
        onClick={onClose}
        className="animate-pop-in fixed inset-0 z-30 bg-forest/30 backdrop-blur-[2px]"
      />

      <div
        key={spot.id}
        role="dialog"
        aria-modal="true"
        className="animate-sheet-up parchment fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md rounded-t-3xl pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-2 ring-1 ring-forest/10"
      >
        <div className="mx-auto mb-3 mt-1 h-1.5 w-12 rounded-full bg-forest/20" />

        <div className="px-5">
          <div className="relative h-44 w-full overflow-hidden rounded-2xl ring-1 ring-forest/10">
            <Image
              src={spot.image}
              alt={spot.name}
              fill
              sizes="(max-width: 448px) 100vw, 448px"
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/55 via-transparent" />
            <span className="absolute left-3 top-3 rounded-full bg-cream/85 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-forest backdrop-blur">
              {spot.category}
            </span>
          </div>

          <div className="mt-4 flex items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-bold leading-tight text-ink">{spot.name}</h2>
              <p className="mt-0.5 text-sm text-ink/50">📍 {spot.city}</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest/10 text-ink/60 transition hover:bg-forest/20"
            >
              ✕
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-forest/[0.05] p-3 ring-1 ring-forest/10">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-forest to-pink text-sm font-bold text-cream">
              {spot.crew.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink">{spot.crew}</p>
              <p className="text-xs text-ink/45">Verified layover tip</p>
            </div>
          </div>

          <p className="mt-4 text-[15px] leading-relaxed text-ink/80">
            “{spot.recommendation}”
          </p>

          <div className="mt-5 flex gap-3">
            <button className="flex-1 rounded-2xl bg-gradient-to-r from-pink to-rose py-3.5 text-sm font-semibold text-white shadow-lg shadow-pink/25 transition active:scale-[.98]">
              Get Directions
            </button>
            <button className="grid w-14 place-items-center rounded-2xl bg-forest/10 text-lg text-pink transition hover:bg-forest/15 active:scale-95">
              ♥
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
