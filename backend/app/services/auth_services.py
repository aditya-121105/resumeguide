from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
from app.auth.security import (
    hash_password,
    verify_password
)
from app.auth.jwt import create_access_token


def register_user(
    user: UserCreate,
    db: Session
):

    db_user = User(
        email=user.email,
        full_name=user.full_name,
        username=user.username,
        hashed_password=hash_password(user.password)
    )

    db.add(db_user)

    db.commit()

    db.refresh(db_user)

    return db_user

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