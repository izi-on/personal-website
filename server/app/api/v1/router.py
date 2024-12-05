from fastapi import APIRouter
from api.v1.endpoints.resume import resume_router

v1_router = APIRouter(prefix="/api/v1", tags=["status"])
v1_router.include_router(resume_router)


@v1_router.get("/status")
def get_status():
    return {"status": "ok"}
