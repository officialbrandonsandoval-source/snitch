from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://snitch:snitchpass@db:5432/snitchdb"
    JWT_SECRET: str = "dev-secret"
    JWT_ALGORITHM: str = "HS256"

    AWS_ACCESS_KEY: str = ""
    AWS_SECRET_KEY: str = ""
    AWS_BUCKET_NAME: str = ""
    AWS_REGION: str = "us-east-1"

    STRIPE_SECRET_KEY: str = ""
    STRIPE_WEBHOOK_SECRET: str = ""

    REDIS_URL: str = "redis://redis:6379/0"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
