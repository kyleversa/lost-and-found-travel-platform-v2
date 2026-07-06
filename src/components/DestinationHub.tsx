"use client";

import { DestinationCard } from "@/components/DestinationCard";
import { DossierBuilderPromo } from "@/components/DossierBuilderPromo";
import { ProfileIntro } from "@/components/ProfileIntro";
import { useProfile } from "@/contexts/ProfileContext";
import { useFoundDestinations, useLostDestinations } from "@/hooks/useUserDestinations";
import type { TravelMode } from "@/lib/types";
import { countPinnedPlaces } from "@/lib/workspace-stats";

type DestinationHubProps = {
  mode: TravelMode;
};

export function DestinationHub({ mode }: DestinationHubProps) {
  const { username, profile } = useProfile();
  const foundDestinations = useFoundDestinations(username);
  const lostDestinations = useLostDestinations(username);
  const destinations = mode === "found" ? foundDestinations : lostDestinations;
  const pinnedPlaces = countPinnedPlaces(destinations, mode);
  const sectionTitle = mode === "found" ? "Travel dossiers" : "Dream trip dossiers";

  return (
    <>
      <ProfileIntro
        mode={mode}
        collectionCount={destinations.length}
        pinnedPlaces={pinnedPlaces}
      />

      <section className="hub-section content-wrap">
        <div className="hub-section-header">
          <h2 className="hub-section-title">{sectionTitle}</h2>
          <p className="hub-section-copy">
            {mode === "found" ? profile.collectionCopy.foundHub : profile.collectionCopy.lostHub}
          </p>
          <DossierBuilderPromo username={username} variant="compact" mode={mode} />
        </div>
        <div className="destination-grid destination-grid-bento">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.slug}
              mode={mode}
              destination={destination}
              priority={index === 0}
              featured={index === 0}
            />
          ))}
        </div>
      </section>
    </>
  );
}
