import type { FoundDestination, LostDestination, TravelMode } from "@/lib/types";

type WorkspaceDestination = FoundDestination | LostDestination;

export function countPinnedPlaces(
  destinations: WorkspaceDestination[],
  mode: TravelMode,
): number {
  return destinations.reduce((total, destination) => {
    if (mode === "lost") {
      return total + (destination as LostDestination).savedPlaces.length;
    }

    return total + (destination as FoundDestination).hiddenGems.length;
  }, 0);
}
