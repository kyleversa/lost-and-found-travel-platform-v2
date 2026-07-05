import { fetchTravelBooksFromOpenLibrary } from "@/lib/open-library";
import type { ExternalInsights } from "@/lib/types";

type WikipediaSummary = {
  extract?: string;
  content_urls?: {
    desktop?: {
      page?: string;
    };
  };
};

export async function fetchExternalInsights(
  city: string,
  country: string,
): Promise<ExternalInsights> {
  const [wikiSummary, suggestedBooks] = await Promise.all([
    fetchWikipediaSummary(`${city}, ${country}`),
    fetchTravelBooksFromOpenLibrary(city),
  ]);

  return {
    summary: wikiSummary.summary,
    source: "Wikipedia",
    sourceUrl: wikiSummary.url,
    suggestedBooks,
  };
}

async function fetchWikipediaSummary(title: string): Promise<{
  summary: string;
  url: string;
}> {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
      { next: { revalidate: 60 * 60 * 24 } },
    );

    if (!response.ok) {
      return {
        summary: "City context from Wikipedia will appear here when available.",
        url: "https://en.wikipedia.org",
      };
    }

    const data = (await response.json()) as WikipediaSummary;

    return {
      summary:
        data.extract ??
        "No Wikipedia summary is available for this city yet.",
      url: data.content_urls?.desktop?.page ?? "https://en.wikipedia.org",
    };
  } catch {
    return {
      summary: "City inspiration is unavailable right now.",
      url: "https://en.wikipedia.org",
    };
  }
}
