import { DEFAULT_DEMO_USERNAME } from "@/content/demo";
import { redirect } from "next/navigation";

export default function LegacyAddLostPage() {
  redirect(`/u/${DEFAULT_DEMO_USERNAME}/lost/add`);
}
