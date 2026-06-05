import os
import shutil
import uuid
from fastapi import (
    UploadFile,
    HTTPException
)


from sqlalchemy.orm import Session

from app.models.resume import Resume
from app.models.user import User

from app.services.pdf_services import (
    extract_text_from_pdf
)


def upload_resume_service(

    file: UploadFile,

    db: Session,

    current_user: User
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

    unique_filename = (
        f"{uuid.uuid4()}_{file.filename}"
    )

    file_path = (
        f"{upload_dir}/{unique_filename}"
    )

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    resume_text = extract_text_from_pdf(
        file_path
    )

    resume = Resume(

        file_name=file.filename,

        file_path=file_path,

        resume_text=resume_text,

        owner_id=current_user.id
    )

    db.add(resume)

    db.commit()

    db.refresh(resume)

    return {

        "message": "Resume uploaded successfully",

        "file_name": resume.file_name,

        "resume_id": resume.id
    }

def get_user_resumes_service(
    db: Session,
    current_user: User
):

    resumes = db.query(
        Resume
    ).filter(

        Resume.owner_id ==
        current_user.id

    ).all()

    return [

        {
            "resume_id": resume.id,
            "file_name": resume.file_name,
            "uploaded_at": resume.uploaded_at
        }

        for resume in resumes
    ]

def get_resume_details_service(
    resume_id: int,
    db: Session,
    current_user: User
):

    resume = db.query(
        Resume
    ).filter(
        Resume.id == resume_id,
        Resume.owner_id ==
        current_user.id
    ).first()

    if not resume:

        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    return {
        "resume_id": resume.id,
        "file_name": resume.file_name,
        "uploaded_at": resume.uploaded_at,
        "analysis_count":
            len(resume.analyses)
    }