from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Boolean
)

from app.db.database import Base


class PasswordResetOTP(Base):

    __tablename__ = "password_reset_otps"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    email = Column(
        String,
        nullable=False,
        index=True
    )

    otp_code = Column(
        String,
        nullable=False
    )

    expires_at = Column(
        DateTime,
        nullable=False
    )

    is_verified = Column(
        Boolean,
        default=False,
        nullable=False
    )