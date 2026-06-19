# SaaS Tool Launch Playbook

The repeatable process used to build, deploy, and monetize ConvertPDF. Follow this
end-to-end for any similar "free tool + AdSense + Pro plan" service (PDF tools,
image tools, converters, calculators, etc.).

Stack: **Next.js (App Router) + TypeScript + Tailwind**, deployed on a **Hostinger
VPS (RHEL/AlmaLinux, nginx + PM2)**, monetized via **Google AdSense** (primary) and
**Paddle** (Pro subscriptions).

---

## Phase 1 — Build

1. Scaffold Next.js + TS + Tailwind. Create the GitHub repo **before** writing code.
2. Build each tool as: a **client page** (`app/(tools)/<slug>/page.tsx`) with upload UI +
   idle/processing/done/error states, and an **API route** (`app/api/process/<slug>/route.ts`).
3. Add SEO content + an FAQ (`<details>`) block to every tool page — this is what ranks.
4. Static pages required for AdSense: **Privacy, Terms, About** (+ Pricing).
5. Commit **one file per commit** (project rule).

### Library / tooling gotchas (cost hours — don't repeat)
- **`archiver` must be v7**, not v8. v8 is ESM-only (`"type": "module"`) and breaks CJS
  `require()` inside Next routes (`X is not a function`). Pin `archiver@^7.0.1`.
- When requiring a CJS lib in a route that webpack may wrap, unwrap the interop:
  `const fn = (require("x").default ?? require("x"))`.
- Mark heavy/native libs **external** in `next.config.ts`:
  `serverExternalPackages: ["archiver", "pdf-lib"]`.
- **PDF→Word**: LibreOffice **cannot** export DOCX from a PDF (imports as Draw → "no export
  filter"). Use Python **`pdf2docx`** instead. It installs under a specific Python (e.g.
  `python3.11`), so call that interpreter explicitly, not bare `python3`.
- **LibreOffice headless** needs an isolated profile per request or it hangs/locks:
  `libreoffice -env:UserInstallation=file:///tmp/<uuid> --headless --convert-to ...`.
- **Ghostscript** for compress / pdf→jpg / password-protect. Confirm `gs` is installed.
- Buffer → `NextResponse`: wrap as `new Uint8Array(buf)` to satisfy the `BodyInit` type.
- When a route fails in prod with a generic message, temporarily return the real error
  (`catch (e) { return ...e.message }`), diagnose, then restore the safe message.

### Server dependencies to install (RHEL: `dnf`, not `apt`)
```
dnf install -y libreoffice-core libreoffice-writer libreoffice-calc libreoffice-impress
dnf install -y ghostscript python3-pip
pip3 install pdf2docx
```

---

## Phase 2 — Deploy (Hostinger VPS)

- DNS: add an **A record** for the subdomain → VPS IP (Hostinger DNS zone).
- Clone repo on VPS, `npm install`, `npm run build`, run under PM2:
  `pm2 start npm --name <app> -- start` (Next default port **3000**).
- nginx reverse proxy (`/etc/nginx/conf.d/<app>.conf`) → `proxy_pass http://localhost:3000`.
- SSL: `certbot --nginx -d <subdomain>` → choose redirect HTTP→HTTPS.
- Redeploy loop: `git pull && npm run build && pm2 restart <app> --update-env`.
- ⚠️ `NEXT_PUBLIC_*` env vars are **baked in at build time** — set `.env` *before* `npm run
  build`, and **rebuild** (not just restart) whenever they change.

---

## Phase 3 — SEO foundation (no external accounts needed)

- `app/sitemap.ts` (dynamic) and `app/robots.ts` (allow `/`, disallow `/api/`, reference sitemap).
- `lib/seo.ts` helper → canonical + Open Graph + Twitter per page.
- Root layout: `metadataBase`, title template, default OG, **JSON-LD** (WebSite + Organization).
- Per-tool metadata: since tool pages are client components, add a tiny `layout.tsx` per
  tool route exporting `metadata` via the helper.

## Phase 4 — Google Search Console

- Add **Domain property** → verify via **DNS TXT** record (`google-site-verification=...`)
  on the subdomain host in Hostinger DNS.
- Submit sitemap using the **full URL** (`https://<domain>/sitemap.xml`) — the short
  `sitemap.xml` form is often rejected for domain properties. "Couldn't fetch" right after
  submit is normal lag; robots.txt also advertises it.

## Phase 5 — Google Analytics (instant)

- `components/Analytics.tsx` — GA4 via `next/script`, renders nothing unless
  `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set. Verify with the `collect?...&tid=G-...` 204 hit
  in the Network tab + Realtime report.

## Phase 6 — Google AdSense (slow approval — start early)

- Components: `AdSenseScript.tsx` (library loader), `AdUnit.tsx` (unit with placeholder
  fallback), `app/ads.txt/route.ts` (generated from publisher ID).
- **Account type matters**: an "AdSense for YouTube" account **cannot** monetize websites.
  Sign up for **standard AdSense** at `adsense.google.com/start`. Payment country **cannot be
  changed later** — pick where you can legally bank.
- AdSense signup only accepts a **top-level domain** (not a subdomain). It treats subdomains
  as part of the apex — you cannot add the subdomain separately.
- **Therefore the apex must serve real content + the AdSense tag.** If the apex is empty,
  mirror the app at the apex: point apex A record → VPS, add an nginx vhost
  (`server_name apex.tld www.apex.tld; proxy_pass localhost:3000;`), `certbot` it. Canonical
  tags keep SEO consolidated on the subdomain.
- **Verification**: the JS-injected AdSense script is NOT in raw HTML, so the snippet/ads.txt
  instant checks often fail. The reliable method is the **Meta tag** — render it server-side:
  `metadata.other = { "google-adsense-account": "ca-pub-..." }`. Then use AdSense's "Meta tag"
  verify → passes.
- After verify: complete the **CMP consent message** (choose Google CMP, **3-choice** for GDPR),
  then **Request review**. Approval: days–2 weeks. Don't buy paid traffic during review.

## Phase 7 — Paddle (Pro subscriptions)

- Pricing page + `components/PricingPlans.tsx` loading paddle.js v2; `lib/paddle.ts` resolves
  price IDs from `NEXT_PUBLIC_PADDLE_*` env.
- Products/prices created in Paddle → use **price IDs** (`pri_...`) + **client-side token**
  (`live_...`, public). The **API key** (`pdl_live_apikey_...`) is server-secret — never in
  `NEXT_PUBLIC` or client code.
- `transaction_checkout_not_enabled` (400) = the Paddle account isn't verified for live
  selling yet. Finish account verification, or use **sandbox** to test the flow.

---

## Phase 8 — Launch & promote

- Free/organic only until AdSense is approved (paid traffic during review risks rejection).
- Reddit/Quora (answer real questions), AlternativeTo listing, Product Hunt launch day.
- SEO is the long-term engine; social gives spikes.

## Monetization model

| Plan | Price | Notes |
|------|-------|-------|
| Free | $0 | size/batch limits, ads shown |
| Pro  | $7.99/mo · $59.99/yr | no ads, larger files |
| (Business optional) | $19.99/mo · $149.99/yr | API, priority |

Primary revenue = **AdSense on free traffic**. Pro is secondary. Google Search Ads only
for annual-Pro conversions (high LTV), never AdSense arbitrage.
