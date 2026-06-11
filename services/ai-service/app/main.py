"""FastAPI application factory."""

import structlog
import uvicorn
from app.core.config import settings
from app.core.errors import AppError
from app.core.ratelimit import RateLimitMiddleware
from app.core.response import error as error_response
from app.routers import health, quiz, writing
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

log = structlog.get_logger()


def create_app() -> FastAPI:
    app = FastAPI(
        title="English Web — AI Service",
        version="0.1.0",
        docs_url="/docs" if settings.is_development else None,
        redoc_url=None,
    )

    # AI endpoints are LLM-backed and costly: 20 requests / minute / IP
    app.add_middleware(RateLimitMiddleware, limit=20, window_seconds=60)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"] if settings.is_development else [],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Global exception handler — maps AppError → canonical error response
    @app.exception_handler(AppError)
    async def app_error_handler(_: Request, exc: AppError) -> JSONResponse:
        return error_response(exc)

    # Catch-all for unexpected errors
    @app.exception_handler(Exception)
    async def generic_error_handler(_: Request, exc: Exception) -> JSONResponse:
        log.exception("unhandled_exception", error=str(exc))
        from app.core.response import internal

        return internal(exc)

    app.include_router(health.router)
    app.include_router(writing.router, prefix="/api/v1/writing")
    app.include_router(quiz.router, prefix="/api/v1/quiz")

    return app


app = create_app()

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=settings.app_port, reload=settings.is_development)
