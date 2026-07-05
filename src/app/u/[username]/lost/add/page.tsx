import { AddDestinationForm } from "@/components/AddDestinationForm";
import { CollectionBackLink } from "@/components/CollectionBackLink";
import { ModeShell } from "@/components/ModeShell";
import { SiteHeader } from "@/components/SiteHeader";

export default function UserAddLostPage() {
  return (
    <ModeShell mode="lost">
      <SiteHeader mode="lost" />
      <CollectionBackLink mode="lost" />
      <div className="content-wrap add-page">
        <AddDestinationForm mode="lost" />
      </div>
    </ModeShell>
  );
}
