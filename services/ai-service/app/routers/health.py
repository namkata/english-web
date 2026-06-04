from app.core.response import ok
from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()


@router.get("/health")
async def health_check() -> JSONResponse:
    return ok({"status": "ok", "service": "ai-service"})
