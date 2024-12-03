from main import app
from fastapi import APIRouter

router = APIRouter(prefix="api/v1", tags=["status"])


@router.get("/")
async def root():
    return {"message": "Alive and kicking!"}


app.include_router(router)
