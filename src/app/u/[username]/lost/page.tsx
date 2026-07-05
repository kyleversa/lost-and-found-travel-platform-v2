import { DestinationHub } from "@/components/DestinationHub";
import { ModeShell } from "@/components/ModeShell";
import { SiteHeader } from "@/components/SiteHeader";
import { getDemoUser } from "@/content/demo";

type UserLostPageProps = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: UserLostPageProps) {
  const { username } = await params;
  const user = getDemoUser(username);

  if (!user) {
    return { title: "Lost" };
  }

  return {
    title: `Lost · ${user.profile.name}`,
    description: user.profile.collectionCopy.lostIntro,
  };
}

export default function UserLostPage() {
  return (
    <ModeShell mode="lost">
      <SiteHeader mode="lost" />
      <DestinationHub mode="lost" />
    </ModeShell>
  );
}
