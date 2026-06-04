// Package response provides canonical JSON response builders.
// ALL handlers MUST use these helpers — never write gin.H directly.
//
// Rules (enforced by code review):
//  1. Success responses:  response.OK / response.Created
//  2. Error responses:    response.Error (pass an *apperrors.AppError)
//  3. NEVER expose raw DB errors, driver messages, or SQL to the client.
//     Wrap DB errors in apperrors.ErrInternal before they leave the service layer.
package response

import (
	"net/http"

	"github.com/gin-gonic/gin"

	apperrors "github.com/english-web/auth-service/pkg/errors"
)

// SuccessEnvelope is the canonical success response shape.
//
//	{ "success": true, "data": <T>, "message": "<optional>" }
type SuccessEnvelope struct {
	Success bool   `json:"success"`
	Data    any    `json:"data"`
	Message string `json:"message,omitempty"`
}

// ErrorEnvelope is the canonical error response shape.
//
//	{ "success": false, "error": { "code": "...", "message": "..." } }
type ErrorEnvelope struct {
	Success bool         `json:"success"`
	Error   errorPayload `json:"error"`
}

type errorPayload struct {
	Code    string `json:"code"`
	Message string `json:"message"` // Vietnamese, user-facing
}

// OK writes HTTP 200 with data.
func OK(c *gin.Context, data any) {
	c.JSON(http.StatusOK, SuccessEnvelope{Success: true, Data: data})
}

// OKWithMessage writes HTTP 200 with data and a message.
func OKWithMessage(c *gin.Context, data any, message string) {
	c.JSON(http.StatusOK, SuccessEnvelope{Success: true, Data: data, Message: message})
}

// Created writes HTTP 201 with data.
func Created(c *gin.Context, data any) {
	c.JSON(http.StatusCreated, SuccessEnvelope{Success: true, Data: data})
}

// NoContent writes HTTP 204 with no body.
func NoContent(c *gin.Context) {
	c.Status(http.StatusNoContent)
}

// Error writes the appropriate HTTP status + error envelope.
// Only accepts *apperrors.AppError to prevent leaking raw errors.
func Error(c *gin.Context, err *apperrors.AppError) {
	c.JSON(err.StatusCode, ErrorEnvelope{
		Success: false,
		Error: errorPayload{
			Code:    err.Code,
			Message: err.Message,
		},
	})
	c.Abort()
}

// InternalError writes HTTP 500, logging the raw error server-side only.
// Never expose the raw error message to the client.
func InternalError(c *gin.Context) {
	Error(c, apperrors.ErrInternal)
}
