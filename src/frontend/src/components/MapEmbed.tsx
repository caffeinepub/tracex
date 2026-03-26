import { useEffect, useRef } from "react";

interface MapEmbedProps {
  lat: number;
  lng: number;
  zoom?: number;
  height?: string;
  className?: string;
}

export function MapEmbed({
  lat,
  lng,
  zoom = 14,
  height = "400px",
  className = "",
}: MapEmbedProps) {
  // OpenStreetMap embed with marker
  const delta = 0.05 / zoom;
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <iframe
      src={src}
      width="100%"
      height={height}
      className={`rounded-xl border border-border ${className}`}
      style={{ border: "none" }}
      title="Location Map"
      loading="lazy"
    />
  );
}

interface StaticMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  width?: number;
  height?: number;
  className?: string;
}

export function StaticMapThumb({
  lat,
  lng,
  zoom = 13,
  width = 300,
  height = 200,
  className = "",
}: StaticMapProps) {
  const src = `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&markers=${lat},${lng},red-pushpin`;
  return (
    <img
      src={src}
      alt={`Map at ${lat}, ${lng}`}
      className={`rounded-lg ${className}`}
      width={width}
      height={height}
    />
  );
}
