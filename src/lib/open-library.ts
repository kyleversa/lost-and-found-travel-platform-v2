import { filterSuggestedBooks, isBlockedBookTitle } from "@/lib/content-safety";
import type { ExternalInsights } from "@/lib/types";

type OpenLibraryDoc = {
  title?: string;
  author_name?: string[];
  key?: string;
};

export async function fetchTravelBooksFromOpenLibrary(
  city: string,
  limit = 4,
): Promise<ExternalInsights["suggestedBooks"]> {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(`travel guide ${city}`)}&limit=20`,
      { next: { revalidate: 60 * 60 * 24 } },
    );

    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as { docs?: OpenLibraryDoc[] };

    const books = (data.docs ?? [])
      .filter((doc) => doc.title && doc.key && !isBlockedBookTitle(doc.title))
      .map((doc) => ({
        title: doc.title as string,
        author: doc.author_name?.[0],
        openLibraryUrl: `https://openlibrary.org${doc.key}`,
      }));

    return filterSuggestedBooks(books).slice(0, limit);
  } catch {
    return [];
  }
}
