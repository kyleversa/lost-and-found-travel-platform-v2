import type { TravelMode } from "@/lib/types";

export function profilePath(username: string): string {
  return `/u/${username}`;
}

export function collectionPath(username: string, mode: TravelMode): string {
  return `/u/${username}/${mode}`;
}

export function dossierPath(username: string, mode: TravelMode, slug: string): string {
  return `/u/${username}/${mode}/${slug}`;
}

export function addDossierPath(username: string, mode: TravelMode): string {
  return `/u/${username}/${mode}/add`;
}

export function profilePossessive(name: string): string {
  return name.endsWith("s") ? `${name}'` : `${name}'s`;
}

export function defaultPinNote(name: string): string {
  return `Pinned by ${name}`;
}
