"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import type { CrewSpot, FlyTarget } from "@/types";

const CATEGORY_COLORS: Record<string, string> = {
  "Late Night Food": "#ff5c8a",
  "Early Coffee": "#f6b73c",
  "Grocery Haul": "#3dd7b6",
  default: "#6d5efc",
};

function spotIcon(spot: CrewSpot, active: boolean) {
  const color = CATEGORY_COLORS[spot.category] ?? CATEGORY_COLORS.default;
  const size = active ? 46 : 38;
  return L.divIcon({
    className: "crew-pin",
    html: `
      <div style="
        width:${size}px;height:${size}px;border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        background:linear-gradient(135deg, ${color}, ${color}cc);
        border:2px solid rgba(255,255,255,.9);
        box-shadow:0 8px 18px ${color}66, 0 2px 6px rgba(0,0,0,.4);
        display:flex;align-items:center;justify-content:center;
        ${active ? "animation:pin-pulse 1.6s infinite;" : ""}
      ">
        <div style="transform:rotate(45deg);font-size:${active ? 18 : 15}px;line-height:1;">📍</div>
      </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  });
}

/** Imperatively flies the map whenever a new FlyTarget nonce arrives. */
function FlyController({ target }: { target: FlyTarget | null }) {
  const map = useMap();
  useEffect(() => {
    if (!target) return;
    map.flyTo([target.lat, target.lng], target.zoom, {
      duration: 1.5,
      easeLinearity: 0.25,
    });
  }, [target, map]);
  return null;
}

/** Lets the FAB-dropped pin land where the user is currently looking. */
function ClickReporter({ onMapClick }: { onMapClick?: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick?.(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface Props {
  spots: CrewSpot[];
  activeId: string | null;
  flyTarget: FlyTarget | null;
  onSelect: (spot: CrewSpot) => void;
  onMapClick?: (lat: number, lng: number) => void;
}

export default function MapCanvas({
  spots,
  activeId,
  flyTarget,
  onSelect,
  onMapClick,
}: Props) {
  return (
    <MapContainer
      center={[35.66, 139.7]}
      zoom={12}
      zoomControl={false}
      className="h-full w-full"
      worldCopyJump
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; OpenStreetMap &copy; CARTO'
      />
      <FlyController target={flyTarget} />
      <ClickReporter onMapClick={onMapClick} />
      {spots.map((spot) => (
        <Marker
          key={spot.id}
          position={[spot.lat, spot.lng]}
          icon={spotIcon(spot, spot.id === activeId)}
          eventHandlers={{ click: () => onSelect(spot) }}
        />
      ))}
    </MapContainer>
  );
}
