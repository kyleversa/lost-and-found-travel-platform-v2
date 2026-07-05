"use client";

import { useSyncExternalStore } from "react";
import {
  getSeedFoundDestinations,
  getSeedLostDestinations,
} from "@/content/demo";
import type { FoundDestination, LostDestination, TravelMode } from "@/lib/types";
import {
  getUserStoreKey,
  isUserOwnedSlug,
  readUserStore,
} from "@/lib/user-store";

type SnapshotCache<T> = {
  key: string;
  value: T;
};

const foundSnapshotCaches = new Map<string, SnapshotCache<FoundDestination[]>>();
const lostSnapshotCaches = new Map<string, SnapshotCache<LostDestination[]>>();

function subscribe(username: string, callback: () => void): () => void {
  const storeKey = getUserStoreKey(username);

  const onStorage = (event: StorageEvent) => {
    if (event.key === storeKey || event.key === null) {
      callback();
    }
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener("lost-found-store-updated", callback);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("lost-found-store-updated", callback);
  };
}

export function notifyUserStoreUpdated(): void {
  foundSnapshotCaches.clear();
  lostSnapshotCaches.clear();
  window.dispatchEvent(new Event("lost-found-store-updated"));
}

function getUserStoreCacheKey(username: string): string {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem(getUserStoreKey(username)) ?? "";
}

function buildFoundSnapshot(username: string): FoundDestination[] {
  const seed = getSeedFoundDestinations(username);
  const store = readUserStore(username);
  const seededWithEdits = seed.map(
    (destination) => store.foundEdits[destination.slug] ?? destination,
  );
  const custom = store.foundCustom.filter(
    (destination) => !seededWithEdits.some((entry) => entry.slug === destination.slug),
  );

  return [...custom, ...seededWithEdits];
}

function buildLostSnapshot(username: string): LostDestination[] {
  const seed = getSeedLostDestinations(username);
  const store = readUserStore(username);
  const seededWithEdits = seed.map(
    (destination) => store.lostEdits[destination.slug] ?? destination,
  );
  const custom = store.lostCustom.filter(
    (destination) => !seededWithEdits.some((entry) => entry.slug === destination.slug),
  );

  return [...custom, ...seededWithEdits];
}

function getSnapshotFound(username: string): FoundDestination[] {
  const key = getUserStoreCacheKey(username);
  const cached = foundSnapshotCaches.get(username);

  if (cached?.key === key) {
    return cached.value;
  }

  const value = buildFoundSnapshot(username);
  foundSnapshotCaches.set(username, { key, value });
  return value;
}

function getSnapshotLost(username: string): LostDestination[] {
  const key = getUserStoreCacheKey(username);
  const cached = lostSnapshotCaches.get(username);

  if (cached?.key === key) {
    return cached.value;
  }

  const value = buildLostSnapshot(username);
  lostSnapshotCaches.set(username, { key, value });
  return value;
}

export function useFoundDestinations(username: string): FoundDestination[] {
  return useSyncExternalStore(
    (callback) => subscribe(username, callback),
    () => getSnapshotFound(username),
    () => getSeedFoundDestinations(username),
  );
}

export function useLostDestinations(username: string): LostDestination[] {
  return useSyncExternalStore(
    (callback) => subscribe(username, callback),
    () => getSnapshotLost(username),
    () => getSeedLostDestinations(username),
  );
}

export function useFoundDestination(
  username: string,
  slug: string,
): FoundDestination | undefined {
  const destinations = useFoundDestinations(username);
  return destinations.find((destination) => destination.slug === slug);
}

export function useLostDestination(
  username: string,
  slug: string,
): LostDestination | undefined {
  const destinations = useLostDestinations(username);
  return destinations.find((destination) => destination.slug === slug);
}

export function getDestinationOwnership(
  username: string,
  slug: string,
  mode: TravelMode,
): "seeded" | "customized" | "draft" {
  if (isUserOwnedSlug(slug)) {
    return "draft";
  }

  const store = readUserStore(username);
  const hasEdit =
    mode === "found" ? Boolean(store.foundEdits[slug]) : Boolean(store.lostEdits[slug]);

  return hasEdit ? "customized" : "seeded";
}
