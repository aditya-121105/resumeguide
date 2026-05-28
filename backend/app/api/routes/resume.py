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

from app.models.user import User
from app.models.resume import Resume


router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

@router.post("/upload")
def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if file.content_type != "application/pdf":

        raise HTTPException(
            status_code=400,
            detail="Only PDF files allowed"
        )

    upload_dir = "uploads/resumes"

    os.makedirs(
        upload_dir,
        exist_ok=True
    )

    file_path = f"{upload_dir}/{file.filename}"

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    resume = Resume(
        file_name=file.filename,
        file_path=file_path,
        owner_id=current_user.id
    )

    db.add(resume)

    db.commit()

    db.refresh(resume)

    return {
        "message": "Resume uploaded successfully",
        "file_name": resume.file_name
    }