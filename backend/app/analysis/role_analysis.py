from app.analysis.skill_analyzer import extract_skills
from app.analysis.gap_prioritizer import prioritize_skill_gaps
from app.analysis.recommendation_engine import generate_recommendations
from app.analysis.roadmap_generator import generate_roadmap

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