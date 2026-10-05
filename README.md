# Oui Costume Studio

A responsive Next.js site for Oui Costume Studio, with Home, About, Work,
Contact, FAQ, and Privacy pages. Portfolio images are stored locally in
`public/images`.

The Work page links to the `/work/photoshoot` and `/work/costumes` galleries.
The original `/work/custom-adult-dancewear` and `/work/project-two-ky966-af7wn`
URLs permanently redirect to these new routes. All 44 gallery photos are stored in `public/images/photoshoot` and
`public/images/costumes`; gallery content is defined in `app/work/collections.ts`.
The retired `/cart` URL permanently redirects to the homepage.
Gallery images support cursor-following 2.5x detail zoom. On touch devices, tap
to zoom, drag to inspect, and tap again to reset. Keyboard users can toggle
with Enter or Space, pan with arrow keys, and reset with Escape.

Availability messaging welcomes inquiries for any preferred date without
promising an open production slot. The current schedule is explained on the
Contact page; update that note when the studio's booking window changes.

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form

The contact form sends inquiries through Postmark's transactional email API.
Copy `.env.example` to `.env.local` and set:

- `POSTMARK_SERVER_TOKEN` — the private server token from Postmark.
- `POSTMARK_FROM_EMAIL` — a sender address verified in Postmark.
- `CONTACT_TO_EMAIL` — the inbox(es) that should receive inquiries. Separate
  multiple addresses with commas.

Inquiries are sent from "Oui Costume Studio" using the `POSTMARK_FROM_EMAIL` address.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — the Cloudflare Turnstile site key.
- `TURNSTILE_SECRET_KEY` — the Cloudflare Turnstile secret key.

Every submission is verified with Cloudflare Turnstile on the server before any
email is sent. For local development, Cloudflare's always-pass test keys
(`1x00000000000000000000AA` / `1x0000000000000000000000000000000AA`) can be used.
Add `localhost` and the production domain to the widget's hostnames in Cloudflare.

Keep `.env.local` private; it is excluded from version control. The contact
form returns a visible error until all of these settings are configured.

The newsletter signup has been omitted. The privacy page should be reviewed
against the final hosting and Postmark account settings before launch.

## Checks

Below 761px, the header uses a full-screen mobile navigation dialog.
It supports Escape to close, contains keyboard focus while open, restores
focus to the trigger on close, and locks background scrolling.
The overlay unfurls with a curved fabric-like edge and temporary fold shading,
followed by staggered link entrances. Closing retracts the fabric. Reduced-motion
preferences remove the folds and link animation and shorten the overlay transition.

```bash
pnpm lint
pnpm build
```
