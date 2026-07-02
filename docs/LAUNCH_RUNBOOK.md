# Launch Runbook — opscrunch.com

Ordered launch checklist for the Phase 5 go-live of the Next.js site at `web/`.
Each step is tagged with who performs it: **[user]** = manual dashboard/browser
action by the site owner, **[agent]** = can be done or verified from this repo.

Facts this runbook relies on:

- Production URL: `https://opscrunch.com` (trailing slashes on; canonicals,
  sitemap, and robots all derive from `NEXT_PUBLIC_SITE_URL`).
- Hosting: Vercel project `utility-tool-project` (team `rdb420s-projects`,
  project id `prj_eVDHVCA1yAsLo3PijQ82ATxQbNB1`), imported from the GitHub repo
  `rdb420/utility-tool-project`. Non-secret project notes: `docs/vercel/project.txt`.
- DNS: registered domain `opscrunch.com` on Cloudflare. Credentials/records live
  in `docs/cloudflare/` (gitignored — never commit or paste their contents).
- GA4 measurement ID: `G-7XG10CD70E` (tag snippet on file in
  `docs/google-analytics/google-tag-G-7XG10CD70E.txt`).
- AdSense verification code on file at `docs/google-adsense/verication-code.txt`
  (gitignored — reference by path only).

---

## 1. One-time Vercel project setup — [user]

The repo root is a Python/docs project; the deployable app lives in `web/`.
Vercel imported the repo without detecting a framework, so this must be fixed
first or every build will fail.

- [ ] In the Vercel dashboard → project `utility-tool-project` → **Settings →
      Build and Deployment → Root Directory**: set to `web`. **Required manual
      step — nothing deploys correctly until this is set.**
- [ ] Confirm **Framework Preset** now shows **Next.js** (it should auto-detect
      once the root directory is `web`).
- [ ] Confirm **Node.js Version** is **20.x or newer**.
- [ ] Under **Settings → Environment Variables**, add for the **Production**
      environment:
  - [ ] `NEXT_PUBLIC_SITE_URL` = `https://opscrunch.com`
  - [ ] `NEXT_PUBLIC_GA4_ID` = `G-7XG10CD70E`
  - [ ] `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` = the token from Search
        Console's **HTML tag** verification method (see section 5; you can add
        this later and redeploy, but the variable slot is listed here so it is
        not forgotten).
  - [ ] `NEXT_PUBLIC_ADS_ENABLED` = `false`

Note: `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_GA4_ID` also ship as fallbacks in
the committed `web/.env.production`, so a build without dashboard env vars still
produces correct canonicals and analytics. The Search Console verification token
is **env-only** (no committed fallback) — it must be set in Vercel.

## 2. Deploy — [user or agent]

- [ ] Push `main` to GitHub (`git push origin main` — 11+ local commits are
      pending as of this writing). Vercel auto-builds on push. Alternatively,
      trigger a deployment from the Vercel dashboard.
- [ ] Watch the build log: it should end with the static export summary showing
      **38 static pages** (24 calculator pages, 3 cluster hubs, home, 5 trust
      pages, plus 404/sitemap/robots and other generated routes). A page count
      far below that means the root-directory or env setup is wrong.
- [ ] Spot-check the `*.vercel.app` preview URL: home page renders, one
      calculator computes, no console errors.

## 3. Attach the domain — [user]

- [ ] Vercel → project → **Settings → Domains**: add `opscrunch.com` **and**
      `www.opscrunch.com`.
- [ ] Vercel will prescribe DNS records for each. In **Cloudflare → DNS**, add
      exactly the records Vercel shows (typically an `A` record for the apex —
      historically `76.76.21.21` — and a `CNAME` to `cname.vercel-dns.com` for
      `www`, but **use the values Vercel displays**, not this document, as the
      authority).
- [ ] Cloudflare proxy setting: create the records **DNS-only (grey cloud)**
      first so Vercel can issue its TLS certificates without interference. You
      can switch to proxied (orange cloud) later if you want Cloudflare's CDN
      in front; if you do, set Cloudflare **SSL/TLS mode to Full (strict)** to
      avoid redirect loops.
- [ ] In Vercel's Domains settings, set one host as primary and redirect the
      other (recommended: `www.opscrunch.com` → `opscrunch.com`, 308).

## 4. Post-DNS verification — [agent-assistable]

Run after DNS has propagated (minutes to a few hours):

- [ ] `https://opscrunch.com/` loads over HTTPS with a valid certificate (no
      warnings, no redirect loop).
- [ ] `https://opscrunch.com/sitemap.xml` is reachable and lists **33 URLs**,
      all on `https://opscrunch.com` with trailing slashes.
- [ ] `https://opscrunch.com/robots.txt` is reachable and references the
      sitemap URL on the production host.
- [ ] `https://opscrunch.com/ads.txt` is reachable (currently a placeholder
      comment — that is expected until AdSense approval, section 7).
- [ ] View source on the home page and two calculator pages: `<link
      rel="canonical">` points at `https://opscrunch.com/...` (not
      `*.vercel.app`, not `localhost`).
- [ ] Spot-check three calculator pages end-to-end (suggested:
      `/freight-class-calculator/`, `/cbm-calculator/`,
      `/margin-calculator/`): inputs validate, results render, related-tool
      links resolve.

## 5. Google Search Console — [user]

- [ ] Add a property for the site. Preferred: a **Domain property** for
      `opscrunch.com`, verified via a **DNS TXT record added in Cloudflare**
      (covers all protocols/subdomains). Alternative: a **URL-prefix property**
      for `https://opscrunch.com/`, verified via the **HTML tag** method — the
      site emits that meta tag from `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
      (set the token in Vercel per section 1, redeploy, then click Verify).
- [ ] Submit the sitemap: `https://opscrunch.com/sitemap.xml`.
- [ ] Use **URL Inspection → Request Indexing** on the six highest-value pages:
  - [ ] `https://opscrunch.com/freight-class-calculator/`
  - [ ] `https://opscrunch.com/cbm-calculator/`
  - [ ] `https://opscrunch.com/dimensional-weight-calculator/`
  - [ ] `https://opscrunch.com/volumetric-weight-calculator/`
  - [ ] `https://opscrunch.com/margin-calculator/`
  - [ ] `https://opscrunch.com/break-even-calculator/`

## 6. GA4 sanity check — [user, agent-assistable]

The consent-aware GA4 transport reads `NEXT_PUBLIC_GA4_ID`; events fire only
after consent is accepted in the banner.

- [ ] Visit the live site, accept the consent banner, browse two pages. In GA4
      (property with measurement ID `G-7XG10CD70E`) → **Realtime**: confirm
      `page_view` events arrive.
- [ ] Run a calculator to a valid result: confirm a `calculator_result` event
      arrives (the taxonomy also includes `calculator_start`,
      `calculator_validation_error`, `result_copy`, `related_tool_click`).
- [ ] Inspect event parameters in Realtime/DebugView: confirm **no PII and no
      user-entered input values** (dimensions, costs, quantities) are present —
      only tool/event identifiers.
- [ ] Optional: link Search Console to the GA4 property (GA4 Admin → Product
      links → Search Console) once section 5 is verified.

## 7. AdSense — [user, LAST — only after indexing and real traffic]

Do **not** apply at launch. Apply only after Search Console shows the site
indexed and it is receiving organic traffic, per `docs/GOOGLE_SETUP.md`
(AdSense section: trust pages, no placeholders, ads must not interfere with
calculator usability).

- [ ] Apply for AdSense with `opscrunch.com`.
- [ ] Site verification: reuse the meta-tag pattern (an env-driven head tag,
      as with Search Console) or paste the AdSense snippet per their
      instructions. The existing verification code is on file at
      `docs/google-adsense/verication-code.txt` (gitignored — do not commit or
      quote it).
- [ ] On approval: replace the placeholder comment in `web/public/ads.txt`
      with the real `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`
      line and redeploy.
- [ ] **Pre-serving gate (its own checklist item):** keep
      `NEXT_PUBLIC_ADS_ENABLED=false` until the placeholder `ConsentBanner` is
      replaced by a **Google-certified IAB TCF v2.2 CMP with Consent Mode v2**.
      Serving ads to EEA/UK/CH visitors without a certified CMP violates
      Google's consent requirements.
- [ ] When enabling: follow the **A+D-slots-first rule** from the AdSense kit
      (`docs/mockups/opscrunch_adsense_kit.html` and the Phase 4 design spec) —
      only slots A (below the worked example, eager) and D (below the FAQ,
      lazy) go live first; an ad never touches the tool shell. Evaluate more
      placements only after usage data.

## 8. Post-launch watch — [user + agent]

- [ ] **Weekly:** Search Console → Pages (coverage) and Performance: indexed
      count trending toward 33, watch for crawl errors, note top queries.
- [ ] **Due 2026-07-12:** re-verify the USPS dimensional-weight divisor —
      update `data/reference_tables/freight/dimensional_weight_divisors.json`
      and the dim-weight presets in `web/src/components/dimweight/` if it
      changed (see the review-frequency note on the record).
- [ ] **2026-07-31:** Cloudflare SSL/certificate scan follow-up noted in
      `docs/cloudflare/` — re-check the domain's SSL status on that date.
- [ ] Fix technical SEO/UX issues found in the first weeks **before** adding
      more tools (Phase 5 exit criterion in `docs/DEVELOPMENT_PLAN.md`).
