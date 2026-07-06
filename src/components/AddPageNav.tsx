import Link from "next/link";
import { collectionPath, profilePath } from "@/lib/paths";
import type { TravelMode } from "@/lib/types";

type AddPageNavProps = {
  username: string;
  mode: TravelMode;
};

export function AddPageNav({ username, mode }: AddPageNavProps) {
  const collectionLabel = mode === "found" ? "Found" : "Lost";

  return (
    <nav className="add-page-nav content-wrap" aria-label="Builder navigation">
      <Link href={profilePath(username)} className="back-link">
        Back to profile
      </Link>
      <Link href={collectionPath(username, mode)} className="back-link">
        Back to {collectionLabel} collection
      </Link>
    </nav>
  );
}
