# ConvertPDF — Full Business Plan
**Site:** convertpdf.proailabs.com
**Updated:** June 2026

---

## 1. COMMERCIAL PLAN

### Business Model
| Revenue Stream | Details | Timeline |
|----------------|---------|----------|
| Google AdSense | Display ads on all free pages | Month 1 |
| Pro Plan (monthly) | No ads + larger files + batch | Month 3 |
| Pro Plan (annual) | Discounted yearly — enables Google Ads ROI | Month 3 |
| Google Search Ads | Paid traffic → annual Pro conversions only | Month 3 |
| Affiliate links | Smallpdf, Adobe referrals | Month 2 |
| Sponsored tools | "Powered by X" placements | Month 6+ |

### Pricing
| Plan | Monthly | Annual | Limits |
|------|---------|--------|--------|
| Free | $0 | $0 | 10MB/file, 2 files/batch, ads shown |
| Pro | $7.99/mo | $59.99/yr | 100MB/file, unlimited batch, no ads |
| Business | $19.99/mo | $149.99/yr | 500MB/file, API access, priority queue |

### One-Time Setup Costs
| Item | Cost |
|------|------|
| Domain (subdomain of proailabs.com) | $0 |
| VPS setup | $0 — already running |
| Logo / branding (Canva) | $0 |
| **Total** | **$0** |

### Monthly Running Costs
| Item | Cost | Notes |
|------|------|-------|
| Hostinger VPS | Already paid | Shared with proailabs.com |
| PostgreSQL | $0 | Self-hosted on VPS |
| LibreOffice + Ghostscript | $0 | Open source |
| Resend (email) | $0 | Free up to 3,000/mo |
| Google Analytics | $0 | Free |
| Google AdSense | $0 | They pay you |
| Paddle fees | 5% + $0.50/txn | Only on paid conversions |
| Google Ads (month 3+) | $300/mo test | Scale only if CAC < $30 |
| VPS upgrade (month 5+) | ~$10–15/mo | If CPU/RAM hits limits |
| **Total month 1–2** | **$0** | |
| **Total month 3+** | **~$300–315/mo** | |

### VPS Requirements
| Resource | Minimum | Recommended |
|----------|---------|-------------|
| CPU | 2 cores | 4 cores |
| RAM | 2GB | 4GB |
| Disk | 10GB | 20GB |
| Bandwidth | 100GB/mo | 500GB/mo |

### Revenue vs Cost (Full P&L)
| Month | Visitors | AdSense | Pro/Business | Affiliates | Ad Spend | Paddle Fees | **Net Profit** |
|-------|----------|---------|--------------|------------|----------|-------------|----------------|
| 1 | 200 | $1 | $0 | $0 | $0 | $0 | **$1** |
| 2 | 800 | $3 | $0 | $0 | $0 | $0 | **$3** |
| 3 | 2,500 | $9 | $40 | $5 | $300 | $2 | **-$248** |
| 4 | 6,000 | $21 | $120 | $12 | $300 | $6 | **-$153** |
| 5 | 12,000 | $42 | $280 | $25 | $300 | $14 | **$33** |
| 6 | 25,000 | $87 | $500 | $35 | $300 | $25 | **$297** |
| 9 | 60,000 | $210 | $1,200 | $80 | $600 | $60 | **$830** |
| 12 | 120,000 | $420 | $2,500 | $150 | $800 | $125 | **$2,145** |
| 18 | 300,000 | $1,050 | $5,000 | $350 | $1,500 | $250 | **$4,650** |
| 24 | 600,000 | $2,100 | $9,000 | $600 | $2,500 | $450 | **$8,750** |

### Google Ads Strategy
Rule: **Never run ads to AdSense — only to Pro annual plan.**

| Campaign | Target Keywords | Bid | Daily Budget |
|----------|----------------|-----|--------------|
| Brand | "convertpdf" | $0.10 | $2 |
| Buyer intent | "pdf converter no watermark" | $0.25 | $4 |
| Buyer intent | "pdf tool no limit" | $0.25 | $4 |
| Low CPC tools | "rotate pdf free", "unlock pdf free" | $0.15 | $3 |
| **Total** | | | **$13/day = $390/mo** |

| Metric | Target |
|--------|--------|
| Avg CPC | < $0.25 |
| Annual plan conversion rate | > 1.5% |
| CAC | < $17 |
| Annual plan LTV | $59.99 |
| Break-even conversion rate | 0.42% |

---

## 2. TECHNICAL PLAN

### Architecture
```
convertpdf.proailabs.com (Nginx reverse proxy)
             │
        Next.js 14 App (PM2)
             │
      ┌──────┴──────┐
  Frontend       API Routes
  (SSR/SSG)    /api/process/[tool]
                    │
           Processing Layer
        ┌───────────┼───────────┐
      pdf-lib     sharp    child_process
                               │
                  LibreOffice / Ghostscript
                               │
                  /tmp/uploads/<uuid>/ (auto-deleted 1hr)
                               │
                         PostgreSQL
                    (users, subscriptions, job logs)
```

### Tech Stack
| Layer | Choice | Cost |
|-------|--------|------|
| Framework | Next.js 14 + TypeScript | $0 |
| Styling | Tailwind CSS | $0 |
| PDF core | pdf-lib | $0 |
| Compression | Ghostscript | $0 |
| Conversions | LibreOffice | $0 |
| Image ops | sharp | $0 |
| File upload | multer | $0 |
| Auth | NextAuth.js | $0 |
| Payments | **Paddle** | 5% + $0.50 |
| Database | PostgreSQL + Prisma | $0 |
| Email | Resend | $0 |
| Hosting | Hostinger VPS + Nginx + PM2 | Already paid |
| CI/CD | GitHub Actions | $0 |

### Tool List
| # | Tool | Library | Dev Time |
|---|------|---------|----------|
| 1 | Merge PDF | pdf-lib | 2hrs |
| 2 | Split PDF | pdf-lib | 2hrs |
| 3 | Rotate PDF | pdf-lib | 1hr |
| 4 | Compress PDF | Ghostscript | 3hrs |
| 5 | Add Watermark | pdf-lib | 2hrs |
| 6 | PDF → JPG | Ghostscript + sharp | 3hrs |
| 7 | PDF → Word | LibreOffice | 4hrs |
| 8 | Word → PDF | LibreOffice | 2hrs |
| 9 | Protect PDF | pdf-lib | 2hrs |
| 10 | Unlock PDF | pdf-lib | 2hrs |
| 11 | PDF → Excel | LibreOffice | 3hrs |
| 12 | PDF → PPT | LibreOffice | 3hrs |
| **Total** | | | **~29hrs** |

### Page Structure
```
/                    → Homepage (all tools grid)
/merge-pdf           → Merge tool
/split-pdf           → Split tool
/compress-pdf        → Compress tool
/pdf-to-word         → Convert tool
/word-to-pdf         → Convert tool
/rotate-pdf          → Rotate tool
/pdf-to-jpg          → Convert tool
/protect-pdf         → Protect tool
/unlock-pdf          → Unlock tool
/pdf-to-excel        → Convert tool
/pdf-to-ppt          → Convert tool
/watermark-pdf       → Watermark tool
/pricing             → Free vs Pro vs Business
/blog                → SEO articles
/privacy-policy      → Required for AdSense
/terms               → Required for AdSense
/about               → Required for AdSense
/contact             → Required for AdSense
```

### UX Flow (every tool)
```
1. Landing page (SEO content + CTA)
2. Drag & drop file upload
3. Tool options (if any)
4. Process button
5. Progress bar + spinner → show ad here
6. Download button → show ad below
7. "Process another file" CTA
```

### Build Sprints
| Sprint | Tasks | Est. Time |
|--------|-------|-----------|
| 1 | Scaffold + Tailwind + drag-drop upload | 4hrs |
| 2 | API base + Merge PDF end-to-end | 4hrs |
| 3 | Deploy to VPS + subdomain + CI/CD | 3hrs |
| 4 | Tools 2–7 | 14hrs |
| 5 | SEO content + schema markup all pages | 6hrs |
| 6 | AdSense + GA4 + sitemap + robots.txt | 2hrs |
| 7 | Tools 8–12 | 12hrs |
| 8 | Pro plan — Paddle + NextAuth + paywall + annual billing | 8hrs |
| 9 | Google Ads conversion tracking | 2hrs |
| **Total** | | **~55hrs** |

---

## 3. MARKETING PLAN

### SEO Keywords
| Page | Keyword | Monthly Searches | Competition |
|------|---------|-----------------|-------------|
| /merge-pdf | merge pdf free | 450,000 | High |
| /compress-pdf | compress pdf | 300,000 | High |
| /pdf-to-word | pdf to word | 500,000 | High |
| /split-pdf | split pdf online | 200,000 | Medium |
| /pdf-to-jpg | pdf to jpg | 150,000 | Medium |
| /word-to-pdf | word to pdf | 350,000 | High |
| /rotate-pdf | rotate pdf | 100,000 | Low ← start here |
| /protect-pdf | protect pdf password | 40,000 | Low ← start here |
| /unlock-pdf | remove pdf password | 60,000 | Low ← start here |
| /pdf-to-excel | pdf to excel | 180,000 | Medium |
| /pdf-to-ppt | pdf to powerpoint | 90,000 | Low |
| /watermark-pdf | add watermark to pdf | 35,000 | Low ← start here |

### Traffic Growth
| Month | Monthly Visitors | Accumulated | Growth Driver |
|-------|-----------------|-------------|---------------|
| 1 | 200 | 200 | Product Hunt + Reddit |
| 2 | 800 | 1,000 | GSC indexing begins |
| 3 | 2,500 | 3,500 | Long-tail rankings + Google Ads |
| 4 | 6,000 | 9,500 | Low-competition tools page 1 |
| 5 | 12,000 | 21,500 | Blog + backlinks + ads scaling |
| 6 | 25,000 | 46,500 | Main keywords page 1 |
| 9 | 60,000 | ~150,000 | Domain authority |
| 12 | 120,000 | ~400,000 | 12+ tools, established brand |
| 18 | 300,000 | ~1,200,000 | Compounding SEO |
| 24 | 600,000 | ~3,000,000 | Authority site in PDF niche |

### On-Page SEO (every tool page)
- H1 with exact match keyword
- 400+ word unique description
- 5-question FAQ targeting People Also Ask
- HowTo schema + FAQPage schema markup
- Internal links to 3 related tools
- LCP < 2.5s, CLS < 0.1

### AdSense Placements
| Location | Format | Expected CTR |
|----------|--------|-------------|
| Processing wait screen | 728×90 leaderboard | 2–4% |
| Below download button | 336×280 rectangle | 3–5% |
| Sidebar desktop | 160×600 skyscraper | 1–2% |
| Between tool cards homepage | 728×90 | 1–2% |

### AdSense Approval Checklist
- [ ] Privacy Policy page
- [ ] Terms of Service page
- [ ] About page
- [ ] Contact page
- [ ] 10+ indexed pages with real content
- [ ] No copyrighted content
- [ ] Mobile responsive
- [ ] Core Web Vitals passing

### Launch Channels (Month 1, $0)
| Channel | Action |
|---------|--------|
| Product Hunt | Full launch with screenshots + demo GIF |
| Reddit | r/software, r/productivity, r/webdev, r/entrepreneur |
| Hacker News | Show HN post |
| alternativeto.net | List as free iLovePDF alternative |
| toolpilot.ai | Submit free tool |
| futurepedia.io | Submit to tools directory |

### Backlink Strategy (Month 2+, $0)
| Source | Method |
|--------|--------|
| 20+ tool directories | Submit site |
| "Best PDF tools" roundups | Email outreach |
| Comparison pages | /vs-ilovepdf, /vs-smallpdf |
| Guest posts | Productivity + SaaS blogs |
| YouTube | 60-second demo per tool |

### Blog Content Plan (Month 2+)
| Post | Keyword | Monthly Searches |
|------|---------|-----------------|
| How to compress PDF without losing quality | compress pdf without losing quality | 18,000 |
| How to merge PDF on iPhone | merge pdf iphone | 22,000 |
| Best free PDF tools 2026 | best free pdf tools | 12,000 |
| How to convert PDF to Word for free | convert pdf to word free | 45,000 |
| How to remove password from PDF | remove password from pdf | 30,000 |

---

## 4. PAYMENTS — PADDLE

### Why Paddle
| Factor | Detail |
|--------|--------|
| Country support | 200+ countries |
| Egypt + Yemeni passport | ✅ Accepted |
| Merchant of record | Paddle handles all global taxes |
| Company required | No — individual/freelancer ok |
| Payout method | Wise (recommended) / PayPal / bank |

### Payout Setup
```
Paddle → Wise (hold USD) → Egyptian bank when needed
```
Use Wise to avoid forced EGP conversion and get better exchange rates.

### Integration
```bash
npm install @paddle/paddle-node-sdk @paddle/paddle-js
```

---

## 5. FULL TIMELINE

```
Month 1  → Build 7 tools + deploy + AdSense apply + Product Hunt
Month 2  → AdSense live + blog posts + backlinks + affiliate links
Month 3  → Pro plan live (Paddle) + Google Ads test ($300, annual plan only)
Month 4  → Optimize ads + 5 more tools
Month 5  → First profitable month (~$33 net)
Month 6  → $297/mo net + 25,000 visitors/mo
Month 9  → $830/mo net + 60,000 visitors/mo
Month 12 → $2,145/mo net + 120,000 visitors/mo
Month 18 → $4,650/mo net + 300,000 visitors/mo
Month 24 → $8,750/mo net + 600,000 visitors/mo
```

---

## 6. TOTAL INVESTMENT SUMMARY

| Item | Cost |
|------|------|
| Development (~55hrs) | Your time only |
| Infrastructure month 1–2 | $0 |
| Google Ads test (month 3) | $300 |
| Paddle fees | 5% of revenue |
| VPS upgrade (month 5) | ~$10–15/mo |
| **Total cash to launch** | **$0** |
| **Total cash to month 3** | **~$300** |
| **Break-even month** | **Month 5** |
