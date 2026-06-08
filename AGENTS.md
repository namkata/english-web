# English Web — AGENTS.md
# Rules for AI agents working on this codebase

Read **CLAUDE.md** first for project overview, tech stack, and sprint plan.
This file defines the **non-negotiable engineering rules** every agent must follow when writing or reviewing code.

---

## 1. Error Handling — The Golden Rule

> **NEVER expose raw database, driver, or third-party SDK errors to the client.**
> All errors must travel through the canonical `AppError` type before reaching any HTTP response.

### Error Flow (mandatory)

```
Repository layer      →  returns (value, error)       ← raw Go/Python errors stay here
        ↓
Service layer         →  maps raw errors to AppError   ← ONLY place that knows DB semantics
        ↓
Handler/Router layer  →  calls response.Error(appErr)  ← never reads raw errors
        ↓
Client                →  receives { success: false, error: { code, message } }
```

### Go — Required Pattern

```go
// ✅ CORRECT — service wraps DB result, never leaks it
func (s *authService) Register(ctx context.Context, req dto.RegisterRequest) (*dto.AuthResponse, error) {
    // Business check BEFORE any DB write
    existing, _ := s.users.FindByEmail(ctx, req.Email)
    if existing != nil {
        return nil, apperrors.ErrEmailExists  // ← AppError, not a DB error
    }
    if err := s.users.Create(ctx, user); err != nil {
        // Log raw error server-side, return generic AppError
        slog.Error("create user failed", "error", err)
        return nil, apperrors.ErrInternal
    }
    ...
}

// ❌ WRONG — leaking DB duplicate key error
func (s *authService) Register(...) {
    if err := s.users.Create(ctx, user); err != nil {
        return nil, err  // ← exposes "duplicate key value violates unique constraint"
    }
}
```

### Python — Required Pattern

```python
# ✅ CORRECT
async def register(self, req: RegisterRequest) -> AuthResponse:
    existing = await self.user_repo.find_by_email(req.email)
    if existing:
        raise ERR_EMAIL_EXISTS  # AppError, raised before any DB write

    try:
        user = await self.user_repo.create(...)
    except Exception as e:
        log.exception("create_user_failed", error=str(e))
        raise ERR_INTERNAL  # generic, no DB detail

# ❌ WRONG
    except SQLAlchemyError as e:
        raise HTTPException(detail=str(e), ...)  # leaks internals
```

---

## 2. Business Validation — Service Layer Owns It

All existence/uniqueness/business rule checks live in the **service layer**, not handlers and not the DB.

| Check | Where to implement | Error to return |
|---|---|---|
| Email already registered | service: `FindByEmail` before `Create` | `ErrEmailExists` |
| Required fields missing | handler: `ShouldBindJSON` / Pydantic | `ErrValidation` (with field details) |
| Password too weak | service: `validator.IsStrongPassword` | `ErrValidation` |
| Session not found | service: check `FindByToken` result | `ErrTokenExpired` |
| User not found | service: check `FindByID` result | `ErrNotFound` |
| AI provider missing | service: check provider existence | `ErrNoAIProvider` |
| Quota exceeded | service: check counter in Redis | `ErrAIQuotaExceeded` |

**Rule:** The handler only binds request → calls service → calls `response.OK` or `response.Error`. It never contains `if err.Contains("duplicate")` style logic.

---

## 3. Response Structure — Canonical Shapes

Every API response MUST conform to one of these two shapes. Use the helpers; never write raw JSON manually.

### Success

```json
{
  "success": true,
  "data": { ... },
  "message": "optional human-readable note"
}
```

**Go helpers** (`pkg/response/response.go`):
```go
response.OK(c, data)
response.OKWithMessage(c, data, "Đăng ký thành công!")
response.Created(c, data)
response.NoContent(c)
```

**Python helpers** (`app/core/response.py`):
```python
return ok(data)
return ok(data, message="Đăng ký thành công!")
return created(data)
return no_content()
```

### Error

```json
{
  "success": false,
  "error": {
    "code": "EMAIL_EXISTS",
    "message": "Email này đã được sử dụng."
  }
}
```

**Go**: `response.Error(c, apperrors.ErrEmailExists)`
**Python**: `raise ERR_EMAIL_EXISTS` (caught by global exception handler in `main.py`)

---

## 4. Constants — Never Hardcode

All magic strings, numbers, and key names live in the constants package.

| Language | File |
|---|---|
| Go | `pkg/constants/constants.go` |
| Python | `app/core/constants.py` |
| TypeScript | `packages/types/src/common.ts` + `apps/web/lib/constants.ts` |

```go
// ✅
c.Set(constants.CtxUserID, userID)

// ❌
c.Set("userID", userID)
```

---

## 5. Shared Utilities

| Utility | Go | Python | TypeScript |
|---|---|---|---|
| Input validation | `pkg/validator/validator.go` | Pydantic schemas | Zod schemas in `@english-web/types` |
| Response helpers | `pkg/response/response.go` | `app/core/response.py` | `lib/api-client.ts` |
| Error definitions | `pkg/errors/errors.go` | `app/core/errors.py` | `packages/types/src/common.ts` |
| App constants | `pkg/constants/constants.go` | `app/core/constants.py` | `lib/constants.ts` |
| Structured logging | `slog` (standard lib) | `structlog` | `console.warn/error` only |

---

## 6. Code Formatters (must pass before any commit)

### Go
```bash
# Format
gofmt -w .
goimports -w .

# Lint (CI-blocking)
golangci-lint run ./...
```

Config: `services/<service>/.golangci.yml` (already committed).

### Python
```bash
# Format
ruff format .

# Lint
ruff check .

# Type check
mypy app/
```

Config: `services/ai-service/pyproject.toml`.

### TypeScript / Next.js
```bash
# Format
pnpm prettier --write .

# Lint
pnpm eslint .

# Type check
pnpm type-check
```

All three must pass in CI (`.github/workflows/ci.yml`) before merge.

---

## 7. Unit Tests — Mandatory Coverage

Every service function that contains **business logic** must have a unit test.

### Go test rules
- File: `internal/service/<name>_test.go`
- Use `_test` package suffix for black-box testing
- Inject mock repositories via interfaces — never use a real DB in unit tests
- Table-driven tests preferred

```go
func TestRegister_DuplicateEmail_ReturnsErrEmailExists(t *testing.T) {
    // seed existing user in mock repo
    // call svc.Register
    // assert err.(*AppError).Code == "EMAIL_EXISTS"
}
```

Run: `go test ./...`

### Python test rules
- File: `tests/unit/test_<service>.py`
- Use `pytest` + `pytest-asyncio`
- Mock DB via `unittest.mock.AsyncMock`
- Assert raised `AppError.code`, never raw exception types

```python
async def test_register_duplicate_email_raises_app_error():
    svc = WritingService(user_repo=mock_repo_with_existing_user)
    with pytest.raises(AppError) as exc:
        await svc.register(...)
    assert exc.value.code == "EMAIL_EXISTS"
```

Run: `pytest tests/unit/ -v`

### TypeScript test rules
- File: `*.test.ts` co-located with the module
- Use Vitest
- Test Zod schemas, utils, and server actions

Run: `pnpm test`

---

## 8. Release Notes — Per-Function Changelog

Every non-trivial function/endpoint must carry a `// @since` and `// @changelog` comment block.

### Go example
```go
// Register creates a new user account.
//
// @since   v0.1.0
// @changelog
//   v0.1.0 — initial implementation, email/password registration
//   v0.1.1 — added bcrypt cost constant (BcryptCost) instead of hardcoded 10
func (s *authService) Register(ctx context.Context, req dto.RegisterRequest) (*dto.AuthResponse, error) {
```

### Python example
```python
async def submit_sentence(self, session_id: UUID, user_sentence: str) -> WritingFeedback:
    """
    Submit a user-written sentence and return AI feedback.

    @since     v0.1.0
    @changelog
      v0.1.0 — initial implementation, OpenAI feedback
      v0.2.0 — added Anthropic provider fallback
    """
```

### TypeScript example
```ts
/**
 * Generate a greeting based on the current hour.
 *
 * @since v0.1.0
 * @changelog
 *   v0.1.0 — initial implementation
 */
export function getGreeting(): string {
```

When a function is modified, **always** add a changelog entry — no exceptions.

---

## 9. Database Connection Rules

1. **Connection pooling**: Always configure `SetMaxOpenConns` (Go) / pool settings (SQLAlchemy) — never use defaults.
2. **Health checks**: All services expose `GET /health` which verifies DB connectivity.
3. **Graceful shutdown**: On SIGINT/SIGTERM, drain in-flight requests before closing DB pool.
4. **Migrations**: Use `golang-migrate` (Go) / `alembic` (Python). Never use `AutoMigrate` in production builds — only in dev/test.
5. **Transactions**: Multi-table writes MUST be wrapped in a transaction. Pass `*gorm.DB` / SQLAlchemy `AsyncSession` through the call chain.
6. **No raw queries with string interpolation**: Use parameterised queries everywhere.

```go
// ✅
db.Where("email = ?", email).First(&user)

// ❌
db.Raw("SELECT * FROM users WHERE email = '" + email + "'")
```

---

## 10. Security Checklist (per PR)

Before opening a PR, verify:

- [ ] No secrets or API keys in source code
- [ ] All endpoints that need auth use `middleware.RequireAuth()` / `Depends(require_auth)`
- [ ] Input validated via binding tags / Pydantic / Zod before any DB call
- [ ] No raw DB errors reach the client
- [ ] Sensitive fields (`password_hash`, `api_key`) never included in response structs
- [ ] Rate limiting applied at gateway for auth endpoints
- [ ] New env vars added to `.env.example` with a comment

---

## 11. File & Folder Conventions

```
# Go service — where things live
cmd/main.go               ← entry point only, no business logic
internal/handler/         ← bind request → call service → write response
internal/service/         ← all business logic + validation
internal/repository/      ← DB queries only, return raw models
internal/model/           ← GORM structs
internal/dto/             ← request / response structs (no GORM tags)
internal/middleware/       ← auth, logging, recovery, CORS
pkg/errors/               ← AppError definitions
pkg/response/             ← response.OK / response.Error helpers
pkg/constants/            ← magic-free constants
pkg/validator/            ← reusable validation helpers
pkg/database/             ← DB connection + migration helper
migrations/               ← SQL migration files (golang-migrate format)

# Python service
app/routers/              ← FastAPI route handlers (thin)
app/services/             ← business logic
app/models/               ← SQLAlchemy ORM models
app/schemas/              ← Pydantic request/response schemas
app/core/errors.py        ← AppError definitions
app/core/response.py      ← ok() / created() / error() helpers
app/core/constants.py     ← immutable constants
app/core/config.py        ← pydantic-settings config
tests/unit/               ← unit tests (no real DB)
tests/integration/        ← integration tests (testcontainers)
```

---

## 12. Agent Dos and Don'ts

| ✅ DO | ❌ DON'T |
|---|---|
| Read CLAUDE.md + AGENTS.md before any change | Skip validation and go straight to DB |
| Use `response.OK/Error` helpers | Write `c.JSON(200, gin.H{...})` directly |
| Define errors in `pkg/errors` / `app/core/errors.py` | Return `fmt.Errorf("db error: %v", err)` to the client |
| Add `@since` + `@changelog` to every modified function | Modify a function without updating its changelog |
| Add constants to the constants file | Hardcode `"userID"` in handlers |
| Write a unit test for every service change | Ship business logic without tests |
| Validate in service before DB call | Rely on DB unique constraints as validation |
| Add new env vars to `.env.example` | Hardcode config values in source |
| Run `golangci-lint` / `ruff` / `eslint` before committing | Commit code that fails linting |

## Imported Claude Cowork project instructions
