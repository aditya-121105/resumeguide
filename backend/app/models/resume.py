from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime
)

from sqlalchemy.orm import relationship

from datetime import datetime

from app.db.database import Base


class Resume(Base):

    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)

    file_name = Column(String, nullable=False)

    file_path = Column(String, nullable=False)

    resume_text = Column(String)

    uploaded_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    owner_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    owner = relationship(
        "User",
        back_populates="resumes"
    )
    analyses = relationship(
        "Analysis",
        back_populates="resume"
    )
