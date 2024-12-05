from __future__ import annotations
from typing import List, Union
from pydantic import BaseModel


class Resume(BaseModel):
    class ResumeSection(BaseModel):
        title: str
        content: List[Union[str, Resume.ResumeSection]]

    _id: str
    root: List[ResumeSection]
