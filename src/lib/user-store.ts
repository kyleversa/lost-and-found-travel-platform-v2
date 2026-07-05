import type { FoundDestination, LostDestination } from "@/lib/types";

export const USER_STORE_VERSION = 2;

export type UserStore = {
  version: typeof USER_STORE_VERSION;
  foundCustom: FoundDestination[];
  lostCustom: LostDestination[];
  foundEdits: Record<string, FoundDestination>;
  lostEdits: Record<string, LostDestination>;
};

const emptyStore: UserStore = {
  version: USER_STORE_VERSION,
  foundCustom: [],
  lostCustom: [],
  foundEdits: {},
  lostEdits: {},
};

export function getUserStoreKey(username: string): string {
  return `lost-and-found-user-store-v${USER_STORE_VERSION}:${username}`;
}

export function readUserStore(username: string): UserStore {
  if (typeof window === "undefined") {
    return emptyStore;
  }

  try {
    const raw = window.localStorage.getItem(getUserStoreKey(username));
    if (!raw) {
      return emptyStore;
    }

    const parsed = JSON.parse(raw) as UserStore;
    return {
      ...emptyStore,
      ...parsed,
      foundCustom: parsed.foundCustom ?? [],
      lostCustom: parsed.lostCustom ?? [],
      foundEdits: parsed.foundEdits ?? {},
      lostEdits: parsed.lostEdits ?? {},
    };
  } catch {
    return emptyStore;
  }
}

export function writeUserStore(username: string, store: UserStore): void {
  window.localStorage.setItem(getUserStoreKey(username), JSON.stringify(store));
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function createUniqueSlug(city: string, prefix = "my"): string {
  return slugify(`${prefix}-${city}-${Date.now().toString(36)}`);
}

export function isUserOwnedSlug(slug: string): boolean {
  return slug.startsWith("my-") || slug.startsWith("copy-");
}

export function saveFoundDestination(username: string, destination: FoundDestination): void {
  const store = readUserStore(username);

  if (isUserOwnedSlug(destination.slug)) {
    store.foundCustom = upsertBySlug(store.foundCustom, destination);
  } else {
    store.foundEdits[destination.slug] = destination;
  }

  writeUserStore(username, store);
}

export function saveLostDestination(username: string, destination: LostDestination): void {
  const store = readUserStore(username);

  if (isUserOwnedSlug(destination.slug)) {
    store.lostCustom = upsertBySlug(store.lostCustom, destination);
  } else {
    store.lostEdits[destination.slug] = destination;
  }

  writeUserStore(username, store);
}

export function deleteFoundDestination(username: string, slug: string): void {
  const store = readUserStore(username);
  store.foundCustom = store.foundCustom.filter((item) => item.slug !== slug);
  delete store.foundEdits[slug];
  writeUserStore(username, store);
}

export function deleteLostDestination(username: string, slug: string): void {
  const store = readUserStore(username);
  store.lostCustom = store.lostCustom.filter((item) => item.slug !== slug);
  delete store.lostEdits[slug];
  writeUserStore(username, store);
}

export function resetFoundSeedEdits(username: string, slug: string): void {
  const store = readUserStore(username);
  delete store.foundEdits[slug];
  writeUserStore(username, store);
}

export function resetLostSeedEdits(username: string, slug: string): void {
  const store = readUserStore(username);
  delete store.lostEdits[slug];
  writeUserStore(username, store);
}

/** @deprecated Use resetFoundSeedEdits */
export function resetFoundDemoEdits(username: string, slug: string): void {
  resetFoundSeedEdits(username, slug);
}

/** @deprecated Use resetLostSeedEdits */
export function resetLostDemoEdits(username: string, slug: string): void {
  resetLostSeedEdits(username, slug);
}

export function getStoredFound(
  username: string,
  slug: string,
): FoundDestination | undefined {
  const store = readUserStore(username);
  return (
    store.foundEdits[slug] ??
    store.foundCustom.find((destination) => destination.slug === slug)
  );
}

export function getStoredLost(username: string, slug: string): LostDestination | undefined {
  const store = readUserStore(username);
  return (
    store.lostEdits[slug] ??
    store.lostCustom.find((destination) => destination.slug === slug)
  );
}

function upsertBySlug<T extends { slug: string }>(list: T[], item: T): T[] {
  const existingIndex = list.findIndex((entry) => entry.slug === item.slug);
  if (existingIndex === -1) {
    return [...list, item];
  }

  const next = [...list];
  next[existingIndex] = item;
  return next;
}
