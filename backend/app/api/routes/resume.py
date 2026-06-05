import os
import shutil

from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File,
    HTTPException
)

from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.auth.dependencies import get_current_user
from app.services.pdf_services import extract_text_from_pdf
from app.models.user import User
from app.models.resume import Resume

from app.services.resume_service import (
    upload_resume_service,
    get_user_resumes_service,
    get_resume_details_service
)

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

@router.post("/upload")
def upload_resume(

    file: UploadFile = File(...),

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    return upload_resume_service(

        file=file,

        db=db,

        current_user=current_user
    )

@router.get("/my-resumes")
def get_my_resumes(

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    return get_user_resumes_service(

        db=db,

        current_user=current_user
    )

@router.get("/{resume_id}")
def get_resume_details(

    resume_id: int,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    return get_resume_details_service(

        resume_id,

        db,

        current_user
    )