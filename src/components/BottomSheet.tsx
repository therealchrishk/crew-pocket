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
        className="animate-pop-in fixed inset-0 z-30 bg-ink/40"
      />

      <div
        key={spot.id}
        role="dialog"
        aria-modal="true"
        className="animate-sheet-up shadow-float fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md rounded-t-[28px] bg-surface pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-2"
      >
        <div className="mx-auto mb-3 mt-1 h-1.5 w-12 rounded-full bg-line" />

        <div className="px-5">
          <div className="relative h-52 w-full overflow-hidden rounded-3xl bg-muted">
            <Image
              src={spot.image}
              alt={spot.name}
              fill
              sizes="(max-width: 448px) 100vw, 448px"
              className="object-cover"
              unoptimized
            />
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-ink shadow-sm">
              {spot.category}
            </span>
          </div>

          <div className="mt-5 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-3xl font-extrabold leading-[1.05] tracking-tight text-ink">{spot.name}</h2>
              <p className="mt-1.5 text-base font-medium text-sub">📍 {spot.city}</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-muted text-lg text-sub transition hover:bg-line"
            >
              ✕
            </button>
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-2xl bg-muted p-3.5">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-base font-bold text-white">
              {spot.crew.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-bold text-ink">{spot.crew}</p>
              <p className="text-sm font-medium text-emerald">✓ Verified layover tip</p>
            </div>
          </div>

          <p className="mt-4 text-base leading-relaxed text-ink/85">
            {spot.recommendation}
          </p>

          <div className="mt-6 flex gap-3">
            <button className="flex-1 rounded-2xl bg-primary py-4 text-base font-bold text-white transition active:scale-[.98]">
              Get Directions
            </button>
            <button className="grid w-16 place-items-center rounded-2xl bg-muted text-xl text-accent transition hover:bg-line active:scale-95">
              ♥
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
