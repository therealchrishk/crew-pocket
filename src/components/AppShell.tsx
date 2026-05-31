"use client";

import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import seed from "@/data/crewSpots.json";
import type { CrewSpot, FlyTarget } from "@/types";
import SearchBar from "./SearchBar";
import BottomSheet from "./BottomSheet";
import Fab from "./Fab";
import ViewToggle, { type ViewMode } from "./ViewToggle";
import HaulView from "./HaulView";

// Leaflet touches `window`, so the map must never render on the server.
const MapCanvas = dynamic(() => import("./MapCanvas"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-muted">
      <div className="flex flex-col items-center gap-3 text-sub">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-primary" />
        <span className="text-sm font-medium">Loading the crew map…</span>
      </div>
    </div>
  ),
});

export default function AppShell() {
  const [view, setView] = useState<ViewMode>("map");
  const [spots, setSpots] = useState<CrewSpot[]>(seed as CrewSpot[]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [flyTarget, setFlyTarget] = useState<FlyTarget | null>(null);
  const [armed, setArmed] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const activeSpot = useMemo(
    () => spots.find((s) => s.id === activeId) ?? null,
    [spots, activeId]
  );

  const flyTo = useCallback((lat: number, lng: number, zoom: number, label: string) => {
    setView("map");
    setFlyTarget({ lat, lng, zoom, nonce: Date.now() });
    setToast(`Panning to ${label} ✈️`);
    window.setTimeout(() => setToast(null), 1800);
  }, []);

  const handleSelect = useCallback((spot: CrewSpot) => {
    setActiveId(spot.id);
    setFlyTarget({ lat: spot.lat, lng: spot.lng, zoom: 14, nonce: Date.now() });
  }, []);

  const handleMapClick = useCallback(
    (lat: number, lng: number) => {
      if (!armed) return;
      const newSpot: CrewSpot = {
        id: `me-${Date.now()}`,
        name: "Your new gem",
        lat,
        lng,
        city: "Dropped pin",
        category: "Grocery Haul",
        crew: "You, Crew Pocket",
        recommendation:
          "You just dropped a pin here. Add a tip so the next crew rotating through this layover knows what makes this spot special.",
        image:
          "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80",
      };
      setSpots((prev) => [...prev, newSpot]);
      setArmed(false);
      setActiveId(newSpot.id);
    },
    [armed]
  );

  return (
    <main className="fixed inset-0 overflow-hidden">
      {/* ---- Canvas layer (z-0 contains Leaflet's panes so the UI stays on top) ---- */}
      <div className="absolute inset-0 z-0">
        {view === "map" ? (
          <MapCanvas
            spots={spots}
            activeId={activeId}
            flyTarget={flyTarget}
            onSelect={handleSelect}
            onMapClick={handleMapClick}
          />
        ) : (
          <div className="relative h-full w-full bg-bg">
            <HaulView />
          </div>
        )}
      </div>

      {/* ---- Top floating controls ---- */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-col items-center gap-3 px-4 pt-[calc(env(safe-area-inset-top)+0.75rem)]">
        <div className="flex w-full max-w-md items-center justify-between">
          <h1 className="shadow-card flex select-none items-center gap-2 rounded-full bg-surface py-2 pl-2 pr-4 text-base font-extrabold tracking-tight text-ink">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-sm text-white">✦</span>
            <span className="whitespace-nowrap">Crew<span className="text-primary">Pocket</span></span>
          </h1>
          <ViewToggle mode={view} onChange={setView} />
        </div>
        {view === "map" && (
          <div className="w-full max-w-md">
            <SearchBar onResolve={flyTo} />
          </div>
        )}
      </div>

      {/* ---- Toast ---- */}
      {toast && (
        <div className="animate-pop-in shadow-float pointer-events-none absolute left-1/2 top-1/3 z-30 -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white">
          {toast}
        </div>
      )}

      {/* ---- FAB (map mode only) ---- */}
      {view === "map" && (
        <div className="absolute bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] right-5 z-20 flex flex-col items-end gap-3">
          {armed && (
            <span className="animate-pop-in shadow-card rounded-full bg-surface px-3.5 py-2 text-xs font-semibold text-ink">
              Tap anywhere on the map 👇
            </span>
          )}
          <Fab armed={armed} onClick={() => setArmed((a) => !a)} />
        </div>
      )}

      {/* ---- Bottom sheet ---- */}
      <BottomSheet spot={activeSpot} onClose={() => setActiveId(null)} />
    </main>
  );
}
