import type { DossierSection, TravelMode } from "@/lib/types";

const foundSections: DossierSection[] = [
  { id: "journal", label: "Journal" },
  { id: "recap", label: "Recap" },
  { id: "gems", label: "Hidden gems" },
  { id: "shoot-days", label: "Day plan" },
  { id: "map", label: "Map" },
  { id: "watch-read", label: "Watch & read" },
  { id: "research", label: "City notes" },
];

const lostSections: DossierSection[] = [
  { id: "brief", label: "Trip notes" },
  { id: "itinerary", label: "Day plan" },
  { id: "places", label: "Pinned places" },
  { id: "budget", label: "Budget" },
  { id: "packing", label: "Packing" },
  { id: "map", label: "Map" },
  { id: "watch-read", label: "Watch & read" },
  { id: "research", label: "Inspiration" },
];

export function getDossierSections(mode: TravelMode): DossierSection[] {
  return mode === "found" ? foundSections : lostSections;
}
