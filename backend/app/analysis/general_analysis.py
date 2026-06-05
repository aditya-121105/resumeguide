from app.analysis.skill_analyzer import extract_skills
from app.analysis.role_recommender import recommend_roles
from app.analysis.certificate_analyzer import extract_certifications
from app.analysis.ats_engine import generate_ats_analysis


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

    ats_analysis = generate_ats_analysis(
        resume_text
    )

    return {

        "ats_score":
            ats_analysis["ats_score"],

        "score_breakdown":
            ats_analysis["score_breakdown"],



        "recommended_roles":
            roles
    }