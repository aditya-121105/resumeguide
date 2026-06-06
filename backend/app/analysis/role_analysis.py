from app.analysis.skill_analyzer import extract_skills
from app.analysis.gap_prioritizer import prioritize_skill_gaps
from app.analysis.recommendation_engine import generate_recommendations
from app.analysis.roadmap_generator import generate_roadmap
from app.analysis.general_analysis import (
    generate_general_analysis
)

ROLE_SKILL_MAPPING = {
"Frontend Developer": [
    "html",
    "css",
    "javascript",
    "react",
    "typescript"
],

"Full Stack Developer": [
    "html",
    "css",
    "javascript",
    "react",
    "python",
    "flask",
    "sql"
],

"Software Engineer": [
    "python",
    "java",
    "sql",
    "git",
    "oop"
],

"Python Developer": [
    "python",
    "flask",
    "fastapi",
    "sql",
    "api"
],

"Java Developer": [
    "java",
    "spring",
    "sql",
    "hibernate"
],

"Data Engineer": [
    "python",
    "sql",
    "spark",
    "etl"
],

"AI Engineer": [
    "python",
    "machine learning",
    "deep learning",
    "tensorflow",
    "nlp"
],

"Mobile App Developer": [
    "java",
    "kotlin",
    "android",
    "firebase"
],

"Cybersecurity Engineer": [
    "networking",
    "linux",
    "security",
    "penetration testing"
],
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

ROLE_SKILL_EXPLANATIONS = {

"python":
    "Core programming language used in backend development.",

"fastapi":
    "Modern Python framework used for building high-performance APIs.",

"flask":
    "Popular lightweight Python backend framework.",

"sql":
    "Required for storing and querying application data.",

"aws":
    "Widely used cloud platform for deploying applications.",

"docker":
    "Used to package and deploy applications consistently.",

"machine learning":
    "Foundation of intelligent systems and predictive models.",

"tensorflow":
    "Popular framework for machine learning development.",

"deep learning":
    "Advanced machine learning used in AI applications.",

"computer vision":
    "Used for image and video analysis systems.",

"nlp":
    "Used for language understanding and chatbot systems.",

"kubernetes":
    "Used to manage containerized applications at scale.",

"terraform":
    "Infrastructure as code tool used in DevOps.",

"aws":
    "Cloud platform used for hosting and deployment.",

"linux":
    "Operating system commonly used on production servers."

}
ROLE_STRENGTH_MESSAGES = {

    "python":
        "Strong Python programming foundation",

    "flask":
        "Experience with Flask backend development",

    "fastapi":
        "Experience with modern FastAPI development",

    "sql":
        "Good database and SQL knowledge",

    "aws":
        "Cloud exposure through AWS",

    "docker":
        "Containerization knowledge detected",

    "machine learning":
        "Machine Learning fundamentals detected",

    "deep learning":
        "Deep Learning knowledge detected",

    "tensorflow":
        "TensorFlow framework experience detected",

    "computer vision":
        "Computer Vision skills detected",

    "nlp":
        "Natural Language Processing skills detected",

    "kubernetes":
        "Container orchestration experience detected",

    "terraform":
        "Infrastructure as Code knowledge detected"
}


ROLE_WEAKNESS_MESSAGES = {

    "python":
        "Python skills not detected",

    "flask":
        "No Flask experience detected",

    "fastapi":
        "No FastAPI experience detected",

    "sql":
        "Database skills not detected",

    "aws":
        "No cloud platform experience detected",

    "docker":
        "No containerization experience detected",

    "machine learning":
        "Machine Learning skills not detected",

    "deep learning":
        "Deep Learning skills not detected",

    "tensorflow":
        "TensorFlow experience not detected",

    "computer vision":
        "Computer Vision skills not detected",

    "nlp":
        "Natural Language Processing skills not detected",

    "kubernetes":
        "Kubernetes experience not detected",

    "terraform":
        "Terraform experience not detected"
}

def generate_role_analysis(
resume_text: str,
target_role: str
):

    resume_skills = extract_skills(
        resume_text
    )
    general_analysis = (
        generate_general_analysis(
            resume_text
        )
    )

    role_skills = ROLE_SKILL_MAPPING.get(
        target_role,
        []
    )

    matched_skills = list(
        set(resume_skills)
        &
        set(role_skills)
    )

    missing_skills = list(
        set(role_skills)
        -
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

    detailed_skill_gaps = []

    for gap in skill_gaps:

        detailed_skill_gaps.append({

            "skill":
                gap["skill"],

            "priority":
                gap["priority"],

            "why_it_matters":
                ROLE_SKILL_EXPLANATIONS.get(
                    gap["skill"],
                    "Important skill for the target role."
                )
        })

    role_summary = {


        "strengths": [

            ROLE_STRENGTH_MESSAGES.get(
                skill,
                f"Experience with {skill}"
            )

            for skill in matched_skills
        ],

        "weaknesses": [

            ROLE_WEAKNESS_MESSAGES.get(
                skill,
                f"{skill} not detected"
            )

            for skill in missing_skills
        ],

        "next_steps": [

            f"Learn {skill}"

            for skill in missing_skills[:3]
        ]
    }

    return {

        "general_analysis":
            general_analysis,

        "role_analysis": {

            "role":
                target_role,

            "score":
                score,

            "matched_skills":
                matched_skills,

            "missing_skills":
                missing_skills,

            "skill_gaps":
                detailed_skill_gaps,

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

            "role_summary":
                role_summary
        }
    }




