from fastapi import APIRouter, Depends
from app.schemas.auth import LoginRequest, TokenResponse
from app.services.auth_service import AuthService
from sqlalchemy.ext.asyncio import AsyncSession
from app.dependencies import get_db

router = APIRouter()

@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginRequest, db: AsyncSession = Depends(get_db)):
    return await AuthService.login(payload, db)
