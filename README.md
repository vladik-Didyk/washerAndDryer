# GTA Washer & Dryer Rentals — washerrent.com (branch `remix-ssr`)

Status: server-rendered rebuild of the live site, not deployed. `main` is still the live
static site (Vite + prerender, GitHub Pages) and is unchanged.

This branch renders every page on Cloudflare Workers with React Router v7 (framework mode,
the successor of Remix), in strict TypeScript, organised with Feature-Sliced Design. Same
URLs, text, design, photos, JSON-LD, titles and meta as the live site. New: the 3-step
rental request at `/start/` (works without JavaScript), forms sent from the server (the
Web3Forms key is no longer in the source), all text in one dictionary per language, and
prices and promotions decided per request from one config file.

## Run it

```bash
pnpm install
cp .dev.vars.example .dev.vars   # then fill in WEB3FORMS_KEY and SESSION_SECRET
pnpm dev                         # dev server with hot reload, http://localhost:8790
pnpm test                        # Vitest: postal codes, rental steps, forms, catalog, prices, dictionaries
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
  page, analytics beacon), `routes.ts` (every URL), `entry.server.tsx`, `entry.client.tsx`
  (loads the page's dictionary, then hydrates), `app.css`, `catalog.ts` (the list of pages
  this deployment has) and `resources/` (sitemap.xml, robots.txt, llms.txt, generated from the
  catalog). The root loader decides once per request the language, the prices and running
  promotions (the "facts" of the text), which optional pages exist, and the footer year.
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
  districts), offer (prices after promotions, the running promotions, the facts every text
  needs, the per-request text), faq (questions, accordion, list), guide (drafts, server-only).
- **shared/** — i18n (every word of the site, see below), config (business facts, prices and
  promotions, page paths, environment), ui (buttons, Photo with WebP/srcset, form fields,
  icons, the struck-through old price), seo (meta + JSON-LD builders), api
  (`web3forms.server.ts`), lib (dates, the per-request site context).

Content rules from the old site still hold: verified facts only, no owner name, prices in
CAD, "No HST charged".

## Text: one dictionary per language

Every word the site shows lives in `src/shared/i18n/locales/`: page copy, buttons, form labels
and error messages, alt text, aria-labels, `<title>` and meta descriptions, JSON-LD text, FAQ,
machine and area copy. Components contain no English; a test fails if one does
(`src/shared/i18n/i18n.test.ts` scans every `.tsx` for JSX text and text props such as
`aria-label="..."`, `alt`, `title`, `placeholder`).

- `locales/en.ts` — the full English dictionary, by namespace (`common`, `nav`, `home`,
  `machines`, `areas`, `faq`, `landlords`, `start`, `forms`, `pages`, `jsonLd`, ...). Its
  shape is the type of every other language (`Dictionary`).
- `locales/en.server.ts` — the server-only English text: the guides, the privacy policy and
  rental terms, llms.txt. It never ships to the browser, so a draft stays private.
- `locales/es.ts`, `locales/ru.ts` — only what is translated (the `/es/` and `/ru/` pages, the
  skip link, the phone bar). Anything missing falls back to English.
- `index.ts` — the language registry (`LANGUAGES`), the loader (each language is its own
  chunk, loaded with `import()` and cached), the formatters and the React API:

  ```tsx
  const { d, format, rich, money, date } = useI18n();
  <h2>{d.home.prices.title}</h2>                                 // typed: a typo is a type error
  {format(d.areas.page.title, { place: city.name })}             // "Washer & dryer rental in {place}"
  {rich(d.forms.sendError, { phoneLink: <a href={tel}>{phone}</a> })}
  ```

  `t("home.prices.title")` does the same with a typed dotted key. Loaders get the same object
  with `await requestI18n(args)` (entities/offer).

Text is plain data. `{names}` are filled in: the business facts (`{phone}`, `{company}`,
`{setPrice}`, `{singlePrice}`, `{deposit}`, `{referralAmount}`, `{minWeeks}`, `{noticeDays}`,
`{opens}`, `{firstWeekFreeEnd}`, ...) for every string of the request, written out for its
language (`$12.50`, `November 30, 2026`, `9 am`); other names where the string is used. No
price, amount or date is ever typed into the text.

The server picks the language from the URL (`/es/...`, `/ru/...`, everything else English),
the root loader loads it, and `src/app/entry.client.tsx` loads the same dictionary (from
`<html lang>`) before hydrating, so the HTML doesn't carry the dictionary.

### Add a language

1. Write `src/shared/i18n/locales/xx.ts`:
   ```ts
   import type { DeepPartial, Dictionary } from "../index";
   const xx: DeepPartial<Dictionary> = { chrome: { skipLink: "..." }, language: { h1: "..." } };
   export default xx;
   ```
   Translate as much or as little as you like; the rest shows in English. Keep the same
   `{placeholders}` as English (the test checks), and set `formats` if dates or times are
   written differently.
2. Add one entry to `LANGUAGES` in `src/shared/i18n/index.ts` (code, name, locales, path,
   `load: () => import("./locales/xx")`).
3. If it gets its own page, add a route in `src/app/routes.ts` (as `es` and `ru` use
   `pages/language`). The sitemap, llms.txt, hreflang links and the language links in the
   header and footer follow the registry.

To change wording, edit the dictionary only. The tests check that every translation has only
keys English has, with the same placeholders.

## Prices and promotions

Prices, the deposit, the referral offer, the minimum term and the promotions are in
`src/shared/config/pricing.ts`. Every price on the site (price cards, titles, meta
descriptions, JSON-LD offers, llms.txt, the Spanish and Russian pages) is computed from there
per request, so a change shows on the next request, and a promotion appears and disappears on
its own at its dates (decided on the server, so the HTML and the hydrated page agree).

- **Raise or lower a price**: change `pricing.weekly.set` or `.single` (e.g. `13.75`).
- **Add a promotion**: add its wording under `offers.promotions.<id>` in
  `locales/en.ts` (`short`, `title`, `text`, `stillPaid`, `note`), then add it to
  `promotions`:

  ```ts
  {
    id: "january-sets",          // the key of its wording, and its anchor on /faq/ and /terms/
    kind: "percentOff",          // percentOff | amountOff | fixedPrice | freeWeeks
    value: 10,                   // 10 %
    appliesTo: ["set"],          // "set" and/or "single"
    startsAt: "2027-01-01T05:00:00Z", // midnight Jan 1 in Toronto
    endsAt: "2027-02-01T05:00:00Z",   // the first moment it no longer runs
    newCustomersOnly: true,
  },
  ```

  Its own values are facts too: `{januarySetsPercent}`, `{januarySetsStart}`,
  `{januarySetsEnd}` (its last day), `{januarySetsEndShort}`. While it runs it shows in the
  offer bar, the price section, the terms, llms.txt and the guides' offer lines; a price it
  lowers shows the list price struck through ("was $12.50"). The first-week-free offer is one
  entry of this list (it ends at the end of November 30, 2026, Toronto time).

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
