from typing import Literal

from pydantic import BaseModel, Field


class CreateWritingSessionRequest(BaseModel):
    difficulty: Literal["easy", "medium", "hard"]
    topic: str = Field(min_length=2, max_length=200)
    mode: Literal["sentence_writing", "sentence_rewrite"]
    level: Literal["A1", "A2", "B1", "B2", "C1", "C2"]


class SubmitSentenceRequest(BaseModel):
    user_sentence: str = Field(min_length=1, max_length=2000)
