"use client";

import Image from "next/image";
import { useProfile } from "@/contexts/ProfileContext";
import type { TravelMode } from "@/lib/types";

type ProfileIntroProps = {
  mode: TravelMode;
  collectionCount: number;
  pinnedPlaces: number;
};

export function ProfileIntro({ mode, collectionCount, pinnedPlaces }: ProfileIntroProps) {
  const { profile } = useProfile();
  const collectionLabel = mode === "found" ? "Memories" : "Dream trips";
  const introCopy =
    mode === "found" ? profile.collectionCopy.foundIntro : profile.collectionCopy.lostIntro;

  return (
    <section className="page-intro">
      <div className="page-intro-inner">
        <div className="profile-intro-header">
          <div className="profile-intro-identity">
            <div className="profile-avatar-wrap profile-avatar-wrap-sm">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div>
              <p className="profile-name">{profile.name}</p>
              <p className="profile-handle">{profile.handle}</p>
            </div>
          </div>
          {profile.isDemo ? (
            <span className="demo-profile-badge">Demo profile</span>
          ) : null}
        </div>
        <p className="profile-bio">{profile.bio}</p>
        <h1 className="page-title">{mode === "found" ? "Found" : "Lost"}</h1>
        <p className="page-copy">{introCopy}</p>
        <div className="stats-row">
          <div className="stat-card stat-rise">
            <strong>{collectionCount}</strong>
            <span>{collectionLabel}</span>
          </div>
          <div className="stat-card stat-rise">
            <strong>{pinnedPlaces}</strong>
            <span>Pinned places</span>
          </div>
          <div className="stat-card stat-rise">
            <strong>{profile.stats.countriesVisited}</strong>
            <span>Countries</span>
          </div>
          <div className="stat-card stat-rise">
            <strong>{profile.stats.tripsLogged}</strong>
            <span>Trips logged</span>
          </div>
        </div>
      </div>
    </section>
  );
}
