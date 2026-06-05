from app.analysis.general_analysis import (
    generate_general_analysis
)

from app.analysis.skill_analyzer import (
    compare_skills
)

from app.analysis.role_detector import (
    detect_role
)

from app.analysis.gap_prioritizer import (
    prioritize_skill_gaps
)

from app.analysis.recommendation_engine import (
    generate_recommendations
)

from app.analysis.roadmap_generator import (
    generate_roadmap
)

SKILL_STRENGTH_MESSAGES = {

    "python":
        "Strong Python background matches job requirements",

    "aws":
        "AWS experience aligns with cloud deployment requirements",

    "sql":
        "Database skills satisfy SQL requirements",

    "docker":
        "Docker knowledge matches deployment requirements",

    "fastapi":
        "FastAPI experience aligns with backend API development",

    "machine learning":
        "Machine Learning skills match AI requirements",

    "tensorflow":
        "TensorFlow experience aligns with ML development"
}

SKILL_WEAKNESS_MESSAGES = {

    "python":
        "Python skills not detected",

    "aws":
        "AWS experience not detected",

    "sql":
        "SQL/database experience not detected",

    "docker":
        "Docker experience not detected",

    "fastapi":
        "FastAPI experience not detected",

    "machine learning":
        "Machine Learning skills not detected",

    "tensorflow":
        "TensorFlow experience not detected"
}
SKILL_STRENGTH_MESSAGES = {

    "python":
        "Strong Python background matches job requirements",

    "aws":
        "AWS experience aligns with cloud deployment requirements",

    "sql":
        "Database skills satisfy SQL requirements",

    "docker":
        "Docker knowledge matches deployment requirements",

    "fastapi":
        "FastAPI experience aligns with backend API development",

    "machine learning":
        "Machine Learning skills match AI requirements",

    "tensorflow":
        "TensorFlow experience aligns with ML development"
}

SKILL_WEAKNESS_MESSAGES = {

    "python":
        "Python skills not detected",

    "aws":
        "AWS experience not detected",

    "sql":
        "SQL/database experience not detected",

    "docker":
        "Docker experience not detected",

    "fastapi":
        "FastAPI experience not detected",

    "machine learning":
        "Machine Learning skills not detected",

    "tensorflow":
        "TensorFlow experience not detected"
}
SKILL_EXPLANATIONS = {

    "python":
        "Widely used programming language required for software development.",

    "fastapi":
        "Modern framework used for building high-performance APIs.",

    "flask":
        "Popular lightweight backend framework.",

    "sql":
        "Required for storing and querying data.",

    "aws":
        "Cloud platform used for deployment and infrastructure.",

    "docker":
        "Used to package and deploy applications consistently.",

    "kubernetes":
        "Used to manage containerized applications at scale.",

    "terraform":
        "Used for Infrastructure as Code automation.",

    "machine learning":
        "Required for building intelligent predictive systems.",

    "deep learning":
        "Advanced machine learning technique used in AI applications.",

    "tensorflow":
        "Popular machine learning framework.",

    "computer vision":
        "Required for image and video analysis systems.",

    "nlp":
        "Required for text processing and language understanding."
}


def generate_jd_analysis(

    resume_text: str,

    job_description: str
):

    general_analysis = (
        generate_general_analysis(
            resume_text
        )
    )

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

    detailed_skill_gaps = []

    for gap in skill_gaps:

        detailed_skill_gaps.append({

            "skill":
                gap["skill"],

            "priority":
                gap["priority"],

            "why_it_matters":
                SKILL_EXPLANATIONS.get(

                    gap["skill"],

                    "Important skill for the target role."
                )
        })

    match_percentage = (
        result["match_percentage"]
    )

    if match_percentage >= 80:

        readiness_level = (
            "Job Ready"
        )

    elif match_percentage >= 60:

        readiness_level = (
            "Intermediate"
        )

    elif match_percentage >= 40:

        readiness_level = (
            "Beginner"
        )

    else:

        readiness_level = (
            "Early Learning"
        )
    if match_percentage >= 80:

        verdict = (
            "Strong match for this position."
        )

    elif match_percentage >= 60:

        verdict = (
            "Good match but a few important skills are missing."
        )

    elif match_percentage >= 40:

        verdict = (
            "Partial match. Additional preparation is recommended."
        )

    else:

        verdict = (
            "Significant skill gaps detected for this role."
        )
        if match_percentage >= 80:

            verdict = (
                "Strong match for this position."
            )

        elif match_percentage >= 60:

            verdict = (
                "Good match but a few important skills are missing."
            )

        elif match_percentage >= 40:

            verdict = (
                "Partial match. Additional preparation is recommended."
            )

        else:

            verdict = (
                "Significant skill gaps detected for this role."
            )

    summary = {

        "readiness_level":
            readiness_level,

        "strengths": [

            SKILL_STRENGTH_MESSAGES.get(
                skill,
                f"{skill} matches job requirements"
            )

            for skill in result["matched_skills"]
        ],

        "weaknesses": [

                SKILL_WEAKNESS_MESSAGES.get(
                    skill,
                    f"{skill} not detected"
                )

                for skill in result["missing_skills"]
            ],

        "next_steps": [

            f"Learn {skill}"

            for skill in result[
                "missing_skills"
            ][:3]
        ]
    }

    improvement_plan = []

    for gap in detailed_skill_gaps:

        improvement_plan.append({

            "skill":
                gap["skill"],

            "priority":
                gap["priority"],

            "action":
                f"Learn {gap['skill']} and build a project using it"
        })

    return {

        "general_analysis":
            general_analysis,

        "job_description_analysis": {

            "detected_role":
                detected_role,

            "match_percentage":
                match_percentage,

            "matched_skills":
                result[
                    "matched_skills"
                ],

            "missing_skills":
                result[
                    "missing_skills"
                ],

            "skill_gaps":
                detailed_skill_gaps,

            "improvement_plan":
                improvement_plan,

            "recommended_projects":
                recommendations[
                    "recommended_projects"
                ],

            "recommended_certifications":
                recommendations[
                    "recommended_certifications"
                ],

            "roadmap":
                roadmap,
            "overall_verdict":
                verdict,

            "summary":
                summary
        }
    }