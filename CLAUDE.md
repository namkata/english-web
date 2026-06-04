# English Web — Claude Project Rules

## Project Overview

**English Web** là nền tảng luyện tiếng Anh toàn diện dành cho người học Việt Nam. Ứng dụng bao gồm: đọc hiểu, luyện viết có AI, từ vựng spaced-repetition, trắc nghiệm, ngữ pháp, luyện nghe và gamification (XP, streak, leaderboard).

Multi-platform: **Web** (Next.js), **Mobile** (Expo/React Native), **Desktop** (Electron).

---

## Monorepo Structure

```
english-web/                         ← root
├── apps/
│   ├── web/                         ← Next.js 15 (App Router)
│   ├── mobile/                      ← Expo SDK 51 (React Native)
│   └── desktop/                     ← Electron + Next.js
├── services/
│   ├── api-gateway/                 ← NestJS 10 (routing, auth middleware, rate-limit)
│   ├── auth-service/                ← Go 1.23 (JWT, OAuth2, refresh tokens)
│   ├── user-service/                ← Go 1.23 (profiles, settings, AI provider)
│   ├── content-service/             ← Go 1.23 (reading passages, vocabulary, quiz bank)
│   ├── ai-service/                  ← Python 3.12 / FastAPI (writing feedback, AI quiz gen)
│   └── gamification-service/        ← Go 1.23 (XP, streak, leaderboard, challenges)
├── packages/
│   ├── ui/                          ← Shared React components (shadcn/ui + Tailwind)
│   ├── types/                       ← Shared TypeScript types & Zod schemas
│   └── config/                      ← Shared ESLint, TypeScript, Tailwind configs
├── infra/
│   ├── docker/                      ← Per-service Dockerfiles
│   └── nginx/                       ← Nginx reverse proxy config
├── docs/
│   ├── api/                         ← OpenAPI specs
│   └── architecture/                ← ADRs, diagrams
├── .github/
│   └── workflows/                   ← CI/CD GitHub Actions
├── CLAUDE.md                        ← This file
├── docker-compose.yml               ← Full local stack
├── docker-compose.dev.yml           ← Dev overrides (hot reload)
├── turbo.json                       ← Turborepo pipeline
├── pnpm-workspace.yaml
├── package.json
└── .env.example
```

---

## Tech Stack Decisions

### Frontend (apps/web)
| Concern | Choice | Version |
|---|---|---|
| Framework | Next.js App Router | 15.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Components | shadcn/ui | latest |
| State | Zustand | 5.x |
| Server State | TanStack Query | 5.x |
| Forms | react-hook-form + Zod | latest |
| Auth | next-auth v5 (Auth.js) | 5.x |
| i18n | next-intl | 3.x |
| Animation | Framer Motion | 11.x |
| Charts | Recharts | 2.x |

### Mobile (apps/mobile)
| Concern | Choice |
|---|---|
| Framework | Expo SDK 53 |
| Navigation | Expo Router v4 |
| Styling | NativeWind (Tailwind) |
| State | Same as web (Zustand + TanStack Query) |

### Backend
| Service | Language/Framework | DB |
|---|---|---|
| api-gateway | NestJS 10 + TypeScript | Redis (rate limit) |
| auth-service | Go 1.23 + Gin + GORM | PostgreSQL 16 |
| user-service | Go 1.23 + Gin + GORM | PostgreSQL 16 |
| content-service | Go 1.23 + Gin + GORM | PostgreSQL 16 |
| ai-service | Python 3.12 + FastAPI | PostgreSQL 16 (async) |
| gamification-service | Go 1.23 + Gin + GORM | PostgreSQL 16 + Redis |

### Infrastructure
- **Database**: PostgreSQL 16 (primary), Redis 7 (cache/sessions/leaderboard)
- **Object Storage**: MinIO (local dev) / S3-compatible (prod)
- **Message Queue**: Redis Streams (simple) → migrate to NATS/Kafka if needed
- **Container**: Docker + Docker Compose (local), Kubernetes-ready
- **Reverse Proxy**: Nginx

---

## Coding Conventions

### General
- All code in English (comments and variable names)
- UI text in Vietnamese (strings via i18n keys)
- Strict TypeScript — no `any`, no implicit returns
- All env vars via `.env` files — never hardcode secrets
- Every public function must have JSDoc / Go doc comments
- Error messages must be user-friendly (Vietnamese for UI, English in logs)

### Go Services
```go
// File structure per service
service/
├── cmd/main.go          ← entry point
├── internal/
│   ├── handler/         ← HTTP handlers (thin)
│   ├── service/         ← business logic
│   ├── repository/      ← DB queries (interface + impl)
│   ├── model/           ← GORM models
│   ├── dto/             ← request/response structs
│   └── middleware/      ← auth, logging, recovery
├── pkg/                 ← reusable utils (errors, logger, validator)
├── migrations/          ← SQL migration files
├── Dockerfile
├── .env.example
└── go.mod
```
- Use `slog` for structured logging
- Return typed errors with HTTP status + user-readable message
- GORM with explicit transactions for multi-table writes
- All DB queries via repository interface (testable)
- Use `golang-migrate` for schema migrations

### Python (ai-service)
```python
# Structure
ai-service/
├── app/
│   ├── main.py          ← FastAPI app factory
│   ├── routers/         ← endpoint modules
│   ├── services/        ← business logic
│   ├── models/          ← SQLAlchemy models
│   ├── schemas/         ← Pydantic schemas
│   └── core/            ← config, security, db session
├── alembic/             ← migrations
├── requirements.txt
├── Dockerfile
└── .env.example
```
- Use `pydantic-settings` for config
- Async handlers (`async def`) throughout
- Use `asyncpg` / `SQLAlchemy 2.0` async engine
- Structured logging via `structlog`

### NestJS (api-gateway)
- Modules per domain
- Guards for auth, Pipes for validation, Interceptors for logging
- `class-validator` + `class-transformer` on all DTOs
- Swagger auto-docs enabled in dev

### Next.js (apps/web)
- App Router only — no Pages Router
- Server Components by default; `"use client"` only when needed
- Route handlers in `app/api/` for BFF calls
- `next/font` for fonts, `next/image` for images
- Absolute imports via `@/` alias
- Separate `actions/` folder for Server Actions

---

## Security Rules
1. JWT access tokens (15 min TTL) + refresh tokens (7 days, httpOnly cookie)
2. All service-to-service calls use internal API keys (env var)
3. Input validation on every endpoint (Zod / class-validator / Pydantic)
4. SQL via ORM only — no raw query string interpolation
5. Rate limiting at API gateway (Redis sliding window)
6. CORS restricted to known origins
7. Secrets in `.env` — `.env` files in `.gitignore`
8. User AI API keys encrypted at rest (AES-256) before DB storage

---

## Database Schema (Top-level)

### PostgreSQL Databases (one per service)
- `englishweb_auth` — users, sessions, oauth_accounts
- `englishweb_users` — profiles, settings, ai_providers
- `englishweb_content` — reading_passages, vocabulary_sets, words, quiz_questions
- `englishweb_ai` — writing_submissions, ai_feedback, generated_quizzes
- `englishweb_gamification` — xp_events, streaks, challenges, leaderboard_entries

---

## API Design

Base URL (local): `http://localhost:3001`

### Auth
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `GET  /api/v1/auth/me`

### Content
- `GET /api/v1/reading` — list passages (filter: level, length, topic)
- `GET /api/v1/reading/:id` — single passage + questions
- `GET /api/v1/vocabulary/sets` — list vocab sets
- `GET /api/v1/vocabulary/sets/:id/words`
- `GET /api/v1/quiz` — generate/list quizzes
- `POST /api/v1/quiz` — create custom quiz

### Writing
- `POST /api/v1/writing/sessions` — start writing session
- `POST /api/v1/writing/sessions/:id/submit` — submit sentence, get AI feedback

### Gamification
- `GET  /api/v1/gamification/me` — XP, streak, rank
- `GET  /api/v1/gamification/leaderboard`
- `GET  /api/v1/gamification/challenges/today`

### User
- `GET  /api/v1/users/me/settings`
- `PUT  /api/v1/users/me/settings`
- `POST /api/v1/users/me/ai-providers`
- `GET  /api/v1/users/me/stats`

---

## Environment Variables

Each service has its own `.env.example`. Root `.env.example` contains shared infra vars:

```env
# Postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=englishweb
POSTGRES_PASSWORD=changeme

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=change-me-in-production
JWT_ACCESS_TTL=900
JWT_REFRESH_TTL=604800

# Ports
API_GATEWAY_PORT=3001
AUTH_SERVICE_PORT=4001
USER_SERVICE_PORT=4002
CONTENT_SERVICE_PORT=4003
AI_SERVICE_PORT=4004
GAMIFICATION_SERVICE_PORT=4005

# MinIO
MINIO_ENDPOINT=localhost:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
```

---

## Sprint Plan

### Phase 1 — Foundation (Week 1–2)
**Goal**: Monorepo running, auth working, basic dashboard visible

- [x] Monorepo scaffold (pnpm + Turborepo)
- [ ] Shared packages: `ui`, `types`, `config`
- [ ] `auth-service` (Go): register, login, JWT
- [ ] `api-gateway` (NestJS): proxy + auth guard
- [ ] `apps/web`: auth pages (login, register), dashboard shell
- [ ] Docker Compose: postgres, redis, all services
- [ ] GitHub Actions: lint + build CI

### Phase 2 — Core Learning Features (Week 3–5)
**Goal**: Reading, Vocabulary, Quiz fully functional

- [ ] `content-service`: reading passages CRUD + seeding
- [ ] `apps/web`: Reading comprehension page (A1–C2, filter, do exercise)
- [ ] `content-service`: vocabulary sets + words API
- [ ] `apps/web`: Vocabulary page (flashcard, spaced repetition, ôn từ vựng)
- [ ] `content-service`: quiz question bank
- [ ] `apps/web`: Quiz/Trắc nghiệm page (27+ question types, exam mode)

### Phase 3 — AI Features (Week 6–7)
**Goal**: AI writing and AI quiz generation live

- [ ] `ai-service` (Python FastAPI): writing feedback endpoint (calls OpenAI/Anthropic)
- [ ] `apps/web`: Writing practice page (sentence mode, rewrite mode)
- [ ] `ai-service`: AI quiz generation endpoint
- [ ] `apps/web`: AI tab in Trắc nghiệm page
- [ ] User AI Provider management (settings page)

### Phase 4 — Gamification (Week 8)
**Goal**: XP, streaks, challenges, leaderboard live

- [ ] `gamification-service`: XP events, streak calculation
- [ ] `gamification-service`: daily challenges engine
- [ ] `gamification-service`: weekly leaderboard (Redis sorted set)
- [ ] `apps/web`: Dashboard — real data (XP chart, streak, leaderboard)

### Phase 5 — Mobile & Desktop (Week 9–11)
**Goal**: Expo mobile app feature parity with web

- [ ] `apps/mobile`: scaffold Expo Router, shared auth
- [ ] `apps/mobile`: Dashboard, Reading, Vocabulary, Quiz screens
- [ ] `apps/mobile`: Writing + Vocabulary push notifications
- [ ] `apps/desktop`: Electron shell wrapping web build

### Phase 6 — Listening & Polish (Week 12–14)
**Goal**: Listening feature, grammar tracker, full QA

- [ ] `content-service`: listening tracks + dictation questions
- [ ] `apps/web`: Listening page (Dictation, Q&A, Conversation, Talk)
- [ ] `apps/web`: Grammar & Error tracker page
- [ ] E2E tests (Playwright for web, Detox for mobile)
- [ ] Performance audit, accessibility, i18n QA
- [ ] Prod Docker images + deployment docs

---

## Git Conventions

```
feat:     new feature
fix:      bug fix
chore:    tooling, deps, config
docs:     documentation only
test:     tests only
refactor: no behavior change
perf:     performance improvement
```

Branch: `main` (prod) → `develop` (staging) → `feature/<ticket>` (dev)

PRs must pass: lint + type-check + unit tests before merge.

---

## File Naming
- React components: `PascalCase.tsx`
- Hooks: `useHookName.ts`
- Utils/lib: `camelCase.ts`
- Go files: `snake_case.go`
- Python files: `snake_case.py`
- Env files: `.env`, `.env.example`, `.env.local`

---

## Important Notes for Claude
- Always read this file before making changes to the project
- Prefer editing existing files over creating new ones
- When adding a new feature, update `CLAUDE.md` Sprint Plan accordingly
- All new API endpoints must be added to `docs/api/` OpenAPI spec
- Never commit `.env` files — only `.env.example`
- Run `pnpm turbo build` to verify nothing is broken before declaring done
- Check Docker Compose before marking infra tasks complete
