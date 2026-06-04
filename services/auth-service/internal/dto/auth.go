package dto

// RegisterRequest — payload for POST /auth/register
type RegisterRequest struct {
	Email    string `json:"email"    binding:"required,email"`
	Password string `json:"password" binding:"required,min=8"`
	Name     string `json:"name"     binding:"required,min=2,max=100"`
}

// LoginRequest — payload for POST /auth/login
type LoginRequest struct {
	Email    string `json:"email"    binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// RefreshRequest — payload for POST /auth/refresh
type RefreshRequest struct {
	RefreshToken string `json:"refreshToken" binding:"required"`
}

// AuthUserResponse — safe user data returned to clients
type AuthUserResponse struct {
	ID            string  `json:"id"`
	Email         string  `json:"email"`
	Name          string  `json:"name"`
	AvatarURL     *string `json:"avatarUrl"`
	Role          string  `json:"role"`
	EmailVerified bool    `json:"emailVerified"`
	CreatedAt     string  `json:"createdAt"`
}

// TokensResponse — JWT tokens
type TokensResponse struct {
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
	ExpiresAt    int64  `json:"expiresAt"`
}

// AuthResponse — combined user + tokens
type AuthResponse struct {
	User   AuthUserResponse `json:"user"`
	Tokens TokensResponse   `json:"tokens"`
}
