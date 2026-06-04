from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
from app.auth.security import (
    hash_password,
    verify_password
)
from app.schemas.pending_registration import VerifyOTPRequest
from fastapi import HTTPException
from app.auth.jwt import create_access_token
from app.models.pending_registration import PendingRegistration
from app.utils.otp import generate_otp

from datetime import datetime, timedelta

def register_user(
    user: UserCreate,
    db: Session
):
    existing_user = db.query(User).filter(
        (User.email == user.email) |
        (User.username == user.username)
    ).first()

    if existing_user:
        raise ValueError(
            "User already exists"
        )

    existing_pending = db.query(
        PendingRegistration
    ).filter(
        (PendingRegistration.email == user.email) |
        (PendingRegistration.username == user.username)
    ).first()

    if existing_pending:
        raise ValueError(
            "OTP already sent. Please verify your email."
        )
    otp = generate_otp()

    pending_user = PendingRegistration(
        full_name=user.full_name,
        email=user.email,
        username=user.username,
        hashed_password=hash_password(
            user.password
        ),
        otp_code=otp,
        expires_at=datetime.utcnow()
        + timedelta(minutes=5)
    )

    db.add(pending_user)

    db.commit()

    db.refresh(pending_user)

    print(
        f"OTP for {user.email}: {otp}"
    )

    return {
        "message":
        "OTP sent successfully"
    }

def verify_otp(
    request: VerifyOTPRequest,
    db: Session
):
    pending_user = db.query(
        PendingRegistration
    ).filter(
        PendingRegistration.email == request.email
    ).first()
    if not pending_user:
        raise HTTPException(
            status_code=404,
            detail="No pending registration found"
        )
    if pending_user.otp_code != request.otp:
        raise HTTPException(
            status_code=400,
            detail="Invalid OTP"
        )
    if pending_user.expires_at < datetime.utcnow():
        raise HTTPException(
            status_code=400,
            detail="OTP has expired"
        )
    db_user = User(
        full_name=pending_user.full_name,
        email=pending_user.email,
        username=pending_user.username,
        hashed_password=pending_user.hashed_password,
        is_verified=True
    )
    db.add(db_user)
    db.delete(pending_user)
    db.commit()
    db.refresh(db_user)
    return {
        "message": "Email verified successfully"
    }

def login_user(
    username: str,
    password: str,
    db: Session
):

    db_user = db.query(User).filter(
        User.username == username
    ).first()

    if not db_user:
        return None

    if not verify_password(
        password,
        db_user.hashed_password
    ):
        return None

    access_token = create_access_token(
        data={
            "sub": db_user.username
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }