import { DossierBuilderPromo } from "@/components/DossierBuilderPromo";
import { HowItWorks } from "@/components/HowItWorks";
import { DEFAULT_DEMO_USERNAME, getDemoUser } from "@/content/demo";
import { collectionPath, profilePath } from "@/lib/paths";
import Link from "next/link";

export default function HomePage() {
  const demoUser = getDemoUser(DEFAULT_DEMO_USERNAME);
  const profile = demoUser?.profile;
  const username = profile?.username ?? DEFAULT_DEMO_USERNAME;

  return (
    <main className="landing-page">
      <div className="landing-backdrop" aria-hidden="true">
        <span className="landing-orb landing-orb-found" />
        <span className="landing-orb landing-orb-lost" />
        <span className="landing-orb landing-orb-lost-secondary" />
      </div>

      <div className="landing-shell">
        <section className="landing-card landing-rise">
          <p className="page-kicker landing-kicker">Social travel journal</p>
          <h1 className="landing-title">
            <span className="landing-title-lost">Lost</span>
            <span className="landing-title-amp">&amp;</span>
            <span className="landing-title-found">Found</span>
          </h1>
          <p className="landing-copy">
            A social travel journal with two connected collections.{" "}
            <strong>Found</strong> holds the places you have been.{" "}
            <strong>Lost</strong> holds the places you want to go. Each city becomes a
            travel dossier with journal entries, pinned places, itineraries, and memories
            worth sharing.
          </p>

          <div className="landing-cta-row">
            <Link href={profilePath(username)} className="primary-action landing-cta-primary">
              Explore {profile?.name ? `${profile.name}'s` : "demo"} profile
            </Link>
            <span className="secondary-action landing-cta-secondary landing-cta-disabled">
              Start your own journal
              <span className="coming-soon-tag">Coming soon</span>
            </span>
          </div>

          <div className="world-grid">
            <Link
              href={collectionPath(username, "lost")}
              className="world-portal world-portal-lost world-link-hover"
            >
              <span className="world-portal-tag">Dream trips</span>
              <strong>Lost</strong>
              <span className="world-portal-copy">
                Places you want to go: dream trips, pinned restaurants, day plans, and
                inspiration while you are still planning.
              </span>
              <span className="world-portal-cta">Explore Lost collection</span>
            </Link>
            <Link
              href={collectionPath(username, "found")}
              className="world-portal world-portal-found world-link-hover"
            >
              <span className="world-portal-tag">Memories</span>
              <strong>Found</strong>
              <span className="world-portal-copy">
                Places you have been: journal entries, trip recaps, hidden gems, and the
                spots you would return to in a heartbeat.
              </span>
              <span className="world-portal-cta">Explore Found collection</span>
            </Link>
          </div>

          <DossierBuilderPromo username={username} />

          <p className="landing-social-note">
            Shareable travel dossiers · social lists · comments (coming soon)
          </p>
        </section>
      </div>

      <HowItWorks />
    </main>
  );
}
