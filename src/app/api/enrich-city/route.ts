import { NextResponse } from "next/server";
import { enrichCity } from "@/lib/city-enrichment";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city")?.trim();
  const country = searchParams.get("country")?.trim();

  if (!city || !country) {
    return NextResponse.json(
      { error: "City and country are required." },
      { status: 400 },
    );
  }

  const enrichment = await enrichCity(city, country);
  return NextResponse.json(enrichment);
}
