import { getDossierSections } from "@/lib/dossier-sections";
import type { TravelMode } from "@/lib/types";

type DossierNavProps = {
  mode: TravelMode;
};

export function DossierNav({ mode }: DossierNavProps) {
  const sections = getDossierSections(mode);

  return (
    <nav className="dossier-nav" aria-label="Dossier sections">
      <div className="dossier-nav-inner content-wrap">
        {sections.map((section) => (
          <a key={section.id} href={`#${section.id}`} className="dossier-nav-link">
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
