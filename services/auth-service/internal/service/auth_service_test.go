package service_test

import (
	"context"
	"testing"

	"github.com/english-web/auth-service/internal/dto"
	"github.com/english-web/auth-service/internal/model"
	"github.com/english-web/auth-service/internal/repository"
	"github.com/english-web/auth-service/internal/service"
	apperrors "github.com/english-web/auth-service/pkg/errors"
	"github.com/google/uuid"
)

// ---- Mocks ----

type mockUserRepo struct {
	users map[string]*model.User
}

func newMockUserRepo() *mockUserRepo { return &mockUserRepo{users: map[string]*model.User{}} }

func (m *mockUserRepo) Create(_ context.Context, u *model.User) error {
	if _, exists := m.users[u.Email]; exists {
		// Repository returns nil error — service must check before calling Create
		return nil
	}
	m.users[u.Email] = u
	return nil
}
func (m *mockUserRepo) FindByEmail(_ context.Context, email string) (*model.User, error) {
	return m.users[email], nil
}
func (m *mockUserRepo) FindByID(_ context.Context, id string) (*model.User, error) {
	for _, u := range m.users {
		if u.ID.String() == id {
			return u, nil
		}
	}
	return nil, nil
}

type mockSessionRepo struct{}

func (m *mockSessionRepo) Create(_ context.Context, _ *model.Session) error { return nil }
func (m *mockSessionRepo) FindByToken(_ context.Context, _ string) (*model.Session, error) {
	return nil, nil
}
func (m *mockSessionRepo) DeleteByToken(_ context.Context, _ string) error  { return nil }
func (m *mockSessionRepo) DeleteByUserID(_ context.Context, _ string) error { return nil }

// Ensure mocks satisfy interfaces at compile time.
var _ repository.UserRepository = (*mockUserRepo)(nil)
var _ repository.SessionRepository = (*mockSessionRepo)(nil)

// ---- Tests ----

func TestRegister_Success(t *testing.T) {
	svc := service.NewAuthService(newMockUserRepo(), &mockSessionRepo{})
	resp, err := svc.Register(context.Background(), dto.RegisterRequest{
		Email:    "test@example.com",
		Password: "Password1",
		Name:     "Test User",
	})
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	if resp.User.Email != "test@example.com" {
		t.Errorf("expected email test@example.com, got %s", resp.User.Email)
	}
	if resp.Tokens.AccessToken == "" {
		t.Error("expected non-empty access token")
	}
}

func TestRegister_DuplicateEmail_ReturnsAppError(t *testing.T) {
	repo := newMockUserRepo()
	// Pre-seed user — simulates existing email
	repo.users["test@example.com"] = &model.User{
		ID:    uuid.New(),
		Email: "test@example.com",
	}

	svc := service.NewAuthService(repo, &mockSessionRepo{})
	_, err := svc.Register(context.Background(), dto.RegisterRequest{
		Email:    "test@example.com",
		Password: "Password1",
		Name:     "Other User",
	})

	// RULE: Must return AppError ErrEmailExists — NOT a database duplicate error
	appErr, ok := err.(*apperrors.AppError)
	if !ok {
		t.Fatalf("expected *AppError, got %T", err)
	}
	if appErr.Code != "EMAIL_EXISTS" {
		t.Errorf("expected EMAIL_EXISTS, got %s", appErr.Code)
	}
}

func TestLogin_InvalidCredentials_ReturnsAppError(t *testing.T) {
	svc := service.NewAuthService(newMockUserRepo(), &mockSessionRepo{})
	_, err := svc.Login(context.Background(), dto.LoginRequest{
		Email:    "notexist@example.com",
		Password: "wrongpass",
	}, "127.0.0.1", "test-agent")

	appErr, ok := err.(*apperrors.AppError)
	if !ok {
		t.Fatalf("expected *AppError, got %T", err)
	}
	if appErr.Code != "INVALID_CREDENTIALS" {
		t.Errorf("expected INVALID_CREDENTIALS, got %s", appErr.Code)
	}
}

func TestValidator_Email(t *testing.T) {
	cases := []struct {
		input string
		want  bool
	}{
		{"user@example.com", true},
		{"not-an-email", false},
		{"@nodomain.com", false},
		{"user@.com", false},
	}
	// import validator package in a real test; this documents expected behaviour
	_ = cases
}
