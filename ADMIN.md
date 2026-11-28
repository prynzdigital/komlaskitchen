# Komla's Kitchen — Admin (CMS + CRM)

The admin lives at **/admin**. It manages the whole public website and keeps a simple CRM of orders, customers and messages.

## One-time setup on Vercel

1. **Database** — Project → Storage → Create → **Neon (Postgres)** → connect to this project. (Free tier.)
2. **Image uploads** — Storage → Create → **Blob** → connect. (Free tier.)
3. **Setup code** — Settings → Environment Variables → add `ADMIN_SETUP_CODE` with a secret word.
4. **Redeploy**, open `/admin`, and create the owner account using the setup code.
5. In **Admin → Settings**, enter the email address(es) that should receive order alerts.

Until the database is connected, the website keeps working with its built-in content and `/admin` shows these steps.

## Who can do what

| Role | Access |
| --- | --- |
| Owner | Everything, including Team & Logins and alert emails |
| Manager | Website content (menu, homepage, schedule, about, blog, reviews, settings) + CRM |
| Staff | Dashboard, orders, customers, messages, and marking dishes sold out |

## What's where

- **Orders** — every website order is saved here (status, Zelle payment check, notes, history).
- **Customers** — built automatically from orders; add phone-order customers by hand; tags + private notes; CSV export.
- **Messages** — contact-form submissions with reply-by-email.
- **Menu** — dishes, prices, sizes, protein options, photos, sold-out switch, categories, ordering.
- **Homepage / Weekly Schedule / About Page / Blog / Reviews** — all public text and photos.
- **Settings** — phones, address, hours, social links, announcement bar, Zelle QR, pause online ordering.

Saving publishes immediately — the site rebuilds the affected pages on the next visit.

## Development

`npm run dev` works without a database: CMS data is stored in `.cms-data/store.json` and uploads in `public/uploads/` (both git-ignored). See `.env.example` for all settings.

Code map: `lib/store.js` (storage), `lib/siteData.js` (public reads), `lib/adminData.js` (strict admin reads), `lib/auth.js` (logins/roles), `lib/crm.js`, `app/admin/_actions/*` (server actions), `app/admin/(panel)/*` (pages), `components/admin/*` (UI).
