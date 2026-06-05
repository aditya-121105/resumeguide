from sqlalchemy import (
    Column,
    Integer,
    Float,
    Text,
    String,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import relationship
from datetime import datetime

from app.db.database import Base


class Analysis(Base):

    __tablename__ = "analysis"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    resume_id = Column(
        Integer,
        ForeignKey("resumes.id"),
        nullable=False
    )

    analysis_type = Column(
        String,
        nullable=False
    )

    target_role = Column(
        String,
        nullable=True
    )

    job_description = Column(
        Text,
        nullable=True
    )

    score = Column(
        Float,
        nullable=True
    )

    analysis_result = Column(
        Text,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    resume = relationship(
        "Resume",
        back_populates="analyses"
    )