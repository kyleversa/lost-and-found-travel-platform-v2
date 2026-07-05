import { NextResponse } from "next/server";
import { fetchExternalInsights } from "@/lib/external-apis";

type RouteContext = {
  params: Promise<{ city: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { city } = await context.params;
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country") ?? "";

  const insights = await fetchExternalInsights(
    decodeURIComponent(city),
    country,
  );

  return NextResponse.json(insights);
}
