# Implementation Plan / Roadmap — English Web

> Cập nhật: 2026-06-04 sau khi fix xong lỗi dev server, CSS, build, và mock data cơ bản.

---

## Sprint 1: UI Polish — Khớp 100% Screenshots (Priority: HIGH)

Mục tiêu: Tinh chỉnh layout, spacing, typography, colors và thiếu component cho khớp design gốc.

### Dashboard
- [ ] Heatmap: Thêm nhiều mock data hơn (91 ngày với gradient intensity) để grid đầy màu
- [ ] Header: Thêm avatar user, notification badge với số đếm
- [ ] XP Progress: Thanh progress bar đúng màu brand, thêm icon flame/ streak đúng style
- [ ] Daily Challenges: Checkbox style tròn thay vì vuông; chevron arrow đúng vị trí
- [ ] Weekly Ranking: Nền màu xanh nhạt đúng như screenshot (bg-accent/40 → đổi thành màu xanh mint)
- [ ] Learning Modules: Thêm icon nền mờ (ghost icon) bên phải mỗi card; tags có màu riêng (vàng, xanh, cam)

### Reading
- [ ] Passage card: Badge "Vừa / Ngắn / Dài" + "7 câu" nằm cùng hàng, style pill màu xanh mint
- [ ] AI Generate Card: Thêm icon sparkle lớn bên phải, nền gradient xanh nhạt
- [ ] Level Filter: A1 badge active màu đen, các level khác viền xám
- [ ] Thêm mock data đủ 6 bài đọc đầu tiên (hiện tại chỉ có text, thiếu content đầy đủ)

### Writing
- [ ] Button "Bắt đầu luyện viết từng câu": Đổi thành style primary đậm, có icon arrow
- [ ] Step cards: Viền selected màu brand-500, nền brand-50
- [ ] Thêm link "Xem gói AI hệ thống" + "thêm API riêng" bên dưới form

### Vocabulary
- [ ] Header đúng: "Bộ từ của tôi" + button "+ Thêm từ" màu primary
- [ ] Word detail cards: Hiển thị từng từ với IPA UK/US, loại từ, nghĩa, ví dụ, ảnh minh họa, trạng thái "Đã thuộc / Mới"
- [ ] Sidebar bộ từ: Progress bar đúng màu, số % nổi bật
- [ ] Thêm mock data cho ~12 từ trong bộ TOEIC 600

### Quiz
- [ ] Checkbox list: Style đẹp hơn, 2 cột đều, scroll nếu quá dài
- [ ] Button "Tạo bài tập": Icon sparkle, màu primary đậm
- [ ] Chế độ thi: Card viền nhẹ, mô tả rõ ràng hơn

### Listening
- [ ] 4 module cards: Icon bên trái, "Coming soon" badge màu amber, mô tả ngắn gọn
- [ ] Header card: Icon Headphones, badge "Đang hoàn thiện", title lớn

### Navigation & Global
- [ ] BottomNav: Đảm bảo đúng 5 tab chính + "Thêm" (6 nút), icon outline khi inactive, solid khi active
- [ ] QuickNavModal: Grid 3x3 hoặc 3x4, mỗi item có icon + label, nút "Đăng xuất" màu đỏ riêng biệt, overlay blur
- [ ] Sidebar desktop: Có thể collapse, highlight active item với nền brand-50

---

## Sprint 2: Backend API Integration (Priority: HIGH)

Mục tiêu: Kết nối frontend với các Go/Python services để data thực thay vì mock.

### Auth Service (`services/auth-service`)
- [ ] Chạy `make dev-auth` hoặc `go run` thành công
- [ ] Fix login API trả về đúng token (access + refresh)
- [ ] Fix register flow
- [ ] OAuth Google callback hoạt động
- [ ] Middleware auth cho dashboard routes

### Content Service (`services/content-service`)
- [ ] API `GET /api/v1/reading/passages` — list passages theo level
- [ ] API `GET /api/v1/reading/passages/:id` — get passage + questions
- [ ] API `POST /api/v1/reading/passages/:id/submit` — submit answers

### AI Service (`services/ai-service`)
- [ ] API `POST /api/v1/writing/generate` — tạo đoạn văn theo topic + level
- [ ] API `POST /api/v1/writing/feedback` — chấm điểm câu viết
- [ ] API `POST /api/v1/quiz/generate` — tạo quiz theo loại câu hỏi
- [ ] Cấu hình AI provider (OpenAI/Anthropic) qua settings

### Vocabulary Service
- [ ] API `GET /api/v1/vocabulary/sets` — list sets
- [ ] API `GET /api/v1/vocabulary/sets/:id/words` — words in set
- [ ] API `POST /api/v1/vocabulary/words/:id/learn` — mark as learned
- [ ] API `POST /api/vocabulary/words/:id/review` — spaced repetition review

### Gamification Service
- [ ] API `GET /api/v1/gamification/stats` — XP, streak, rank
- [ ] API `GET /api/v1/gamification/challenges` — daily challenges
- [ ] API `GET /api/v1/gamification/activity` — heatmap data
- [ ] API `GET /api/v1/gamification/leaderboard` — weekly ranking

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

- [ ] Docker Compose full stack: `docker compose up` chạy tất cả services
- [ ] CI/CD GitHub Actions: Lint + Test + Build cho Go, Python, TypeScript
- [ ] Database migrations với `golang-migrate` cho tất cả Go services
- [ ] Health checks cho mọi service
- [ ] Rate limiting cho auth và AI endpoints
- [ ] Production build optimizations (image, font, bundle)
- [ ] Deploy lên staging server

---

## Bug Fixes Còn Tồn Đọng (Tech Debt)

- [ ] Restore auth redirect trong `app/(dashboard)/layout.tsx` khi backend auth chạy ổn định
- [ ] `@english-web/ui` package: Hiện tại chỉ có Button, cần thêm Card, Badge, Input, Select, Dialog
- [ ] `@english-web/types` package: Thêm đầy đủ Zod schemas cho writing, reading, quiz, vocab
- [ ] Upgrade Next.js 15.1.0 → 15.x patched (CVE-2025-66478)
- [ ] Upgrade `recharts` lên v3
- [ ] Unit tests cho tất cả service functions (theo AGENTS.md rule)

---

## Tiêu chí hoàn thành sprint

- Tất cả pages trong screenshot đều có data thật hoặc mock đầy đủ
- `pnpm build` và `make lint` pass
- Không có console errors khi chạy dev
- Responsive trên mobile (375px) và desktop (1280px+)
