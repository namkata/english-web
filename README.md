# English Web 🇻🇳

Nền tảng luyện tiếng Anh toàn diện cho người học Việt Nam — đọc hiểu, luyện viết AI, từ vựng spaced-repetition, trắc nghiệm, ngữ pháp, luyện nghe và gamification.

Multi-platform: **Web** · **Mobile** · **Desktop**

---

## Tính năng

| Module | Mô tả | Trạng thái |
|---|---|---|
| Dashboard | XP, streak, heatmap, daily challenges, leaderboard | 🏗 Phase 1 |
| Đọc hiểu | A1–C2, filter theo level, AI tạo đề | 🏗 Phase 2 |
| Luyện viết | Sentence writing + rewrite, AI feedback | 🏗 Phase 3 |
| Từ vựng | Flashcard, spaced repetition, bộ từ có sẵn | 🏗 Phase 2 |
| Trắc nghiệm | 27+ loại câu hỏi, exam mode, AI quiz gen | 🏗 Phase 2 |
| Ngữ pháp | Error tracker, grammar topics | 🏗 Phase 6 |
| Luyện nghe | Dictation, Q&A, Conversation, Talk | 🏗 Phase 6 |
| Gamification | XP, streak, challenges, weekly leaderboard | 🏗 Phase 4 |
| Mobile | Expo/React Native — parity với web | 🏗 Phase 5 |

---

## Tech Stack

### Frontend
- **Next.js 15** (App Router) · TypeScript 5 · Tailwind CSS 4 · shadcn/ui
- Zustand · TanStack Query v5 · react-hook-form + Zod · Framer Motion

### Backend (Microservices)
- **api-gateway** — NestJS 10 (proxy, rate-limit, auth middleware)
- **auth-service** — Go 1.23 + Gin + GORM (JWT, OAuth2, refresh tokens)
- **user-service** — Go 1.23 (profiles, settings, AI provider)
- **content-service** — Go 1.23 (reading, vocabulary, quiz bank)
- **ai-service** — Python 3.12 + FastAPI (writing feedback, AI quiz gen)
- **gamification-service** — Go 1.23 (XP, streak, leaderboard)

### Infrastructure
- PostgreSQL 16 · Redis 7 · MinIO · Docker Compose · Nginx
- GitHub Actions CI (lint + type-check + test, coverage ≥ 70%)

---

## Cấu trúc dự án

```
english-web/
├── apps/
│   ├── web/              # Next.js 15
│   ├── mobile/           # Expo SDK 53
│   └── desktop/          # Electron
├── services/
│   ├── api-gateway/      # NestJS
│   ├── auth-service/     # Go
│   ├── user-service/     # Go
│   ├── content-service/  # Go
│   ├── ai-service/       # Python FastAPI
│   └── gamification-service/ # Go
├── packages/
│   ├── ui/               # Shared React components
│   ├── types/            # Shared TypeScript types + Zod schemas
│   └── eslint-config/    # Shared ESLint config
├── infra/
│   ├── docker/           # Dockerfiles (Go, Python, Next.js, Node)
│   ├── postgres/         # init.sql — tạo 5 databases
│   └── nginx/
├── docs/
│   ├── api/              # OpenAPI specs
│   └── architecture/     # ADRs
├── .github/workflows/    # CI/CD
├── CLAUDE.md             # Project rules cho AI agents
├── AGENTS.md             # Engineering rules (error handling, response, tests)
├── docker-compose.yml
└── .env.example
```

---

## Bắt đầu nhanh

### Yêu cầu
- Node.js ≥ 20, pnpm ≥ 9
- Go 1.23
- Python 3.12
- Docker + Docker Compose

### 1. Clone & cấu hình env

```bash
git clone <repo-url>
cd english-web
cp .env.example .env
# Điền JWT_SECRET, NEXTAUTH_SECRET, ENCRYPTION_KEY vào .env
```

### 2. Khởi động toàn bộ stack

```bash
# Khởi động infrastructure (postgres, redis, minio)
docker compose up -d postgres redis minio

# Cài dependencies cho frontend
pnpm install

# Chạy web app
pnpm --filter @english-web/web dev
```

### 3. Khởi động từng service (development)

```bash
# auth-service
cd services/auth-service
cp .env.example .env
go run ./cmd/main.go

# ai-service
cd services/ai-service
cp .env.example .env
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python -m app.main
```

### 4. Khởi động toàn bộ bằng Docker

```bash
docker compose up -d
# Web:         http://localhost:3000
# API Gateway: http://localhost:3001
# MinIO UI:    http://localhost:9001
```

---

## Chạy tests

```bash
# TypeScript
pnpm test

# Go (auth-service)
cd services/auth-service
go test -race ./...

# Python (ai-service)
cd services/ai-service
pytest tests/unit/ -v
```

---

## Linting & Format

```bash
# TypeScript
pnpm lint && pnpm type-check

# Go
golangci-lint run ./...

# Python
ruff format . && ruff check . && mypy app/
```

---

## API Reference

Base URL: `http://localhost:3001/api/v1`

| Method | Endpoint | Mô tả |
|---|---|---|
| POST | `/auth/register` | Đăng ký tài khoản |
| POST | `/auth/login` | Đăng nhập |
| POST | `/auth/refresh` | Làm mới access token |
| GET | `/auth/me` | Thông tin user hiện tại |
| GET | `/reading` | Danh sách bài đọc (filter: level, length) |
| GET | `/reading/:id` | Bài đọc + câu hỏi |
| GET | `/vocabulary/sets` | Danh sách bộ từ vựng |
| GET | `/vocabulary/sets/:id/words` | Từ trong bộ |
| POST | `/quiz` | Tạo bài trắc nghiệm |
| POST | `/writing/sessions` | Bắt đầu phiên luyện viết |
| POST | `/writing/sessions/:id/submit` | Submit câu, nhận AI feedback |
| GET | `/gamification/me` | XP, streak, rank |
| GET | `/gamification/leaderboard` | Bảng xếp hạng tuần |
| GET | `/gamification/challenges/today` | Thử thách hôm nay |

OpenAPI spec đầy đủ: `docs/api/`

---

## Rules cho Contributors

Đọc **[CLAUDE.md](./CLAUDE.md)** và **[AGENTS.md](./AGENTS.md)** trước khi viết code.

Điểm quan trọng:
- Không bao giờ expose raw DB errors ra client — xem `AGENTS.md §1`
- Tất cả responses đi qua `pkg/response` (Go) hoặc `app/core/response.py` (Python)
- Mỗi function sửa phải có `@changelog` entry
- Unit test bắt buộc cho mọi business logic thay đổi

---

## Sprint Plan

| Phase | Mục tiêu | Thời gian |
|---|---|---|
| **Phase 1** | Monorepo + Auth + Dashboard shell | Week 1–2 |
| **Phase 2** | Reading, Vocabulary, Quiz | Week 3–5 |
| **Phase 3** | AI Writing + AI Quiz gen | Week 6–7 |
| **Phase 4** | Gamification (XP, streak, leaderboard) | Week 8 |
| **Phase 5** | Mobile (Expo) + Desktop (Electron) | Week 9–11 |
| **Phase 6** | Listening, Grammar, E2E tests, prod deploy | Week 12–14 |

Chi tiết từng task: **[CLAUDE.md — Sprint Plan](./CLAUDE.md#sprint-plan)**

---

## Môi trường

| Biến | Mô tả | Bắt buộc |
|---|---|---|
| `JWT_SECRET` | Secret ký JWT (≥ 64 ký tự) | ✅ |
| `NEXTAUTH_SECRET` | Secret cho NextAuth | ✅ |
| `ENCRYPTION_KEY` | Mã hóa user API keys (32 hex) | ✅ |
| `POSTGRES_PASSWORD` | Mật khẩu PostgreSQL | ✅ |
| `OPENAI_API_KEY` | OpenAI (system-level, optional) | ⬜ |
| `ANTHROPIC_API_KEY` | Anthropic (system-level, optional) | ⬜ |

Xem đầy đủ: [`.env.example`](./.env.example)
