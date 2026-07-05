import dynamic from "next/dynamic";
import type { MapPin } from "@/lib/types";

const InteractiveMap = dynamic(
  () => import("@/components/InteractiveMap").then((module) => module.InteractiveMap),
  {
    ssr: false,
    loading: () => <div className="interactive-map interactive-map-loading">Opening map…</div>,
  },
);

type MapSectionProps = {
  id: string;
  city: string;
  pins: MapPin[];
};

export function MapSection({ id, city, pins }: MapSectionProps) {
  return (
    <section id={id} className="panel panel-rise scroll-mt-28">
      <div className="panel-header">
        <p className="panel-eyebrow">Map view</p>
        <h2 className="panel-title">{city} on the map</h2>
        <p className="panel-copy">
          Pan and zoom pinned places. Tap a marker for details, or open a pin in Google
          Maps below.
        </p>
      </div>

      <InteractiveMap city={city} pins={pins} />

      {pins.length > 0 ? (
        <div className="map-pin-list">
          {pins.map((pin) => (
            <a
              key={`${pin.name}-${pin.lat}-${pin.lng}`}
              href={`https://www.google.com/maps/search/?api=1&query=${pin.lat},${pin.lng}`}
              target="_blank"
              rel="noreferrer"
              className="map-pin-card"
            >
              <span className="collection-tag">{pin.category}</span>
              <h3 className="collection-title">{pin.name}</h3>
              <p className="collection-copy">
                {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}
              </p>
              <span className="collection-card-action">Open in Google Maps</span>
            </a>
          ))}
        </div>
      ) : null}
    </section>
  );
}
