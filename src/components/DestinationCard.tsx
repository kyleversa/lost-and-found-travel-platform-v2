"use client";

import Image from "next/image";
import Link from "next/link";
import { useProfile } from "@/contexts/ProfileContext";
import { dossierPath } from "@/lib/paths";
import type { FoundDestination, LostDestination, TravelMode } from "@/lib/types";

type DestinationCardProps = {
  mode: TravelMode;
  destination: FoundDestination | LostDestination;
  priority?: boolean;
  featured?: boolean;
};

export function DestinationCard({
  mode,
  destination,
  priority = false,
  featured = false,
}: DestinationCardProps) {
  const { username } = useProfile();
  const href = dossierPath(username, mode, destination.slug);

  return (
    <Link
      href={href}
      className={`destination-card group${featured ? " destination-card-featured" : ""}`}
    >
      <div className="destination-card-image">
        <Image
          src={destination.image}
          alt={`${destination.city}, ${destination.country}`}
          fill
          priority={priority}
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="destination-card-overlay" />
        <div className="destination-card-body">
          <p className="destination-card-meta">{destination.country}</p>
          <h3 className="destination-card-title">{destination.city}</h3>
          <p className="destination-card-copy">{destination.tagline}</p>
        </div>
      </div>
    </Link>
  );
}
