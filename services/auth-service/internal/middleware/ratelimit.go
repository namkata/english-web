package middleware

import (
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
)

// slidingWindow tracks request timestamps per client key.
type slidingWindow struct {
	mu      sync.Mutex
	hits    map[string][]time.Time
	limit   int
	window  time.Duration
	lastGC  time.Time
	gcEvery time.Duration
}

func newSlidingWindow(limit int, window time.Duration) *slidingWindow {
	return &slidingWindow{
		hits:    make(map[string][]time.Time),
		limit:   limit,
		window:  window,
		lastGC:  time.Now(),
		gcEvery: 5 * time.Minute,
	}
}

// allow reports whether the key may make another request now.
func (s *slidingWindow) allow(key string) bool {
	s.mu.Lock()
	defer s.mu.Unlock()

	now := time.Now()
	cutoff := now.Add(-s.window)

	// Periodic GC so idle keys do not leak memory.
	if now.Sub(s.lastGC) > s.gcEvery {
		for k, ts := range s.hits {
			if len(ts) == 0 || ts[len(ts)-1].Before(cutoff) {
				delete(s.hits, k)
			}
		}
		s.lastGC = now
	}

	ts := s.hits[key]
	kept := ts[:0]
	for _, t := range ts {
		if t.After(cutoff) {
			kept = append(kept, t)
		}
	}

	if len(kept) >= s.limit {
		s.hits[key] = kept
		return false
	}

	s.hits[key] = append(kept, now)
	return true
}

// RateLimit returns a per-IP sliding-window rate limiter middleware.
// Intended for sensitive endpoints (login, register, refresh).
// In-memory by design: swap for the Redis sliding window at the API gateway
// when running multiple replicas.
func RateLimit(limit int, window time.Duration) gin.HandlerFunc {
	sw := newSlidingWindow(limit, window)
	return func(c *gin.Context) {
		if !sw.allow(c.ClientIP()) {
			c.AbortWithStatusJSON(http.StatusTooManyRequests, gin.H{
				"success": false,
				"error": gin.H{
					"code":    "RATE_LIMITED",
					"message": "Bạn thao tác quá nhanh. Vui lòng thử lại sau ít phút.",
				},
			})
			return
		}
		c.Next()
	}
}
