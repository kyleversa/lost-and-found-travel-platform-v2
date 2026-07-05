"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import {
  useFoundDestinations,
  useLostDestinations,
  notifyUserStoreUpdated,
} from "@/hooks/useUserDestinations";
import type { CityEnrichment } from "@/lib/city-enrichment";
import {
  createBlankFound,
  createBlankLost,
  destinationImages,
  duplicateFound,
  duplicateLost,
} from "@/lib/destination-templates";
import { dossierPath } from "@/lib/paths";
import type { TravelMode } from "@/lib/types";
import { saveFoundDestination, saveLostDestination } from "@/lib/user-store";

type AddDestinationFormProps = {
  mode: TravelMode;
};

export function AddDestinationForm({ mode }: AddDestinationFormProps) {
  const router = useRouter();
  const { username } = useProfile();
  const foundDestinations = useFoundDestinations(username);
  const lostDestinations = useLostDestinations(username);
  const seedList = mode === "found" ? foundDestinations : lostDestinations;
  const [startType, setStartType] = useState<"blank" | "duplicate">("blank");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [tagline, setTagline] = useState("");
  const [image, setImage] = useState(destinationImages[0]);
  const [useLibraryImage, setUseLibraryImage] = useState(true);
  const [enrichment, setEnrichment] = useState<CityEnrichment | null>(null);
  const [enrichError, setEnrichError] = useState("");
  const [isEnriching, setIsEnriching] = useState(false);
  const [duplicateSlug, setDuplicateSlug] = useState(seedList[0]?.slug ?? "");

  async function handleLookup() {
    if (!city.trim() || !country.trim()) {
      setEnrichError("Enter a city and country first.");
      return;
    }

    setIsEnriching(true);
    setEnrichError("");

    try {
      const response = await fetch(
        `/api/enrich-city?city=${encodeURIComponent(city.trim())}&country=${encodeURIComponent(country.trim())}`,
      );

      if (!response.ok) {
        throw new Error("Lookup failed");
      }

      const data = (await response.json()) as CityEnrichment;
      setEnrichment(data);

      if (!tagline.trim()) {
        setTagline(data.tagline);
      }

      if (data.imageUrl && useLibraryImage) {
        setImage(data.imageUrl);
      }
    } catch {
      setEnrichError("City lookup is unavailable right now. You can still create the dossier by hand.");
    } finally {
      setIsEnriching(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (startType === "duplicate") {
      if (mode === "found") {
        const source = foundDestinations.find(
          (destination) => destination.slug === duplicateSlug,
        );
        if (!source) {
          return;
        }

        const copy = duplicateFound(source);
        saveFoundDestination(username, copy);
        notifyUserStoreUpdated();
        router.push(dossierPath(username, "found", copy.slug));
        return;
      }

      const source = lostDestinations.find(
        (destination) => destination.slug === duplicateSlug,
      );
      if (!source) {
        return;
      }

      const copy = duplicateLost(source);
      saveLostDestination(username, copy);
      notifyUserStoreUpdated();
      router.push(dossierPath(username, "lost", copy.slug));
      return;
    }

    if (!city.trim() || !country.trim()) {
      return;
    }

    const payload = {
      city: city.trim(),
      country: country.trim(),
      tagline: tagline.trim() || undefined,
      image: useLibraryImage && enrichment?.imageUrl ? enrichment.imageUrl : image,
      enrichment: enrichment ?? undefined,
    };

    if (mode === "found") {
      const destination = createBlankFound(payload);
      saveFoundDestination(username, destination);
      notifyUserStoreUpdated();
      router.push(dossierPath(username, "found", destination.slug));
      return;
    }

    const destination = createBlankLost(payload);
    saveLostDestination(username, destination);
    notifyUserStoreUpdated();
    router.push(dossierPath(username, "lost", destination.slug));
  }

  return (
    <form className="add-form panel panel-rise" onSubmit={handleSubmit}>
      <div className="panel-header">
        <p className="panel-eyebrow">New travel dossier</p>
        <h2 className="panel-title">Add a destination</h2>
        <p className="panel-copy">
          Start with a blank dossier or copy one from this collection. For new cities,
          pull in a cover photo and city notes from public libraries.
        </p>
      </div>

      <div className="start-type-row">
        <button
          type="button"
          className={startType === "blank" ? "type-chip active" : "type-chip"}
          onClick={() => setStartType("blank")}
        >
          Start blank dossier
        </button>
        <button
          type="button"
          className={startType === "duplicate" ? "type-chip active" : "type-chip"}
          onClick={() => setStartType("duplicate")}
        >
          Copy from collection
        </button>
      </div>

      {startType === "blank" ? (
        <>
          <div className="form-grid">
            <label>
              City
              <input value={city} onChange={(event) => setCity(event.target.value)} required />
            </label>
            <label>
              Country
              <input
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                required
              />
            </label>
            <label className="full-width">
              Tagline
              <input
                value={tagline}
                onChange={(event) => setTagline(event.target.value)}
                placeholder="A line that captures the mood"
              />
            </label>
          </div>

          <div className="lookup-row">
            <button
              type="button"
              className="secondary-action"
              onClick={handleLookup}
              disabled={isEnriching}
            >
              {isEnriching ? "Fetching city details…" : "Fetch city details"}
            </button>
            <p className="hub-note">
              Cover photos prioritize travel libraries (Unsplash, Pexels, Wikimedia skyline search) over generic Wikipedia images. First lookup can take 10 to 20 seconds.
            </p>
          </div>

          {enrichError ? <p className="form-error">{enrichError}</p> : null}

          {enrichment ? (
            <div className="enrichment-preview panel">
              <p className="panel-eyebrow">City preview</p>
              {enrichment.imageUrl ? (
                <div className="enrichment-image-wrap">
                  <Image
                    src={enrichment.imageUrl}
                    alt={`${enrichment.city} cover`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 420px"
                    unoptimized={enrichment.imageUrl.includes("wikimedia.org")}
                  />
                </div>
              ) : null}
              <p className="panel-copy">{enrichment.summary}</p>
              <p className="panel-copy">
                Image source: {enrichment.imageSource}
              </p>
              {enrichment.countryFacts.languages.length > 0 ? (
                <p className="panel-copy">
                  Languages: {enrichment.countryFacts.languages.slice(0, 3).join(", ")}
                </p>
              ) : null}
              {enrichment.suggestedPlaces.length > 0 ? (
                <p className="panel-copy">
                  Pinned places: {enrichment.suggestedPlaces.slice(0, 3).map((place) => place.name).join(", ")}
                  {enrichment.suggestedPlaces.length > 3
                    ? ` +${enrichment.suggestedPlaces.length - 3} more`
                    : ""}
                </p>
              ) : null}
              {enrichment.suggestedMedia.length > 0 ? (
                <p className="panel-copy">
                  Watch list: {enrichment.suggestedMedia.map((item) => item.title).join(", ")}
                </p>
              ) : null}
            </div>
          ) : null}

          <label className="full-width">
            Cover image
            <select
              value={image}
              onChange={(event) => {
                setUseLibraryImage(false);
                setImage(event.target.value);
              }}
              disabled={Boolean(enrichment?.imageUrl && useLibraryImage)}
            >
              {enrichment?.imageUrl && useLibraryImage ? (
                <option value={enrichment.imageUrl}>Library photo for {city || "this city"}</option>
              ) : null}
              {destinationImages.map((option) => (
                <option key={option} value={option}>
                  {option.replace("/images/", "").replace(".webp", "")}
                </option>
              ))}
            </select>
          </label>
        </>
      ) : (
        <label className="full-width">
          Copy dossier from
          <select
            value={duplicateSlug}
            onChange={(event) => setDuplicateSlug(event.target.value)}
          >
            {seedList.map((destination) => (
              <option key={destination.slug} value={destination.slug}>
                {destination.city}, {destination.country}
              </option>
            ))}
          </select>
        </label>
      )}

      <button type="submit" className="primary-action">
        Create travel dossier
      </button>
    </form>
  );
}
