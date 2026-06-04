"""
Canonical HTTP response helpers.

ALL routers MUST use these helpers.
Do NOT construct response dicts manually in routers.

Success:  response.ok(data) / response.created(data)
Error:    response.error(app_error)         <- only AppError allowed
Internal: response.internal()              <- logs raw error, returns generic message
"""

from __future__ import annotations

import logging
from typing import Any

from app.core.errors import ERR_INTERNAL, AppError
from fastapi import Response
from fastapi.responses import JSONResponse

logger = logging.getLogger(__name__)


def ok(data: Any, message: str = "") -> JSONResponse:
    body: dict[str, Any] = {"success": True, "data": data}
    if message:
        body["message"] = message
    return JSONResponse(content=body, status_code=200)


def created(data: Any) -> JSONResponse:
    return JSONResponse(content={"success": True, "data": data}, status_code=201)


def no_content() -> Response:
    return Response(status_code=204)


def error(app_error: AppError) -> JSONResponse:
    return JSONResponse(
        content={
            "success": False,
            "error": {"code": app_error.code, "message": app_error.message},
        },
        status_code=app_error.status_code,
    )


def internal(raw_error: Exception | None = None) -> JSONResponse:
    """Log the raw error server-side, return generic 500 to client."""
    if raw_error:
        logger.exception("Unhandled internal error", exc_info=raw_error)
    return error(ERR_INTERNAL)
