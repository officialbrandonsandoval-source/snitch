from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"

    AWS_ACCESS_KEY: str
    AWS_SECRET_KEY: str
    AWS_BUCKET_NAME: str
    AWS_REGION: str = "us-east-1"

    STRIPE_SECRET_KEY: str
    STRIPE_WEBHOOK_SECRET: str

    REDIS_URL: str

    class Config:
        env_file = ".env"

settings = Settings()
