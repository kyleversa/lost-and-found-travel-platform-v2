"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CollectionSection } from "@/components/CollectionSection";
import { DestinationHero } from "@/components/DestinationHero";
import { DossierNav } from "@/components/DossierNav";
import { EditToolbar } from "@/components/EditToolbar";
import { ExternalInsightsPanel } from "@/components/ExternalInsightsPanel";
import { ItinerarySection } from "@/components/ItinerarySection";
import { MapSection } from "@/components/MapSection";
import { ModeShell } from "@/components/ModeShell";
import { RatingBars } from "@/components/RatingBars";
import { SiteHeader } from "@/components/SiteHeader";
import { WatchReadSection } from "@/components/WatchReadSection";
import { CollectionBackLink } from "@/components/CollectionBackLink";
import { useProfile } from "@/contexts/ProfileContext";
import { useIsClient } from "@/hooks/useIsClient";
import {
  getDestinationOwnership,
  notifyUserStoreUpdated,
  useFoundDestination,
} from "@/hooks/useUserDestinations";
import { collectionPath, defaultPinNote, profilePossessive } from "@/lib/paths";
import type { ExternalInsights, FoundDestination, SavedPlace } from "@/lib/types";
import {
  deleteFoundDestination,
  resetFoundSeedEdits,
  saveFoundDestination,
} from "@/lib/user-store";

type FoundDossierWorkspaceProps = {
  slug: string;
  insights: ExternalInsights;
  fetchInsightsOnClient?: boolean;
};

export function FoundDossierWorkspace({
  slug,
  insights: initialInsights,
  fetchInsightsOnClient = false,
}: FoundDossierWorkspaceProps) {
  const router = useRouter();
  const { username, profile } = useProfile();
  const isClient = useIsClient();
  const loadedDestination = useFoundDestination(username, slug);
  const [editDraft, setEditDraft] = useState<FoundDestination | null>(null);
  const [insights, setInsights] = useState(initialInsights);
  const [isEditing, setIsEditing] = useState(false);
  const [newGem, setNewGem] = useState({ name: "", note: "" });

  const destination = (isEditing ? editDraft : loadedDestination) ?? null;

  useEffect(() => {
    if (!fetchInsightsOnClient || !loadedDestination) {
      return;
    }

    fetch(
      `/api/insights/${encodeURIComponent(loadedDestination.city)}?country=${encodeURIComponent(loadedDestination.country)}`,
    )
      .then((response) => response.json())
      .then((data: ExternalInsights) => setInsights(data))
      .catch(() => undefined);
  }, [fetchInsightsOnClient, loadedDestination]);

  if (!isClient) {
    return (
      <ModeShell mode="found">
        <SiteHeader mode="found" />
        <div className="content-wrap panel panel-rise missing-state">
          <p className="panel-copy">Loading travel dossier…</p>
        </div>
      </ModeShell>
    );
  }

  if (!destination) {
    return (
      <ModeShell mode="found">
        <SiteHeader mode="found" />
        <div className="content-wrap panel panel-rise missing-state">
          <h2 className="panel-title">Dossier not found</h2>
          <p className="panel-copy">
            This travel dossier is not in {profilePossessive(profile.name)} Found collection.
            Return to the collection or choose another city.
          </p>
          <Link href={collectionPath(username, "found")} className="primary-action inline-fit">
            Back to Found collection
          </Link>
        </div>
      </ModeShell>
    );
  }

  const ownership = getDestinationOwnership(username, slug, "found");

  function updateDraft(next: Partial<FoundDestination>) {
    setEditDraft((current) => (current ? { ...current, ...next } : current));
  }

  function handleToggleEdit() {
    if (isEditing) {
      setIsEditing(false);
      setEditDraft(null);
      return;
    }

    if (loadedDestination) {
      setEditDraft(structuredClone(loadedDestination));
      setIsEditing(true);
    }
  }

  function handleSave() {
    if (!editDraft) {
      return;
    }

    saveFoundDestination(username, editDraft);
    notifyUserStoreUpdated();
    setIsEditing(false);
    setEditDraft(null);
  }

  function handleReset() {
    resetFoundSeedEdits(username, slug);
    notifyUserStoreUpdated();
    setIsEditing(false);
    setEditDraft(null);
  }

  function handleDelete() {
    deleteFoundDestination(username, slug);
    notifyUserStoreUpdated();
    router.push(collectionPath(username, "found"));
  }

  function addHiddenGem() {
    if (!editDraft || !newGem.name.trim()) {
      return;
    }

    const gem: SavedPlace = {
      name: newGem.name.trim(),
      category: "experience",
      note: newGem.note.trim() || defaultPinNote(profile.name),
    };

    updateDraft({ hiddenGems: [...editDraft.hiddenGems, gem] });
    setNewGem({ name: "", note: "" });
  }

  return (
    <ModeShell mode="found">
      <SiteHeader mode="found" />
      <CollectionBackLink mode="found" />
      <DestinationHero mode="found" destination={destination} />
      <div className="content-wrap">
        <EditToolbar
          mode="found"
          ownership={ownership}
          isEditing={isEditing}
          onToggleEdit={handleToggleEdit}
          onSave={handleSave}
          onReset={ownership === "customized" ? handleReset : undefined}
          onDelete={ownership === "draft" ? handleDelete : undefined}
        />
      </div>
      <DossierNav mode="found" />

      <div className="detail-layout content-wrap">
        <div className="space-y-6">
          <section id="journal" className="panel panel-rise scroll-mt-28">
            <div className="panel-header">
              <p className="panel-eyebrow">Journal entry</p>
              <h2 className="panel-title">What stayed with me</h2>
            </div>
            {isEditing ? (
              <textarea
                className="edit-textarea"
                value={destination.journal}
                onChange={(event) => updateDraft({ journal: event.target.value })}
              />
            ) : (
              <p className="panel-copy">{destination.journal}</p>
            )}
            <ul className="bullet-list mt-6">
              {destination.highlights.map((highlight, index) => (
                <li key={`${highlight}-${index}`}>
                  {isEditing ? (
                    <input
                      className="edit-input"
                      value={highlight}
                      onChange={(event) => {
                        const highlights = [...destination.highlights];
                        highlights[index] = event.target.value;
                        updateDraft({ highlights });
                      }}
                    />
                  ) : (
                    highlight
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section id="recap" className="panel panel-rise scroll-mt-28">
            <div className="panel-header">
              <p className="panel-eyebrow">Trip recap</p>
              <h2 className="panel-title">The short version</h2>
            </div>
            {isEditing ? (
              <textarea
                className="edit-textarea"
                value={destination.tripRecap}
                onChange={(event) => updateDraft({ tripRecap: event.target.value })}
              />
            ) : (
              <p className="panel-copy">{destination.tripRecap}</p>
            )}
            <p className="panel-copy mt-4">
              Would go back?{" "}
              <strong>{destination.wouldReturn ? "Yes, already scheming." : "Not this season."}</strong>
            </p>
          </section>

          <div id="gems" className="scroll-mt-28 space-y-4">
            <CollectionSection
              title="Hidden gems"
              items={destination.hiddenGems}
              variant="places"
            />
            {isEditing ? (
              <div className="panel">
                <p className="panel-eyebrow">Add a hidden gem</p>
                <div className="form-grid">
                  <label>
                    Place name
                    <input
                      value={newGem.name}
                      onChange={(event) =>
                        setNewGem((current) => ({ ...current, name: event.target.value }))
                      }
                    />
                  </label>
                  <label>
                    Note
                    <input
                      value={newGem.note}
                      onChange={(event) =>
                        setNewGem((current) => ({ ...current, note: event.target.value }))
                      }
                    />
                  </label>
                </div>
                <button type="button" className="secondary-action mt-4" onClick={addHiddenGem}>
                  Add hidden gem
                </button>
              </div>
            ) : null}
          </div>

          <ItinerarySection
            id="shoot-days"
            title="How the days went"
            eyebrow="Day plan"
            days={destination.shootDays}
            mode="found"
          />

          <MapSection id="map" city={destination.city} pins={destination.mapPins} />

          <WatchReadSection
            id="watch-read"
            books={destination.books}
            media={destination.media}
            mode="found"
          />

          <div id="research" className="scroll-mt-28">
            <ExternalInsightsPanel insights={insights} city={destination.city} />
          </div>
        </div>

        <aside className="space-y-6">
          <section className="panel panel-rise sticky-panel">
            <div className="panel-header">
              <p className="panel-eyebrow">Trip ratings</p>
              <h2 className="panel-title">How it felt</h2>
            </div>
            <RatingBars
              ratings={destination.ratings}
              labels={{
                hospitality: "Hospitality",
                walkability: "Walkability",
                adventure: "Adventure",
                contentPotential: "Would share",
              }}
            />
          </section>
        </aside>
      </div>
    </ModeShell>
  );
}
