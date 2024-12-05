from fastapi import Depends
from schemas.db.resume import Resume
from core.config import resume_repository
from repositories.resume_repository import ResumeRepository


class ResumeService:
    def __init__(
        self, resume_repository: ResumeRepository = Depends(resume_repository)
    ):
        self.resume_repository = resume_repository

    def get_resume(self) -> Resume:
        resume = self.resume_repository.get_latest_resume()
        del resume[
            "_id"
        ]  # remove the _id field since it's not serializable and not needed
        return Resume(**resume)
