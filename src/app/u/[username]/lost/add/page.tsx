import { AddDestinationForm } from "@/components/AddDestinationForm";
import { AddPageNav } from "@/components/AddPageNav";
import { ModeShell } from "@/components/ModeShell";
import { SiteHeader } from "@/components/SiteHeader";

type UserAddLostPageProps = {
  params: Promise<{ username: string }>;
};

export default async function UserAddLostPage({ params }: UserAddLostPageProps) {
  const { username } = await params;

  return (
    <ModeShell mode="lost">
      <SiteHeader mode="lost" />
      <AddPageNav username={username} mode="lost" />
      <div className="content-wrap add-page">
        <AddDestinationForm mode="lost" />
      </div>
    </ModeShell>
  );
}
