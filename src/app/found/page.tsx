import { DEFAULT_DEMO_USERNAME } from "@/content/demo";
import { redirect } from "next/navigation";

export default function LegacyFoundPage() {
  redirect(`/u/${DEFAULT_DEMO_USERNAME}/found`);
}
