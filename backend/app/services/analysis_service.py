from fastapi import HTTPException
from app.analysis.certificate_analyzer import extract_certifications
from app.analysis.gap_prioritizer import prioritize_skill_gaps
from app.analysis.recommendation_engine import generate_recommendations
from app.analysis.roadmap_generator import generate_roadmap
from app.analysis.skill_analyzer import extract_skills
from app.analysis.role_recommender import recommend_roles
from app.analysis.certificate_analyzer import extract_certifications
from app.analysis.role_recommender import recommend_roles
from app.analysis.roadmap_generator import generate_roadmap
from sqlalchemy.orm import Session
from app.analysis.role_detector import detect_role
from app.models.resume import Resume
from app.models.user import User
from app.models.analysis import Analysis
from app.analysis.skill_analyzer import compare_skills
import json

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
    recommended_roles = (
        recommend_roles(

            analysis_result[
                "resume_skills"
            ]
        )
    )
    analysis_result[
        "recommended_roles"
    ] = recommended_roles
    detected_certifications = (
        extract_certifications(
            resume.resume_text
        )
    )
    analysis_result[
        "detected_certifications"
    ] = detected_certifications
    target_role = detect_role(
        job_description
    )
    recommendations = (
        generate_recommendations(
            analysis_result["missing_skills"],
            target_role
        )
    )
    roadmap = generate_roadmap(

        target_role,

        analysis_result[
            "missing_skills"
        ]
    )
    skill_gaps = prioritize_skill_gaps(

        analysis_result[
            "missing_skills"
        ]
    )
    analysis_result[
        "skill_gaps"
    ] = skill_gaps
    analysis_result[
        "career_roadmap"
    ] = roadmap
    analysis_result.update(
        recommendations
    )
    analysis_result["target_role"] = (
        target_role
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

        .all()
    )

    return [

        {
            "analysis_id": analysis.id,

            "resume_id": analysis.resume_id,

            "resume_name": analysis.resume.file_name,

            "match_percentage":
                analysis.match_percentage,

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

        "job_description":
            analysis.job_description,

        "match_percentage":
            analysis.match_percentage,

        "matched_skills":
            analysis.matched_skills.split(","),

        "missing_skills":
            analysis.missing_skills.split(","),

        "created_at":
            analysis.created_at
    }

def calculate_ats_score(resume_text: str):

    score = 50

    text = resume_text.lower()

    if "education" in text:
        score += 10

    if "skills" in text:
        score += 10

    if "project" in text:
        score += 10

    if "experience" in text:
        score += 10

    if len(text) > 1000:
        score += 10

    return min(score, 100)

def generate_general_analysis(
    resume_text: str
):

    skills = extract_skills(
        resume_text
    )

    certifications = (
        extract_certifications(
            resume_text
        )
    )

    roles = recommend_roles(
        skills
    )

    ats_score = calculate_ats_score(
        resume_text
    )

    return {

        "ats_score":
            ats_score,

        "detected_skills":
            skills,

        "detected_certifications":
            certifications,

        "recommended_roles":
            roles,

        "strengths": [
            "Skills section detected"
            if skills else
            "No major skills detected"
        ],

        "recommendations": [
            "Add more relevant projects",
            "Add certifications",
            "Improve ATS keywords"
        ]
    }

ROLE_SKILL_MAPPING = {

    "Backend Engineer": [
        "python",
        "fastapi",
        "flask",
        "sql",
        "aws",
        "docker"
    ],

    "Machine Learning Engineer": [
        "python",
        "machine learning",
        "deep learning",
        "tensorflow",
        "computer vision",
        "nlp"
    ],

    "Data Analyst": [
        "sql",
        "power bi",
        "tableau",
        "excel"
    ],

    "DevOps Engineer": [
        "docker",
        "kubernetes",
        "aws",
        "terraform"
    ],

    "Cloud Engineer": [
        "aws",
        "docker",
        "kubernetes",
        "linux"
    ]
}


def generate_role_analysis(
    resume_text: str,
    target_role: str
):

    resume_skills = extract_skills(
        resume_text
    )

    role_skills = ROLE_SKILL_MAPPING.get(
        target_role,
        []
    )

    matched_skills = list(
        set(resume_skills) &
        set(role_skills)
    )

    missing_skills = list(
        set(role_skills) -
        set(resume_skills)
    )

    score = 0

    if role_skills:

        score = round(
            (
                len(matched_skills)
                /
                len(role_skills)
            ) * 100,
            2
        )

    recommendations = (
        generate_recommendations(
            missing_skills,
            target_role
        )
    )

    roadmap = generate_roadmap(
        target_role,
        missing_skills
    )

    skill_gaps = prioritize_skill_gaps(
        missing_skills
    )

    return {

        "role":
            target_role,

        "score":
            score,

        "matched_skills":
            matched_skills,

        "missing_skills":
            missing_skills,

        "skill_gaps":
            skill_gaps,

        "recommended_projects":
            recommendations[
                "recommended_projects"
            ],

        "recommended_certifications":
            recommendations[
                "recommended_certifications"
            ],

        "roadmap":
            roadmap
    }
def generate_jd_analysis(
    resume_text: str,
    job_description: str
):

    result = compare_skills(
        resume_text,
        job_description
    )

    detected_role = detect_role(
        job_description
    )

    recommendations = (
        generate_recommendations(
            result["missing_skills"],
            detected_role
        )
    )

    roadmap = generate_roadmap(
        detected_role,
        result["missing_skills"]
    )

    skill_gaps = prioritize_skill_gaps(
        result["missing_skills"]
    )

    return {

        "detected_role":
            detected_role,

        "match_percentage":
            result[
                "match_percentage"
            ],

        "matched_skills":
            result[
                "matched_skills"
            ],

        "missing_skills":
            result[
                "missing_skills"
            ],

        "skill_gaps":
            skill_gaps,

        "recommended_projects":
            recommendations[
                "recommended_projects"
            ],

        "recommended_certifications":
            recommendations[
                "recommended_certifications"
            ],

        "roadmap":
            roadmap
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

        score = result["score"]

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

        score = result["match_percentage"]

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