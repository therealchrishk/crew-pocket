import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crew Pocket — Layover gems, crowdsourced by crew",
  description:
    "A crowdsourced social map of hidden gems for cabin crew on 24–48h layovers. Find late-night food, early coffee, and the best inflight hauls.",
};

export const viewport: Viewport = {
  themeColor: "#0a0b1a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
