import {
  getDemoUser,
  getSeedDestination,
  getSeedDestinationSlugs,
  getSeedFoundDestinations,
  getSeedLostDestinations,
  getTravelProfile,
  listDemoUsernames,
} from "@/content/demo";
import type { FoundDestination, LostDestination, TravelMode } from "@/lib/types";

export {
  getDemoUser,
  getTravelProfile,
  listDemoUsernames,
  getSeedFoundDestinations,
  getSeedLostDestinations,
};

export function getFoundDestinations(username: string): FoundDestination[] {
  return getSeedFoundDestinations(username);
}

export function getLostDestinations(username: string): LostDestination[] {
  return getSeedLostDestinations(username);
}

export function getFoundDestination(
  username: string,
  slug: string,
): FoundDestination | undefined {
  const destination = getSeedDestination(username, "found", slug);
  return destination as FoundDestination | undefined;
}

export function getLostDestination(
  username: string,
  slug: string,
): LostDestination | undefined {
  const destination = getSeedDestination(username, "lost", slug);
  return destination as LostDestination | undefined;
}

export function getDestinationSlugs(username: string, mode: TravelMode): string[] {
  return getSeedDestinationSlugs(username, mode);
}

export function profileExists(username: string): boolean {
  return Boolean(getDemoUser(username));
}
