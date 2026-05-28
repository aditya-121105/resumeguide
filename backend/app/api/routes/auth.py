from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException
from app.db.dependencies import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse, UserLogin
from app.services.auth_services import register_user, login_user


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserResponse
)
def register(user: UserCreate, db: Session = Depends(get_db)):
    return register_user(user, db)

@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    token = login_user(user, db)

    if not token:

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return token