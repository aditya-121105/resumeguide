from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException
from app.db.dependencies import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse, UserLogin, Token
from app.services.auth_services import register_user, login_user
from app.auth.dependencies import get_current_user
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.pending_registration import VerifyOTPRequest
from app.services.auth_services import verify_otp
from app.schemas.google_auth import GoogleAuthRequest
from app.services.google_auth_service import google_login
from app.schemas.password_reset import (
    ForgotPasswordRequest,
    VerifyResetOTPRequest,
    ResetPasswordRequest
)

from app.services.password_reset_service import (
    forgot_password,
    verify_reset_otp,
    reset_password
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",

)
def register(user: UserCreate, db: Session = Depends(get_db)):
    return register_user(user, db)

@router.post(
    "/login",
    response_model=Token
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    token = login_user(
        username=form_data.username,
        password=form_data.password,
        db=db
    )

    if not token:

        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    return token

@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user)
):

    return {
        "id": current_user.id,
        "full_name": current_user.full_name,
        "email": current_user.email,
        "username": current_user.username
    }

@router.post("/verify-otp")
def verify_email_otp(
    request: VerifyOTPRequest,
    db: Session = Depends(get_db)
):
    return verify_otp(
        request=request,
        db=db
    )
@router.post(
    "/google",
    response_model=Token
)
def google_auth(
    request: GoogleAuthRequest,
    db: Session = Depends(get_db)
):

    return google_login(
        token=request.id_token,
        db=db
    )

@router.post(
    "/forgot-password"
)
def forgot_password_route(
    request: ForgotPasswordRequest,
    db: Session = Depends(get_db)
):
    return forgot_password(
        request,
        db
    )

@router.post(
    "/verify-reset-otp"
)
def verify_reset_otp_route(
    request: VerifyResetOTPRequest,
    db: Session = Depends(get_db)
):
    return verify_reset_otp(
        request,
        db
    )

@router.post(
    "/reset-password"
)
def reset_password_route(
    request: ResetPasswordRequest,
    db: Session = Depends(get_db)
):
    return reset_password(
        request,
        db
    )