from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.models.resume import Resume
from app.models.user import User
from app.models.analysis import Analysis
from app.analysis.skill_analyzer import (
    compare_skills
)


def analyze_resume_skills_service(

    resume_id: int,

    job_description: str,

    db: Session,

    current_user: User
):

    resume = db.query(Resume).filter(

        Resume.id == resume_id,

        Resume.owner_id == current_user.id

    ).first()

    if not resume:

        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    analysis_result = compare_skills(

        resume.resume_text,

        job_description
    )
    analysis = Analysis(
        resume_id=resume.id,
        job_description=job_description,
        match_percentage=analysis_result["match_percentage"],
        matched_skills=",".join(
            analysis_result["matched_skills"]
        ),
        missing_skills=",".join(
            analysis_result["missing_skills"]
        )
    )

    db.add(analysis)
    db.commit()
    analysis_result["analysis_id"] = analysis.id

    return analysis_result

