from fastapi import Depends
from core.config import RESUME_KEY
from repositories.resume_repository import ResumeRepository


class ResumeService:
    def __init__(self, resume_repository: ResumeRepository = Depends(ResumeRepository)):
        self.resume_repository = resume_repository

    def get_resume(self):
        return self.resume_repository.get(RESUME_KEY)
