import type { TravelProfile } from "@/lib/types";

export const finnProfile: TravelProfile = {
  username: "finn",
  name: "Finn Shepherd",
  handle: "@finnshepherd",
  avatar: "/images/tuscany.webp",
  role: "Travel journal · social collections",
  bio: "Two running collections on Lost & Found: Found for places I have been, and Lost for places I want to go. Every dossier holds journal entries, pinned places, itineraries, and the little details worth sharing.",
  location: "Toronto, Canada",
  isDemo: true,
  stats: {
    countriesVisited: 14,
    dreamTrips: 5,
    memories: 5,
    pinnedPlaces: 47,
    tripsLogged: 31,
  },
  collectionCopy: {
    foundHub: "Journal entries, recaps, and pinned places from past travels.",
    lostHub: "Itineraries, pinned places, and inspiration for upcoming trips.",
    foundIntro: "Places I have been.",
    lostIntro: "Places I want to go.",
    foundFooter:
      "Journal entries, trip recaps, hidden gems, and the memories worth reliving.",
    lostFooter:
      "Dream trips, pinned places, day plans, budgets, and inspiration worth sharing.",
  },
};
