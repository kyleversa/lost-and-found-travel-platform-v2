import Image from "next/image";
import Link from "next/link";
import { DossierBuilderPromo } from "@/components/DossierBuilderPromo";
import { getDemoUser } from "@/content/demo";
import { collectionPath } from "@/lib/paths";
import { notFound } from "next/navigation";

type ProfilePageProps = {
  params: Promise<{ username: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const user = getDemoUser(username);

  if (!user) {
    notFound();
  }

  const { profile } = user;

  return (
    <main className="landing-page">
      <div className="landing-backdrop" aria-hidden="true">
        <span className="landing-orb landing-orb-found" />
        <span className="landing-orb landing-orb-lost" />
      </div>

      <div className="landing-shell">
        <section className="landing-card landing-rise profile-overview">
          <div className="profile-overview-header">
            <div className="profile-overview-identity">
              <div className="profile-avatar-wrap">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                  priority
                />
              </div>
              <div>
                <p className="profile-name">{profile.name}</p>
                <p className="profile-handle">{profile.handle}</p>
                <p className="profile-location">{profile.location}</p>
              </div>
            </div>
            {profile.isDemo ? (
              <span className="demo-profile-badge">Demo profile</span>
            ) : null}
          </div>

          <p className="profile-bio">{profile.bio}</p>

          <div className="stats-row profile-overview-stats">
            <div className="stat-card stat-rise">
              <strong>{profile.stats.memories}</strong>
              <span>Found dossiers</span>
            </div>
            <div className="stat-card stat-rise">
              <strong>{profile.stats.dreamTrips}</strong>
              <span>Lost dossiers</span>
            </div>
            <div className="stat-card stat-rise">
              <strong>{profile.stats.countriesVisited}</strong>
              <span>Countries</span>
            </div>
            <div className="stat-card stat-rise">
              <strong>{profile.stats.tripsLogged}</strong>
              <span>Trips logged</span>
            </div>
          </div>

          <div className="world-grid profile-overview-grid">
            <Link
              href={collectionPath(username, "lost")}
              className="world-portal world-portal-lost world-link-hover"
            >
              <span className="world-portal-tag">Dream trips</span>
              <strong>Lost</strong>
              <span className="world-portal-copy">{profile.collectionCopy.lostIntro}</span>
              <span className="world-portal-cta">Explore Lost collection</span>
            </Link>
            <Link
              href={collectionPath(username, "found")}
              className="world-portal world-portal-found world-link-hover"
            >
              <span className="world-portal-tag">Memories</span>
              <strong>Found</strong>
              <span className="world-portal-copy">{profile.collectionCopy.foundIntro}</span>
              <span className="world-portal-cta">Explore Found collection</span>
            </Link>
          </div>

          <DossierBuilderPromo username={username} />

          <Link href="/" className="inline-link profile-overview-home">
            Back to Lost &amp; Found
          </Link>
        </section>
      </div>
    </main>
  );
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const { username } = await params;
  const user = getDemoUser(username);

  if (!user) {
    return { title: "Profile not found" };
  }

  return {
    title: user.profile.name,
    description: user.profile.bio,
  };
}
