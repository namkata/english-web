"""Quiz generation service."""

from __future__ import annotations

from typing import Any

from app.schemas.quiz import GenerateQuizRequest


class QuizService:
    async def generate(self, req: GenerateQuizRequest) -> dict[str, Any]:
        # TODO: pick from question bank or call AI provider
        return {
            "id": "quiz-placeholder",
            "level": req.level,
            "questionCount": req.question_count,
            "questions": [],
            "examMode": req.exam_mode,
        }


def get_quiz_service() -> QuizService:
    return QuizService()
