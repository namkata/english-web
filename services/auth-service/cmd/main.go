package main

import (
	"context"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"github.com/english-web/auth-service/internal/handler"
	"github.com/english-web/auth-service/internal/middleware"
	"github.com/english-web/auth-service/internal/repository"
	"github.com/english-web/auth-service/internal/service"
	"github.com/english-web/auth-service/pkg/database"
)

func main() {
	// Load env
	if err := godotenv.Load(); err != nil {
		slog.Warn("No .env file found, using environment variables")
	}

	// Logger
	logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelInfo}))
	slog.SetDefault(logger)

	// Database
	db, err := database.Connect()
	if err != nil {
		slog.Error("Failed to connect to database", "error", err)
		os.Exit(1)
	}
	database.AutoMigrate(db)

	// Repositories
	userRepo := repository.NewUserRepository(db)
	sessionRepo := repository.NewSessionRepository(db)

	// Services
	authSvc := service.NewAuthService(userRepo, sessionRepo)

	// Handlers
	authHandler := handler.NewAuthHandler(authSvc)

	// Router
	r := gin.New()
	r.Use(gin.Recovery())
	r.Use(middleware.Logger())
	r.Use(middleware.CORS())

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok", "service": "auth-service"})
	})

	// Sliding-window rate limit on credential endpoints: 10 req / minute / IP
	authLimiter := middleware.RateLimit(10, time.Minute)

	v1 := r.Group("/api/v1/auth")
	{
		v1.POST("/register", authLimiter, authHandler.Register)
		v1.POST("/login", authLimiter, authHandler.Login)
		v1.POST("/refresh", authLimiter, authHandler.Refresh)
		v1.POST("/logout", middleware.RequireAuth(), authHandler.Logout)
		v1.GET("/me", middleware.RequireAuth(), authHandler.Me)
	}

	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "4001"
	}

	srv := &http.Server{
		Addr:         ":" + port,
		Handler:      r,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	go func() {
		slog.Info("Auth service starting", "port", port)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			slog.Error("Server error", "error", err)
			os.Exit(1)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		slog.Error("Server forced shutdown", "error", err)
	}
	slog.Info("Auth service stopped")
}
