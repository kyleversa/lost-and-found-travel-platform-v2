import { profilePossessive } from "@/lib/paths";
import type { TravelMode, TravelProfile } from "@/lib/types";
import { collectionPath } from "@/lib/paths";

export function getModeMeta(username: string, profile: TravelProfile) {
  const possessive = profilePossessive(profile.name);

  return {
    found: {
      label: "Found",
      headline: "Found collection",
      description: `${possessive} ${profile.collectionCopy.foundFooter}`,
      href: collectionPath(username, "found"),
      opposite: {
        label: "Switch to Lost",
        href: collectionPath(username, "lost"),
      },
    },
    lost: {
      label: "Lost",
      headline: "Lost collection",
      description: `${possessive} ${profile.collectionCopy.lostFooter}`,
      href: collectionPath(username, "lost"),
      opposite: {
        label: "Switch to Found",
        href: collectionPath(username, "found"),
      },
    },
  } as const satisfies Record<
    TravelMode,
    {
      label: string;
      headline: string;
      description: string;
      href: string;
      opposite: { label: string; href: string };
    }
  >;
}

export function getModeClassName(mode: TravelMode): string {
  return mode === "found" ? "mode-found" : "mode-lost";
}
