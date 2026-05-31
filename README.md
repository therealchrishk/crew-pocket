# Crew Pocket ✈️

A mobile-first, crowdsourced social map of hidden gems for cabin crew on 24–48h layovers. Built as an interactive prototype.

## Stack
- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **React-Leaflet** + Leaflet (free, open-source maps via CARTO dark tiles)

## Features
- **✨ AI-style chat search bar** — type natural language like _"late night food in Tokyo"_ and the map smoothly flies to those coordinates.
- **🗺️ Full-screen map canvas** — dark, sleek, seamless. Custom category-colored pins.
- **➕ Floating action button** — arm it, then tap the map to mock-drop a new crew pin.
- **🪟 Sliding bottom-sheet** — tap any pin and a details card animates up from the bottom.
- **🛍️ Inflight Haul view** — toggle into an image-friendly grid of products crew buy in bulk (European pharmacy skincare, Japanese snacks, etc).

## Data
- `src/data/crewSpots.json` — seeded map pins (Tokyo & NYC).
- `src/data/inflightHaul.json` — seeded haul products.

## Run
```bash
npm install
npm run dev   # http://localhost:3000
```
