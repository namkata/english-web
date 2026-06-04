"""
Writing service — orchestrates AI feedback generation.

Business rules enforced HERE (not in router, not via DB errors):
 - Session must exist before submitting a sentence
 - User must have an AI provider configured (or system key available)
 - Sentence count cannot exceed MAX_WRITING_SENTENCES
"""

from __future__ import annotations

import logging
from typing import Any
from uuid import UUID

from app.schemas.writing import CreateWritingSessionRequest

log = logging.getLogger(__name__)


class WritingService:
    async def create_session(self, req: CreateWritingSessionRequest) -> dict[str, Any]:
        # TODO: persist to DB, generate AI passage
        return {
            "id": "00000000-0000-0000-0000-000000000001",
            "difficulty": req.difficulty,
            "topic": req.topic,
            "mode": req.mode,
            "level": req.level,
            "completedSentences": 0,
            "totalSentences": 5,
            "averageScore": None,
        }

    async def submit_sentence(self, session_id: UUID, user_sentence: str) -> dict[str, Any]:
        # TODO: load session from DB; raise ERR_NOT_FOUND if missing
        # TODO: load user AI provider; raise ERR_NO_AI_PROVIDER if absent
        # TODO: call AI provider for feedback
        return {
            "sentenceId": str(session_id),
            "userSentence": user_sentence,
            "score": 80,
            "grammarErrors": [],
            "vocabularyFeedback": "Good vocabulary usage.",
            "overallFeedback": "Your sentence is clear and well-structured.",
            "improvedVersion": None,
        }


def get_writing_service() -> WritingService:
    return WritingService()
