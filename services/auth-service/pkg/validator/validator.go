// Package validator provides reusable input validation helpers.
// Services MUST validate input via this package, not rely on DB constraint errors.
package validator

import (
	"regexp"
	"strings"
	"unicode"
)

var emailRegex = regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)

// IsValidEmail returns true if e looks like a valid email address.
func IsValidEmail(e string) bool {
	return emailRegex.MatchString(strings.ToLower(strings.TrimSpace(e)))
}

// IsStrongPassword returns true if p meets minimum strength requirements:
// at least 8 chars, 1 uppercase, 1 digit.
func IsStrongPassword(p string) bool {
	if len(p) < 8 {
		return false
	}
	var hasUpper, hasDigit bool
	for _, r := range p {
		switch {
		case unicode.IsUpper(r):
			hasUpper = true
		case unicode.IsDigit(r):
			hasDigit = true
		}
	}
	return hasUpper && hasDigit
}

// IsNonEmpty returns true if s is not blank.
func IsNonEmpty(s string) bool {
	return strings.TrimSpace(s) != ""
}
