"use client";

import { useState } from "react";
import Image from "next/image";
import haul from "@/data/inflightHaul.json";
import type { HaulItem } from "@/types";

const items = haul as HaulItem[];
const TAGS = ["All", ...Array.from(new Set(items.map((i) => i.tag)))];

export default function HaulView() {
  const [tag, setTag] = useState("All");
  const visible = tag === "All" ? items : items.filter((i) => i.tag === tag);

  return (
    <div className="no-scrollbar h-full overflow-y-auto px-4 pb-32 pt-[calc(env(safe-area-inset-top)+7.5rem)]">
      <div className="mx-auto max-w-md">
        <header className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">The Galley Grapevine</p>
          <h1 className="font-display mt-1 text-4xl font-extrabold leading-none text-ink">Inflight Haul</h1>
          <p className="mt-2 text-sm text-ink/55">
            What crew actually buy in bulk — curated like a still-life.
          </p>
        </header>

        <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                tag === t
                  ? "bg-gradient-to-r from-forest to-[#1c2f24] text-cream shadow-md"
                  : "parchment-glass text-ink/60 ring-1 ring-forest/15"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {visible.map((item, idx) => (
            <article
              key={item.id}
              className="animate-pop-in parchment overflow-hidden rounded-2xl ring-1 ring-forest/10 transition active:scale-[.98]"
              style={{ animationDelay: `${idx * 45}ms` }}
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={item.image}
                  alt={item.product}
                  fill
                  sizes="(max-width: 448px) 50vw, 224px"
                  className="object-cover"
                  unoptimized
                />
                <span className="absolute left-2 top-2 rounded-full bg-cream/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-forest backdrop-blur">
                  {item.origin}
                </span>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-bold leading-snug text-ink">{item.product}</h3>
                <p className="mt-0.5 text-[11px] font-medium text-pink">{item.store}</p>
                <p className="mt-1.5 text-[12px] leading-snug text-ink/55">{item.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
