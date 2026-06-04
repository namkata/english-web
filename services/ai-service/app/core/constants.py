"""Application-wide constants. Never hardcode these values elsewhere."""

# Context / header keys
HEADER_USER_ID = "X-User-Id"
HEADER_INTERNAL_SECRET = "X-Internal-Secret"

# Writing session limits
MAX_WRITING_SENTENCES = 10
MIN_WRITING_SENTENCES = 3

# Spaced repetition intervals (days)
SRS_INTERVALS = [1, 3, 7, 14, 30, 90]

# XP awards
XP_WRITING_SENTENCE = 5
XP_READING_COMPLETE = 10
XP_QUIZ_CORRECT = 2
XP_DAILY_GOAL_BONUS = 25
