from fastapi import FastAPI
from app.api.v1 import auth, users, evidence, uploads, police, rewards, subscriptions, health
from app.database import init_db

app = FastAPI(title="Snitch Backend API", version="1.0.0")

@app.on_event("startup")
async def startup_event():
    await init_db()

app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(evidence.router, prefix="/api/v1/evidence", tags=["Evidence"])
app.include_router(uploads.router, prefix="/api/v1/uploads", tags=["Uploads"])
app.include_router(police.router, prefix="/api/v1/police", tags=["Police"])
app.include_router(rewards.router, prefix="/api/v1/rewards", tags=["Rewards"])
app.include_router(subscriptions.router, prefix="/api/v1/subscriptions", tags=["Subscriptions"])
app.include_router(health.router, prefix="/api/v1/health", tags=["Health"])
