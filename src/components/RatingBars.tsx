type RatingBarsProps = {
  ratings: Record<string, number>;
  labels?: Record<string, string>;
};

export function RatingBars({ ratings, labels }: RatingBarsProps) {
  return (
    <div className="space-y-4">
      {Object.entries(ratings).map(([key, value]) => (
        <div key={key}>
          <div className="mb-2 flex items-center justify-between text-sm tracking-[0.16em] uppercase">
            <span>{labels?.[key] ?? key}</span>
            <span>{value}/5</span>
          </div>
          <div className="rating-track">
            <div className="rating-fill" style={{ width: `${(value / 5) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
