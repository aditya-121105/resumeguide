from google.oauth2 import id_token
from google.auth.transport import requests
from sqlalchemy.orm import Session
from app.models.user import User
from app.auth.jwt import create_access_token
from app.core.config import settings


def verify_google_token(
    token: str
):

    idinfo = id_token.verify_oauth2_token(
        token,
        requests.Request(),
        settings.GOOGLE_CLIENT_ID
    )

    return idinfo

def google_login(
    token: str,
    db: Session
):

    user_info = verify_google_token(
        token
    )

    email = user_info["email"]
    full_name = user_info["name"]

    db_user = db.query(User).filter(
        User.email == email
    ).first()

    if not db_user:

        base_username = email.split("@")[0]

        username = base_username

        counter = 1

        while db.query(User).filter(
            User.username == username
        ).first():

            username = (
                f"{base_username}_{counter}"
            )

            counter += 1

        db_user = User(
            full_name=full_name,
            email=email,
            username=username,
            hashed_password="",
            is_verified=True,
            auth_provider="google"
        )

        db.add(db_user)

        db.commit()

        db.refresh(db_user)

    access_token = create_access_token(
        data={
            "sub": db_user.username
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }