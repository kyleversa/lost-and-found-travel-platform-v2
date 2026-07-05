export type TravelMode = "found" | "lost";

export type TravelProfileStats = {
  countriesVisited: number;
  dreamTrips: number;
  memories: number;
  pinnedPlaces: number;
  tripsLogged: number;
};

export type TravelProfile = {
  username: string;
  name: string;
  handle: string;
  avatar: string;
  role: string;
  bio: string;
  location: string;
  isDemo: boolean;
  stats: TravelProfileStats;
  collectionCopy: {
    foundHub: string;
    lostHub: string;
    foundIntro: string;
    lostIntro: string;
    foundFooter: string;
    lostFooter: string;
  };
};

export type DemoUser = {
  profile: TravelProfile;
  found: FoundDestination[];
  lost: LostDestination[];
};

export type SavedBook = {
  title: string;
  author: string;
  tags: string[];
  note?: string;
};

export type SavedMedia = {
  title: string;
  creator: string;
  type: "Film" | "Series" | "Documentary";
  year: string;
  tags: string[];
};

export type SavedPlace = {
  name: string;
  category: "restaurant" | "hotel" | "museum" | "neighborhood" | "experience";
  note: string;
  address?: string;
};

export type ItineraryBlock = {
  time: string;
  title: string;
  category: "shoot" | "food" | "walk" | "museum" | "travel" | "rest";
  note: string;
  location?: string;
};

export type ItineraryDay = {
  day: number;
  label: string;
  blocks: ItineraryBlock[];
};

export type BudgetItem = {
  label: string;
  amount: number;
  currency: string;
  tier: "essential" | "splurge" | "optional";
  note?: string;
};

export type PackingItem = {
  item: string;
  category: "gear" | "clothing" | "toiletries" | "content";
};

export type MapPin = {
  name: string;
  lat: number;
  lng: number;
  category: SavedPlace["category"];
};

export type FoundDestination = {
  slug: string;
  city: string;
  country: string;
  image: string;
  tagline: string;
  visitedOn: string;
  journal: string;
  tripRecap: string;
  wouldReturn: boolean;
  highlights: string[];
  hiddenGems: SavedPlace[];
  shootDays: ItineraryDay[];
  ratings: {
    hospitality: number;
    walkability: number;
    adventure: number;
    contentPotential: number;
  };
  books: SavedBook[];
  media: SavedMedia[];
  mapPins: MapPin[];
};

export type LostDestination = {
  slug: string;
  city: string;
  country: string;
  image: string;
  tagline: string;
  dreamNote: string;
  bestTime: string;
  budget: "budget-friendly" | "moderate" | "splurge";
  inspiration: string;
  researchNotes: string[];
  savedPlaces: SavedPlace[];
  itinerary: ItineraryDay[];
  budgetItems: BudgetItem[];
  packingList: PackingItem[];
  ratings: {
    popularity: number;
    views: number;
    budget: number;
    contentPotential: number;
  };
  books: SavedBook[];
  media: SavedMedia[];
  mapPins: MapPin[];
};

export type ExternalInsights = {
  summary: string;
  source: string;
  sourceUrl: string;
  suggestedBooks: Array<{
    title: string;
    author?: string;
    coverUrl?: string;
    openLibraryUrl: string;
  }>;
};

export type DossierSection = {
  id: string;
  label: string;
};
