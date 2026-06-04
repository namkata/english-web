"""
Canonical application errors.

RULE: All errors returned to clients MUST be AppError instances.
      Raw DB errors, SQLAlchemy exceptions, or provider SDK errors must
      be caught in the service layer and mapped to an AppError before propagation.
      The handler layer calls response.error() which reads AppError fields.
"""

from dataclasses import dataclass
from http import HTTPStatus


@dataclass
class AppError(Exception):
    code: str
    message: str  # Vietnamese, user-facing
    status_code: int

    def __str__(self) -> str:
        return self.message


# ---- Auth ----
ERR_UNAUTHORIZED = AppError("UNAUTHORIZED", "Bạn chưa đăng nhập. Vui lòng đăng nhập lại.", HTTPStatus.UNAUTHORIZED)
ERR_FORBIDDEN = AppError("FORBIDDEN", "Bạn không có quyền thực hiện hành động này.", HTTPStatus.FORBIDDEN)

# ---- AI ----
ERR_NO_AI_PROVIDER = AppError(
    "NO_AI_PROVIDER",
    "Bạn chưa cấu hình nguồn AI. Vui lòng thêm API key trong Cài đặt.",
    HTTPStatus.UNPROCESSABLE_ENTITY,
)
ERR_AI_PROVIDER_FAILED = AppError(
    "AI_PROVIDER_FAILED",
    "Nguồn AI hiện không khả dụng. Vui lòng thử lại sau.",
    HTTPStatus.BAD_GATEWAY,
)
ERR_AI_QUOTA_EXCEEDED = AppError("AI_QUOTA_EXCEEDED", "Bạn đã dùng hết quota AI hôm nay.", HTTPStatus.TOO_MANY_REQUESTS)

# ---- Content ----
ERR_NOT_FOUND = AppError("NOT_FOUND", "Không tìm thấy dữ liệu yêu cầu.", HTTPStatus.NOT_FOUND)
ERR_VALIDATION = AppError("VALIDATION_ERROR", "Dữ liệu không hợp lệ.", HTTPStatus.UNPROCESSABLE_ENTITY)

# ---- General ----
ERR_INTERNAL = AppError("INTERNAL_ERROR", "Đã xảy ra lỗi. Vui lòng thử lại sau.", HTTPStatus.INTERNAL_SERVER_ERROR)
