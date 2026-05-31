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
      className={`pointer-events-auto grid h-16 w-16 place-items-center rounded-full text-white shadow-float transition-all duration-300 active:scale-90 ${
        armed
          ? "scale-110 animate-[pin-pulse_1.4s_infinite] bg-accent"
          : "bg-primary"
      }`}
    >
      <span className={`text-3xl font-light leading-none transition-transform duration-300 ${armed ? "rotate-45" : ""}`}>
        +
      </span>
    </button>
  );
}
