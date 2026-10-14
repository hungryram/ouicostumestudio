# Oui Costume Studio

A responsive Next.js site for Oui Costume Studio, with Home, About, Work,
Contact, FAQ, and Privacy pages. Portfolio images are stored locally in
`public/images`.

The Work page links to the `/work/photoshoot` and `/work/costumes` galleries.
The original `/work/custom-adult-dancewear` and `/work/project-two-ky966-af7wn`
URLs permanently redirect to these new routes. All 44 gallery photos are stored in `public/images/photoshoot` and
`public/images/costumes`; gallery content is defined in `app/work/collections.ts`.
The retired `/cart` URL permanently redirects to the homepage.

## Search indexing

`/sitemap.xml` lists the public site pages. `/robots.txt` permits search
crawlers, including AI search crawlers, and points to the sitemap; the
contact API is excluded from crawling. Public pages declare their canonical
URLs, and the site publishes Organization structured data.
Gallery images support cursor-following 2.5x detail zoom. On touch devices, tap
to zoom, drag to inspect, and tap again to reset. Keyboard users can toggle
with Enter or Space, pan with arrow keys, and reset with Escape.

Bookings are currently closed. `/contact` has a basic form for general messages;
`/waitlist` has the project details form for joining the waitlist. The sitewide announcement, Contact
page and form, FAQ, and confirmation email disclose this status and the
March–June 2027 booking window without promising a slot. Update these when
bookings reopen.

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
After the inquiry is saved to Google Sheets, a separate branded confirmation is
sent to the submitter, with replies directed to the studio inbox(es). Both
emails include a "Powered by hungryram.com" link. The confirmation acknowledges
receipt only, not a booking or production availability. If confirmation sending
fails, the server logs the failure and the form explains that the inquiry was
received and does not need to be submitted again.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — the Cloudflare Turnstile site key.
- `TURNSTILE_SECRET_KEY` — the Cloudflare Turnstile secret key.

Every submission is verified with Cloudflare Turnstile on the server before any
email is sent. For local development, Cloudflare's always-pass test keys
(`1x00000000000000000000AA` / `1x0000000000000000000000000000000AA`) can be used.
Add `localhost` and the production domain to the widget's hostnames in Cloudflare.

Keep `.env.local` private; it is excluded from version control. The contact
form returns a visible error until all of these settings are configured.

## Waitlist and Google Sheets

Both forms use the same Postmark, Turnstile, and service-account settings.
General messages are saved to a separate `Contact` tab in the same spreadsheet.
Submissions are saved first, then a studio notification and a separate confirmation are sent. The waitlist
confirmation acknowledges a waitlist entry, not a guaranteed booking.

1. In Google Cloud, enable the Google Sheets API and create a service account.
2. Create a JSON key for the service account. Keep the key private and outside
   the repository; do not paste it into client code.
3. Create a private spreadsheet with a tab named `Waitlist`. Set row 1 headers
   to: `Submitted at (UTC)`, `Name`, `Email`, `Project type`, `Format`,
   `Price range`, `Project details`, in columns A through G.
   Add a `Contact` tab with row 1 headers: `Submitted at (UTC)`, `Name`,
   `Email`, `Message`, in columns A through D.
4. Share the spreadsheet with the service account's `client_email` as an Editor.
   Do not make the spreadsheet public.
5. Set these server-only environment variables locally and in hosting:
   - `SHEETS_CLIENT_EMAIL`: the JSON key's `client_email`.
   - `SHEETS_PRIVATE_KEY`: the JSON key's `private_key`;
     literal `\n` line separators are supported.
   - `GOOGLE_WAITLIST_SPREADSHEET_ID`: the ID between `/d/` and `/edit` in the
     spreadsheet URL.
   - `GOOGLE_WAITLIST_RANGE`: `'Waitlist'!A:G` (include the tab name).
   - `GOOGLE_CONTACT_RANGE`: `'Contact'!A:D` (defaults to this if omitted).
     Both tabs use `GOOGLE_WAITLIST_SPREADSHEET_ID`.
6. Restart locally or redeploy after setting the variables.

Both forms fail visibly if Sheets is unconfigured or saving cannot be
confirmed; no emails are sent in that case. If the submission is
saved but an email fails, the form reports which email failed and advises
against submitting again. Failed requests are logged without service-account
credentials. Appends use RAW values so user text is not evaluated as formulas,
and automatic append retries are disabled to avoid duplicate rows.

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
node --test tests/forms.test.mjs
```
