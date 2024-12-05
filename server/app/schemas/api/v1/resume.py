from pydantic import BaseModel


class GetResumeResponse(BaseModel):
    resume: dict
