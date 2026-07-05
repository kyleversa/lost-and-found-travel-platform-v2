import { DEFAULT_DEMO_USERNAME } from "@/content/demo";
import { redirect } from "next/navigation";

type LegacyLostDetailProps = {
  params: Promise<{ slug: string }>;
};

export default async function LegacyLostDetailPage({ params }: LegacyLostDetailProps) {
  const { slug } = await params;
  redirect(`/u/${DEFAULT_DEMO_USERNAME}/lost/${slug}`);
}
