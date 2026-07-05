import { FoundDossierWorkspace } from "@/components/FoundDossierWorkspace";
import { listDemoUsernames } from "@/content/demo";
import { getDestinationSlugs, getFoundDestination } from "@/lib/destinations";
import { fetchExternalInsights } from "@/lib/external-apis";

export const dynamicParams = true;

type FoundDetailPageProps = {
  params: Promise<{ username: string; slug: string }>;
};

export async function generateStaticParams() {
  return listDemoUsernames().flatMap((username) =>
    getDestinationSlugs(username, "found").map((slug) => ({ username, slug })),
  );
}

export async function generateMetadata({ params }: FoundDetailPageProps) {
  const { username, slug } = await params;
  const seed = getFoundDestination(username, slug);

  if (!seed) {
    return { title: "Found dossier" };
  }

  return {
    title: `${seed.city} · Found`,
    description: seed.tagline,
  };
}

export default async function UserFoundDetailPage({ params }: FoundDetailPageProps) {
  const { username, slug } = await params;
  const seed = getFoundDestination(username, slug);

  const insights = seed
    ? await fetchExternalInsights(seed.city, seed.country)
    : {
        summary: "Gathering city inspiration…",
        source: "Wikipedia",
        sourceUrl: "https://en.wikipedia.org",
        suggestedBooks: [],
      };

  return (
    <FoundDossierWorkspace
      slug={slug}
      insights={insights}
      fetchInsightsOnClient={!seed}
    />
  );
}
