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
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Inflight Haul</h1>
          <p className="mt-1 text-sm text-white/50">
            What crew actually buy in bulk — sourced from the galley grapevine.
          </p>
        </header>

        <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                tag === t
                  ? "bg-gradient-to-r from-[var(--color-aurora)] to-[var(--color-aurora-2)] text-white shadow-lg"
                  : "glass text-white/60 ring-1 ring-white/10"
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
              className="animate-pop-in glass overflow-hidden rounded-2xl ring-1 ring-white/10 transition active:scale-[.98]"
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
                <span className="absolute left-2 top-2 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur">
                  {item.origin}
                </span>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-bold leading-snug text-white">{item.product}</h3>
                <p className="mt-0.5 text-[11px] font-medium text-[var(--color-mint)]">{item.store}</p>
                <p className="mt-1.5 text-[12px] leading-snug text-white/55">{item.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
