# Implementation Plan / Roadmap — English Web

> Cập nhật: 2026-06-11 — hoàn thành Sprint 1 (UI polish), Sprint 2 (auth refresh + SRS review API), Sprint 5 (migrations, rate limit, compose, CI) và tech debt (ui/types packages, Next 15.5.19, recharts 3, vitest).

---

## Sprint 1: UI Polish — Khớp 100% Screenshots (Priority: HIGH)

Mục tiêu: Tinh chỉnh layout, spacing, typography, colors và thiếu component cho khớp design gốc.

### Dashboard
- [x] Heatmap: Thêm nhiều mock data hơn (91 ngày với gradient intensity) để grid đầy màu
- [x] Header: Thêm avatar user, notification badge với số đếm
- [x] XP Progress: Thanh progress bar đúng màu brand, thêm icon flame/ streak đúng style
- [x] Daily Challenges: Checkbox style tròn thay vì vuông; chevron arrow đúng vị trí
- [x] Weekly Ranking: Nền màu xanh nhạt đúng như screenshot (bg-accent/40 → đổi thành màu xanh mint)
- [x] Learning Modules: Thêm icon nền mờ (ghost icon) bên phải mỗi card; tags có màu riêng (vàng, xanh, cam)

### Reading
- [x] Passage card: Badge "Vừa / Ngắn / Dài" + "7 câu" nằm cùng hàng, style pill màu xanh mint
- [x] AI Generate Card: Thêm icon sparkle lớn bên phải, nền gradient xanh nhạt
- [x] Level Filter: A1 badge active màu đen, các level khác viền xám
- [x] Thêm mock data đủ 6 bài đọc đầu tiên (hiện tại chỉ có text, thiếu content đầy đủ)

### Writing
- [x] Button "Bắt đầu luyện viết từng câu": Đổi thành style primary đậm, có icon arrow
- [x] Step cards: Viền selected màu brand-500, nền brand-50
- [x] Thêm link "Xem gói AI hệ thống" + "thêm API riêng" bên dưới form

### Vocabulary
- [x] Header đúng: "Bộ từ của tôi" + button "+ Thêm từ" màu primary
- [x] Word detail cards: Hiển thị từng từ với IPA UK/US, loại từ, nghĩa, ví dụ, ảnh minh họa, trạng thái "Đã thuộc / Mới"
- [x] Sidebar bộ từ: Progress bar đúng màu, số % nổi bật
- [x] Thêm mock data cho ~12 từ trong bộ TOEIC 600

### Quiz
- [x] Checkbox list: Style đẹp hơn, 2 cột đều, scroll nếu quá dài
- [x] Button "Tạo bài tập": Icon sparkle, màu primary đậm
- [x] Chế độ thi: Card viền nhẹ, mô tả rõ ràng hơn

### Listening
- [x] 4 module cards: Icon bên trái, "Coming soon" badge màu amber, mô tả ngắn gọn
- [x] Header card: Icon Headphones, badge "Đang hoàn thiện", title lớn

### Navigation & Global
- [x] BottomNav: Đảm bảo đúng 5 tab chính + "Thêm" (6 nút), icon outline khi inactive, solid khi active
- [x] QuickNavModal: Grid 3x3 hoặc 3x4, mỗi item có icon + label, nút "Đăng xuất" màu đỏ riêng biệt, overlay blur
- [x] Sidebar desktop: Có thể collapse, highlight active item với nền brand-50

---

## Sprint 2: Backend API Integration (Priority: HIGH)

Mục tiêu: Kết nối frontend với các Go/Python services để data thực thay vì mock.

### Auth Service (`services/auth-service`)
- [ ] Chạy `make dev-auth` hoặc `go run` thành công
- [x] Fix login API trả về đúng token (access + refresh)
- [x] Fix register flow
- [ ] OAuth Google callback hoạt động
- [x] Middleware auth cho dashboard routes

### Content Service (`services/content-service`)
- [x] API `GET /api/v1/reading/passages` — list passages theo level
- [x] API `GET /api/v1/reading/passages/:id` — get passage + questions
- [x] API `POST /api/v1/reading/passages/:id/submit` — submit answers

### AI Service (`services/ai-service`)
- [x] API `POST /api/v1/writing/generate` — tạo đoạn văn theo topic + level
- [x] API `POST /api/v1/writing/feedback` — chấm điểm câu viết
- [x] API `POST /api/v1/quiz/generate` — tạo quiz theo loại câu hỏi
- [x] Cấu hình AI provider (OpenAI/Anthropic) qua settings

### Vocabulary Service
- [x] API `GET /api/v1/vocabulary/sets` — list sets
- [x] API `GET /api/v1/vocabulary/sets/:id/words` — words in set
- [x] API `POST /api/v1/vocabulary/words/:id/learn` — mark as learned
- [x] API `POST /api/vocabulary/words/:id/review` — spaced repetition review

### Gamification Service
- [x] API `GET /api/v1/gamification/stats` — XP, streak, rank
- [x] API `GET /api/v1/gamification/challenges` — daily challenges
- [x] API `GET /api/v1/gamification/activity` — heatmap data
- [x] API `GET /api/v1/gamification/leaderboard` — weekly ranking

---

## Sprint 3: Interactive Features — Core Learning Flow (Priority: HIGH)

Mục tiêu: Người dùng có thể thực sự làm bài tập, nhận feedback, và lưu tiến độ.

### Reading Flow
- [x] Trang làm bài `/reading/[id]`: Hiển thị passage + multiple choice questions
- [x] Submit answers, show score, explanation cho từng câu sai
- [x] Lưu lịch sử làm bài

### Writing Flow
- [x] Trang session `/writing/session/[id]`: Hiển thị đoạn văn gốc + input viết lại từng câu
- [x] Gọi AI feedback sau mỗi câu: điểm grammar, structure, vocabulary
- [x] Trang session cho "Luyện viết lại câu" (paraphrase)
- [x] Lưu lịch sử bài viết

### Quiz Flow
- [x] Trang làm bài `/quiz/session/[id]`: Timer, từng câu hỏi 1
- [x] Chế độ thi: Full screen, strict timer, cảnh báo rời trang
- [x] Submit, show score breakdown theo loại câu hỏi
- [x] Review sai

### Vocabulary Flow
- [x] Flashcard mode: Flip card (Anh ↔ Việt), swipe gestures
- [x] Spaced repetition algorithm: SM-2 hoặc tương đương
- [x] "Thêm từ mới": Form thêm từ + nghĩa + ví dụ
- [x] Word bank: Từ điển cá nhân với search, filter theo trạng thái

---

## Sprint 4: Polish & Advanced Features (Priority: MEDIUM)

### Settings Pages
- [x] `/settings` — Hồ sơ: tên, trình độ, mục tiêu, ngôn ngữ, nhắc nhở (mật khẩu chờ auth backend)
- [x] `/settings/ai-provider` — Thêm/xóa/sửa AI provider (API key, model, base URL) — lưu trên thiết bị
- [x] `/settings/dictionary` — Chọn nguồn tra từ mặc định
- [x] `/settings/plan` — Thông tin gói AI, upgrade flow
- [x] `/settings/writing-history` — Bảng lịch sử bài viết
- [x] `/settings/stats` — Thống kê nhanh (XP, streak, số bài)
- [x] `/settings/ai-usage` — Lịch sử gọi AI, token count

### Community & Social
- [x] `/community` — Feed chia sẻ bài viết, đặt câu hỏi
- [x] Leaderboard: Bảng xếp hạng tuần/tháng/tổng
- [x] Following feed

### Notifications
- [x] Realtime notification: SSE stream + notification bell
- [ ] Push notification cho daily reminder, streak at risk (cần service worker + Web Push)

### Feedback
- [x] Kết nối form feedback với backend route (lưu DB / email admin: chờ backend thật)

---

## Sprint 5: DevOps & Production Ready (Priority: MEDIUM)

- [x] Docker Compose full stack: `docker compose up` chạy tất cả services
- [x] CI/CD GitHub Actions: Lint + Test + Build cho Go, Python, TypeScript
- [x] Database migrations với `golang-migrate` cho tất cả Go services
- [x] Health checks cho mọi service
- [x] Rate limiting cho auth và AI endpoints
- [ ] Production build optimizations (image, font, bundle)
- [ ] Deploy lên staging server

---

## Bug Fixes Còn Tồn Đọng (Tech Debt)

- [x] Restore auth redirect trong `app/(dashboard)/layout.tsx` khi backend auth chạy ổn định
- [x] `@english-web/ui` package: Hiện tại chỉ có Button, cần thêm Card, Badge, Input, Select, Dialog
- [x] `@english-web/types` package: Thêm đầy đủ Zod schemas cho writing, reading, quiz, vocab
- [x] Upgrade Next.js 15.1.0 → 15.x patched (CVE-2025-66478)
- [x] Upgrade `recharts` lên v3
- [ ] Unit tests cho tất cả service functions (theo AGENTS.md rule)

---


## Ghi chú triển khai (2026-06-11)

- Content/Vocabulary/Gamification APIs hiện chạy qua Next.js API routes (BFF) với seed data — sẽ chuyển sang Go services khi `content-service`/`gamification-service` được dựng.
- `docker compose up` chỉ chạy các service đã có code (postgres, redis, minio, auth, ai, web); các service tương lai nằm sau profile `future`.
- OAuth Google cần `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` trong `.env` để hoạt động.
- Rate limit hiện in-memory per-instance; chuyển sang Redis sliding window tại API gateway khi scale nhiều replica.
- Unit tests: vitest cho `lib/srs.ts`, `lib/utils.ts` (web); pytest ai-service pass. Cần mở rộng coverage cho components và Go handlers.

## Tiêu chí hoàn thành sprint

- Tất cả pages trong screenshot đều có data thật hoặc mock đầy đủ
- `pnpm build` và `make lint` pass
- Không có console errors khi chạy dev
- Responsive trên mobile (375px) và desktop (1280px+)
