import type { SavedBook, SavedMedia, SavedPlace } from "@/lib/types";

type CollectionSectionProps = {
  title: string;
  items: SavedPlace[] | SavedBook[] | SavedMedia[];
  variant: "places" | "books" | "media";
  emptyMessage?: string;
};

const defaultEmptyMessages = {
  places: "No pinned places yet.",
  books: "No reading list entries yet.",
  media: "No watch list entries yet.",
} as const;

export function CollectionSection({
  title,
  items,
  variant,
  emptyMessage,
}: CollectionSectionProps) {
  const emptyCopy = emptyMessage ?? defaultEmptyMessages[variant];

  return (
    <section className="panel">
      <div className="panel-header">
        <p className="panel-eyebrow">Collection</p>
        <h2 className="panel-title">{title}</h2>
      </div>
      {items.length === 0 ? (
        <p className="panel-copy collection-empty">{emptyCopy}</p>
      ) : (
        <div className="panel-grid">
          {items.map((item) => (
            <article key={getItemKey(item, variant)} className="collection-card">
              {variant === "places" ? (
                <>
                  <p className="collection-tag">{(item as SavedPlace).category}</p>
                  <h3 className="collection-title">{(item as SavedPlace).name}</h3>
                  <p className="collection-copy">{(item as SavedPlace).note}</p>
                  {(item as SavedPlace).address ? (
                    <p className="collection-copy mt-2 opacity-70">
                      {(item as SavedPlace).address}
                    </p>
                  ) : null}
                </>
              ) : null}
              {variant === "books" ? (
                <>
                  <p className="collection-tag">{(item as SavedBook).tags.join(" · ")}</p>
                  <h3 className="collection-title">{(item as SavedBook).title}</h3>
                  <p className="collection-copy">{(item as SavedBook).author}</p>
                  {"note" in item && item.note ? (
                    <p className="collection-copy mt-3 opacity-80">{item.note}</p>
                  ) : null}
                </>
              ) : null}
              {variant === "media" ? (
                <>
                  <p className="collection-tag">
                    {(item as SavedMedia).type} · {(item as SavedMedia).year}
                  </p>
                  <h3 className="collection-title">{(item as SavedMedia).title}</h3>
                  <p className="collection-copy">{(item as SavedMedia).creator}</p>
                </>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function getItemKey(
  item: SavedPlace | SavedBook | SavedMedia,
  variant: CollectionSectionProps["variant"],
): string {
  if (variant === "places") {
    return `${(item as SavedPlace).name}-${(item as SavedPlace).category}`;
  }
  if (variant === "books") {
    return `${(item as SavedBook).title}-${(item as SavedBook).author}`;
  }
  return `${(item as SavedMedia).title}-${(item as SavedMedia).year}`;
}
