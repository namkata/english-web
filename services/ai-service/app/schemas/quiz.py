from typing import Literal

from pydantic import BaseModel, Field


class GenerateQuizRequest(BaseModel):
    level: Literal["A1", "A2", "B1", "B2", "C1", "C2"]
    question_count: int = Field(default=15, ge=5, le=100)
    question_types: list[str] = Field(min_length=1)
    exam_mode: bool = False
