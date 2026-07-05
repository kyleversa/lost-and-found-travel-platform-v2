import { DestinationHub } from "@/components/DestinationHub";
import { ModeShell } from "@/components/ModeShell";
import { SiteHeader } from "@/components/SiteHeader";
import { getDemoUser } from "@/content/demo";

type UserFoundPageProps = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: UserFoundPageProps) {
  const { username } = await params;
  const user = getDemoUser(username);

  if (!user) {
    return { title: "Found" };
  }

  return {
    title: `Found · ${user.profile.name}`,
    description: user.profile.collectionCopy.foundIntro,
  };
}

export default function UserFoundPage() {
  return (
    <ModeShell mode="found">
      <SiteHeader mode="found" />
      <DestinationHub mode="found" />
    </ModeShell>
  );
}
