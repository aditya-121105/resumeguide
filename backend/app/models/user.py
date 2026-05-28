from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String, nullable=False)

    email = Column(String, unique=True, index=True, nullable=False)

    username = Column(String, unique=True, index=True, nullable=False)

    hashed_password = Column(String, nullable=False)

    resumes = relationship(
        "Resume",
        back_populates="owner"
    )