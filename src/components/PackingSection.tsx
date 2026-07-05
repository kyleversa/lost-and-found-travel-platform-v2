import type { PackingItem } from "@/lib/types";

type PackingSectionProps = {
  id: string;
  items: PackingItem[];
};

const categoryLabels = {
  gear: "Gear",
  clothing: "Clothing",
  toiletries: "Toiletries",
  content: "Extras",
} as const;

export function PackingSection({ id, items }: PackingSectionProps) {
  const grouped = items.reduce<Record<string, PackingItem[]>>((acc, item) => {
    acc[item.category] = acc[item.category] ? [...acc[item.category], item] : [item];
    return acc;
  }, {});

  return (
    <section id={id} className="panel panel-rise scroll-mt-28">
      <div className="panel-header">
        <p className="panel-eyebrow">Packing checklist</p>
        <h2 className="panel-title">What&apos;s going in the bag</h2>
        <p className="panel-copy">
          Everything packed for this trip, ready to check off before departure.
        </p>
      </div>

      {items.length === 0 ? (
        <p className="panel-copy">No packing list yet.</p>
      ) : (
        <div className="packing-grid">
          {Object.entries(grouped).map(([category, categoryItems]) => (
            <div key={category} className="packing-group">
              <h3>{categoryLabels[category as PackingItem["category"]]}</h3>
              <ul className="packing-list">
                {categoryItems.map((item) => (
                  <li key={item.item}>
                    <span className="packing-checkbox" aria-hidden="true" />
                    {item.item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
