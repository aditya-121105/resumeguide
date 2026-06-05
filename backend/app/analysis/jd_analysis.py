from app.analysis.skill_analyzer import compare_skills
from app.analysis.role_detector import detect_role
from app.analysis.gap_prioritizer import prioritize_skill_gaps
from app.analysis.recommendation_engine import generate_recommendations
from app.analysis.roadmap_generator import generate_roadmap


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