import Image from "next/image";
import type { FoundDestination, LostDestination, TravelMode } from "@/lib/types";

type DestinationHeroProps = {
  mode: TravelMode;
  destination: FoundDestination | LostDestination;
};

export function DestinationHero({ mode, destination }: DestinationHeroProps) {
  const eyebrow =
    mode === "found"
      ? "Memory dossier"
      : `Dream dossier · ${(destination as LostDestination).budget.replace("-", " ")}`;

  const profileFact =
    mode === "found"
      ? `Visited ${(destination as FoundDestination).visitedOn}`
      : `Best time to go: ${(destination as LostDestination).bestTime}`;

  return (
    <section className="destination-hero">
      <div className="destination-hero-image">
        <Image
          src={destination.image}
          alt={`${destination.city}, ${destination.country}`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="destination-hero-overlay" />
      </div>
      <div className="destination-hero-content">
        <p className="hero-eyebrow">{eyebrow}</p>
        <h1 className="hero-title">{destination.city}</h1>
        <p className="hero-location">{destination.country}</p>
        <p className="hero-fact">{profileFact}</p>
        <p className="hero-tagline">{destination.tagline}</p>
      </div>
    </section>
  );
}
