from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from app.db.dependencies import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.services.auth_services import register_user


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