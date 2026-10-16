# Customer dashboard: plan

Status: proposal, 2026-10-15. Nothing here is built yet.

## Goal

A customer signs in and, in one place: sees their machines, reports a problem with photos,
follows the repair, writes to us, and manages payment. The business answers from one inbox
instead of scattered texts.

Today there is one customer. Texts, the /repair/ form and the Stripe portal already cover
these needs; the dashboard is for when that stops scaling (about 25 rentals, or the first
landlord with several units).

## What the customer gets

1. **Sign in without a password.** Email address → a one-time sign-in link (or a 6-digit
   code by text, see decisions). Stays signed in on that phone for 30 days.
2. **My rentals.** Each machine: type, address, start date, weekly price, next charge date
   and amount (read from Stripe).
3. **Report a problem.** Pick the machine, describe it, add up to 5 photos or a short video
   from the phone camera. Status: Received → Visit booked (date) → Fixed / Replaced.
4. **Messages.** A thread per request (and a general one) with the business. Photos allowed.
5. **Billing.** One button into the Stripe portal, already signed in (no second email):
   card, invoices, payment history. Ending a rental stays a text or call (pick-up).
6. All of it in English, Spanish, Russian and French, like the site.

## What the business gets (admin pages)

- Customers and their rentals; add a rental when a payment link is paid (Stripe tells us).
- Inbox of open requests and messages, newest first; reply, attach photos, set status and
  visit date.
- A text or email to the business for every new request or message; a text or email to the
  customer when the business replies or the status changes.

## How it is built (same stack as the site)

| Part | Choice | Why |
|---|---|---|
| Pages | React Router on the existing Cloudflare Worker | No new hosting |
| Data | Cloudflare D1 (SQLite): customers, rentals, requests, messages | Free at this size |
| Photos | Cloudflare R2, private, served only to the signed-in owner of the request | Free tier, no public URLs |
| Sign-in | Email links through Resend (or SMS codes through Twilio) | Web3Forms only emails the business, not customers |
| Sessions | Signed cookie, the existing `SESSION_SECRET` | Already in place |
| Payments | Stripe API + a webhook: a paid payment link creates the customer and rental | Matches the new weekly links |

Security: rate-limited sign-in, links expire in 15 minutes and work once, photos checked for
type and size, every page checks that the request belongs to the signed-in customer, admin
pages for the business account only. Privacy page updated (what is stored, for how long,
deletion on request).

## Phases

| Phase | Delivers | Size |
|---|---|---|
| 1 | Sign-in, My rentals, Billing button, admin customer list, Stripe webhook | ~1 week |
| 2 | Report a problem with photos, status, admin inbox, notifications | ~1 week |
| 3 | Message threads both ways, photos in messages | ~1 week |
| 4 (later) | Landlord view: many units, one bill | when a landlord asks |

Each phase is usable on its own and ships behind a preview link first.

## Running costs (at today's size)

Cloudflare D1 and R2: $0 (free tiers). Resend email: $0 up to 3,000 emails a month. SMS
through Twilio, if chosen: about 1 cent per text plus a Canadian number (about $1.50 a month).
Stripe fees unchanged.

## What the owner provides

- A Stripe **restricted** API key, set by the owner with `pnpm exec wrangler secret put
  STRIPE_SECRET_KEY` (Claude does not handle it).
- Approval for one DNS change: the email-sending records for washerrent.com (Resend).
- Which channel for notifications: email, text, or both.

## Decisions needed before Phase 1

1. Sign-in by email link, or by text code?
2. Notifications to the business: email, text, or both?
3. Start Phase 1 now, or when the customer count grows?
