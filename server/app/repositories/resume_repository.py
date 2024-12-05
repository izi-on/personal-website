from abc import ABC
from repositories.abc import IRepository, MongoRepository
from core.constants import RESUME_KEY


class ResumeRepository(IRepository, ABC):
    def get_latest_resume(self) -> dict:
        return self.get_latest()


class MongoResumeRepository(MongoRepository, ResumeRepository):
    def get_db(self):
        return RESUME_KEY

    def get_collection(self):
        return RESUME_KEY
