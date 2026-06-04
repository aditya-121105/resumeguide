from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.models.pending_registration import PendingRegistration
from app.core.config import settings
from app.api.api import api_router
from app.db.database import Base, engine
from app.models.user import User
from app.models.resume import Resume
from app.models.analysis import Analysis

app = FastAPI(title=settings.APP_NAME)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(
    api_router,
    prefix=settings.API_V1_STR
)

@app.get("/")
def root():

    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))

    return {
        "message": "API Running",
        "db_test": result.scalar()
    }