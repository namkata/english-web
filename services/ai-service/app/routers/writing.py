"""Writing practice endpoints."""

from uuid import UUID

from app.core.response import created, ok
from app.schemas.writing import CreateWritingSessionRequest, SubmitSentenceRequest
from app.services.writing_service import WritingService, get_writing_service
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

router = APIRouter(tags=["Writing"])


@router.post("/sessions")
async def create_session(
    body: CreateWritingSessionRequest,
    svc: WritingService = Depends(get_writing_service),
) -> JSONResponse:
    session = await svc.create_session(body)
    return created(session)


@router.post("/sessions/{session_id}/submit")
async def submit_sentence(
    session_id: UUID,
    body: SubmitSentenceRequest,
    svc: WritingService = Depends(get_writing_service),
) -> JSONResponse:
    feedback = await svc.submit_sentence(session_id, body.user_sentence)
    return ok(feedback)
