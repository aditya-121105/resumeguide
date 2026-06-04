from datetime import (
    datetime,
    timedelta
)
from app.schemas.password_reset import (
    VerifyResetOTPRequest,
    ResetPasswordRequest
)

from app.auth.security import (
    hash_password
)
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.user import User
from app.models.password_reset_otp import (
    PasswordResetOTP
)

from app.schemas.password_reset import (
    ForgotPasswordRequest
)

from app.utils.otp import generate_otp

from app.services.email_service import (
    send_password_reset_otp
)

def forgot_password(
    request: ForgotPasswordRequest,
    db: Session
):

    identifier = (
        request.identifier.strip()
    )

    user = db.query(User).filter(
        (User.email == identifier)
        |
        (User.username == identifier)
    ).first()

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User does not exist"
        )

    if (
        user.auth_provider
        == "google"
    ):

        raise HTTPException(
            status_code=400,
            detail=(
                "This account uses "
                "Google Sign-In"
            )
        )

    db.query(
        PasswordResetOTP
    ).filter(
        PasswordResetOTP.email
        == user.email
    ).delete()

    otp = generate_otp()

    reset_record = (
        PasswordResetOTP(
            email=user.email,
            otp_code=otp,
            expires_at=
            datetime.utcnow()
            + timedelta(minutes=5)
        )
    )

    db.add(reset_record)

    db.commit()

    send_password_reset_otp(
        user.email,
        otp
    )

    return {
        "message":
        "OTP sent successfully"
    }

def verify_reset_otp(
    request: VerifyResetOTPRequest,
    db: Session
):

    otp_record = db.query(
        PasswordResetOTP
    ).filter(
        PasswordResetOTP.email
        == request.email
    ).first()

    if not otp_record:

        raise HTTPException(
            status_code=404,
            detail="No password reset request found"
        )

    if (
        otp_record.otp_code
        != request.otp
    ):

        raise HTTPException(
            status_code=400,
            detail="Invalid OTP"
        )

    if (
        otp_record.expires_at
        < datetime.utcnow()
    ):

        raise HTTPException(
            status_code=400,
            detail="OTP has expired"
        )

    otp_record.is_verified = True

    db.commit()

    return {
        "message":
            "OTP verified successfully"
    }

def reset_password(
    request: ResetPasswordRequest,
    db: Session
):

    otp_record = db.query(
        PasswordResetOTP
    ).filter(
        PasswordResetOTP.email
        == request.email
    ).first()

    if not otp_record:

        raise HTTPException(
            status_code=404,
            detail="No verified reset request found"
        )
    if not otp_record:
        raise HTTPException(
            status_code=404,
            detail="No verified reset request found"
        )

    user = db.query(User).filter(
        User.email == request.email
    ).first()

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.hashed_password = (
        hash_password(
            request.new_password
        )
    )

    db.delete(otp_record)

    db.commit()

    return {
        "message":
        "Password reset successfully"
    }