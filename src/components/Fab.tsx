"use client";

interface Props {
  onClick: () => void;
  armed: boolean;
}

export default function Fab({ onClick, armed }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label={armed ? "Tap the map to drop your pin" : "Drop a new crew pin"}
      className={`pointer-events-auto grid h-16 w-16 place-items-center rounded-full text-white shadow-xl ring-1 ring-cream/40 transition-all duration-300 active:scale-90 ${
        armed
          ? "scale-110 animate-[pin-pulse_1.4s_infinite] bg-gradient-to-br from-pink to-rose"
          : "bg-gradient-to-br from-forest to-[#1c2f24] shadow-forest/40"
      }`}
    >
      <span className={`text-3xl font-light leading-none transition-transform duration-300 ${armed ? "rotate-45" : ""}`}>
        +
      </span>
    </button>
  );
}
