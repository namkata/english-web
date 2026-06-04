package errors

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// AppError is a structured application error.
type AppError struct {
	Code       string `json:"code"`
	Message    string `json:"message"` // user-friendly Vietnamese message
	StatusCode int    `json:"-"`
}

func (e *AppError) Error() string { return e.Message }

// Common errors
var (
	ErrUnauthorized       = &AppError{Code: "UNAUTHORIZED", Message: "Bạn chưa đăng nhập. Vui lòng đăng nhập lại.", StatusCode: http.StatusUnauthorized}
	ErrInvalidCredentials = &AppError{Code: "INVALID_CREDENTIALS", Message: "Email hoặc mật khẩu không đúng.", StatusCode: http.StatusUnauthorized}
	ErrEmailExists        = &AppError{Code: "EMAIL_EXISTS", Message: "Email này đã được sử dụng.", StatusCode: http.StatusConflict}
	ErrNotFound           = &AppError{Code: "NOT_FOUND", Message: "Không tìm thấy dữ liệu yêu cầu.", StatusCode: http.StatusNotFound}
	ErrValidation         = &AppError{Code: "VALIDATION_ERROR", Message: "Dữ liệu không hợp lệ.", StatusCode: http.StatusBadRequest}
	ErrInternal           = &AppError{Code: "INTERNAL_ERROR", Message: "Đã xảy ra lỗi. Vui lòng thử lại sau.", StatusCode: http.StatusInternalServerError}
	ErrTokenExpired       = &AppError{Code: "TOKEN_EXPIRED", Message: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.", StatusCode: http.StatusUnauthorized}
)

// Respond writes a JSON error response.
func Respond(c *gin.Context, err *AppError) {
	c.JSON(err.StatusCode, gin.H{
		"success": false,
		"error": gin.H{
			"code":    err.Code,
			"message": err.Message,
		},
	})
}
