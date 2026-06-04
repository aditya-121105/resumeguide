from sqlalchemy import Column, Integer, String, DateTime
from app.db.database import Base

class EmailOTP(Base):

    __tablename__ = "email_otps"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String, nullable=False)

    otp_code = Column(String, nullable=False)

    expires_at = Column(DateTime, nullable=False)