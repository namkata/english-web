# ---- Build stage ----
FROM golang:1.23-alpine AS builder
WORKDIR /app
RUN apk add --no-cache git ca-certificates

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build -ldflags="-w -s" -o /app/server ./cmd/main.go

# ---- Runtime stage ----
FROM gcr.io/distroless/static-debian12 AS runtime
WORKDIR /app
COPY --from=builder /app/server /app/server
EXPOSE 4001
USER nonroot:nonroot
ENTRYPOINT ["/app/server"]
