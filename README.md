# GTA Washer & Dryer Rentals — washerrent.com (branch `remix-ssr`)

Status: live at washerrent.com since 2026-10-15, served by the Cloudflare Worker
`washerrent` and deployed from this branch. `main` is an archive of the old static site
(Vite + prerender); GitHub Pages is off.

This branch renders every page on Cloudflare Workers with React Router v7 (framework mode,
the successor of Remix), in strict TypeScript, organised with Feature-Sliced Design. Same
URLs, text, design, photos, JSON-LD, titles and meta as the live site. New: the 3-step
rental request at `/start/` (works without JavaScript), forms sent from the server (the
Web3Forms key is no longer in the source), all text in one dictionary per language, and
prices and promotions decided per request from one config file.

## Run it

```bash
pnpm install
cp .dev.vars.example .dev.vars   # then fill in SESSION_SECRET
pnpm dev                         # dev server with hot reload, http://localhost:8790
pnpm test                        # Vitest: postal codes, rental steps, forms, catalog, prices, dictionaries
pnpm typecheck                   # wrangler types + react-router typegen + tsc
pnpm build                       # client + Worker bundles into build/
pnpm preview                     # build, then serve the built Worker on :8791 (production check)
```

Ports 8765–8782 are used by other projects on this machine; this one uses 8790 (dev) and 8791
(preview). Use `pnpm dev` for everyday work: it renders from the source, so a build or deploy
never breaks it. `pnpm preview` serves `build/`, and any later build replaces those files under
it (pages then load without styles until it is restarted), so use it only for a final check.

To try forms locally without sending email, add `FORMS_DRY_RUN=1` to `.dev.vars`: the
server logs the email instead of sending it.

To run the built Worker with other settings, e.g. drafts on:

```bash
pnpm build
pnpm exec wrangler dev -c build/server/wrangler.json --port 8791 \
  --var PREVIEW_DRAFTS:1 --var FORMS_DRY_RUN:1 --var SESSION_SECRET:dev
```

## Structure (src/)

Layers import only from layers below them (app → processes → pages → widgets → features →
entities → shared), never sideways within a layer, and only through a slice's `index.ts`.
Files ending in `.server.ts` are server-only: React Router refuses to put them in the browser
bundle (secrets, form email, guide and policy drafts).

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
  `action.ts` where a form posts (landlord quote, repair; it builds the English email),
  `index.ts` (the route module). Every page exists in English, Spanish, Russian and French.
  `/buildings/` (shared laundry rooms in residential buildings) is quote-only: no price and
  no machine type on it, both decided per building. Its requests use the landlord quote form.
- **widgets/** — page sections: header, footer, offer bar, hero, machine showcase (cards,
  Photos/Drawings switch, the flipping machine animation), trust strip, CTA band, prices,
  how it works, FAQ section, service area, start-rental band, mobile action bar, and more.
- **features/** — things a visitor does: postal-code check (FSA mapping + tests), landlord
  quote form, repair form, view switch, machine gallery.
- **entities/** — business data with small UI: machine (types, cards), area (cities,
  districts), offer (prices after promotions, the running promotions, the facts every text
  needs, the per-request text), faq (questions, accordion, list), guide (drafts, server-only).
- **shared/** — i18n (every word of the site, and the language paths, see below), config
  (business facts, prices and promotions, page paths, English-only pages, environment),
  forms (every form field and form, see "Forms"), ui (the page blocks: Container, Section,
  Heading, SectionHeader, Card, Button, LangLink, PhoneButton, CallCard, lists; Photo with
  WebP/srcset, icons, the struck-through old price), seo (meta, hreflang + JSON-LD builders),
  api (`email.server.ts`: form emails), lib (dates, the per-request site context).

### Page blocks (shared/ui)

Pages stay readable JSX, built from a few blocks instead of repeated class strings:

- `<Section>` is a band of the page (the `.section` rhythm unless `padded={false}`);
  `<Container>` the horizontal frame. `<Heading>` takes its level from the depth: the page's
  hero is level 1 (`<Section nest={false}>`, its heading the h1), each `<Section>` inside the
  page one deeper (h2), `<Nest>` or a nested `<Section>` deeper again (h3). The look is
  `variant` (`page`, `section`, `card`, `cardSmall`, `item`, `question`, `label`), so a heading
  can move without changing its size. `<SectionHeader>` is eyebrow + heading + lead.
- `<Card tone padding>` is the `rounded-3xl` shell (white, paper, mint, highlight...).
- `<Button href variant>` is a link (kept in the page's language) or a `<button>`;
  `<PhoneButton kind="call|text">` and `<CallCard>` ("Prefer to call or text?") carry the
  phone number. `<LangLink>` is the plain link. The rental request is `pagePaths.start`.
- `<Carousel label auto>`: a row of slides that swipes, with arrows and dots; `auto` moves it on
  by itself (paused under the pointer, off with "reduce motion"). Without JavaScript it is a
  plain scrolling row. The home hero, the laundry-room carousels and the machine gallery use it.
- `widgets/cta-band`: the closing call to action, `variant="photo"` (the dark photo band) or
  `variant="panel"` (the mint panel with buttons or the postal-code checker).

Photos: `public/photos/types/` (machine types, Pexels), `rooms/` and `shared/` (laundry
spaces and shared laundry rooms, Unsplash); sources in `docs/photo-credits.md`. Add a JPEG,
run `pnpm photos` for its WebP and smaller versions, give it alt text (`photos.<name>` in the
dictionary for rooms/ and shared/), and commit the files. Every photo is an example and the
page says so.

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
- `locales/es.ts`, `locales/ru.ts`, `locales/fr.ts` — only what is translated (any key of `en.ts`; every page
  has a Spanish, a Russian and a French version). Anything missing falls back to English.
- `index.ts` — the language registry (`LANGUAGES`), the loader (each language is its own
  chunk, loaded with `import()` and cached), the formatters and the React API:

  ```tsx
  const { d, format, rich, money, date } = useI18n();
  <Heading>{d.home.prices.title}</Heading>                       // typed: a typo is a type error
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

## Languages: every page in English, Spanish, Russian and French

Every page exists in every language of the registry, at the same slug: English at the root,
the others under their code — `/machines/stackable/`, `/es/machines/stackable/`,
`/ru/machines/stackable/`; `/es/` is the Spanish home page. The rental request, the landlord
quote and the repair request work the same way under `/es/`, `/ru/` and `/fr/`. Exceptions: the
privacy policy and rental terms are English-only (`englishOnlyPaths` in
`shared/config/site.ts`; `/es/privacy/` is a 404, and links to them from a Spanish, Russian or French
page keep the English address with an "Available in English" note), and so are sitemap.xml,
robots.txt and llms.txt.

- **Routes**: `src/app/routes.ts` lists every page once (`PAGES`) and registers that list for
  each language of `LANGUAGES`: the path gets the code in front (`es/faq`) and the route id
  gets it behind (`faq.es`). The same module serves every language.
- **Language of a request**: from the URL (`langFromPath`, only codes of the registry count).
  The root loader loads that dictionary, sets `<html lang>`, and the whole page follows it,
  header, footer, offer bar and phone bar included. The browser loads the same dictionary
  before hydrating (`src/app/entry.client.tsx`), so the HTML doesn't carry it.
- **Links**: write the English path, always. `<LangLink href="/faq/">`, `<Button href>` and
  `i18n.href(path)` (loaders, actions, redirects) add the page's prefix (`localizePath`).
  Every path that comes out is same-origin (`sameOriginPath`: "//x" can never become another
  host). The header's EN · ES · RU · FR switcher links the same page in each language
  (`pathInLanguage`); there is no automatic redirect.
- **SEO**: loaders give `pageHead(i18n, { path })` the English path; it writes the canonical,
  `og:url`, `og:locale`, the breadcrumbs and the hreflang links (en, es, ru, x-default = the
  English page) for the page's language. JSON-LD urls follow it. `sitemap.xml` lists every
  page in each language with its `xhtml:link` alternates.
- **Forms**: error messages and option labels are in the page's language; option values,
  and the emails, stay English, with `language: Spanish` (or Russian, French, English) first.
- **French** is Canadian French (fr-CA). The business answers calls in English, Spanish and
  Russian only, so the French text never offers French service.
- **Text**: `locales/es.ts` and `ru.ts` translate any key of `en.ts`; what they leave out
  shows in English. The guides can be translated in `locales/es.server.ts` / `ru.server.ts`.

### Add a language

1. Write `src/shared/i18n/locales/xx.ts` (and an empty `xx.server.ts`, like `es.server.ts`):
   ```ts
   import type { DeepPartial, Dictionary } from "../index";
   const xx: DeepPartial<Dictionary> = { chrome: { skipLink: "..." }, home: { hero: { title: "..." } } };
   export default xx;
   ```
   Translate as much or as little as you like; the rest shows in English. Keep the same
   `{placeholders}` as English (the test checks), and set `formats` if dates or times are
   written differently.
2. Add one entry to `LANGUAGES` in `src/shared/i18n/index.ts` (code, name, English name,
   locales, path `/xx/`, `load: () => import("./locales/xx")`), and the server part to the
   `translations` record of `src/shared/i18n/index.server.ts`.
3. That's all: the routes (`/xx/...` for every page), the switcher, hreflang, the sitemap and
   the footer's language links follow the registry.

To change wording, edit the dictionary only. The tests check that every translation has only
keys English has, with the same placeholders.

## Forms

Every form field and every form is defined once, in `src/shared/forms/registry.ts`:

- `fields`: one entry per field — `name` (what is posted), `kind` (`text`, `tel`, `email`,
  `number`, `date`, `textarea`, `select`, `choice`), `label` / `hint` / `placeholder` and
  option labels as **dictionary keys** (never text), `options`, the checks (`required`,
  `pattern`, `integer`, `min`, `minLength`, `maxLength`, `notBefore`) with their `messages`
  (dictionary keys), and the HTML (`autoComplete`, `inputMode`, `rows`, `columns`,
  `className`...).
- `forms`: one entry per form — its id prefix and its fields in order, each a field key or
  `{ field, ...overrides }` where one form needs another label, message, hint or layout.

The same definition draws the controls (`<FormFields form="repair" values errors />`, or one
`<Field form="repair" name="phone" />`) and checks the post on the server
(`validateForm("repair", formData, i18n)` returns the values and a message per field). An
option posts the English text of its label (or its own `value`), whatever the page's language.

- **Add a field**: put its words in `locales/en.ts`, add an entry to `fields`, add its key to
  the forms that need it. The page and the server check pick it up; add it to the email in the
  form's action if the business needs it.
- **Add a form**: add an entry to `forms`; in the page, `<Form method="post">` with
  `<FormFields form="...">`, `<Honeypot />` and `<SubmitButton>`; in the action,
  `validateForm`, then `sendFormEmail(env, formEmail(i18n, { subject, ... }))` with the
  email built from `englishOf(i18n)`.

## Prices and promotions

Prices, the deposit, the referral offer, the minimum term and the promotions are in
`src/shared/config/pricing.ts`. Every price on the site (price cards, titles, meta
descriptions, JSON-LD offers, llms.txt, the translated pages) is computed from there
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
| `FORM_MAILER` | binding (wrangler.jsonc) | Cloudflare `send_email`: forms are emailed from forms@nearbygta.com to vladik.didyk@gmail.com (verified in Email Routing; free) |
| `SESSION_SECRET` | secret, required | signs the rental-request cookie (any long random string) |
| `FORMS_DRY_RUN` | optional, `1` | log submissions instead of sending (testing only) |
| `PREVIEW_DRAFTS` | optional, `1` | show the draft guides, `/privacy/` and `/terms/` (ribbon + noindex) |
| `CF_ANALYTICS_TOKEN` | optional | Cloudflare Web Analytics token; adds the cookie-free beacon |
| `GOOGLE_SITE_VERIFICATION` | optional | Search Console code (content value only) |
| `BING_SITE_VERIFICATION` | optional | Bing Webmaster code (content value only) |

Locally these go in `.dev.vars` (gitignored). Without them, drafts and analytics stay off.
The Stripe customer portal link is not a setting: it is `siteConfig.stripePortalUrl`
(src/shared/config/site.ts), because the pages are built ahead of time.

The published pages are built without any of these settings (next section), so
`PREVIEW_DRAFTS`, `CF_ANALYTICS_TOKEN` and the verification codes reach only the pages the
Worker renders (the rental request, the 404 page, drafts in `pnpm dev`). A value every page
needs, like the analytics token, belongs in `siteConfig` instead.

## Pages built ahead of time

The Workers free plan allows 10 ms of CPU per request, and rendering a page takes more: on
2026-10-16 about 1 in 4 page loads (the FAQ 8 in 8) ended in Cloudflare error 1102. So
`pnpm run build` renders every published page in every language into `build/client` (its
`index.html` and the `_.data` that client-side navigation fetches), plus sitemap.xml,
robots.txt and llms.txt. `workers/app.ts` serves those files from `ASSETS`; it renders only the
rental request (`/start/`, a session per visitor), form submissions and unknown URLs.

- The list is `src/app/prerender.json`. `src/app/prerender.test.ts` compares it with the site
  catalog and, when a page is added or removed, fails and prints the new list to paste in.
- The build has no Cloudflare environment: no drafts, no `.dev.vars`.
- **Dates are those of the build.** The offer bar, prices after promotions and the footer year
  are fixed when the pages are built: rebuild and release when an offer starts or ends (the
  first week free ends on November 30, 2026: release a new build on December 1).

## Deploy

washerrent.com is live. The Worker `washerrent` (Cloudflare account
`06277ccde592d58901541d66461eae53`) answers on `washerrent.com`; `www.washerrent.com`
redirects to it. Both are custom domains in `wrangler.jsonc`, and the DNS zone is on Cloudflare
(nameservers moved from Namecheap on 2026-10-15). The secret `SESSION_SECRET` is set on the Worker (`WEB3FORMS_KEY` was
deleted on 2026-10-16); optional settings go in the same way
(`pnpm exec wrangler secret put NAME`) or in the dashboard (Workers → washerrent → Settings →
Variables).

Ask the owner before anything goes live. Two ways to release:

- **Check first, then publish** (preferred). Upload a version without sending traffic to it:
  ```bash
  pnpm run build && pnpm exec wrangler versions upload
  ```
  It prints a version id and a preview URL
  (`https://<first 8 of id>-washerrent.vladik-didyk.workers.dev`). Once the owner has checked
  it, publish it:
  ```bash
  pnpm exec wrangler versions deploy <version-id>@100% -y
  ```
- **Straight to live**: `pnpm run deploy` (build + deploy).

After a release, check a few pages on washerrent.com in each language (for example `/`,
`/es/machines/stackable/`, `/ru/faq/`; `/es/privacy/` should be a 404). Live forms send real
email; test them with `FORMS_DRY_RUN` locally, or tell the owner before submitting one on the
live site. To roll back, `pnpm exec wrangler versions list`, then `versions deploy` the
previous id.

Releases: 2026-10-15, version `b338f0e8` (Spanish and Russian site, the EN · ES · RU switcher,
the forms registry), up to commit `8fba2f2`.
2026-10-15, version `aa0c470e`: the share image with the weekly price. 2026-10-15, version
`0d34ed11`: Canadian French (`/fr/`) and the laundry room page (`/buildings/`). 2026-10-15, version `4af5668a`:
the home page with about half the text: price card, icon steps, drawn service-area map. 2026-10-15,
version `075598c3`: the postal-code check from every Ontario FSA (`pnpm postal-fsas`). 2026-10-15, version
`d90383ed`: Unsplash laundry-room photos, the carousel, the three-slide hero and the photo cards. 2026-10-15,
version `6d7ba02a`: real photos for the one-piece laundry centre. 2026-10-15, version `e4c746ad`:
less text on machine, city, district and FAQ pages (folds, size diagram, map headers, FAQ tabs).
2026-10-15, version `92ea2f78`: the YouTube installation videos removed from the home page.
2026-10-15, version `963cd487`: weekly prices $13.99 (set) and $7.99 (one machine), new share image.
2026-10-15, version `3268bb19`: UX pass: fixed hero with two tiles (no hero carousel), carousels
that never move by themselves (arrows on photos, counter, peek), spinning-logo loader,
shrinking header and slide-in phone menu, router links with cross-fade, scroll-in sections,
error focus and next steps in the rental form.
2026-10-15, version `9bc352f6`: "Text us a photo" card on /repair/, example-photo notes and hero tag
hidden, /account/ on (Stripe portal link in the `STRIPE_PORTAL_URL` setting). Stripe: weekly links
$13.99 set and $7.99 one machine, each with the $200 deposit and a 7-day trial (remove the trial
after Nov 30). Dashboard plan: docs/customer-dashboard-plan.md (sign-in by email link; start at
about 25 customers).
2026-10-16, version `d788b744`: no "Example photo" labels anywhere; every section ends with an
action (shared `CtaRow`: Start your rental or Get a quote, plus Call); shorter, action-first copy in
all four languages. A blue/orange and a midnight/starlight theme were tried and dropped: the
green theme stays.
2026-10-16, version `04d9d0bc`: forms emailed through Cloudflare (`FORM_MAILER` binding) instead
of Web3Forms, whose free plan refused every server-sent request; a test repair request arrived.
2026-10-16, version `a39deb77`: pages built ahead of time and served as files (error 1102 on
about 1 in 4 page loads before; 0 in 72 after); Stripe portal link in `siteConfig`.

`main` keeps the old static site as an archive; GitHub Pages and its workflows are off. Ask
before merging this branch into `main`.
