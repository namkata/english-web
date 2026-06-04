"""
Unit tests for WritingService.

Rules enforced:
- No real DB — all repos are mocked
- Assertions on AppError.code, never on raw exception types
- Every business rule has at least one test
"""

from __future__ import annotations

from uuid import uuid4

import pytest
from app.schemas.writing import CreateWritingSessionRequest, SubmitSentenceRequest
from app.services.writing_service import WritingService
from pydantic import ValidationError


@pytest.fixture
def service() -> WritingService:
    return WritingService()


class TestCreateSession:
    """Tests for WritingService.create_session"""

    # @since v0.1.0
    async def test_create_session_returns_session_dict(self, service: WritingService) -> None:
        req = CreateWritingSessionRequest(
            difficulty="easy",
            topic="At the dentist",
            mode="sentence_writing",
            level="B1",
        )
        result = await service.create_session(req)

        assert result["topic"] == "At the dentist"
        assert result["level"] == "B1"
        assert result["completedSentences"] == 0

    async def test_create_session_hard_difficulty(self, service: WritingService) -> None:
        req = CreateWritingSessionRequest(
            difficulty="hard",
            topic="Technology and society",
            mode="sentence_rewrite",
            level="C1",
        )
        result = await service.create_session(req)
        assert result["difficulty"] == "hard"
        assert result["mode"] == "sentence_rewrite"


class TestSubmitSentence:
    """Tests for WritingService.submit_sentence"""

    # @since v0.1.0
    async def test_submit_returns_feedback(self, service: WritingService) -> None:
        session_id = uuid4()
        result = await service.submit_sentence(session_id, "I go to the dentist yesterday.")

        assert "score" in result
        assert "grammarErrors" in result
        assert "overallFeedback" in result
        assert isinstance(result["score"], int)

    async def test_submit_empty_sentence_raises_validation(self, service: WritingService) -> None:
        """Pydantic schema should prevent empty sentences before reaching service."""
        with pytest.raises(ValidationError):
            SubmitSentenceRequest(user_sentence="")


class TestErrorMapping:
    """Verify that service layer raises AppError, never raw exceptions."""

    async def test_no_ai_provider_raises_app_error(self) -> None:
        """
        When user has no AI provider, service must raise ERR_NO_AI_PROVIDER.
        RULE: Must be AppError with code NO_AI_PROVIDER — never a raw KeyError or None access.
        """
        # TODO: wire mock repo that returns no provider, then assert AppError.code
        pass
