import { fetchTravelBooksFromOpenLibrary } from "@/lib/open-library";
import type { ExternalInsights, SavedMedia, SavedPlace } from "@/lib/types";

export type CityEnrichment = {
  city: string;
  country: string;
  tagline: string;
  summary: string;
  imageUrl?: string;
  imageSource: string;
  wikipediaUrl: string;
  coordinates?: { lat: number; lng: number };
  countryFacts: {
    capital?: string;
    languages: string[];
    currencies: string[];
    region?: string;
  };
  starterNotes: string[];
  suggestedBooks: ExternalInsights["suggestedBooks"];
  suggestedMedia: Array<
    SavedMedia & {
      posterUrl?: string;
    }
  >;
  suggestedPlaces: SavedPlace[];
  suggestedMapPins: Array<{
    name: string;
    lat: number;
    lng: number;
    category: SavedPlace["category"];
  }>;
};

type WikipediaSummary = {
  title?: string;
  extract?: string;
  description?: string;
  thumbnail?: { source?: string; width?: number; height?: number };
  originalimage?: { source?: string; width?: number; height?: number };
  coordinates?: { lat?: number; lon?: number };
  content_urls?: { desktop?: { page?: string } };
};

type RestCountry = {
  name?: { common?: string };
  capital?: string[];
  languages?: Record<string, string>;
  currencies?: Record<string, { name?: string }>;
  region?: string;
  subregion?: string;
};

type UnsplashResult = {
  results?: Array<{
    urls?: { regular?: string };
    user?: { name?: string; links?: { html?: string } };
  }>;
};

export async function enrichCity(city: string, country: string): Promise<CityEnrichment> {
  const [wiki, countryFacts, suggestedBooks, curatedCover] = await Promise.all([
    fetchWikipediaData(city, country),
    fetchCountryFacts(country),
    fetchTravelBooksFromOpenLibrary(city),
    fetchCuratedCityCover(city, country),
  ]);

  const wikiFallback =
    wiki.imageUrl && isUsableCoverImage(wiki.imageUrl) ? wiki.imageUrl : undefined;

  const imageUrl = curatedCover?.url ?? wikiFallback;
  const imageSource =
    curatedCover?.source ?? (wikiFallback ? wiki.imageSource : "None");
  const summary = wiki.summary;
  const tagline =
    wiki.description ??
    firstSentence(summary) ??
    `Start building a dossier for ${city}.`;

  const starterNotes = buildStarterNotes(city, country, summary, countryFacts);

  const [suggestedMedia, placeResults] = await Promise.all([
    fetchTmdbSuggestions(city, country),
    fetchNearbyPlaces(city, wiki.coordinates),
  ]);

  return {
    city,
    country,
    tagline,
    summary,
    imageUrl,
    imageSource,
    wikipediaUrl: wiki.url,
    coordinates: wiki.coordinates,
    countryFacts,
    starterNotes,
    suggestedBooks,
    suggestedMedia,
    suggestedPlaces: placeResults.places,
    suggestedMapPins: placeResults.mapPins,
  };
}

async function fetchWikipediaData(
  city: string,
  country: string,
): Promise<{
  summary: string;
  description?: string;
  imageUrl?: string;
  imageSource: string;
  url: string;
  coordinates?: { lat: number; lng: number };
}> {
  const titles = [`${city}, ${country}`, city];

  for (const title of titles) {
    const page = await fetchWikipediaSummary(title);
    if (page) {
      return page;
    }
  }

  const searched = await searchWikipediaTitle(city);
  if (searched) {
    const page = await fetchWikipediaSummary(searched);
    if (page) {
      return page;
    }
  }

  return {
    summary: `No Wikipedia entry found for ${city} yet. City notes can be added directly to the dossier.`,
    imageSource: "None",
    url: "https://en.wikipedia.org",
  };
}

async function fetchWikipediaSummary(title: string) {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
      { next: { revalidate: 60 * 60 * 24 } },
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as WikipediaSummary;
    const imageUrl = pickWikipediaImage(data);

    return {
      summary:
        data.extract ??
        `Start collecting notes, places, and plans for ${title}.`,
      description: data.description,
      imageUrl,
      imageSource: imageUrl ? "Wikipedia" : "None",
      url: data.content_urls?.desktop?.page ?? "https://en.wikipedia.org",
      coordinates:
        data.coordinates?.lat !== undefined && data.coordinates.lon !== undefined
          ? { lat: data.coordinates.lat, lng: data.coordinates.lon }
          : undefined,
    };
  } catch {
    return null;
  }
}

async function searchWikipediaTitle(query: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/rest.php/v1/search/title?q=${encodeURIComponent(query)}&limit=1`,
      { next: { revalidate: 60 * 60 * 24 } },
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as { pages?: Array<{ title?: string }> };
    return data.pages?.[0]?.title ?? null;
  } catch {
    return null;
  }
}

function pickWikipediaImage(data: WikipediaSummary): string | undefined {
  const original = data.originalimage?.source;
  if (original && isUsableCoverImage(original)) {
    return original;
  }

  const thumbnail = data.thumbnail?.source;
  if (!thumbnail || !isUsableCoverImage(thumbnail)) {
    return undefined;
  }

  const width = data.thumbnail?.width ?? 0;
  if (width > 0 && width < 600) {
    return undefined;
  }

  return thumbnail.replace(/\/(\d+)px-/, "/1280px-");
}

const BAD_COVER_PATTERNS = [
  /flag/i,
  /coat of arms/i,
  /emblem/i,
  /seal of/i,
  /logo/i,
  /location map/i,
  /map of/i,
  /icon/i,
  /\.svg/i,
  /banner/i,
  /stamp/i,
  /coin/i,
  /currency/i,
  /diagram/i,
  /chart/i,
  /locator/i,
  /political/i,
  /economy of/i,
  /demographics/i,
  /route map/i,
  /sister cities/i,
];

const GOOD_COVER_PATTERNS = [
  /skyline/i,
  /cityscape/i,
  /panorama/i,
  /aerial/i,
  /view of/i,
  /downtown/i,
  /harbour/i,
  /harbor/i,
  /night/i,
  /sunset/i,
  /sunrise/i,
];

function isUsableCoverImage(url: string, titleHint = ""): boolean {
  const haystack = `${url} ${titleHint}`.toLowerCase();
  return !BAD_COVER_PATTERNS.some((pattern) => pattern.test(haystack));
}

function scoreCoverCandidate(input: {
  url: string;
  title: string;
  width?: number;
  height?: number;
}): number {
  if (!isUsableCoverImage(input.url, input.title)) {
    return -1;
  }

  let score = 0;
  const title = input.title.toLowerCase();

  for (const pattern of GOOD_COVER_PATTERNS) {
    if (pattern.test(title) || pattern.test(input.url)) {
      score += 4;
    }
  }

  if (input.width && input.height) {
    if (input.width >= 1600) {
      score += 3;
    } else if (input.width >= 1200) {
      score += 2;
    }

    if (input.width > input.height * 1.2) {
      score += 2;
    }
  }

  return score;
}

type CoverImageResult = { url: string; source: string };

async function fetchCuratedCityCover(
  city: string,
  country: string,
): Promise<CoverImageResult | null> {
  const unsplash = await fetchUnsplashCover(city, country);
  if (unsplash) {
    return unsplash;
  }

  const pexels = await fetchPexelsCover(city, country);
  if (pexels) {
    return pexels;
  }

  return fetchWikimediaCommonsCover(city, country);
}

async function fetchUnsplashCover(
  city: string,
  country: string,
): Promise<CoverImageResult | null> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey || accessKey === "your_key_here") {
    return null;
  }

  const queries = [
    `${city} ${country} skyline`,
    `${city} cityscape`,
    `${city} ${country} travel`,
    `${city} skyline night`,
  ];

  for (const query of queries) {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&per_page=1&content_filter=high`,
        {
          headers: { Authorization: `Client-ID ${accessKey}` },
          next: { revalidate: 60 * 60 * 24 },
        },
      );

      if (!response.ok) {
        continue;
      }

      const data = (await response.json()) as UnsplashResult;
      const photo = data.results?.[0];

      if (!photo?.urls?.regular) {
        continue;
      }

      return {
        url: photo.urls.regular,
        source: photo.user?.name ? `Unsplash / ${photo.user.name}` : "Unsplash",
      };
    } catch {
      continue;
    }
  }

  return null;
}

type PexelsResult = {
  photos?: Array<{
    src?: { large2x?: string; large?: string };
    photographer?: string;
  }>;
};

async function fetchPexelsCover(
  city: string,
  country: string,
): Promise<CoverImageResult | null> {
  const apiKey = process.env.PEXELS_API_KEY;

  if (!apiKey || apiKey === "your_key_here") {
    return null;
  }

  const queries = [
    `${city} ${country} skyline`,
    `${city} cityscape`,
    `${city} skyline`,
  ];

  for (const query of queries) {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=1`,
        {
          headers: { Authorization: apiKey },
          next: { revalidate: 60 * 60 * 24 },
        },
      );

      if (!response.ok) {
        continue;
      }

      const data = (await response.json()) as PexelsResult;
      const photo = data.photos?.[0];
      const url = photo?.src?.large2x ?? photo?.src?.large;
      const photographer = photo?.photographer;

      if (!url) {
        continue;
      }

      return {
        url,
        source: photographer ? `Pexels / ${photographer}` : "Pexels",
      };
    } catch {
      continue;
    }
  }

  return null;
}

type CommonsPage = {
  title?: string;
  imageinfo?: Array<{
    url?: string;
    width?: number;
    height?: number;
    mime?: string;
  }>;
};

async function fetchWikimediaCommonsCover(
  city: string,
  country: string,
): Promise<CoverImageResult | null> {
  const queries = [
    `${city} skyline`,
    `${city} cityscape`,
    `${city} panorama`,
    `${city} ${country} skyline`,
    `${city} aerial view`,
    `${city} downtown`,
  ];

  let best: { url: string; title: string; score: number } | null = null;

  for (const query of queries) {
    const candidates = await searchWikimediaCommonsImages(query);

    for (const candidate of candidates) {
      if (candidate.score > (best?.score ?? 0)) {
        best = candidate;
      }
    }

    if (best && best.score >= 6) {
      break;
    }
  }

  if (!best || best.score < 1) {
    return null;
  }

  return {
    url: best.url,
    source: "Wikimedia Commons",
  };
}

async function searchWikimediaCommonsImages(
  query: string,
): Promise<Array<{ url: string; title: string; score: number }>> {
  try {
    const response = await fetch(
      `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1600&format=json`,
      { next: { revalidate: 60 * 60 * 24 } },
    );

    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as { query?: { pages?: Record<string, CommonsPage> } };
    const pages = Object.values(data.query?.pages ?? {});

    return pages
      .map((page) => {
        const info = page.imageinfo?.[0];
        const title = page.title ?? "";
        const url = info?.url;

        if (!url || info?.mime === "image/svg+xml") {
          return null;
        }

        const score = scoreCoverCandidate({
          url,
          title,
          width: info.width,
          height: info.height,
        });

        if (score < 1) {
          return null;
        }

        return { url, title, score };
      })
      .filter((item): item is { url: string; title: string; score: number } => item !== null);
  } catch {
    return [];
  }
}

async function fetchCountryFacts(country: string): Promise<CityEnrichment["countryFacts"]> {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fields=name,capital,languages,currencies,region,subregion`,
      { next: { revalidate: 60 * 60 * 24 * 7 } },
    );

    if (!response.ok) {
      return { languages: [], currencies: [] };
    }

    const data = (await response.json()) as RestCountry[];
    const match = data[0];

    if (!match) {
      return { languages: [], currencies: [] };
    }

    return {
      capital: match.capital?.[0],
      languages: Object.values(match.languages ?? {}),
      currencies: Object.values(match.currencies ?? {}).map(
        (currency) => currency.name ?? "Currency",
      ),
      region: match.subregion ?? match.region,
    };
  } catch {
    return { languages: [], currencies: [] };
  }
}


function buildStarterNotes(
  city: string,
  country: string,
  summary: string,
  countryFacts: CityEnrichment["countryFacts"],
): string[] {
  const notes = [`City research for ${city}, ${country}.`];

  if (countryFacts.capital) {
    notes.push(`Capital: ${countryFacts.capital}.`);
  }

  if (countryFacts.languages.length > 0) {
    notes.push(`Languages: ${countryFacts.languages.slice(0, 3).join(", ")}.`);
  }

  if (countryFacts.currencies.length > 0) {
    notes.push(`Currency: ${countryFacts.currencies.slice(0, 2).join(", ")}.`);
  }

  const summaryNote = firstSentence(summary);
  if (summaryNote) {
    notes.push(summaryNote);
  }

  notes.push("Restaurants, hotels, and day plans to refine as the trip takes shape.");

  return notes;
}

function firstSentence(text: string): string | undefined {
  const trimmed = text.trim();
  if (!trimmed) {
    return undefined;
  }

  const match = trimmed.match(/^[^.!?]+[.!?]/);
  return match?.[0]?.trim() ?? trimmed.slice(0, 140).trim();
}

type TmdbMovie = {
  title?: string;
  release_date?: string;
  overview?: string;
  poster_path?: string;
  vote_count?: number;
};

type TmdbTv = {
  name?: string;
  first_air_date?: string;
  overview?: string;
  poster_path?: string;
  vote_count?: number;
};

type OpenTripMapPlace = {
  name?: string;
  kinds?: string;
  point?: { lon?: number; lat?: number };
};

type WikipediaGeoPage = {
  title?: string;
  lat?: number;
  lon?: number;
  dist?: number;
};

type OverpassElement = {
  lat?: number;
  lon?: number;
  center?: { lat?: number; lon?: number };
  tags?: Record<string, string>;
};

async function fetchTmdbSuggestions(
  city: string,
  country: string,
): Promise<CityEnrichment["suggestedMedia"]> {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return [];
  }

  const query = encodeURIComponent(city);
  const cache = { next: { revalidate: 60 * 60 * 24 * 7 } };

  try {
    const [movieResponse, tvResponse] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&include_adult=false&language=en-US`,
        cache,
      ),
      fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}&include_adult=false&language=en-US`,
        cache,
      ),
    ]);

    const movies = movieResponse.ok
      ? ((await movieResponse.json()) as { results?: TmdbMovie[] }).results ?? []
      : [];
    const shows = tvResponse.ok
      ? ((await tvResponse.json()) as { results?: TmdbTv[] }).results ?? []
      : [];

    const cityPattern = new RegExp(`\\b${escapeRegExp(city)}\\b`, "i");
    const countryPattern = new RegExp(`\\b${escapeRegExp(country)}\\b`, "i");

    const filteredMovies = movies
      .filter((movie) => movie.title && isRelevantTmdbResult(movie.title, movie.overview, cityPattern, countryPattern))
      .sort((a, b) => (b.vote_count ?? 0) - (a.vote_count ?? 0))
      .slice(0, 2);

    const filteredShows = shows
      .filter((show) => show.name && isRelevantTmdbResult(show.name, show.overview, cityPattern, countryPattern))
      .sort((a, b) => (b.vote_count ?? 0) - (a.vote_count ?? 0))
      .slice(0, 1);

    const media: CityEnrichment["suggestedMedia"] = filteredMovies.map((movie) => ({
      title: movie.title as string,
      creator: "Suggested film",
      type: "Film",
      year: movie.release_date?.slice(0, 4) ?? "Unknown",
      tags: ["Suggested film", "Watch list"],
      posterUrl: movie.poster_path
        ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
        : undefined,
    }));

    for (const show of filteredShows) {
      media.push({
        title: show.name as string,
        creator: "Suggested series",
        type: "Series",
        year: show.first_air_date?.slice(0, 4) ?? "Unknown",
        tags: ["Suggested series", "Watch list"],
        posterUrl: show.poster_path
          ? `https://image.tmdb.org/t/p/w342${show.poster_path}`
          : undefined,
      });
    }

    return media;
  } catch {
    return [];
  }
}

function isRelevantTmdbResult(
  title: string,
  overview: string | undefined,
  cityPattern: RegExp,
  countryPattern: RegExp,
): boolean {
  if (cityPattern.test(title) || countryPattern.test(title)) {
    return true;
  }

  if (overview && (cityPattern.test(overview) || countryPattern.test(overview))) {
    return true;
  }

  return false;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function fetchNearbyPlaces(
  city: string,
  coordinates?: { lat: number; lng: number },
): Promise<{
  places: SavedPlace[];
  mapPins: CityEnrichment["suggestedMapPins"];
}> {
  if (!coordinates) {
    return { places: [], mapPins: [] };
  }

  const openTripMapResults = await fetchOpenTripMapPlaces(coordinates);
  if (openTripMapResults.places.length > 0) {
    return openTripMapResults;
  }

  const overpassResults = await fetchOverpassPlaces(coordinates);
  if (overpassResults.places.length > 0) {
    return overpassResults;
  }

  return fetchWikipediaNearbyPlaces(city, coordinates);
}

async function fetchOpenTripMapPlaces(coordinates: {
  lat: number;
  lng: number;
}): Promise<{
  places: SavedPlace[];
  mapPins: CityEnrichment["suggestedMapPins"];
}> {
  const apiKey = process.env.OPENTRIPMAP_API_KEY;

  if (!apiKey) {
    return { places: [], mapPins: [] };
  }

  try {
    const response = await fetch(
      `https://api.opentripmap.com/0.1/en/places/radius?radius=8000&lon=${coordinates.lng}&lat=${coordinates.lat}&rate=2&limit=6&format=json&apikey=${apiKey}`,
      { next: { revalidate: 60 * 60 * 24 } },
    );

    if (!response.ok) {
      return { places: [], mapPins: [] };
    }

    const data = (await response.json()) as OpenTripMapPlace[];

    const places: SavedPlace[] = [];
    const mapPins: CityEnrichment["suggestedMapPins"] = [];

    for (const item of data) {
      if (!item.name || item.point?.lat === undefined || item.point.lon === undefined) {
        continue;
      }

      const category = mapKindsToCategory(item.kinds ?? "");
      places.push({
        name: item.name,
        category,
        note: "Suggested from OpenTripMap when this dossier was created.",
      });
      mapPins.push({
        name: item.name,
        lat: item.point.lat,
        lng: item.point.lon,
        category,
      });
    }

    return { places: places.slice(0, 5), mapPins: mapPins.slice(0, 5) };
  } catch {
    return { places: [], mapPins: [] };
  }
}

async function fetchOverpassPlaces(coordinates: {
  lat: number;
  lng: number;
}): Promise<{
  places: SavedPlace[];
  mapPins: CityEnrichment["suggestedMapPins"];
}> {
  const query = `
[out:json][timeout:15];
(
  node["tourism"~"museum|attraction|viewpoint|gallery|artwork"]["name"](around:6000,${coordinates.lat},${coordinates.lng});
  way["tourism"~"museum|attraction|viewpoint|gallery"]["name"](around:6000,${coordinates.lat},${coordinates.lng});
);
out center 5;
`;

  try {
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "LostAndFoundTravelPlatform/2.0 (portfolio project)",
      },
      body: new URLSearchParams({ data: query }).toString(),
      cache: "no-store",
    });

    if (!response.ok) {
      return { places: [], mapPins: [] };
    }

    const data = (await response.json()) as { elements?: OverpassElement[] };
    const places: SavedPlace[] = [];
    const mapPins: CityEnrichment["suggestedMapPins"] = [];

    for (const element of data.elements ?? []) {
      const name = element.tags?.["name:en"] ?? element.tags?.name;
      const lat = element.lat ?? element.center?.lat;
      const lon = element.lon ?? element.center?.lon;

      if (!name || lat === undefined || lon === undefined) {
        continue;
      }

      const category = mapTourismToCategory(element.tags?.tourism ?? "");
      places.push({
        name,
        category,
        note: "Suggested from OpenStreetMap when this dossier was created.",
      });
      mapPins.push({ name, lat, lng: lon, category });
    }

    return { places: places.slice(0, 5), mapPins: mapPins.slice(0, 5) };
  } catch {
    return { places: [], mapPins: [] };
  }
}

async function fetchWikipediaNearbyPlaces(
  city: string,
  coordinates: { lat: number; lng: number },
): Promise<{
  places: SavedPlace[];
  mapPins: CityEnrichment["suggestedMapPins"];
}> {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=${coordinates.lat}|${coordinates.lng}&gsradius=10000&gslimit=8&format=json`,
      { next: { revalidate: 60 * 60 * 24 } },
    );

    if (!response.ok) {
      return { places: [], mapPins: [] };
    }

    const data = (await response.json()) as {
      query?: { geosearch?: WikipediaGeoPage[] };
    };
    const pages = data.query?.geosearch ?? [];

    const places: SavedPlace[] = [];
    const mapPins: CityEnrichment["suggestedMapPins"] = [];

    for (const page of pages) {
      if (!page.title || page.lat === undefined || page.lon === undefined) {
        continue;
      }

      if (page.title.toLowerCase() === city.toLowerCase()) {
        continue;
      }

      if ((page.dist ?? 0) < 100) {
        continue;
      }

      if (isUnhelpfulLandmarkTitle(page.title)) {
        continue;
      }

      const category = inferCategoryFromTitle(page.title);
      places.push({
        name: page.title,
        category,
        note: "Nearby landmark from Wikipedia geosearch.",
      });
      mapPins.push({
        name: page.title,
        lat: page.lat,
        lng: page.lon,
        category,
      });
    }

    return { places: places.slice(0, 5), mapPins: mapPins.slice(0, 5) };
  } catch {
    return { places: [], mapPins: [] };
  }
}

function mapKindsToCategory(kinds: string): SavedPlace["category"] {
  const value = kinds.toLowerCase();

  if (value.includes("restaurants") || value.includes("foods")) {
    return "restaurant";
  }

  if (value.includes("hotels") || value.includes("accomodations")) {
    return "hotel";
  }

  if (
    value.includes("museums") ||
    value.includes("cultural") ||
    value.includes("historic") ||
    value.includes("architecture")
  ) {
    return "museum";
  }

  if (value.includes("neighbourhood") || value.includes("urban")) {
    return "neighborhood";
  }

  return "experience";
}

function mapTourismToCategory(tourism: string): SavedPlace["category"] {
  const value = tourism.toLowerCase();

  if (value === "museum" || value === "gallery") {
    return "museum";
  }

  if (value === "hotel") {
    return "hotel";
  }

  if (value === "restaurant" || value === "cafe") {
    return "restaurant";
  }

  return "experience";
}

function isUnhelpfulLandmarkTitle(title: string): boolean {
  const value = title.toLowerCase();

  return (
    value.includes("bombing") ||
    value.includes("attack") ||
    value.includes("massacre") ||
    value.includes("disaster") ||
    value.includes("championship") ||
    value.includes("rugby") ||
    value.includes("football")
  );
}

function inferCategoryFromTitle(title: string): SavedPlace["category"] {
  const value = title.toLowerCase();

  if (value.includes("museum") || value.includes("gallery")) {
    return "museum";
  }

  if (value.includes("restaurant") || value.includes("cafe") || value.includes("market")) {
    return "restaurant";
  }

  if (value.includes("hotel")) {
    return "hotel";
  }

  if (value.includes("district") || value.includes("quarter") || value.includes("neighborhood")) {
    return "neighborhood";
  }

  return "experience";
}
