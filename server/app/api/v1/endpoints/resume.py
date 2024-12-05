from fastapi import APIRouter, Depends

from services.resume_service import ResumeService

resume_router = APIRouter(prefix="/resume", tags=["resume"])


@resume_router.get("/")
def get_resume(resume_service: ResumeService = Depends(ResumeService)):
    return resume_service.get_resume()
