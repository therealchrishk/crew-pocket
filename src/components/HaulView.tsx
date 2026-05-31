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
        <header className="mb-5">
          <h1 className="text-4xl font-extrabold leading-none tracking-tight text-ink">Inflight Haul</h1>
          <p className="mt-2 text-base font-medium text-sub">
            What crew actually buy in bulk, around the world.
          </p>
        </header>

        <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto pb-1">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-bold transition ${
                tag === t
                  ? "bg-ink text-white"
                  : "bg-muted text-sub hover:bg-line"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {visible.map((item, idx) => (
            <article
              key={item.id}
              className="animate-pop-in transition active:scale-[.98]"
              style={{ animationDelay: `${idx * 45}ms` }}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-muted shadow-card">
                <Image
                  src={item.image}
                  alt={item.product}
                  fill
                  sizes="(max-width: 448px) 50vw, 224px"
                  className="object-cover"
                  unoptimized
                />
                <span className="absolute left-2.5 top-2.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink shadow-sm">
                  {item.origin}
                </span>
              </div>
              <div className="px-1 pt-3">
                <h3 className="text-[15px] font-bold leading-snug text-ink">{item.product}</h3>
                <p className="mt-0.5 text-[13px] font-semibold text-primary">{item.store}</p>
                <p className="mt-1 text-[13px] leading-snug text-sub">{item.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
