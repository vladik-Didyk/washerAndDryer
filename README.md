# GTA Washer & Dryer Rentals — washerrent.com (branch `remix-ssr`)

Status: server-rendered rebuild of the live site, not deployed. `main` is still the live
static site (Vite + prerender, GitHub Pages) and is unchanged.

This branch renders every page on Cloudflare Workers with React Router v7 (framework mode,
the successor of Remix), in strict TypeScript, organised with Feature-Sliced Design. Same
URLs, text, design, photos, JSON-LD, titles and meta as the live site. New: the 3-step
rental request at `/start/` (works without JavaScript), forms sent from the server (the
Web3Forms key is no longer in the source), and the first-week offer decided per request.

## Run it

```bash
pnpm install
cp .dev.vars.example .dev.vars   # then fill in WEB3FORMS_KEY and SESSION_SECRET
pnpm dev                         # dev server with hot reload, http://localhost:8790
pnpm test                        # Vitest: postal codes, rental steps, form actions, catalog
pnpm typecheck                   # wrangler types + react-router typegen + tsc
pnpm build                       # client + Worker bundles into build/
pnpm preview                     # build, then serve the Worker locally on :8790
```

Ports 8765–8782 are used by other projects on this machine; this one uses 8790.

To try forms locally without sending email, add `FORMS_DRY_RUN=1` to `.dev.vars`: the
server logs the submission (key masked) instead of posting to Web3Forms.

To run the built Worker with other settings, e.g. drafts on:

```bash
pnpm build
pnpm exec wrangler dev -c build/server/wrangler.json --port 8790 \
  --var PREVIEW_DRAFTS:1 --var FORMS_DRY_RUN:1 --var SESSION_SECRET:dev
```

## Structure (src/)

Layers import only from layers below them (app → processes → pages → widgets → features →
entities → shared), never sideways within a layer, and only through a slice's `index.ts`.
Files ending in `.server.ts` are server-only: React Router refuses to put them in the browser
bundle (secrets, Web3Forms, guide and policy drafts).

- **app/** — the document (`root.tsx`: `<html>`, shared head tags, the site frame, 404/error
  page, analytics beacon), `routes.ts` (every URL), `entry.server.tsx`, `app.css`, `catalog.ts`
  (the list of pages this deployment has) and `resources/` (sitemap.xml, robots.txt,
  llms.txt, generated from the catalog). The root loader decides once per request whether the
  first-week offer still runs, which optional pages exist, and the footer year.
- **processes/rental-request/** — the 3-step request: `/start/` (machine type) →
  `/start/details/` (postal code, width, outlet, the way in) → `/start/contact/` (name, phone,
  optional email, preferred day, notes) → `/start/done/`. `model.ts` holds the checks;
  `loaders.server.ts` / `actions.server.ts` are the server side; answers live in a signed
  HttpOnly cookie session (`session.server.ts`, path `/start`) and are cleared on send.
- **pages/** — one slice per page: `ui/index.tsx` (the page), `loader.ts` (data + `<head>`),
  `action.ts` where a form posts (landlord quote, repair), `index.ts` (the route module).
- **widgets/** — page sections: header, footer, offer bar, hero, machine showcase (cards,
  Photos/Drawings switch, the flipping machine animation), trust strip, CTA band, prices,
  how it works, FAQ section, service area, start-rental band, mobile action bar, and more.
- **features/** — things a visitor does: postal-code check (FSA mapping + tests), landlord
  quote form, repair form, view switch, machine gallery.
- **entities/** — business data with small UI: machine (types, cards), area (cities,
  districts), offer (first-week-free logic), faq (questions, accordion, list), guide (drafts,
  server-only data).
- **shared/** — config (business facts, page titles, environment), ui (buttons, Photo with
  WebP/srcset, form fields, icons), seo (meta + JSON-LD builders), api (`web3forms.server.ts`),
  lib (dates, formatting, the per-request site context).

Content rules from the old site still hold: verified facts only, no owner name, weekly
prices $12.50 / $6.25 in CAD, "No HST charged".

## Environment variables

| Name | Kind | What it does |
|---|---|---|
| `WEB3FORMS_KEY` | secret, required | Web3Forms access key; forms are emailed through it |
| `SESSION_SECRET` | secret, required | signs the rental-request cookie (any long random string) |
| `FORMS_DRY_RUN` | optional, `1` | log submissions instead of sending (testing only) |
| `PREVIEW_DRAFTS` | optional, `1` | show the draft guides, `/privacy/` and `/terms/` (ribbon + noindex) |
| `STRIPE_PORTAL_URL` | optional | Stripe customer portal link; turns on `/account/` |
| `CF_ANALYTICS_TOKEN` | optional | Cloudflare Web Analytics token; adds the cookie-free beacon |
| `GOOGLE_SITE_VERIFICATION` | optional | Search Console code (content value only) |
| `BING_SITE_VERIFICATION` | optional | Bing Webmaster code (content value only) |

Locally these go in `.dev.vars` (gitignored). Without them, drafts, `/account/` and analytics
stay off.

## Deploy — steps for the owner

Nothing has been deployed. When you are ready:

1. `pnpm exec wrangler login` (opens the Cloudflare login in the browser).
2. Set the secrets (each command asks for the value):
   ```bash
   pnpm exec wrangler secret put WEB3FORMS_KEY
   pnpm exec wrangler secret put SESSION_SECRET
   ```
   Optional settings can be added the same way or in the dashboard (Workers → washerrent →
   Settings → Variables).
3. `pnpm run deploy` — builds and deploys the Worker `washerrent`; it answers on
   `washerrent.<your-subdomain>.workers.dev`. Check the pages and send one real test request.
4. Custom domain, once the `washerrent.com` DNS zone is on Cloudflare: Workers → washerrent →
   Settings → Domains & Routes → Add custom domain → `washerrent.com` (and `www` if wanted).
   Then retire the GitHub Pages deployment (`.github/workflows/deploy.yml` on `main`; it still
   builds the old static site and is untouched on this branch).

Do not merge this branch into `main` while GitHub Pages is the live host: `deploy.yml` would
try to publish `dist/`, which this toolchain no longer produces.
