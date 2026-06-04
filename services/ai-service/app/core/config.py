"""Application configuration loaded from environment variables."""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_port: int = 4004
    app_env: str = "development"

    database_url: str

    jwt_secret: str
    internal_service_secret: str

    openai_api_key: str = ""
    anthropic_api_key: str = ""

    encryption_key: str  # 32 hex chars

    @property
    def is_development(self) -> bool:
        return self.app_env == "development"


settings = Settings()  # type: ignore[call-arg]
