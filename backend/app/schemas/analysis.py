from pydantic import BaseModel
from typing import Optional


class AnalysisCreateRequest(BaseModel):
    resume_id: int
    analysis_type: str
    target_role: Optional[str] = None
    job_description: Optional[str] = None