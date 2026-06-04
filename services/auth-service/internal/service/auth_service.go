package service

import (
	"context"
	"fmt"
	"log/slog"
	"os"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"

	"github.com/english-web/auth-service/internal/dto"
	"github.com/english-web/auth-service/internal/model"
	"github.com/english-web/auth-service/internal/repository"
	apperrors "github.com/english-web/auth-service/pkg/errors"
)

// AuthService defines authentication business logic.
type AuthService interface {
	Register(ctx context.Context, req dto.RegisterRequest) (*dto.AuthResponse, error)
	Login(ctx context.Context, req dto.LoginRequest, ip, ua string) (*dto.AuthResponse, error)
	Refresh(ctx context.Context, refreshToken string) (*dto.TokensResponse, error)
	Logout(ctx context.Context, userID string) error
	GetUser(ctx context.Context, userID string) (*dto.AuthUserResponse, error)
}

type authService struct {
	users    repository.UserRepository
	sessions repository.SessionRepository
}

// NewAuthService returns a new AuthService implementation.
func NewAuthService(users repository.UserRepository, sessions repository.SessionRepository) AuthService {
	return &authService{users: users, sessions: sessions}
}

func (s *authService) Register(ctx context.Context, req dto.RegisterRequest) (*dto.AuthResponse, error) {
	exists, _ := s.users.FindByEmail(ctx, req.Email)
	if exists != nil {
		return nil, apperrors.ErrEmailExists
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, apperrors.ErrInternal
	}

	user := &model.User{
		ID:           uuid.New(),
		Email:        req.Email,
		PasswordHash: string(hash),
		Name:         req.Name,
		Role:         "user",
	}

	if err := s.users.Create(ctx, user); err != nil {
		return nil, apperrors.ErrInternal
	}

	tokens, err := s.generateTokens(user)
	if err != nil {
		return nil, apperrors.ErrInternal
	}

	session := &model.Session{
		ID:           uuid.New(),
		UserID:       user.ID,
		RefreshToken: tokens.RefreshToken,
		ExpiresAt:    time.Now().Add(time.Duration(getRefreshTTL()) * time.Second),
	}
	_ = s.sessions.Create(ctx, session)

	return &dto.AuthResponse{
		User:   toUserResponse(user),
		Tokens: *tokens,
	}, nil
}

func (s *authService) Login(ctx context.Context, req dto.LoginRequest, ip, ua string) (*dto.AuthResponse, error) {
	user, err := s.users.FindByEmail(ctx, req.Email)
	if err != nil || user == nil {
		return nil, apperrors.ErrInvalidCredentials
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
		return nil, apperrors.ErrInvalidCredentials
	}

	tokens, err := s.generateTokens(user)
	if err != nil {
		return nil, apperrors.ErrInternal
	}

	session := &model.Session{
		ID:           uuid.New(),
		UserID:       user.ID,
		RefreshToken: tokens.RefreshToken,
		UserAgent:    ua,
		IPAddress:    ip,
		ExpiresAt:    time.Now().Add(time.Duration(getRefreshTTL()) * time.Second),
	}
	_ = s.sessions.Create(ctx, session)

	return &dto.AuthResponse{
		User:   toUserResponse(user),
		Tokens: *tokens,
	}, nil
}

func (s *authService) Refresh(ctx context.Context, refreshToken string) (*dto.TokensResponse, error) {
	sess, err := s.sessions.FindByToken(ctx, refreshToken)
	if err != nil || sess == nil || time.Now().After(sess.ExpiresAt) {
		return nil, apperrors.ErrTokenExpired
	}

	user, err := s.users.FindByID(ctx, sess.UserID.String())
	if err != nil {
		return nil, apperrors.ErrNotFound
	}

	tokens, err := s.generateTokens(user)
	if err != nil {
		return nil, apperrors.ErrInternal
	}

	_ = s.sessions.DeleteByToken(ctx, refreshToken)
	newSess := &model.Session{
		ID:           uuid.New(),
		UserID:       user.ID,
		RefreshToken: tokens.RefreshToken,
		ExpiresAt:    time.Now().Add(time.Duration(getRefreshTTL()) * time.Second),
	}
	_ = s.sessions.Create(ctx, newSess)

	return tokens, nil
}

func (s *authService) Logout(ctx context.Context, userID string) error {
	if err := s.sessions.DeleteByUserID(ctx, userID); err != nil {
		slog.Error("logout failed", "error", err)
		return apperrors.ErrInternal
	}
	return nil
}

func (s *authService) GetUser(ctx context.Context, userID string) (*dto.AuthUserResponse, error) {
	user, err := s.users.FindByID(ctx, userID)
	if err != nil {
		return nil, apperrors.ErrNotFound
	}
	resp := toUserResponse(user)
	return &resp, nil
}

// ---- Helpers ----

func (s *authService) generateTokens(user *model.User) (*dto.TokensResponse, error) {
	secret := os.Getenv("JWT_SECRET")
	accessTTL := getAccessTTL()

	now := time.Now()
	expiresAt := now.Add(time.Duration(accessTTL) * time.Second)

	access := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub":  user.ID.String(),
		"role": user.Role,
		"exp":  expiresAt.Unix(),
		"iat":  now.Unix(),
	})
	accessStr, err := access.SignedString([]byte(secret))
	if err != nil {
		return nil, fmt.Errorf("signing access token: %w", err)
	}

	refreshExpiry := now.Add(time.Duration(getRefreshTTL()) * time.Second)
	refresh := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID.String(),
		"exp": refreshExpiry.Unix(),
		"iat": now.Unix(),
		"typ": "refresh",
	})
	refreshStr, err := refresh.SignedString([]byte(secret))
	if err != nil {
		return nil, fmt.Errorf("signing refresh token: %w", err)
	}

	return &dto.TokensResponse{
		AccessToken:  accessStr,
		RefreshToken: refreshStr,
		ExpiresAt:    expiresAt.Unix(),
	}, nil
}

func toUserResponse(u *model.User) dto.AuthUserResponse {
	return dto.AuthUserResponse{
		ID:            u.ID.String(),
		Email:         u.Email,
		Name:          u.Name,
		AvatarURL:     u.AvatarURL,
		Role:          u.Role,
		EmailVerified: u.EmailVerified,
		CreatedAt:     u.CreatedAt.Format(time.RFC3339),
	}
}

func getAccessTTL() int {
	v, _ := strconv.Atoi(os.Getenv("JWT_ACCESS_TTL"))
	if v == 0 {
		return 900
	}
	return v
}

func getRefreshTTL() int {
	v, _ := strconv.Atoi(os.Getenv("JWT_REFRESH_TTL"))
	if v == 0 {
		return 604800
	}
	return v
}
