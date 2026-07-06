# Lost & Found

A social travel journal prototype with two connected collections:

- **Found** — places you have been: journal entries, trip recaps, and pinned memories
- **Lost** — places you want to go: dream trips, itineraries, and inspiration

The live V2 preview showcases **Finn Shepherd** (`@finnshepherd`), a seeded demo profile with five Found and five Lost travel dossiers.

**Live preview:** https://lostandfound-travel.vercel.app

**Repository:** https://github.com/kyleversa/lost-and-found-travel-platform-v2

## Explore the demo

Start at the landing page, then follow Finn’s profile:

- `/` — landing page
- `/u/finn` — profile hub
- `/u/finn/lost` — dream trips (Lost collection)
- `/u/finn/found` — travel memories (Found collection)
- `/u/finn/lost/tokyo` and `/u/finn/found/paris` — example dossiers

Legacy routes such as `/lost` and `/found` redirect to Finn’s profile collections.

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Leaflet + OpenStreetMap
- Free public APIs: Wikipedia, Open Library, and optional enrichment keys

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
```

## Project structure

```
src/
  app/                 # Routes for landing, profile, collections, and dossiers
  components/          # Shared UI
  content/demo/        # Finn profile + destination content
  lib/                 # Types, helpers, external API integrations
public/images/         # Destination photography
```

See [PROJECT_STATUS.md](./PROJECT_STATUS.md) for pause/handoff notes and deferred work.

## Roadmap

### Phase 1 — Foundation
- [x] Next.js scaffold with dual themes
- [x] 5 Found + 5 Lost travel dossiers for Finn's profile
- [x] Dual visual themes (sepia journal vs midnight neon)
- [x] Dossier navigation, itinerary blocks, budget tracker, packing checklist, map pins
- [x] Wikipedia + Open Library research feeds
- [x] City lookup on add flow (photo, summary, books, places, watch list)

### Phase 2 — Travel planner depth
- [ ] Itinerary builder (day-by-day blocks)
- [ ] Drag-and-drop dossier sections (Notion-like boards)
- [ ] Save / pin / archive items inside a destination
- [x] TMDB media library integration (optional API key)

### Phase 3 — External libraries
- [x] OpenTripMap points of interest (optional API key, Wikipedia geosearch fallback)
- [x] REST Countries metadata
- [ ] Curated public itinerary snippets (where licensing allows)

### Phase 4 — Product polish
- [ ] User accounts and personal journals
- [ ] Exportable trip dossier PDF
- [x] Deploy V2 preview to Vercel at `lostandfound-travel.vercel.app`

## Original project

The v1 course project remains archived at:
https://github.com/kyleversa/lost-and-found-travel-platform

## Environment variables

**Production (Vercel):**

```bash
NEXT_PUBLIC_SITE_URL=https://lostandfound-travel.vercel.app
```

**Optional local keys** — copy `.env.example` to `.env.local` for richer city lookups:

```bash
TMDB_API_KEY=           # Film and TV watch list
OPENTRIPMAP_API_KEY=    # Pinned places and map pins (Wikipedia fallback without this)
UNSPLASH_ACCESS_KEY=    # Best cover photos (recommended)
PEXELS_API_KEY=         # Cover photo fallback if Unsplash is unavailable
MONGODB_URI=            # Optional if we restore book/media CRUD
```

Without API keys, city lookup still works using Wikimedia Commons skyline search, Wikipedia, Open Library, and OpenStreetMap for nearby landmarks.
