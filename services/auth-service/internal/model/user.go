package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// User represents an authenticated user account.
type User struct {
	ID            uuid.UUID      `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	Email         string         `gorm:"uniqueIndex;not null"                          json:"email"`
	PasswordHash  string         `gorm:"not null"                                      json:"-"`
	Name          string         `gorm:"not null"                                      json:"name"`
	AvatarURL     *string        `                                                     json:"avatarUrl"`
	Role          string         `gorm:"default:'user'"                                json:"role"`
	EmailVerified bool           `gorm:"default:false"                                 json:"emailVerified"`
	CreatedAt     time.Time      `                                                     json:"createdAt"`
	UpdatedAt     time.Time      `                                                     json:"updatedAt"`
	DeletedAt     gorm.DeletedAt `gorm:"index"                                         json:"-"`
}

// Session stores refresh tokens.
type Session struct {
	ID           uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID       uuid.UUID `gorm:"type:uuid;not null;index"                       json:"userId"`
	RefreshToken string    `gorm:"uniqueIndex;not null"                           json:"-"`
	UserAgent    string    `                                                      json:"userAgent"`
	IPAddress    string    `                                                      json:"ipAddress"`
	ExpiresAt    time.Time `gorm:"not null"                                       json:"expiresAt"`
	CreatedAt    time.Time `                                                      json:"createdAt"`
}
