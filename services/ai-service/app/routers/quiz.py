"""AI quiz generation endpoints."""

from app.core.response import created
from app.schemas.quiz import GenerateQuizRequest
from app.services.quiz_service import QuizService, get_quiz_service
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

router = APIRouter(tags=["Quiz"])


@router.post("")
async def generate_quiz(
    body: GenerateQuizRequest,
    svc: QuizService = Depends(get_quiz_service),
) -> JSONResponse:
    quiz = await svc.generate(body)
    return created(quiz)
