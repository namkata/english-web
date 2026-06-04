// Package constants holds immutable application-wide constants.
// Add new constants here; never hardcode magic strings or numbers in handlers/services.
package constants

const (
	// Context keys (used with gin.Context.Set / gin.Context.Get)
	CtxUserID   = "userID"
	CtxUserRole = "userRole"

	// Roles
	RoleUser  = "user"
	RoleAdmin = "admin"

	// Token types
	TokenTypeAccess  = "access"
	TokenTypeRefresh = "refresh"

	// Default pagination
	DefaultPage  = 1
	DefaultLimit = 20
	MaxLimit     = 100

	// Bcrypt cost
	BcryptCost = 12

	// Redis key prefixes
	RedisKeyRateLimit = "rl:"
	RedisKeySession   = "sess:"
)
