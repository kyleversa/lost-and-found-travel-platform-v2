import { filterSuggestedBooks } from "@/lib/content-safety";
import type { ExternalInsights } from "@/lib/types";

type ExternalInsightsPanelProps = {
  insights: ExternalInsights;
  city: string;
};

export function ExternalInsightsPanel({
  insights,
  city,
}: ExternalInsightsPanelProps) {
  const suggestedBooks = filterSuggestedBooks(insights.suggestedBooks);

  return (
    <section className="panel panel-rise">
      <div className="panel-header">
        <p className="panel-eyebrow">City inspiration</p>
        <h2 className="panel-title">A little context on {city}</h2>
        <p className="panel-copy">
          Background from public sources to enrich this travel dossier.
        </p>
      </div>

      <div className="insights-summary">
        <p>{insights.summary}</p>
        <a
          href={insights.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-link"
        >
          Read full article on {insights.source}
        </a>
      </div>

      {suggestedBooks.length > 0 ? (
        <div className="mt-8">
          <h3 className="mb-4 text-sm tracking-[0.18em] uppercase opacity-70">
            Travel reading suggestions
          </h3>
          <div className="panel-grid">
            {suggestedBooks.map((book) => (
              <a
                key={book.openLibraryUrl}
                href={book.openLibraryUrl}
                target="_blank"
                rel="noreferrer"
                className="collection-card block"
              >
                <h4 className="collection-title">{book.title}</h4>
                {book.author ? (
                  <p className="collection-copy">{book.author}</p>
                ) : null}
                <span className="collection-card-action">View on Open Library</span>
              </a>
            ))}
          </div>
        </div>
      ) : (
        <p className="panel-copy mt-6">No reading suggestions for this city yet.</p>
      )}
    </section>
  );
}
