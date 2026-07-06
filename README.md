# Lost & Found V2

**Live demo:** https://lostandfound-travel.vercel.app  
**Repository:** https://github.com/kyleversa/lost-and-found-travel-platform-v2

---

## Overview

**Lost & Found V2** is a live, publicly deployed **product prototype** for a social travel journal — a place to organize where you have been, where you want to go, and the stories that connect those journeys.

This is **not** a full multi-user SaaS product yet. There are no real user accounts, no production database, and no server-side persistence for personal content. What you are viewing is a polished, recruiter-facing deployment: a complete product experience built around a **seeded demo profile** so visitors can explore the app the way they might browse a real traveler's journal.

Lost & Found V2 is a rebuild and continuation of my original [Lost & Found travel website](https://github.com/kyleversa/lost-and-found-travel-platform). The first version established the core idea. V2 focuses on product experience — profile-based navigation, rich destination dossiers, dual visual themes, and a clearer emotional split between **memories** and **dream trips**.

---

## Product concept

Lost & Found is a **social travel journal** — like **Letterboxd for travel**.

Most travel tools optimize for booking, logistics, or generic lists. Lost & Found optimizes for **storytelling and identity**: helping people collect, organize, and eventually share the places and experiences that define how they travel.

Every profile holds two connected collections:

### Found — places you have been

The memory side of the journal. Found holds journal entries, trip recaps, hidden gems, day-by-day recaps of how a trip actually unfolded, and the details worth keeping after you return home. It answers: *What stayed with me? Would I go back?*

### Lost — places you want to go

The planning and inspiration side. Lost holds dream trips, itineraries, pinned restaurants and neighborhoods, budgets, packing lists, pre-trip watch/read lists, and the research that builds anticipation before a trip happens. It answers: *Why is this city on my list? What would I do there?*

### Travel dossiers

Each city becomes a **travel dossier** — not a single note, but a structured destination page visitors can browse section by section. A dossier might include journal prose, pinned places on a map, day plans, budget breakdowns, packing checklists, film and book inspiration, and background context from public sources.

The long-term vision is a profile-driven travel identity: one place where dream trips and past memories live together, connected but distinct — and eventually shareable in a social feed.

---

## Why I built it

I built Lost & Found V2 to practice **product thinking** in a domain I care about: travel, personalization, storytelling, and destination-level planning.

I wanted to go beyond a static portfolio page and design something that feels like a real product — something a visitor can **explore**, not just read about. That meant thinking through:

- **Product framing** — Can a first-time visitor understand Found vs. Lost in under a minute?
- **Travel storytelling** — Does each dossier reward curiosity? Does the UI feel like a journal, not a database?
- **Destination planning** — Can a dream-trip dossier hold the full texture of planning: itinerary, budget, packing, pins, inspiration?
- **Profile-based UX** — Does it feel like visiting someone's travel identity, rather than clicking through a template?
- **Deployment discipline** — Can the project stand up to a real public URL, with lint, build, and smoke tests behind it?

This project is especially relevant for roles involving consumer product experience, travel, lifestyle, content-forward applications, and teams that care about how users discover, save, and revisit personal collections over time.

---

## Core user flow

Here is the path a recruiter or visitor can follow on the live site:

1. **Land on the homepage** — Read what Lost & Found is and how the two collections relate.
2. **Open Finn Shepherd's profile** — Enter the demo travel journal via the primary CTA.
3. **Choose a collection** — Pick **Lost** (dream trips) or **Found** (memories).
4. **Browse destination cards** — Scan five dossiers in each collection with photography, taglines, and country context.
5. **Open a travel dossier** — Explore a city in depth through section navigation: journal, itinerary, pinned places, map, watch/read, and city notes.
6. **Interact with the map** — Pan and zoom pinned locations; open pins in Google Maps.
7. **Optionally edit a dossier** — Use **Edit dossier** to refine content in the browser. Changes persist in **local browser storage** for that device (not synced to an account).

**Suggested exploration path:**

`/` → `/u/finn` → `/u/finn/lost` → `/u/finn/lost/tokyo` → `/u/finn/found/paris`

---

## Completed in V2.0 Preview

Everything below is **live and working** on the public deployment.

### Landing and profile experience

- **Homepage** explaining the Lost & Found concept, with clear CTAs into the demo profile and both collections
- **Profile hub** for Finn Shepherd — avatar, bio, travel stats, and entry points into Lost and Found
- **Subtle demo profile labeling** — visitors understand they are exploring a seeded demo, without template-style placeholder language
- **Dual visual themes** — warm sepia journal aesthetic for Found; midnight neon aesthetic for Lost
- **Mobile-responsive layout** across landing, profile, collection hubs, and dossier pages

### Lost collection — dream trips (5 dossiers)

Tokyo, Sydney, Bangkok, Santorini, and Istanbul — each with:

- Trip notes and rationale for why the city is on the list
- Day-by-day itinerary blocks
- Pinned places with addresses and map coordinates
- Trip budget tracker with line items and splurge fund
- Packing checklist
- Interactive map (Leaflet + OpenStreetMap)
- Pre-trip watch/read lists
- Wikipedia summary and Open Library reading suggestions
- Research scorecard / ranking context

### Found collection — memories (5 dossiers)

Paris, New York City, Tuscany, London, and Barcelona — each with:

- Journal entries and personal reflection
- Trip recap and "would go back?" framing
- Hidden gems with place types and addresses
- Day plan recap of how the trip unfolded
- Interactive map with pinned locations
- Post-trip watch/read favorites
- Wikipedia summary and Open Library suggestions
- Trip ratings / how-it-felt framing

### Dossier infrastructure

- **Section navigation** within each dossier — jump between journal, itinerary, map, and other blocks
- **Hero imagery** for each destination from curated photography
- **Collection switching** — move between Lost and Found without leaving the profile context
- **Legacy route redirects** — older `/lost` and `/found` paths redirect to Finn's profile routes

### Editing and data model

- **In-browser dossier editing** on any dossier page — refine journal text, lists, and details
- **Client-side persistence** — edits save to browser localStorage, scoped per demo username
- **Centralized demo content** — Finn's profile and dossiers live in structured source data, not hardcoded UI strings

### External integrations (live on dossier pages)

- **Wikipedia** — city context summaries
- **Open Library** — travel reading suggestions
- **OpenStreetMap** — map tiles and pin rendering
- **Optional enrichment** when API keys are configured: Unsplash, Pexels, TMDB, OpenTripMap

### Engineering and deployment

- Next.js 16 App Router with TypeScript
- Passing `npm run lint` and `npm run build`
- Production deployment on Vercel at **https://lostandfound-travel.vercel.app**
- Profile-based routing: `/u/finn`, `/u/finn/lost`, `/u/finn/found`, `/u/finn/lost/[slug]`, `/u/finn/found/[slug]`

---

## Demo profile

**Finn Shepherd** (`@finnshepherd`) is the seeded demo profile on the live site. He is a fictional travel journal persona — Toronto-based, with five Found dossiers and five Lost dossiers — designed so visitors can experience the product as if they were browsing a real user's travel identity.

Finn's content is **curated demo data**, not crowdsourced or user-generated at scale. The goal is to show what a fully populated profile feels like, not to simulate a live social network.

| Route | What it shows |
|-------|----------------|
| `/` | Landing page |
| `/u/finn` | Finn's profile hub |
| `/u/finn/lost` | Lost collection — dream trips |
| `/u/finn/found` | Found collection — travel memories |
| `/u/finn/lost/[slug]` | Lost destination dossier |
| `/u/finn/found/[slug]` | Found destination dossier |

**Good dossiers to open first:**

- [Tokyo (Lost)](https://lostandfound-travel.vercel.app/u/finn/lost/tokyo) — planning, budget, packing, neon-night itinerary
- [Paris (Found)](https://lostandfound-travel.vercel.app/u/finn/found/paris) — journal, recap, hidden gems, memory-focused storytelling

---

## In progress / prototype

### Dossier builder (add flow)

Lost & Found includes an **experimental dossier builder** that explores how a user could create a new Lost or Found entry:

1. Choose Lost or Found
2. Enter a city and country
3. Fetch destination details via the enrichment API
4. Generate a draft travel dossier
5. View the new dossier in the browser

**Status:** Prototype only. Routes exist at `/u/finn/lost/add` and `/u/finn/found/add`, but this flow is **not linked from the homepage or collection UI** and should be treated as in-progress exploration — not a finished core public feature.

Draft content relies on public APIs and **local browser storage**. New entries are not tied to a user account and do not sync across devices.

### City enrichment API

`/api/enrich-city` supports the builder prototype by fetching destination imagery, summaries, book suggestions, and optional media/places when third-party keys are configured.

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19, Tailwind CSS 4 |
| Maps | Leaflet, OpenStreetMap |
| Demo content | `src/content/demo/` — Finn profile and dossier seed data |
| Client persistence | Browser localStorage for edits and custom entries |
| Public APIs | Wikipedia, Open Library, OpenStreetMap |
| Optional APIs | Unsplash, Pexels, TMDB, OpenTripMap |
| Hosting | Vercel |

---

## Local development

```bash
git clone https://github.com/kyleversa/lost-and-found-travel-platform-v2.git
cd lost-and-found-travel-platform-v2
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Before deploying:**

```bash
npm run lint
npm run build
```

---

## Environment variables

### Production (Vercel)

```bash
NEXT_PUBLIC_SITE_URL=https://lostandfound-travel.vercel.app
```

### Optional (local or Vercel)

Copy `.env.example` to `.env.local`:

```bash
TMDB_API_KEY=           # Film and TV watch list suggestions
OPENTRIPMAP_API_KEY=    # Points of interest (Wikipedia fallback without this)
UNSPLASH_ACCESS_KEY=    # Cover photos for city lookup
PEXELS_API_KEY=         # Cover photo fallback
MONGODB_URI=            # Reserved for future persistent storage
```

The public demo runs without optional keys.

---

## Deployment

| | |
|---|---|
| **URL** | https://lostandfound-travel.vercel.app |
| **Platform** | Vercel |
| **Framework** | Next.js (auto-detected) |
| **Build** | `npm run build` |
| **Branch** | `main` — auto-deploy on push |

---

## Current limitations

To set accurate expectations for reviewers:

| Limitation | Detail |
|------------|--------|
| **No user accounts** | Visitors explore Finn's demo profile; there is no sign-up or login |
| **No production database** | Edits and custom entries persist in **browser localStorage** only |
| **Seeded demo content** | Finn's 10 dossiers are curated demo data, not a live user base |
| **Builder not in main UI** | Add/dossier builder routes exist but are not promoted in navigation |
| **No social layer yet** | Sharing, comments, and follows are conceptual — noted as coming soon on the landing page |
| **Public API variance** | Open Library suggestions can occasionally include loosely related titles |
| **Optional keys** | Richer photos and media require API keys not needed for the public demo |

---

## Future roadmap

Only **planned** work appears here. Everything in **Completed in V2.0 Preview** above is already live.

**Planned next:**

- User accounts and authentication
- Persistent database storage for profiles and dossiers
- Promote and polish the dossier builder in the main UI
- Social features — sharing, comments, profile discovery
- Better Open Library filtering for more relevant book suggestions
- Custom OG / social preview image
- Exportable trip dossier PDF
- Custom domain
- Portfolio case study page for the project

**Explored later:**

- Drag-and-drop dossier sections
- Deeper itinerary builder tooling
- Curated public itinerary snippets (where licensing allows)

Development pause notes: [PROJECT_STATUS.md](./PROJECT_STATUS.md)

---

## Original project

Lost & Found V2 continues the concept from my original v1 project:

**https://github.com/kyleversa/lost-and-found-travel-platform**

V1 introduced the Lost / Found split. V2 rebuilds it as a profile-based, dossier-driven product prototype with a live public deployment.

---

Built by [Kyle Versa](https://github.com/kyleversa).
