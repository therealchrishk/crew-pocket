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
    <div className="pastoral grid h-full w-full place-items-center">
      <div className="flex flex-col items-center gap-3 text-ink/60">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-forest/20 border-t-pink" />
        <span className="text-sm">Composing the crew map…</span>
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
      <div className="map-paint absolute inset-0 z-0">
        {view === "map" ? (
          <MapCanvas
            spots={spots}
            activeId={activeId}
            flyTarget={flyTarget}
            onSelect={handleSelect}
            onMapClick={handleMapClick}
          />
        ) : (
          <div className="pastoral relative h-full w-full">
            <HaulView />
          </div>
        )}
      </div>

      {/* ---- Collage texture: blueprint grid + painterly vignette over the map ---- */}
      {view === "map" && (
        <>
          <div className="grid-lines pointer-events-none absolute inset-0 z-[5] opacity-60" />
          <div
            className="pointer-events-none absolute inset-0 z-[5]"
            style={{
              boxShadow:
                "inset 0 0 160px 40px rgba(35,42,31,0.18), inset 0 0 60px rgba(41,66,52,0.12)",
            }}
          />
          {/* surreal floating accents */}
          <div className="animate-drift pointer-events-none absolute left-6 top-40 z-[6] text-3xl opacity-70 [--rot:-8deg] drop-shadow">
            🕊️
          </div>
          <div className="animate-drift pointer-events-none absolute right-8 top-[58%] z-[6] text-3xl opacity-60 [--rot:12deg] [animation-delay:-5s]">
            🛹
          </div>
        </>
      )}

      {/* ---- Top floating controls ---- */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-col items-center gap-3 px-4 pt-[calc(env(safe-area-inset-top)+0.75rem)]">
        <div className="flex w-full max-w-md items-center justify-between">
          <h1 className="font-display select-none text-2xl font-extrabold tracking-tight text-ink">
            Crew<span className="italic text-pink">Pocket</span>
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
        <div className="animate-pop-in parchment-glass pointer-events-none absolute left-1/2 top-1/3 z-30 -translate-x-1/2 rounded-full px-5 py-2.5 text-sm font-semibold text-ink ring-1 ring-forest/15">
          {toast}
        </div>
      )}

      {/* ---- FAB (map mode only) ---- */}
      {view === "map" && (
        <div className="absolute bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] right-5 z-20 flex flex-col items-end gap-3">
          {armed && (
            <span className="animate-pop-in parchment-glass rounded-full px-3 py-1.5 text-xs font-medium text-ink ring-1 ring-forest/15">
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
