"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import L from "leaflet";
import type { MapPin } from "@/lib/types";
import "leaflet/dist/leaflet.css";

type InteractiveMapProps = {
  city: string;
  pins: MapPin[];
};

export function InteractiveMap({ city, pins }: InteractiveMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (!containerRef.current || pins.length === 0) {
      return;
    }

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    const markerIcon = L.divIcon({
      className: "interactive-map-marker",
      html: "<span></span>",
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });

    const coordinates: L.LatLngExpression[] = [];

    for (const pin of pins) {
      L.marker([pin.lat, pin.lng], { icon: markerIcon })
        .addTo(map)
        .bindPopup(
          `<strong>${escapeHtml(pin.name)}</strong><br><span>${escapeHtml(pin.category)}</span>`,
        );
      coordinates.push([pin.lat, pin.lng]);
    }

    if (coordinates.length === 1) {
      map.setView(coordinates[0], 13);
    } else {
      map.fitBounds(L.latLngBounds(coordinates), { padding: [36, 36] });
    }

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [pins, city]);

  if (pins.length === 0) {
    return (
      <div className="interactive-map-empty">
        <p>No pinned places on the map yet.</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="interactive-map"
      aria-label={`Interactive map of ${city}`}
    />
  );
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
