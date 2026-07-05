"use client";

import { useProfile } from "@/contexts/ProfileContext";
import { profilePossessive } from "@/lib/paths";
import type { TravelMode } from "@/lib/types";

export type DestinationOwnership = "seeded" | "customized" | "draft";

type EditToolbarProps = {
  mode: TravelMode;
  ownership: DestinationOwnership;
  isEditing: boolean;
  onToggleEdit: () => void;
  onSave: () => void;
  onReset?: () => void;
  onDelete?: () => void;
};

export function EditToolbar({
  mode,
  ownership,
  isEditing,
  onToggleEdit,
  onSave,
  onReset,
  onDelete,
}: EditToolbarProps) {
  const { profile } = useProfile();
  const collectionLabel = mode === "found" ? "Found dossier" : "Lost dossier";
  const possessive = profilePossessive(profile.name);
  const ownershipLabel =
    ownership === "draft"
      ? `Draft ${collectionLabel.toLowerCase()}`
      : ownership === "customized"
        ? `Edited ${collectionLabel.toLowerCase()}`
        : `${possessive} ${collectionLabel.toLowerCase()}`;

  return (
    <div className="edit-toolbar">
      <div>
        <p className="edit-toolbar-label">{ownershipLabel}</p>
        <p className="edit-toolbar-copy">
          {isEditing
            ? "Save when you are done. Edits stay in this session for now."
            : "Open edit mode to refine this travel dossier."}
        </p>
      </div>
      <div className="edit-toolbar-actions">
        {isEditing ? (
          <>
            <button type="button" className="secondary-action" onClick={onToggleEdit}>
              Cancel edits
            </button>
            <button type="button" className="primary-action" onClick={onSave}>
              Save dossier
            </button>
          </>
        ) : (
          <button type="button" className="primary-action" onClick={onToggleEdit}>
            Edit dossier
          </button>
        )}
        {ownership === "customized" && onReset ? (
          <button type="button" className="secondary-action" onClick={onReset}>
            Restore {possessive} version
          </button>
        ) : null}
        {ownership === "draft" && onDelete ? (
          <button type="button" className="danger-action" onClick={onDelete}>
            Remove dossier
          </button>
        ) : null}
      </div>
    </div>
  );
}
