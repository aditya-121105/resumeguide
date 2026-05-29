from sqlalchemy import (
    Column,
    Integer,
    Float,
    Text,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import relationship
from datetime import datetime

from app.db.database import Base


class Analysis(Base):

    __tablename__ = "analysis"

    id = Column(Integer, primary_key=True, index=True)

    resume_id = Column(
        Integer,
        ForeignKey("resumes.id")
    )

    job_description = Column(Text)

    match_percentage = Column(Float)

    matched_skills = Column(Text)

    missing_skills = Column(Text)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    resume = relationship(
        "Resume",
        back_populates="analyses"
    )