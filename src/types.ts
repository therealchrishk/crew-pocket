export interface CrewSpot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  city: string;
  category: string;
  crew: string;
  recommendation: string;
  image: string;
}

export interface HaulItem {
  id: string;
  product: string;
  origin: string;
  store: string;
  tag: string;
  note: string;
  image: string;
}

/** A coordinate target the map should fly to. */
export interface FlyTarget {
  lat: number;
  lng: number;
  zoom: number;
  /** changes on every dispatch so the map effect re-fires for repeat searches */
  nonce: number;
}
