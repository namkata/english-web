# ============================================================
# English Web — Makefile
# Usage: make <target>
#        make help        → list all targets
# ============================================================

.DEFAULT_GOAL := help
.PHONY: help setup setup-env setup-hooks \
        dev dev-web dev-infra \
        build build-web \
        test test-go test-py test-web test-all \
        lint lint-go lint-py lint-web \
        fmt fmt-go fmt-py fmt-web \
        docker-up docker-down docker-build docker-logs docker-clean \
        migrate-up migrate-down \
        gen-key clean

# ── Colours ──────────────────────────────────────────────
CYAN  := \033[0;36m
GREEN := \033[0;32m
YELLOW:= \033[0;33m
RED   := \033[0;31m
RESET := \033[0m

# ── Detect package manager ───────────────────────────────
# pnpm is preferred; falls back to npm if pnpm is not installed.
# Install pnpm globally with: npm install -g pnpm
PNPM := $(shell command -v pnpm 2>/dev/null)
NPM  := $(shell command -v npm  2>/dev/null)

ifdef PNPM
  PKG = pnpm
else ifdef NPM
  PKG = npm
  $(warning $(YELLOW)pnpm not found — falling back to npm. Install pnpm for best results: npm i -g pnpm$(RESET))
else
  $(error $(RED)Neither pnpm nor npm found. Install Node.js first: https://nodejs.org$(RESET))
endif

# ── Detect optional tools (warn, don't fail) ─────────────
HAS_DOCKER     := $(shell command -v docker     2>/dev/null)
HAS_GO         := $(shell command -v go         2>/dev/null)
HAS_PYTHON     := $(shell command -v python3    2>/dev/null)
HAS_GOLINT     := $(shell command -v golangci-lint 2>/dev/null)
HAS_OPENSSL    := $(shell command -v openssl    2>/dev/null)

# ── Helpers ──────────────────────────────────────────────
define log
	@printf "$(CYAN)▶ $(1)$(RESET)\n"
endef

define ok
	@printf "$(GREEN)✓ $(1)$(RESET)\n"
endef

# ============================================================
# HELP
# ============================================================
help: ## Show this help
	@echo ""
	@echo "  English Web — available targets"
	@echo ""
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z_\-]+:.*##/ { \
		printf "  $(CYAN)%-22s$(RESET) %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
	@echo ""

# ============================================================
# SETUP
# ============================================================
setup: setup-node setup-env setup-hooks ## Full first-time project setup
	$(call ok,Setup complete — run 'make dev' to start)

setup-pnpm: ## Install pnpm globally via npm (run this once if pnpm is missing)
	$(call log,Installing pnpm globally...)
	npm install -g pnpm@9
	$(call ok,pnpm installed — re-run make setup)

setup-node: ## Install Node.js dependencies
	$(call log,Installing Node dependencies with $(PKG)...)
	@if [ "$(PKG)" = "pnpm" ]; then \
		pnpm install; \
	else \
		npm install; \
	fi

setup-env: ## Copy .env.example → .env (skip if exists)
	$(call log,Setting up environment files...)
	@[ -f .env ] || cp .env.example .env && echo "  Created root .env"
	@[ -f apps/web/.env.local ] || cp apps/web/.env.example apps/web/.env.local && echo "  Created apps/web/.env.local"
	@[ -f services/auth-service/.env ] || cp services/auth-service/.env.example services/auth-service/.env && echo "  Created services/auth-service/.env"
	@[ -f services/ai-service/.env ] || cp services/ai-service/.env.example services/ai-service/.env && echo "  Created services/ai-service/.env"
	@printf "$(YELLOW)  ⚠  Fill in JWT_SECRET, NEXTAUTH_SECRET, ENCRYPTION_KEY in .env$(RESET)\n"

setup-hooks: ## Install git pre-commit hooks
	$(call log,Installing git hooks...)
	@printf '#!/bin/sh\nmake fmt-go fmt-py fmt-web\nmake lint-go lint-py lint-web\n' > .git/hooks/pre-commit
	@chmod +x .git/hooks/pre-commit
	$(call ok,Git hooks installed)

setup-go: ## Download Go dependencies for all services
	$(call log,Downloading Go modules...)
ifndef HAS_GO
	$(error Go not found. Install from https://go.dev/dl/)
endif
	@for svc in auth-service user-service content-service gamification-service; do \
		if [ -f services/$$svc/go.mod ]; then \
			echo "  → $$svc"; \
			cd services/$$svc && go mod download && cd ../..; \
		fi; \
	done
	$(call ok,Go modules ready)

setup-py: ## Create Python venv + install requirements for ai-service
	$(call log,Setting up Python environment...)
ifndef HAS_PYTHON
	$(error python3 not found. Install from https://python.org)
endif
	cd services/ai-service && python3 -m venv .venv
	cd services/ai-service && .venv/bin/pip install --upgrade pip --quiet
	cd services/ai-service && .venv/bin/pip install -r requirements.txt --quiet
	$(call ok,Python venv ready — activate with: source services/ai-service/.venv/bin/activate)

# ============================================================
# DEVELOPMENT
# ============================================================
dev: dev-infra ## Start infra + web app (most common dev task)
	$(call log,Starting web app...)
	$(PKG) --filter @english-web/web dev

dev-web: ## Start Next.js web app only
	$(PKG) --filter @english-web/web dev

dev-infra: ## Start postgres + redis + minio only
	$(call log,Starting infrastructure services...)
ifndef HAS_DOCKER
	$(error Docker not found. Install from https://docs.docker.com/get-docker/)
endif
	docker compose up -d postgres redis minio
	$(call ok,Infra running — postgres:5432 redis:6379 minio:9000)

dev-auth: ## Start auth-service in development mode
	$(call log,Starting auth-service...)
	cd services/auth-service && go run ./cmd/main.go

dev-ai: ## Start ai-service in development mode
	$(call log,Starting ai-service...)
	cd services/ai-service && .venv/bin/python -m app.main

dev-all: ## Start full stack (docker compose + Next.js hot reload)
	$(call log,Starting full stack...)
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d
	$(call ok,Stack running — web:3000 gateway:3001)

# ============================================================
# BUILD
# ============================================================
build: ## Build all apps and services
	$(call log,Building all packages...)
	$(PKG) turbo run build

build-web: ## Build Next.js web app only
	$(PKG) --filter @english-web/web build

build-go: ## Build all Go services
	$(call log,Building Go services...)
	@for svc in auth-service user-service content-service gamification-service; do \
		if [ -f services/$$svc/go.mod ]; then \
			echo "  → $$svc"; \
			cd services/$$svc && go build ./... && cd ../..; \
		fi; \
	done
	$(call ok,Go services built)

# ============================================================
# TESTING
# ============================================================
test: test-go test-py test-web ## Run all tests

test-go: ## Run Go unit tests (all services)
	$(call log,Running Go tests...)
	@for svc in auth-service user-service content-service gamification-service; do \
		if [ -f services/$$svc/go.mod ]; then \
			echo "  → $$svc"; \
			cd services/$$svc && go test -race -count=1 ./... && cd ../..; \
		fi; \
	done
	$(call ok,Go tests passed)

test-go-coverage: ## Run Go tests with coverage report
	$(call log,Running Go tests with coverage...)
	@for svc in auth-service; do \
		cd services/$$svc && \
		go test -race -coverprofile=coverage.out ./... && \
		go tool cover -html=coverage.out -o coverage.html && \
		echo "  Coverage report: services/$$svc/coverage.html" && \
		cd ../..; \
	done

test-py: ## Run Python unit tests (ai-service)
	$(call log,Running Python tests...)
	cd services/ai-service && .venv/bin/pytest tests/unit/ -v --tb=short
	$(call ok,Python tests passed)

test-py-coverage: ## Run Python tests with coverage
	$(call log,Running Python tests with coverage...)
	cd services/ai-service && .venv/bin/pytest tests/ --cov=app --cov-report=html --cov-fail-under=70
	$(call ok,Coverage report: services/ai-service/htmlcov/index.html)

test-web: ## Run TypeScript/Next.js tests
	$(call log,Running web tests...)
	$(PKG) test
	$(call ok,Web tests passed)

test-all: test ## Alias for test

# ============================================================
# LINTING
# ============================================================
lint: lint-go lint-py lint-web ## Run all linters

lint-go: ## Run golangci-lint on all Go services
	$(call log,Linting Go services...)
ifndef HAS_GOLINT
	$(error golangci-lint not found. Run: make install-tools)
endif
	@for svc in auth-service user-service content-service gamification-service; do \
		if [ -f services/$$svc/.golangci.yml ]; then \
			echo "  → $$svc"; \
			cd services/$$svc && golangci-lint run ./... && cd ../..; \
		fi; \
	done
	$(call ok,Go lint passed)

lint-py: ## Run ruff + mypy on ai-service
	$(call log,Linting Python (ai-service)...)
	cd services/ai-service && .venv/bin/ruff check .
	cd services/ai-service && .venv/bin/mypy app/
	$(call ok,Python lint passed)

lint-web: ## Run ESLint + tsc on web app
	$(call log,Linting TypeScript...)
	$(PKG) lint
	$(PKG) type-check
	$(call ok,TypeScript lint passed)

# ============================================================
# FORMATTING
# ============================================================
fmt: fmt-go fmt-py fmt-web ## Format all code

fmt-go: ## Format Go code (gofmt + goimports)
	$(call log,Formatting Go code...)
	@which goimports > /dev/null || go install golang.org/x/tools/cmd/goimports@latest
	@for svc in auth-service user-service content-service gamification-service; do \
		if [ -f services/$$svc/go.mod ]; then \
			gofmt -w services/$$svc && \
			goimports -w services/$$svc; \
		fi; \
	done
	$(call ok,Go code formatted)

fmt-py: ## Format Python code (ruff format)
	$(call log,Formatting Python code...)
	cd services/ai-service && .venv/bin/ruff format .
	$(call ok,Python code formatted)

fmt-web: ## Format TypeScript/CSS (prettier)
	$(call log,Formatting TypeScript/CSS...)
	$(PKG) prettier --write "apps/**/*.{ts,tsx,css}" "packages/**/*.{ts,tsx}"
	$(call ok,TypeScript code formatted)

# ============================================================
# DOCKER
# ============================================================
docker-up: ## Start all services with Docker Compose
	$(call log,Starting full Docker stack...)
	docker compose up -d
	$(call ok,Stack up — web:3000 gateway:3001 minio-ui:9001)

docker-down: ## Stop all Docker services
	docker compose down

docker-down-volumes: ## Stop Docker services AND delete all volumes (destructive!)
	@printf "$(YELLOW)⚠  This will delete all database data. Continue? [y/N] $(RESET)" && read ans && [ $${ans:-N} = y ]
	docker compose down -v

docker-build: ## Rebuild all Docker images
	$(call log,Building Docker images...)
	docker compose build --no-cache

docker-build-service: ## Build a single service image: make docker-build-service SVC=auth-service
	docker compose build $(SVC)

docker-logs: ## Tail logs from all services
	docker compose logs -f

docker-logs-service: ## Tail logs from one service: make docker-logs-service SVC=auth-service
	docker compose logs -f $(SVC)

docker-ps: ## Show running containers
	docker compose ps

docker-clean: ## Remove stopped containers + dangling images
	$(call log,Cleaning Docker resources...)
	docker compose down --remove-orphans
	docker image prune -f
	$(call ok,Docker cleaned)

# ============================================================
# DATABASE / MIGRATIONS
# ============================================================
db-shell: ## Open psql shell to main postgres
	docker compose exec postgres psql -U $${POSTGRES_USER:-englishweb} -d postgres

db-shell-service: ## Open psql shell to a service DB: make db-shell-service DB=englishweb_auth
	docker compose exec postgres psql -U $${POSTGRES_USER:-englishweb} -d $(DB)

migrate-up: ## Run all pending migrations: make migrate-up SVC=auth-service
	$(call log,Running migrations for $(SVC)...)
	cd services/$(SVC) && migrate -path migrations/ -database "$${DATABASE_URL}" up

migrate-down: ## Rollback last migration: make migrate-down SVC=auth-service
	cd services/$(SVC) && migrate -path migrations/ -database "$${DATABASE_URL}" down 1

migrate-create: ## Create a new migration: make migrate-create SVC=auth-service NAME=add_oauth_accounts
	$(call log,Creating migration $(NAME) for $(SVC)...)
	cd services/$(SVC) && migrate create -ext sql -dir migrations -seq $(NAME)

# ============================================================
# UTILITIES
# ============================================================
gen-key: ## Generate secure random secrets for .env
	$(call log,Generating secure keys...)
ifndef HAS_OPENSSL
	$(error openssl not found. Install via: brew install openssl  OR  apt install openssl)
endif
	@echo ""
	@printf "JWT_SECRET=$$(openssl rand -hex 64)\n"
	@printf "NEXTAUTH_SECRET=$$(openssl rand -hex 32)\n"
	@printf "INTERNAL_SERVICE_SECRET=$$(openssl rand -hex 32)\n"
	@printf "ENCRYPTION_KEY=$$(openssl rand -hex 16)\n"
	@echo ""
	@printf "$(YELLOW)  Copy the values above into your .env file$(RESET)\n"

install-tools: ## Install required CLI tools (golangci-lint, migrate, ruff, mypy)
	$(call log,Installing CLI tools...)
	@which golangci-lint > /dev/null || curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $$(go env GOPATH)/bin
	@which migrate > /dev/null || go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
	@which goimports > /dev/null || go install golang.org/x/tools/cmd/goimports@latest
	$(call ok,Tools installed)

clean: ## Remove all build artifacts and caches
	$(call log,Cleaning build artifacts...)
	rm -rf apps/web/.next apps/web/out
	rm -rf packages/*/dist packages/*/build
	find services -name "bin" -type d -exec rm -rf {} + 2>/dev/null || true
	find services -name "coverage.out" -o -name "coverage.html" | xargs rm -f 2>/dev/null || true
	find services/ai-service -name "__pycache__" -type d -exec rm -rf {} + 2>/dev/null || true
	find services/ai-service -name "htmlcov" -type d -exec rm -rf {} + 2>/dev/null || true
	$(PKG) turbo run clean 2>/dev/null || true
	$(call ok,Clean done)

check: lint test ## Run lint + tests (pre-PR check)
	$(call ok,All checks passed — ready to open PR)
