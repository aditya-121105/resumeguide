from app.analysis.skill_analyzer import extract_skills
from app.analysis.certificate_analyzer import extract_certifications
import re
from app.analysis.ats_rules import (
    EDUCATION_KEYWORDS,
    PROJECT_KEYWORDS,
    EXPERIENCE_KEYWORDS,
    SKILL_SECTION_KEYWORDS
)

def generate_ats_analysis(
    resume_text: str
):

    text = resume_text.lower()

    education_analysis = (
        evaluate_education(text)
    )

    skills_analysis = (
        evaluate_skills_section(text)
    )

    projects_analysis = (
        evaluate_projects(text)
    )

    experience_analysis = (
        evaluate_experience(text)
    )

    certification_analysis = (
        evaluate_certifications(
            resume_text
        )
    )

    length_analysis = (
        evaluate_resume_length(
            resume_text
        )
    )

    technical_skills_analysis = (
        evaluate_technical_skills(
            resume_text
        )
    )

    contact_analysis = (
        evaluate_contact_info(
            resume_text
        )
    )

    breakdown = [

        education_analysis,

        skills_analysis,

        projects_analysis,

        experience_analysis,

        certification_analysis,

        length_analysis,

        technical_skills_analysis,

        contact_analysis
    ]

    total_score = sum(
        item["score"]
        for item in breakdown
    )

    ats_score = min(
        total_score,
        100
    )

    return {

        "ats_score":
            ats_score,

        "score_breakdown":
            breakdown
    }

def evaluate_skills_section(
    text: str
):

    evidence = []
    missing = []
    score = 0

    # Skills Section Heading

    if any(
        keyword in text
        for keyword in [
            "skills",
            "technical skills"
        ]
    ):

        evidence.append(
            "Skills section detected"
        )

        score += 5

    else:

        missing.append(
            "Skills section not detected"
        )

    # Technologies Mentioned

    if any(
        keyword in text
        for keyword in [
            "python",
            "java",
            "react",
            "flask",
            "fastapi",
            "aws",
            "docker",
            "sql",
            "tensorflow"
        ]
    ):

        evidence.append(
            "Technologies detected"
        )

        score += 5

    else:

        missing.append(
            "Technologies not detected"
        )

    # Tools Mentioned

    if any(
        keyword in text
        for keyword in [
            "git",
            "github",
            "linux",
            "mongodb",
            "postgresql",
            "redis"
        ]
    ):

        evidence.append(
            "Tools detected"
        )

        score += 5

    else:

        missing.append(
            "Development tools not detected"
        )

    return {

        "category":
            "Skills",

        "score":
            score,

        "max_score":
            15,

        "evidence":
            evidence,

        "missing":
            missing
    }

def evaluate_technical_skills(
    resume_text: str
):

    detected_skills = extract_skills(
        resume_text
    )

    evidence = []

    missing = []

    skill_count = len(
        detected_skills
    )

    # Skill Coverage

    if skill_count >= 10:

        score = 10

        evidence.append(
            f"{skill_count} technical skills detected"
        )

    elif skill_count >= 7:

        score = 8

        evidence.append(
            f"{skill_count} technical skills detected"
        )

        missing.append(
            "More technical skills can be added"
        )

    elif skill_count >= 4:

        score = 5

        evidence.append(
            f"{skill_count} technical skills detected"
        )

        missing.append(
            "Technical skill coverage is moderate"
        )

    else:

        score = 2

        evidence.append(
            f"{skill_count} technical skills detected"
        )

        missing.append(
            "Technical skill coverage is limited"
        )

    # Skill Categories

    categories_detected = []

    if any(
        skill in detected_skills
        for skill in [
            "python",
            "java",
            "c++"
        ]
    ):

        categories_detected.append(
            "Programming"
        )

    if any(
        skill in detected_skills
        for skill in [
            "aws",
            "docker",
            "kubernetes"
        ]
    ):

        categories_detected.append(
            "Cloud/DevOps"
        )

    if any(
        skill in detected_skills
        for skill in [
            "machine learning",
            "deep learning",
            "tensorflow",
            "computer vision",
            "nlp"
        ]
    ):

        categories_detected.append(
            "AI/ML"
        )

    if any(
        skill in detected_skills
        for skill in [
            "sql",
            "postgresql",
            "mongodb"
        ]
    ):

        categories_detected.append(
            "Databases"
        )

    if categories_detected:

        evidence.append(

            "Categories detected: "

            + ", ".join(
                categories_detected
            )
        )

    return {

        "category":
            "Technical Skills",

        "score":
            score,

        "max_score":
            10,

        "evidence":
            evidence,

        "missing":
            missing
    }

import re

def evaluate_contact_info(
    resume_text: str
):

    evidence = []

    missing = []

    score = 0

    # Email

    if re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        resume_text
    ):

        evidence.append(
            "Email address detected"
        )

        score += 3

    else:

        missing.append(
            "Email address not detected"
        )

    # Phone

    if re.search(
        r"\+?\d[\d\s\-]{8,}",
        resume_text
    ):

        evidence.append(
            "Phone number detected"
        )

        score += 3

    else:

        missing.append(
            "Phone number not detected"
        )

    # LinkedIn

    if "linkedin.com" in resume_text.lower():

        evidence.append(
            "LinkedIn profile detected"
        )

        score += 2

    else:

        missing.append(
            "LinkedIn profile not detected"
        )

    # GitHub

    if "github.com" in resume_text.lower():

        evidence.append(
            "GitHub profile detected"
        )

        score += 2

    else:

        missing.append(
            "GitHub profile not detected"
        )

    return {

        "category":
            "Contact Information",

        "score":
            score,

        "max_score":
            10,

        "evidence":
            evidence,

        "missing":
            missing
    }


def evaluate_education(
    text: str
):

    evidence = []
    missing = []
    score = 0

    # Degree
    degree_keywords = [
        "b.tech", "b.e", "bca", "mca",
        "bsc", "msc", "mba", "phd"
    ]

    if any(
        keyword in text
        for keyword in degree_keywords
    ):
        evidence.append(
            "Degree detected"
        )
        score += 4
    else:
        missing.append(
            "Degree not detected"
        )

    # Specialization
    specialization_keywords = [
        "computer science",
        "cse",
        "it",
        "information technology",
        "aiml",
        "artificial intelligence",
        "machine learning",
        "mechanical",
        "civil",
        "electrical",
        "electronics"
    ]

    if any(
        keyword in text
        for keyword in specialization_keywords
    ):
        evidence.append(
            "Specialization detected"
        )
        score += 4
    else:
        missing.append(
            "Specialization not detected"
        )

    # Institution
    institution_keywords = [
        "college",
        "university",
        "institute"
    ]

    if any(
        keyword in text
        for keyword in institution_keywords
    ):
        evidence.append(
            "Institution detected"
        )
        score += 4
    else:
        missing.append(
            "Institution not detected"
        )

    # Academic Score
    academic_keywords = [
        "cgpa",
        "gpa",
        "percentage"
    ]

    if any(
        keyword in text
        for keyword in academic_keywords
    ):
        evidence.append(
            "Academic score detected"
        )
        score += 3
    else:
        missing.append(
            "CGPA / Percentage not detected"
        )

    return {

        "category":
            "Education",

        "score":
            score,

        "max_score":
            15,

        "evidence":
            evidence,

        "missing":
            missing
    }

def evaluate_resume_length(
    resume_text: str
):

    words = len(
        resume_text.split()
    )

    if words < 200:

        score = 2

    elif words < 400:

        score = 5

    elif words < 700:

        score = 8

    elif words < 1200:

        score = 10

    elif words < 1800:

        score = 8

    else:

        score = 5

    missing = []

    if words < 700:

        missing.append(
            "Recommended resume length is 700-1200 words"
        )

    elif words > 1200:

        missing.append(
            "Resume may be longer than recommended"
        )

    return {

        "category":
            "Resume Length",

        "score":
            score,

        "max_score":
            10,

        "evidence": [
            f"{words} words detected"
        ],

        "missing":
            missing
    }

def evaluate_projects(
    text: str
):

    evidence = []
    missing = []
    score = 0

    # Project Section

    if "project" in text:

        evidence.append(
            "Projects section detected"
        )

        score += 4

    else:

        missing.append(
            "Projects section not detected"
        )

    # Implementation Details

    implementation_keywords = [
        "developed",
        "implemented",
        "built",
        "created",
        "designed"
    ]

    found_implementation = [

        keyword

        for keyword in implementation_keywords

        if keyword in text
    ]

    if found_implementation:

        evidence.append(
            "Implementation details detected"
        )

        score += 4

    else:

        missing.append(
            "Implementation details not detected"
        )

    # Technology Stack

    tech_keywords = [
        "python",
        "java",
        "react",
        "flask",
        "fastapi",
        "aws",
        "docker",
        "tensorflow",
        "sql"
    ]

    found_tech = [

        keyword

        for keyword in tech_keywords

        if keyword in text
    ]

    if len(found_tech) >= 2:

        evidence.append(
            "Technology stack detected"
        )

        score += 4

    else:

        missing.append(
            "Technology stack not clearly mentioned"
        )

    # Quantifiable Impact

    impact_keywords = [
        "accuracy",
        "improved",
        "reduced",
        "optimized",
        "users",
        "efficiency",
        "performance"
    ]

    found_impact = [

        keyword

        for keyword in impact_keywords

        if keyword in text
    ]

    if len(found_impact) >= 2:

        evidence.append(
            "Quantifiable project impact detected"
        )

        score += 3

    else:

        missing.append(
            "Quantifiable project outcomes not detected"
        )

    return {

        "category":
            "Projects",

        "score":
            score,

        "max_score":
            15,

        "evidence":
            evidence,

        "missing":
            missing
    }


def evaluate_experience(
    text: str
):

    evidence = []
    missing = []
    score = 0

    # Experience Section
    if any(
        keyword in text
        for keyword in [
            "experience",
            "internship",
            "intern"
        ]
    ):

        evidence.append(
            "Experience section detected"
        )

        score += 5

    else:

        missing.append(
            "Experience section not detected"
        )

    # Responsibilities
    if any(
        keyword in text
        for keyword in [
            "worked",
            "responsible",
            "responsibilities"
        ]
    ):

        evidence.append(
            "Responsibilities detected"
        )

        score += 5

    else:

        missing.append(
            "Responsibilities not detected"
        )

    # Duration
    duration_keywords = [
        "days",
        "month",
        "months",
        "year",
        "years"
    ]

    if any(
        keyword in text
        for keyword in duration_keywords
    ):

        evidence.append(
            "Experience duration detected"
        )

        score += 5

    else:

        missing.append(
            "Experience duration not detected"
        )

    return {

        "category":
            "Experience",

        "score":
            score,

        "max_score":
            15,

        "evidence":
            evidence,

        "missing":
            missing
    }
def evaluate_certifications(
    resume_text: str
):

    text = resume_text.lower()

    certifications = extract_certifications(
        resume_text
    )

    evidence = []
    missing = []

    score = 0

    # Official Certifications

    if certifications:

        evidence.extend(
            certifications
        )

        score = min(
            len(certifications) * 5,
            10
        )

    # Training / Workshops

    training_keywords = [
        "training",
        "workshop",
        "certificate",
        "certification",
        "course",
        "specialization",
        "bootcamp"
    ]

    found_training = [

        keyword

        for keyword in training_keywords

        if keyword in text
    ]

    if found_training and score == 0:

        evidence.append(
            "Training / workshop programs detected"
        )

        score = 5

    if score == 0:

        missing.append(
            "No certifications or training programs detected"
        )

    elif score < 10:

        missing.append(
            "Industry-recognized certifications not detected"
        )

    return {

        "category":
            "Certifications",

        "score":
            score,

        "max_score":
            10,

        "evidence":
            evidence,

        "missing":
            missing,

        "recommended_certifications": [

            "AWS Cloud Practitioner",

            "Docker Foundations",

            "TensorFlow Developer Certificate"
        ]
        if score < 10
        else []
    }