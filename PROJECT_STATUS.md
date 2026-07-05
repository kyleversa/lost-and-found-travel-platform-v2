# Lost & Found V2 — Project Status

**Last updated:** July 5, 2026  
**Status:** Paused — V2.0 preview deployed and launch-ready

---

## 1. Current deployed status

Lost & Found V2 is live on Vercel and treated as the **V2.0 preview baseline**.

| Check | Status |
|-------|--------|
| Vercel deployment | Working |
| `npm run lint` | Passes |
| `npm run build` | Passes |
| Core smoke test | Passes (see below) |

**Live URL:** https://lost-and-found-travel-platform-v2.vercel.app/

**GitHub repo:** https://github.com/kyleversa/lost-and-found-travel-platform-v2

### Smoke test path

These routes were verified as part of launch readiness:

- `/`
- `/u/finn`
- `/u/finn/lost`
- `/u/finn/found`
- `/u/finn/lost/tokyo`
- `/u/finn/found/paris`

Also confirmed: homepage CTA, Lost/Found cards, dossier maps, and mobile layout.

---

## 2. Product framing

**Lost & Found** is a social travel journal concept with two connected collections:

- **Found** — places a user has been (memories, journal entries, recaps)
- **Lost** — places a user wants to go (dream trips, itineraries, inspiration)

The live V2 preview uses **Finn Shepherd** (`@finnshepherd`) as the seeded demo profile. The app should read like exploring Finn’s real travel profile, not a placeholder template.

**Demo profile language** should stay subtle and limited (badge on profile header and collection footer only).

**Avoid in visible UI:** sample, placeholder, fake, test, lorem, or unfinished language.

---

## 3. Current route structure

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/u/finn` | Finn’s profile hub |
| `/u/finn/lost` | Finn’s Lost collection |
| `/u/finn/found` | Finn’s Found collection |
| `/u/finn/lost/[slug]` | Lost destination dossier |
| `/u/finn/found/[slug]` | Found destination dossier |

**Legacy redirects** (e.g. `/lost`, `/found`, `/lost/tokyo`) redirect to the `/u/finn/...` equivalents and should keep working.

---

## 4. What is intentionally deferred

Do **not** implement these unless explicitly requested:

- New features or broad design changes
- Route or data-structure refactors
- Changes to Finn demo framing
- Real user accounts / auth
- Persistent database storage (edits currently use browser localStorage)
- Improved add/edit destination flows
- Optional API integrations (TMDB, OpenTripMap, Unsplash, Pexels)
- Custom domain
- Portfolio case study page

### Post-preview polish ideas (V2.1+)

- README roadmap improvements
- Custom OG / social preview image
- Better Open Library filtering for more relevant book suggestions
- Optional API keys for richer city data
- `NEXT_PUBLIC_SITE_URL` set to the canonical production URL (optional for first preview; recommended once the final URL is known)

---

## 5. Development boundary (while paused)

**Active development is paused.** Treat the deployed V2.0 preview as the baseline.

Unless explicitly asked, do not change:

- Product behavior
- Design direction
- Routing
- Copy
- Features
- Finn demo framing

Documentation-only updates (like this file) are fine for handoff and status tracking.

---

## 6. Safe next steps when resuming

1. **Confirm baseline** — Open the live URL and re-run the smoke test path above.
2. **Local sanity check** — From the repo root:
   ```bash
   npm ci
   npm run lint
   npm run build
   npm run dev
   ```
3. **Pick one scope** — Choose a single deferred item from section 4 (e.g. OG image, Open Library filtering, or README roadmap) rather than bundling multiple changes.
4. **Optional env setup** — If adding richer external data, copy `.env.example` to `.env.local` and add keys in Vercel as needed.
5. **Deploy** — Push to `main`; Vercel redeploys automatically. Re-test the smoke path after any change.

---

## Quick reference

- **Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Leaflet
- **Demo data:** `src/content/demo/finn/`
- **Profile routes:** `src/app/u/[username]/`
- **Env example:** `.env.example`
