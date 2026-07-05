import { DEFAULT_DEMO_USERNAME } from "@/content/demo";
import { redirect } from "next/navigation";

export default function LegacyAddFoundPage() {
  redirect(`/u/${DEFAULT_DEMO_USERNAME}/found/add`);
}
