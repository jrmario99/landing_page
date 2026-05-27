# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**MB Sistemas (Mario Braz)** — portfolio system with a public Vue SPA page and a private admin area for managing contact messages.

**Stack:** Laravel 13 (API) + Vue 3 + PrimeVue (admin) + PostgreSQL

## Architecture

```
/var/www/portfolio/                     ← Laravel 13 root
├── app/Http/Controllers/Api/           ← API controllers
│   ├── ContactController.php
│   ├── TrackerController.php
│   └── Admin/ (AuthController, MessageController)
├── app/Models/                         ← ContactMessage, PageVisit, User
├── database/migrations/
├── routes/
│   ├── api.php                         ← all API routes
│   └── web.php                         ← catch-all → public/index.html
├── frontend/                           ← Vue 3 + Vite project
│   ├── src/
│   │   ├── pages/public/Home.vue       ← public portfolio page
│   │   ├── pages/admin/               ← Login, Messages, MessageDetail
│   │   ├── layouts/                   ← PublicLayout, AdminLayout (PrimeVue)
│   │   ├── stores/auth.js             ← Pinia + Sanctum SPA auth
│   │   └── router/index.js
│   └── public/
│       ├── img/                        ← system/template screenshots
│       ├── logos/
│       └── templates/                  ← 20 HTML template folders (static)
└── public/                             ← Vite build output (web root)
    ├── index.html
    ├── assets/
    ├── img/
    ├── logos/
    └── templates/
```

## Database (PostgreSQL)

- **Host:** 127.0.0.1:5432
- **Database:** portfolio
- **User:** portfolio_user (password in .env)
- **Tables:** users, contact_messages, page_visits, personal_access_tokens, cache, jobs

## API Routes

### Public
- `POST /api/contact` — save contact message + send email (honeypot: `website` field)
- `POST /api/track` — page visit/click tracking (rate-limit: 5 emails/h per IP)

### Admin (Sanctum SPA auth required)
- `POST /api/admin/login` / `POST /api/admin/logout` / `GET /api/admin/me`
- `GET /api/admin/messages` — paginated, `?filter=unread`
- `GET /api/admin/messages/unread-count`
- `GET /api/admin/messages/{id}` — marks as read
- `DELETE /api/admin/messages/{id}` — delete single
- `DELETE /api/admin/messages` — bulk delete (body: `{ids:[]}`)

## Frontend Development

```bash
cd frontend
npm run dev     # dev server (proxies /api to localhost:8000)
npm run build   # builds to ../public/
```

Vue Router paths:
- `/` → Home.vue (public portfolio)
- `/admin/login` → Login.vue
- `/admin/messages` → Messages.vue (DataTable PrimeVue)
- `/admin/messages/:id` → MessageDetail.vue

## SMTP / Email

- Host: `smtp.hostinger.com:465` (SSL)
- User: `contato@quantosubiu.com.br`
- Password: in `.env` → `MAIL_PASSWORD`
- `CONTACT_MAIL_TO=mario.braz.dev@gmail.com`
- `TRACKER_MAIL_TO=contato@quantosubiu.com.br`

## Templates

All 20 templates are in `public/templates/<folder>/` (static HTML, no Laravel processing).
Preview URL: `/templates/<folder>/index.html`
Screenshots: `/img/<name>.png`

Templates: `apex`, `appflow`, `chronicle`, `curso-online`, `ebook-bestseller`, `estatelux`, `fintax`, `lexcorp`, `lumina`, `nebula-nft`, `neonmind-ai`, `nexus-admin`, `novus`, `personal-landing-page`, `prevlaw`, `saas-bento`, `shopflow`, `swiss-design`, `vivabem-clinic`, `waitlist-viral`

## Admin User

Seeded via `AdminUserSeeder`. Credentials from `.env`:
- `ADMIN_EMAIL=mario.braz.dev@gmail.com`
- `ADMIN_PASSWORD=<value>`

To re-seed: `php artisan db:seed --class=AdminUserSeeder`

## Key Behaviours

- Web catch-all route returns `public/index.html` (Vue SPA)
- Static files in `public/` (templates, img, logos) are served directly by Apache/Nginx
- Rate limiting on `/api/track`: file-based cache, 5 emails/hour per IP
- WhatsApp float button: `https://wa.me/5541987797650`
