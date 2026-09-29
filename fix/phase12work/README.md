# ToolNest

ToolNest is a mobile-first Next.js utility SaaS platform for calculators, text, image and PDF tools. The project is designed to start on free tiers and grow into a subscription product later.

## Current phase

**Phase 12 — Deployment & production launch preparation**

The codebase now includes the Phase 1–11 foundation plus deployment hardening and a beginner-friendly free-tier launch path.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- MongoDB + Mongoose
- Auth.js / NextAuth credentials authentication
- Zod validation
- PDF-lib for browser-side PDF work
- Lucide React icons

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

Required variables:

```env
MONGODB_URI=
AUTH_SECRET=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Generate a strong `AUTH_SECRET` for production. Never commit `.env.local`.

## Verification commands

```bash
npm run typecheck
npm run lint
npm run build
npm start
```

A production build should be the final gate before deployment. If dependency installation is unavailable in your environment, install dependencies first and then run these commands locally/CI.

## Phase 12 — Free-tier deployment

### 1. Create MongoDB Atlas

Create a free-tier MongoDB database and a dedicated database user. Copy the connection string into `MONGODB_URI`.

For a Vercel deployment, Atlas must permit connections from Vercel's changing outbound IPs. If you temporarily use `0.0.0.0/0` in Atlas Network Access, protect the database with a strong unique password, a least-privilege database user, and TLS. Do not expose the URI to the browser.

### 2. Push the project to GitHub

From the project directory:

```bash
git init
git add .
git commit -m "Prepare ToolNest for deployment"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/toolnest.git
git push -u origin main
```

Replace the remote with your own repository. Never commit `.env`, `.env.local`, credentials, or API secrets.

### 3. Deploy to Vercel

1. Sign in to Vercel with GitHub.
2. Import the ToolNest repository.
3. Keep the detected framework as **Next.js**.
4. Use the default build command (`next build`).
5. Add the environment variables from `.env.example` in Vercel Project Settings → Environment Variables.
6. Deploy.

Recommended production variables:

```env
MONGODB_URI=your-production-mongodb-uri
AUTH_SECRET=your-long-random-secret
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
NEXT_PUBLIC_ADSENSE_CLIENT=
NEXT_PUBLIC_ADSENSE_ENABLED=false
```

Keep Razorpay variables empty until the billing provider is actually integrated:

```env
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
```

### 4. Verify the deployment

After Vercel finishes the deployment, check:

- `/`
- `/tools`
- `/categories`
- `/pricing`
- `/blog`
- `/about`
- `/contact`
- `/faq`
- `/privacy`
- `/terms`
- `/disclaimer`
- `/api/health`
- `/robots.txt`
- `/sitemap.xml`

Then test authentication, calculators, image/PDF tools, favorites/history, dashboard pages, and admin authorization.

The health endpoint should return JSON similar to:

```json
{
  "status": "ok",
  "service": "toolnest"
}
```

### 5. Custom domain later

A Vercel-provided project URL is enough to begin testing. When a custom domain is added later, update:

```env
NEXT_PUBLIC_APP_URL=https://your-domain.example
```

Redeploy after changing production environment variables so canonical URLs, sitemap and robots output use the correct origin.

## Production security checklist

- [ ] Strong unique `AUTH_SECRET`
- [ ] Strong MongoDB password
- [ ] Least-privilege MongoDB user
- [ ] No secrets in GitHub
- [ ] HTTPS production URL configured
- [ ] Admin account verified
- [ ] Admin routes inaccessible to normal users
- [ ] File size/type validation tested
- [ ] API validation tested
- [ ] Error and empty states checked
- [ ] Mobile layout checked
- [ ] No accidental ad-click UI
- [ ] Privacy, Terms and Disclaimer reviewed for the actual business
- [ ] Contact/About pages contain real business information before monetization review
- [ ] AdSense remains disabled until the site is genuinely ready and the publisher setup is valid

## AdSense readiness

Phase 11 provides reusable `AdSlot`, `AdBanner`, `AdRectangle` and `AdInArticle` components plus configurable placements in `config/ads.ts`.

Keep:

```env
NEXT_PUBLIC_ADSENSE_ENABLED=false
```

until you intentionally configure a valid publisher setup. Do not place fake publisher IDs in production.

## Subscription readiness

Phase 10 provides Free/Pro entitlement architecture and a future payment-provider boundary. Real Razorpay checkout is intentionally not active. Do not enable billing merely by adding secrets; the provider flow and webhook verification must be implemented and tested first.

## Useful routes

- `/` — homepage
- `/tools` — tool catalog
- `/categories` — categories
- `/pricing` — Free/Pro pricing architecture
- `/blog` — blog
- `/dashboard` — authenticated user area
- `/admin` — admin area
- `/api/health` — deployment health check

## Free-tier architecture

Image and PDF utilities prefer browser-side processing, so uploaded files do not need to be permanently stored by ToolNest. MongoDB is used for user/account/application data. This keeps the initial infrastructure footprint small while leaving room for future paid infrastructure.

## Important note

This repository is deployment-ready in architecture, but production readiness still requires real-world verification after dependency installation: TypeScript, lint, production build, authentication, MongoDB connectivity, file processing, mobile UI, and all critical user flows must be tested before public launch.


## Phase 13 — Launch & Growth Audit

Phase 13 performs a final pre-launch audit and closes an important functional gap: all seven text tools from the original specification are now implemented client-side and included in the main catalog, category pages, tool routes and sitemap.

### Text tools now functional

- Word Counter
- Character Counter
- Case Converter
- Remove Duplicate Lines
- Text Sorter
- Slug Generator
- Text Reverser

The complete initial catalog is now 26 tools: 10 calculators + 7 text + 5 image + 4 PDF.

### Security and reliability hardening

- MongoDB connection errors are deferred until a database call is actually made, so public static pages can build without a database URI during local setup.
- Added lightweight best-effort rate limiting to registration, password reset and contact endpoints.
- Added `Retry-After` responses for throttled endpoints where appropriate.
- Kept secrets server-side and disabled AdSense by default.
- Added a dependency-free catalog verification command: `npm run verify:catalog`.

### Phase 13 verification

Run after `npm install`:

```bash
npm run verify:catalog
npm run typecheck
npm run lint
npm run build
```

The current build environment could not complete `npm install` because the package download timed out, so TypeScript/lint/build must still be run after dependencies are successfully installed. This is an environment limitation, not a claim that those checks passed.

### Launch order

1. Install dependencies locally or on Vercel.
2. Configure MongoDB Atlas and `AUTH_SECRET`.
3. Push the repository to GitHub.
4. Import the repository into Vercel.
5. Configure production environment variables.
6. Run the full verification commands above.
7. Test authentication, dashboard, admin authorization and all 26 tools on the deployed URL.
8. Verify sitemap, robots, legal pages and contact flow.
9. Keep AdSense disabled until the site is genuinely ready for the publisher review process.
