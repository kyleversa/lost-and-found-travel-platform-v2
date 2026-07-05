import { finnDemoUser } from "@/content/demo/finn";
import type { DemoUser, TravelProfile, TravelMode } from "@/lib/types";
import type { FoundDestination, LostDestination } from "@/lib/types";

export const DEFAULT_DEMO_USERNAME = "finn";

const demoUsers: Record<string, DemoUser> = {
  [finnDemoUser.profile.username]: finnDemoUser,
};

export function listDemoUsernames(): string[] {
  return Object.keys(demoUsers);
}

export function getDemoUser(username: string): DemoUser | undefined {
  return demoUsers[username];
}

export function getTravelProfile(username: string): TravelProfile | undefined {
  return demoUsers[username]?.profile;
}

export function getSeedFoundDestinations(username: string): FoundDestination[] {
  return demoUsers[username]?.found ?? [];
}

export function getSeedLostDestinations(username: string): LostDestination[] {
  return demoUsers[username]?.lost ?? [];
}

export function getSeedDestination(
  username: string,
  mode: TravelMode,
  slug: string,
): FoundDestination | LostDestination | undefined {
  const user = demoUsers[username];
  if (!user) {
    return undefined;
  }

  const list = mode === "found" ? user.found : user.lost;
  return list.find((destination) => destination.slug === slug);
}

export function getSeedDestinationSlugs(username: string, mode: TravelMode): string[] {
  const user = demoUsers[username];
  if (!user) {
    return [];
  }

  const list = mode === "found" ? user.found : user.lost;
  return list.map((destination) => destination.slug);
}

export function getFeaturedDossierPath(username: string): string {
  const user = demoUsers[username];
  const slug = user?.lost[0]?.slug ?? user?.found[0]?.slug ?? "";

  if (!slug || !user) {
    return `/u/${username}`;
  }

  const mode = user.lost[0] ? "lost" : "found";
  return `/u/${username}/${mode}/${slug}`;
}
