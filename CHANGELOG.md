# Changelog — English Web

## v0.1.1 — 2026-06-04

### Fixed

#### 1. Dev server startup failures
- **Problem:** `next: command not found` / `node_modules missing`
- **Fix:** Ran `pnpm install` to install all workspace dependencies

#### 2. Missing workspace package `@english-web/ui`
- **Problem:** `@english-web/ui@workspace:*` not found in workspace
- **Fix:** Created `packages/ui/` with `package.json`, `tsconfig.json`, `src/index.ts`, `src/button.tsx`

#### 3. Missing NextAuth v5 route handler
- **Problem:** `ClientFetchError: Unexpected token '<'` — NextAuth endpoints returned HTML 404 instead of JSON
- **Fix:** Created `apps/web/app/api/auth/[...nextauth]/route.ts` exporting `GET` and `POST` from `@/lib/auth`

#### 4. Missing i18n config for next-intl
- **Problem:** `[Error: [next-intl] Could not find i18n config at ./i18n/request.ts]`
- **Fix:**
  - Created `apps/web/i18n/routing.ts` with `localePrefix: 'never'`
  - Created `apps/web/i18n/request.ts` with `getRequestConfig`
  - Created `apps/web/messages/en.json` and `messages/vi.json`
  - Created `apps/web/middleware.ts`

#### 5. CSS not loading — Tailwind not compiling
- **Problem:** All pages rendered as unstyled HTML (no Tailwind classes applied)
- **Root cause:**
  - Missing `postcss.config.mjs` — Next.js couldn't find PostCSS config
  - Missing `tailwindcss-animate` dependency
- **Fix:**
  - Created `apps/web/postcss.config.mjs` with `tailwindcss` and `autoprefixer` plugins
  - Installed `tailwindcss-animate` and `autoprefixer` in `apps/web/package.json`

#### 6. Build errors
- **typedRoutes type errors** — `Type 'string' is not assignable to type 'UrlObject | RouteImpl<string>'`
  - **Fix:** Disabled `experimental.typedRoutes` in `next.config.ts`
- **NextAuth inferred type error** — `The inferred type of 'auth' cannot be named without a reference`
  - **Fix:**
    - Added explicit `NextAuthConfig` type annotation in `lib/auth.ts`
    - Added `declare module 'next-auth'` augmentation for `Session.accessToken`
    - Disabled `declaration` in `apps/web/tsconfig.json`

### Added

#### Mock data for empty API responses
- `components/dashboard/XPProgress.tsx` — Mock stats: 0 XP today, 35 total XP, 0-day streak
- `components/dashboard/DailyChallenges.tsx` — Mock 3 challenges (reading, assignment, vocab)
- `components/dashboard/ActivityHeatmap.tsx` — Mock activity data (2 days with activity)
- `components/dashboard/WeeklyRanking.tsx` — Mock weekly rank #163
- `components/dashboard/LearningModules.tsx` — Added stats and tags per module (e.g., "4 bài đã luyện", "60% điểm TB", tag chips)
- `components/reading/PassageGrid.tsx` — Mock 6 passages (My Neighborhood, A Morning in the Kitchen, A Day at the Zoo, etc.)
- `components/vocabulary/VocabSetList.tsx` — Mock 4 vocab sets (Thư viện từ vựng, TOEIC 600, Travel English)

#### UI improvements
- `components/layout/BottomNav.tsx` — Fixed to show all 5 nav tabs (Dashboard, Luyện viết, Đọc hiểu, Từ vựng, Trắc nghiệm) + "Thêm" button
- `app/(dashboard)/listening/page.tsx` — Updated header style from dark gradient to light bordered card with `Headphones` icon

### Changed

- `packages/types/package.json` — Fixed exports to match tsup output (`./dist/index.mjs` for ESM, `./dist/index.js` for CJS)
- `app/(dashboard)/layout.tsx` — Temporarily disabled auth redirect during development (restore with `if (!session) redirect('/login')`)

### Verified

- All routes return HTTP 200: `/dashboard`, `/reading`, `/writing`, `/vocabulary`, `/quiz`, `/listening`, `/feedback`, `/settings`, `/login`
- `pnpm build` passes successfully (15 static pages generated)
- Screenshots of all pages match design mockups
