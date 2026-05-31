/** Lightweight offline "geocoder" for the prototype search bar. */
export interface Place {
  name: string;
  aliases: string[];
  lat: number;
  lng: number;
  zoom: number;
}

export const PLACES: Place[] = [
  { name: "Tokyo", aliases: ["tokyo", "haneda", "narita", "shibuya", "tky", "hnd", "nrt"], lat: 35.6762, lng: 139.6503, zoom: 12 },
  { name: "New York", aliases: ["new york", "nyc", "manhattan", "brooklyn", "jfk", "newark"], lat: 40.7308, lng: -73.9876, zoom: 12 },
  { name: "London", aliases: ["london", "heathrow", "lhr", "lon"], lat: 51.5072, lng: -0.1276, zoom: 12 },
  { name: "Paris", aliases: ["paris", "cdg", "charles de gaulle"], lat: 48.8566, lng: 2.3522, zoom: 12 },
  { name: "Dubai", aliases: ["dubai", "dxb"], lat: 25.2048, lng: 55.2708, zoom: 11 },
  { name: "Singapore", aliases: ["singapore", "changi", "sin"], lat: 1.3521, lng: 103.8198, zoom: 12 },
];

/** Parse a free-text query and return the best matching place, if any. */
export function matchPlace(query: string): Place | null {
  const q = query.toLowerCase();
  let best: Place | null = null;
  let bestLen = 0;
  for (const place of PLACES) {
    for (const alias of place.aliases) {
      if (q.includes(alias) && alias.length > bestLen) {
        best = place;
        bestLen = alias.length;
      }
    }
  }
  return best;
}
