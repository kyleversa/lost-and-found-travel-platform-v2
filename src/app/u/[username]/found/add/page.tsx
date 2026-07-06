import { AddDestinationForm } from "@/components/AddDestinationForm";
import { AddPageNav } from "@/components/AddPageNav";
import { ModeShell } from "@/components/ModeShell";
import { SiteHeader } from "@/components/SiteHeader";

type UserAddFoundPageProps = {
  params: Promise<{ username: string }>;
};

export default async function UserAddFoundPage({ params }: UserAddFoundPageProps) {
  const { username } = await params;

  return (
    <ModeShell mode="found">
      <SiteHeader mode="found" />
      <AddPageNav username={username} mode="found" />
      <div className="content-wrap add-page">
        <AddDestinationForm mode="found" />
      </div>
    </ModeShell>
  );
}
