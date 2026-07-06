import Link from "next/link";
import { addDossierPath } from "@/lib/paths";
import type { TravelMode } from "@/lib/types";

type DossierBuilderPromoProps = {
  username: string;
  variant?: "full" | "compact";
  mode?: TravelMode;
};

export function DossierBuilderPromo({
  username,
  variant = "full",
  mode,
}: DossierBuilderPromoProps) {
  if (variant === "compact" && mode) {
    const label = mode === "lost" ? "Lost" : "Found";

    return (
      <div className="builder-promo-compact">
        <Link href={addDossierPath(username, mode)} className="secondary-action">
          Create a {label} draft
        </Link>
      </div>
    );
  }

  return (
    <section className="builder-promo panel panel-rise" aria-labelledby="builder-promo-title">
      <p className="panel-eyebrow">Prototype builder</p>
      <h2 id="builder-promo-title" className="panel-title">
        Try the dossier builder
      </h2>
      <p className="panel-copy">
        Create a draft Lost or Found entry and see how Lost &amp; Found turns a city into a
        travel dossier.
      </p>
      <p className="builder-promo-note">
        Drafts are saved locally in this browser for the prototype. They do not modify
        Finn&apos;s seeded demo profile.
      </p>
      <div className="builder-promo-actions">
        <Link href={addDossierPath(username, "lost")} className="secondary-action">
          Create a Lost draft
        </Link>
        <Link href={addDossierPath(username, "found")} className="secondary-action">
          Create a Found draft
        </Link>
      </div>
    </section>
  );
}
