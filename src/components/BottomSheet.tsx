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
        className="animate-pop-in fixed inset-0 z-30 bg-black/40 backdrop-blur-[2px]"
      />

      <div
        key={spot.id}
        role="dialog"
        aria-modal="true"
        className="animate-sheet-up glass fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md rounded-t-3xl pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-2 shadow-[0_-12px_50px_-12px_rgba(0,0,0,.6)] ring-1 ring-white/10"
      >
        <div className="mx-auto mb-3 mt-1 h-1.5 w-12 rounded-full bg-white/25" />

        <div className="px-5">
          <div className="relative h-44 w-full overflow-hidden rounded-2xl">
            <Image
              src={spot.image}
              alt={spot.name}
              fill
              sizes="(max-width: 448px) 100vw, 448px"
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
            <span className="absolute left-3 top-3 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              {spot.category}
            </span>
          </div>

          <div className="mt-4 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold leading-tight text-white">{spot.name}</h2>
              <p className="mt-0.5 text-sm text-white/50">📍 {spot.city}</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20"
            >
              ✕
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/10">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--color-aurora)] to-[var(--color-coral)] text-sm font-bold text-white">
              {spot.crew.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">{spot.crew}</p>
              <p className="text-xs text-white/45">Verified layover tip</p>
            </div>
          </div>

          <p className="mt-4 text-[15px] leading-relaxed text-white/80">
            “{spot.recommendation}”
          </p>

          <div className="mt-5 flex gap-3">
            <button className="flex-1 rounded-2xl bg-gradient-to-r from-[var(--color-aurora)] to-[var(--color-aurora-2)] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--color-aurora)]/30 transition active:scale-[.98]">
              Get Directions
            </button>
            <button className="grid w-14 place-items-center rounded-2xl bg-white/10 text-lg transition hover:bg-white/15 active:scale-95">
              ♥
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
