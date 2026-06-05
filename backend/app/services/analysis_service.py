from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.resume import Resume
from app.models.user import User
from app.models.analysis import Analysis
from app.analysis.ats_engine import generate_ats_analysis
from app.analysis.general_analysis import generate_general_analysis
from app.analysis.role_analysis import generate_role_analysis
from app.analysis.jd_analysis import generate_jd_analysis
import json

def get_analysis_history_service(
    db: Session,
    current_user: User
):

    analyses = (

        db.query(Analysis)

        .join(Resume)

        .filter(
            Resume.owner_id ==
            current_user.id
        )

        .order_by(
            Analysis.created_at.desc()
        )

        .all()
    )

    return [

        {
            "analysis_id":
                analysis.id,

            "resume_id":
                analysis.resume_id,

            "resume_name":
                analysis.resume.file_name,

            "analysis_type":
                analysis.analysis_type,

            "score":
                analysis.score,

            "created_at":
                analysis.created_at
        }

        for analysis in analyses
    ]

def get_analysis_detail_service(

    analysis_id: int,

    db: Session,

    current_user: User
):

    analysis = (

        db.query(Analysis)

        .join(Resume)

        .filter(

            Analysis.id == analysis_id,

            Resume.owner_id ==
            current_user.id

        )

        .first()
    )

    if not analysis:

        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )

    return {

        "analysis_id":
            analysis.id,

        "resume_id":
            analysis.resume_id,

        "resume_name":
            analysis.resume.file_name,

        "analysis_type":
            analysis.analysis_type,

        "target_role":
            analysis.target_role,

        "job_description":
            analysis.job_description,

        "score":
            analysis.score,

        "analysis_result":
            json.loads(
                analysis.analysis_result
            ),

        "created_at":
            analysis.created_at
    }




def create_analysis_service(
    resume_id: int,
    analysis_type: str,
    target_role: str | None,
    job_description: str | None,
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

    if analysis_type == "general":

        result = generate_general_analysis(
            resume.resume_text
        )

        score = result["ats_score"]


    elif analysis_type == "role":

        if not target_role:
            raise HTTPException(

                status_code=400,

                detail="Target role required"

            )

        result = generate_role_analysis(

            resume.resume_text,

            target_role

        )

        score = result[

            "role_analysis"

        ][

            "score"

        ]

    elif analysis_type == "job_description":

        if not job_description:

            raise HTTPException(
                status_code=400,
                detail="Job description required"
            )

        result = generate_jd_analysis(
            resume.resume_text,
            job_description
        )

        score = result[
            "job_description_analysis"
        ][
            "match_percentage"
        ]

    else:

        raise HTTPException(
            status_code=400,
            detail="Invalid analysis type"
        )

    analysis = Analysis(

        resume_id=resume.id,

        analysis_type=analysis_type,

        target_role=target_role,

        job_description=job_description,

        score=score,

        analysis_result=json.dumps(result)
    )

    db.add(analysis)

    db.commit()

    db.refresh(analysis)

    return {

        "analysis_id": analysis.id,

        "analysis_type": analysis.analysis_type,

        "score": analysis.score,

        "created_at": analysis.created_at
    }