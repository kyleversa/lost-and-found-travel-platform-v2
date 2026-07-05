"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BudgetSection } from "@/components/BudgetSection";
import { CollectionBackLink } from "@/components/CollectionBackLink";
import { CollectionSection } from "@/components/CollectionSection";
import { DestinationHero } from "@/components/DestinationHero";
import { DossierNav } from "@/components/DossierNav";
import { EditToolbar } from "@/components/EditToolbar";
import { ExternalInsightsPanel } from "@/components/ExternalInsightsPanel";
import { ItinerarySection } from "@/components/ItinerarySection";
import { MapSection } from "@/components/MapSection";
import { ModeShell } from "@/components/ModeShell";
import { PackingSection } from "@/components/PackingSection";
import { RatingBars } from "@/components/RatingBars";
import { SiteHeader } from "@/components/SiteHeader";
import { WatchReadSection } from "@/components/WatchReadSection";
import { useProfile } from "@/contexts/ProfileContext";
import { useIsClient } from "@/hooks/useIsClient";
import {
  getDestinationOwnership,
  notifyUserStoreUpdated,
  useLostDestination,
} from "@/hooks/useUserDestinations";
import { collectionPath, defaultPinNote, profilePossessive } from "@/lib/paths";
import type { ExternalInsights, LostDestination, SavedPlace } from "@/lib/types";
import {
  deleteLostDestination,
  resetLostSeedEdits,
  saveLostDestination,
} from "@/lib/user-store";

type LostDossierWorkspaceProps = {
  slug: string;
  insights: ExternalInsights;
  fetchInsightsOnClient?: boolean;
};

export function LostDossierWorkspace({
  slug,
  insights: initialInsights,
  fetchInsightsOnClient = false,
}: LostDossierWorkspaceProps) {
  const router = useRouter();
  const { username, profile } = useProfile();
  const isClient = useIsClient();
  const loadedDestination = useLostDestination(username, slug);
  const [editDraft, setEditDraft] = useState<LostDestination | null>(null);
  const [insights, setInsights] = useState(initialInsights);
  const [isEditing, setIsEditing] = useState(false);
  const [newPlace, setNewPlace] = useState({ name: "", note: "" });

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
      <ModeShell mode="lost">
        <SiteHeader mode="lost" />
        <div className="content-wrap panel panel-rise missing-state">
          <p className="panel-copy">Loading travel dossier…</p>
        </div>
      </ModeShell>
    );
  }

  if (!destination) {
    return (
      <ModeShell mode="lost">
        <SiteHeader mode="lost" />
        <div className="content-wrap panel panel-rise missing-state">
          <h2 className="panel-title">Dossier not found</h2>
          <p className="panel-copy">
            This travel dossier is not in {profilePossessive(profile.name)} Lost collection.
            Return to the collection or choose another city.
          </p>
          <Link href={collectionPath(username, "lost")} className="primary-action inline-fit">
            Back to Lost collection
          </Link>
        </div>
      </ModeShell>
    );
  }

  const ownership = getDestinationOwnership(username, slug, "lost");

  function updateDraft(next: Partial<LostDestination>) {
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

    saveLostDestination(username, editDraft);
    notifyUserStoreUpdated();
    setIsEditing(false);
    setEditDraft(null);
  }

  function handleReset() {
    resetLostSeedEdits(username, slug);
    notifyUserStoreUpdated();
    setIsEditing(false);
    setEditDraft(null);
  }

  function handleDelete() {
    deleteLostDestination(username, slug);
    notifyUserStoreUpdated();
    router.push(collectionPath(username, "lost"));
  }

  function addSavedPlace() {
    if (!editDraft || !newPlace.name.trim()) {
      return;
    }

    const place: SavedPlace = {
      name: newPlace.name.trim(),
      category: "restaurant",
      note: newPlace.note.trim() || defaultPinNote(profile.name),
    };

    updateDraft({ savedPlaces: [...editDraft.savedPlaces, place] });
    setNewPlace({ name: "", note: "" });
  }

  return (
    <ModeShell mode="lost">
      <SiteHeader mode="lost" />
      <CollectionBackLink mode="lost" />
      <DestinationHero mode="lost" destination={destination} />
      <div className="content-wrap">
        <EditToolbar
          mode="lost"
          ownership={ownership}
          isEditing={isEditing}
          onToggleEdit={handleToggleEdit}
          onSave={handleSave}
          onReset={ownership === "customized" ? handleReset : undefined}
          onDelete={ownership === "draft" ? handleDelete : undefined}
        />
      </div>
      <DossierNav mode="lost" />

      <div className="detail-layout content-wrap">
        <div className="space-y-6">
          <section id="brief" className="panel panel-rise scroll-mt-28">
            <div className="panel-header">
              <p className="panel-eyebrow">Trip notes</p>
              <h2 className="panel-title">Why it&apos;s on the list</h2>
            </div>
            {isEditing ? (
              <textarea
                className="edit-textarea"
                value={destination.dreamNote}
                onChange={(event) => updateDraft({ dreamNote: event.target.value })}
              />
            ) : (
              <p className="panel-copy">{destination.dreamNote}</p>
            )}
            <ul className="bullet-list mt-6">
              {destination.researchNotes.map((note, index) => (
                <li key={`${note}-${index}`}>
                  {isEditing ? (
                    <input
                      className="edit-input"
                      value={note}
                      onChange={(event) => {
                        const researchNotes = [...destination.researchNotes];
                        researchNotes[index] = event.target.value;
                        updateDraft({ researchNotes });
                      }}
                    />
                  ) : (
                    note
                  )}
                </li>
              ))}
            </ul>
            <div className="brief-meta">
              <p>
                <strong>Inspiration:</strong> {destination.inspiration}
              </p>
            </div>
          </section>

          <ItinerarySection
            id="itinerary"
            title="Day-by-day plan"
            eyebrow="Itinerary"
            days={destination.itinerary}
            mode="lost"
          />

          <div id="places" className="scroll-mt-28 space-y-4">
            <CollectionSection
              title="Pinned places"
              items={destination.savedPlaces}
              variant="places"
            />
            {isEditing ? (
              <div className="panel">
                <p className="panel-eyebrow">Pin a place</p>
                <div className="form-grid">
                  <label>
                    Place name
                    <input
                      value={newPlace.name}
                      onChange={(event) =>
                        setNewPlace((current) => ({ ...current, name: event.target.value }))
                      }
                    />
                  </label>
                  <label>
                    Note
                    <input
                      value={newPlace.note}
                      onChange={(event) =>
                        setNewPlace((current) => ({ ...current, note: event.target.value }))
                      }
                    />
                  </label>
                </div>
                <button type="button" className="secondary-action mt-4" onClick={addSavedPlace}>
                  Pin this place
                </button>
              </div>
            ) : null}
          </div>

          <BudgetSection
            id="budget"
            items={destination.budgetItems}
            tripTier={destination.budget.replace("-", " ")}
          />

          <PackingSection id="packing" items={destination.packingList} />

          <MapSection id="map" city={destination.city} pins={destination.mapPins} />

          <WatchReadSection
            id="watch-read"
            books={destination.books}
            media={destination.media}
            mode="lost"
          />

          <div id="research" className="scroll-mt-28">
            <ExternalInsightsPanel insights={insights} city={destination.city} />
          </div>
        </div>

        <aside className="space-y-6">
          <section className="panel panel-rise sticky-panel">
            <div className="panel-header">
              <p className="panel-eyebrow">Research scorecard</p>
              <h2 className="panel-title">Why it ranks high</h2>
            </div>
            <RatingBars
              ratings={destination.ratings}
              labels={{
                popularity: "Popularity",
                views: "Views",
                budget: "Budget friendliness",
                contentPotential: "Hype level",
              }}
            />
          </section>
        </aside>
      </div>
    </ModeShell>
  );
}
