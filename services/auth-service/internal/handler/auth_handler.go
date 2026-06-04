package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/english-web/auth-service/internal/dto"
	"github.com/english-web/auth-service/internal/service"
	apperrors "github.com/english-web/auth-service/pkg/errors"
)

// AuthHandler handles HTTP requests for authentication.
type AuthHandler struct {
	svc service.AuthService
}

func NewAuthHandler(svc service.AuthService) *AuthHandler {
	return &AuthHandler{svc: svc}
}

// Register handles POST /api/v1/auth/register
func (h *AuthHandler) Register(c *gin.Context) {
	var req dto.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		apperrors.Respond(c, apperrors.ErrValidation)
		return
	}

	resp, err := h.svc.Register(c.Request.Context(), req)
	if err != nil {
		if appErr, ok := err.(*apperrors.AppError); ok {
			apperrors.Respond(c, appErr)
			return
		}
		apperrors.Respond(c, apperrors.ErrInternal)
		return
	}

	c.JSON(http.StatusCreated, gin.H{"success": true, "data": resp})
}

// Login handles POST /api/v1/auth/login
func (h *AuthHandler) Login(c *gin.Context) {
	var req dto.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		apperrors.Respond(c, apperrors.ErrValidation)
		return
	}

	resp, err := h.svc.Login(c.Request.Context(), req, c.ClientIP(), c.GetHeader("User-Agent"))
	if err != nil {
		if appErr, ok := err.(*apperrors.AppError); ok {
			apperrors.Respond(c, appErr)
			return
		}
		apperrors.Respond(c, apperrors.ErrInternal)
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true, "data": resp})
}

// Refresh handles POST /api/v1/auth/refresh
func (h *AuthHandler) Refresh(c *gin.Context) {
	var req dto.RefreshRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		apperrors.Respond(c, apperrors.ErrValidation)
		return
	}

	resp, err := h.svc.Refresh(c.Request.Context(), req.RefreshToken)
	if err != nil {
		apperrors.Respond(c, apperrors.ErrTokenExpired)
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true, "data": resp})
}

// Logout handles POST /api/v1/auth/logout
func (h *AuthHandler) Logout(c *gin.Context) {
	userID, _ := c.Get("userID")
	_ = h.svc.Logout(c.Request.Context(), userID.(string))
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Đăng xuất thành công."})
}

// Me handles GET /api/v1/auth/me
func (h *AuthHandler) Me(c *gin.Context) {
	userID, _ := c.Get("userID")
	user, err := h.svc.GetUser(c.Request.Context(), userID.(string))
	if err != nil {
		apperrors.Respond(c, apperrors.ErrNotFound)
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": user})
}
