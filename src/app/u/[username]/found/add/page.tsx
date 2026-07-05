import { AddDestinationForm } from "@/components/AddDestinationForm";
import { CollectionBackLink } from "@/components/CollectionBackLink";
import { ModeShell } from "@/components/ModeShell";
import { SiteHeader } from "@/components/SiteHeader";

export default function UserAddFoundPage() {
  return (
    <ModeShell mode="found">
      <SiteHeader mode="found" />
      <CollectionBackLink mode="found" />
      <div className="content-wrap add-page">
        <AddDestinationForm mode="found" />
      </div>
    </ModeShell>
  );
}
