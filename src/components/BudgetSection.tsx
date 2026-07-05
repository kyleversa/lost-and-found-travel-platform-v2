import type { BudgetItem } from "@/lib/types";

type BudgetSectionProps = {
  id: string;
  items: BudgetItem[];
  tripTier: string;
};

const tierLabels = {
  essential: "Essential",
  splurge: "Splurge",
  optional: "Optional",
} as const;

export function BudgetSection({ id, items, tripTier }: BudgetSectionProps) {
  const total = items.reduce((sum, item) => sum + item.amount, 0);
  const splurgeTotal = items
    .filter((item) => item.tier === "splurge")
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <section id={id} className="panel panel-rise scroll-mt-28">
      <div className="panel-header">
        <p className="panel-eyebrow">Budget tracker</p>
        <h2 className="panel-title">Trip budget</h2>
        {items.length > 0 ? (
          <p className="panel-copy">
            Trip tier: <strong>{tripTier}</strong> · Estimated total:{" "}
            <strong>${total.toLocaleString()}</strong>
            {splurgeTotal > 0 ? (
              <>
                {" "}
                · Splurge fund: <strong>${splurgeTotal.toLocaleString()}</strong>
              </>
            ) : null}
          </p>
        ) : (
          <p className="panel-copy">No budget lines added yet.</p>
        )}
      </div>

      {items.length > 0 ? (
        <div className="budget-list">
          {items.map((item) => (
            <article key={item.label} className={`budget-item budget-${item.tier}`}>
              <div className="budget-item-top">
                <h3>{item.label}</h3>
                <span className="budget-tier">{tierLabels[item.tier]}</span>
              </div>
              <p className="budget-amount">
                ${item.amount.toLocaleString()} {item.currency}
              </p>
              {item.note ? <p className="budget-note">{item.note}</p> : null}
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
