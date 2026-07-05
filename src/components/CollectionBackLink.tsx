"use client";

import Link from "next/link";
import { useProfile } from "@/contexts/ProfileContext";
import { collectionPath } from "@/lib/paths";
import type { TravelMode } from "@/lib/types";

type CollectionBackLinkProps = {
  mode: TravelMode;
};

export function CollectionBackLink({ mode }: CollectionBackLinkProps) {
  const { username } = useProfile();
  const label = mode === "found" ? "Found" : "Lost";

  return (
    <Link href={collectionPath(username, mode)} className="back-link">
      Back to {label} collection
    </Link>
  );
}
