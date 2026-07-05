import Link from "next/link";
import {
  DEFAULT_DEMO_USERNAME,
  getDemoUser,
} from "@/content/demo";
import { collectionPath, dossierPath, profilePath, profilePossessive } from "@/lib/paths";

export function HowItWorks() {
  const demoUser = getDemoUser(DEFAULT_DEMO_USERNAME);

  if (!demoUser) {
    return null;
  }

  const { profile } = demoUser;
  const possessive = profilePossessive(profile.name);
  const featuredDossier = demoUser.lost[0];

  const steps = [
    {
      number: "01",
      title: "Collect places you want to go",
      copy: `Lost dossiers hold dream trips: pinned places, day plans, budgets, and inspiration for cities still on the list.`,
      href: collectionPath(profile.username, "lost"),
      cta: "Explore Lost collection",
    },
    {
      number: "02",
      title: "Archive places you have been",
      copy: `Found holds the memories: journal entries, trip recaps, hidden gems, and the details worth keeping.`,
      href: collectionPath(profile.username, "found"),
      cta: "Explore Found collection",
    },
    {
      number: "03",
      title: "Open any travel dossier",
      copy: "Each city becomes a rich dossier you can browse section by section, from journal entries and pinned places to maps and watch lists.",
      href: featuredDossier
        ? dossierPath(profile.username, "lost", featuredDossier.slug)
        : profilePath(profile.username),
      cta: featuredDossier
        ? `Open ${featuredDossier.city} dossier`
        : "View profile",
    },
  ];

  return (
    <section className="how-it-works">
      <div className="how-it-works-inner content-wrap">
        <p className="page-kicker">How it works</p>
        <h2 className="how-it-works-title">Two collections, one journal</h2>
        <p className="how-it-works-copy">
          Lost &amp; Found keeps dream trips and past memories in one profile, connected
          but distinct. Explore {possessive} journal to see the full experience.
        </p>

        <div className="how-steps">
          {steps.map((step) => (
            <article key={step.number} className="how-step">
              <p className="how-step-number">{step.number}</p>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
              <Link href={step.href} className="how-step-link">
                {step.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
