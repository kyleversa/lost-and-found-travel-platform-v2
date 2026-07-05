import { DEFAULT_DEMO_USERNAME } from "@/content/demo";
import { redirect } from "next/navigation";

export default function LegacyLostPage() {
  redirect(`/u/${DEFAULT_DEMO_USERNAME}/lost`);
}
