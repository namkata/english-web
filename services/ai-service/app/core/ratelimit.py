"""In-memory sliding-window rate limiter middleware.

AI endpoints are expensive (LLM calls), so each client IP gets a small
per-minute budget. Single-process by design — replace with the Redis
sliding window at the API gateway when running multiple replicas.
"""

import time
from collections import defaultdict

from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.types import ASGIApp

_EXEMPT_PATHS = ("/health", "/docs", "/openapi.json")


class RateLimitMiddleware(BaseHTTPMiddleware):
    """Limit each client IP to `limit` requests per `window_seconds`."""

    def __init__(self, app: ASGIApp, limit: int = 20, window_seconds: int = 60) -> None:
        super().__init__(app)
        self.limit = limit
        self.window = window_seconds
        self._hits: dict[str, list[float]] = defaultdict(list)
        self._last_gc = time.monotonic()

    def _allow(self, key: str) -> bool:
        now = time.monotonic()
        cutoff = now - self.window

        # Periodic GC so idle keys don't accumulate.
        if now - self._last_gc > 300:
            for k in [k for k, ts in self._hits.items() if not ts or ts[-1] < cutoff]:
                del self._hits[k]
            self._last_gc = now

        hits = [t for t in self._hits[key] if t > cutoff]
        if len(hits) >= self.limit:
            self._hits[key] = hits
            return False

        hits.append(now)
        self._hits[key] = hits
        return True

    async def dispatch(self, request: Request, call_next):  # type: ignore[no-untyped-def]
        if request.url.path in _EXEMPT_PATHS:
            return await call_next(request)

        client_ip = request.client.host if request.client else "unknown"
        if not self._allow(client_ip):
            return JSONResponse(
                status_code=429,
                content={
                    "success": False,
                    "error": {
                        "code": "RATE_LIMITED",
                        "message": "Bạn thao tác quá nhanh. Vui lòng thử lại sau ít phút.",
                    },
                },
            )
        return await call_next(request)
