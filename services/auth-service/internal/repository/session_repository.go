package repository

import (
	"context"
	"errors"

	"gorm.io/gorm"

	"github.com/english-web/auth-service/internal/model"
)

// SessionRepository defines data access for sessions.
type SessionRepository interface {
	Create(ctx context.Context, session *model.Session) error
	FindByToken(ctx context.Context, token string) (*model.Session, error)
	DeleteByToken(ctx context.Context, token string) error
	DeleteByUserID(ctx context.Context, userID string) error
}

type sessionRepository struct{ db *gorm.DB }

func NewSessionRepository(db *gorm.DB) SessionRepository {
	return &sessionRepository{db: db}
}

func (r *sessionRepository) Create(ctx context.Context, session *model.Session) error {
	return r.db.WithContext(ctx).Create(session).Error
}

func (r *sessionRepository) FindByToken(ctx context.Context, token string) (*model.Session, error) {
	var session model.Session
	if err := r.db.WithContext(ctx).Where("refresh_token = ?", token).First(&session).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &session, nil
}

func (r *sessionRepository) DeleteByToken(ctx context.Context, token string) error {
	return r.db.WithContext(ctx).Where("refresh_token = ?", token).Delete(&model.Session{}).Error
}

func (r *sessionRepository) DeleteByUserID(ctx context.Context, userID string) error {
	return r.db.WithContext(ctx).Where("user_id = ?", userID).Delete(&model.Session{}).Error
}
