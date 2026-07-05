import type { ItineraryDay, TravelMode } from "@/lib/types";

type ItinerarySectionProps = {
  id: string;
  title: string;
  eyebrow: string;
  days: ItineraryDay[];
  mode?: TravelMode;
};

const categoryLabels = {
  shoot: "Highlight",
  food: "Eat",
  walk: "Walk",
  museum: "Culture",
  travel: "Transit",
  rest: "Rest",
} as const;

export function ItinerarySection({
  id,
  title,
  eyebrow,
  days,
  mode = "lost",
}: ItinerarySectionProps) {
  const helperCopy =
    mode === "found"
      ? "How the days unfolded: the plan, the detours, and the moments worth remembering."
      : "A day-by-day plan, loose enough to rewrite when inspiration strikes.";

  return (
    <section id={id} className="panel panel-rise scroll-mt-28">
      <div className="panel-header">
        <p className="panel-eyebrow">{eyebrow}</p>
        <h2 className="panel-title">{title}</h2>
        <p className="panel-copy">{helperCopy}</p>
      </div>

      {days.length === 0 ? (
        <p className="panel-copy">No day plan yet.</p>
      ) : (
        <div className="itinerary-stack">
          {days.map((day) => (
            <article key={day.day} className="itinerary-day">
              <div className="itinerary-day-header">
                <span className="itinerary-day-number">Day {day.day}</span>
                <h3 className="itinerary-day-label">{day.label}</h3>
              </div>
              <div className="itinerary-blocks">
                {day.blocks.map((block) => (
                  <div key={`${day.day}-${block.time}-${block.title}`} className="itinerary-block">
                    <div className="itinerary-time">{block.time}</div>
                    <div className="itinerary-block-body">
                      <div className="itinerary-block-top">
                        <h4>{block.title}</h4>
                        <span className="itinerary-category">
                          {categoryLabels[block.category]}
                        </span>
                      </div>
                      <p>{block.note}</p>
                      {block.location ? (
                        <p className="itinerary-location">{block.location}</p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
