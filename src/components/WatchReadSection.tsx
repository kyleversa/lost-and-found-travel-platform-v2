import { CollectionSection } from "@/components/CollectionSection";

type WatchReadSectionProps = {
  id: string;
  books: Parameters<typeof CollectionSection>[0]["items"];
  media: Parameters<typeof CollectionSection>[0]["items"];
  mode: "found" | "lost";
};

export function WatchReadSection({ id, books, media, mode }: WatchReadSectionProps) {
  const intro =
    mode === "lost"
      ? "Films and reads that shaped this dream trip."
      : "The books and films that still bring this memory rushing back.";

  return (
    <div id={id} className="space-y-6 scroll-mt-28">
      <section className="panel panel-rise">
        <div className="panel-header">
          <p className="panel-eyebrow">Watch & read</p>
          <h2 className="panel-title">
            {mode === "lost" ? "Pre-trip inspiration" : "Post-trip favorites"}
          </h2>
          <p className="panel-copy">{intro}</p>
        </div>
      </section>
      <CollectionSection
        title="Reading list"
        items={books}
        variant="books"
        emptyMessage="No books on this list yet."
      />
      <CollectionSection
        title="Watch list"
        items={media}
        variant="media"
        emptyMessage="No films or series on this list yet."
      />
    </div>
  );
}
