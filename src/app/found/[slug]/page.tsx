import { DEFAULT_DEMO_USERNAME } from "@/content/demo";
import { redirect } from "next/navigation";

type LegacyFoundDetailProps = {
  params: Promise<{ slug: string }>;
};

export default async function LegacyFoundDetailPage({ params }: LegacyFoundDetailProps) {
  const { slug } = await params;
  redirect(`/u/${DEFAULT_DEMO_USERNAME}/found/${slug}`);
}
