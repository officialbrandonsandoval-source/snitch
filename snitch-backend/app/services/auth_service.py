from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.auth import LoginRequest, TokenResponse


class AuthService:
    @staticmethod
    async def login(payload: LoginRequest, db: AsyncSession) -> TokenResponse:
        _ = (payload, db)
        return TokenResponse(access_token="demo-token")
