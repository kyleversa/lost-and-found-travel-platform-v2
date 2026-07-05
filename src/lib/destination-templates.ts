import type { CityEnrichment } from "@/lib/city-enrichment";
import type { FoundDestination, LostDestination } from "@/lib/types";
import { createUniqueSlug } from "@/lib/user-store";

function mapBooksFromEnrichment(enrichment?: CityEnrichment) {
  return (enrichment?.suggestedBooks ?? []).slice(0, 2).map((book) => ({
    title: book.title,
    author: book.author ?? "Author unknown",
    tags: ["Suggested read", "Open Library"],
    note: "Pulled from Open Library during dossier creation.",
  }));
}

function mapMediaFromEnrichment(enrichment?: CityEnrichment) {
  return (enrichment?.suggestedMedia ?? []).map(({ posterUrl, ...media }) => {
    void posterUrl;
    return media;
  });
}

function buildLostInspiration(enrichment?: CityEnrichment): string {
  const films = enrichment?.suggestedMedia.slice(0, 2).map((item) => item.title) ?? [];

  if (films.length > 0 && enrichment?.wikipediaUrl) {
    return `Film mood board: ${films.join(", ")}. Background reading: ${enrichment.wikipediaUrl}`;
  }

  if (films.length > 0) {
    return `Film mood board: ${films.join(", ")}.`;
  }

  if (enrichment?.wikipediaUrl) {
    return `Background reading: ${enrichment.wikipediaUrl}`;
  }

  return "Add a film, book, or mood reference.";
}

function mapMapPins(city: string, enrichment?: CityEnrichment) {
  const pins = [...(enrichment?.suggestedMapPins ?? [])];

  if (enrichment?.coordinates) {
    pins.unshift({
      name: city,
      lat: enrichment.coordinates.lat,
      lng: enrichment.coordinates.lng,
      category: "neighborhood",
    });
  }

  const seen = new Set<string>();
  return pins.filter((pin) => {
    const key = `${pin.name}-${pin.lat}-${pin.lng}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

export function createBlankFound(input: {
  city: string;
  country: string;
  tagline?: string;
  image?: string;
  enrichment?: CityEnrichment;
}): FoundDestination {
  const enrichment = input.enrichment;

  return {
    slug: createUniqueSlug(input.city, "my"),
    city: input.city,
    country: input.country,
    image: input.image ?? enrichment?.imageUrl ?? "/images/paris.webp",
    tagline: input.tagline ?? enrichment?.tagline ?? `Memories from ${input.city}`,
    visitedOn: "Visit date to confirm",
    journal:
      enrichment?.summary ??
      "Start with the moment that made this trip unforgettable.",
    tripRecap: "Summarize the trip in a few sentences.",
    wouldReturn: true,
    highlights: enrichment?.starterNotes.slice(0, 3) ?? ["A favorite moment from the trip"],
    hiddenGems: enrichment?.suggestedPlaces ?? [],
    shootDays: [],
    ratings: {
      hospitality: 4,
      walkability: 4,
      adventure: 4,
      contentPotential: 4,
    },
    books: mapBooksFromEnrichment(enrichment),
    media: mapMediaFromEnrichment(enrichment),
    mapPins: mapMapPins(input.city, enrichment),
  };
}

export function createBlankLost(input: {
  city: string;
  country: string;
  tagline?: string;
  image?: string;
  enrichment?: CityEnrichment;
}): LostDestination {
  const enrichment = input.enrichment;

  return {
    slug: createUniqueSlug(input.city, "my"),
    city: input.city,
    country: input.country,
    image: input.image ?? enrichment?.imageUrl ?? "/images/tokyo.webp",
    tagline: input.tagline ?? enrichment?.tagline ?? `Dreaming about ${input.city}`,
    dreamNote:
      enrichment?.summary ??
      "Why this city belongs on the Lost list.",
    bestTime: "Season to confirm",
    budget: "moderate",
    inspiration: buildLostInspiration(enrichment),
    researchNotes: enrichment?.starterNotes ?? ["First planning note"],
    savedPlaces: enrichment?.suggestedPlaces ?? [],
    itinerary: [],
    budgetItems: [],
    packingList: [],
    ratings: {
      popularity: 4,
      views: 4,
      budget: 3,
      contentPotential: 4,
    },
    books: mapBooksFromEnrichment(enrichment),
    media: mapMediaFromEnrichment(enrichment),
    mapPins: mapMapPins(input.city, enrichment),
  };
}

export function duplicateFound(source: FoundDestination): FoundDestination {
  return {
    ...structuredClone(source),
    slug: createUniqueSlug(source.city, "copy"),
    city: source.city,
    tagline: `${source.tagline} · personal edition`,
  };
}

export function duplicateLost(source: LostDestination): LostDestination {
  return {
    ...structuredClone(source),
    slug: createUniqueSlug(source.city, "copy"),
    city: source.city,
    tagline: `${source.tagline} · personal edition`,
  };
}

export const destinationImages = [
  "/images/tokyo.webp",
  "/images/sydney.webp",
  "/images/bangkok.webp",
  "/images/santorini.webp",
  "/images/istanbul.webp",
  "/images/paris.webp",
  "/images/new_york_city.webp",
  "/images/tuscany.webp",
  "/images/london.webp",
  "/images/barcelona.webp",
];
