from app.analysis.skill_analyzer import extract_skills
from app.analysis.certificate_analyzer import extract_certifications

def generate_ats_analysis(
    resume_text: str
):

    text = resume_text.lower()

    total_score = 0

    breakdown = []

    # Education
    education_score = 15 if "education" in text else 0

    breakdown.append({
        "category": "Education",
        "score": education_score,
        "max_score": 15,
        "reason":
            "Education section detected"
            if education_score
            else
            "Education section missing"
    })

    total_score += education_score

    # Skills
    skills_score = 15 if "skills" in text else 0

    breakdown.append({
        "category": "Skills",
        "score": skills_score,
        "max_score": 15,
        "reason":
            "Skills section detected"
            if skills_score
            else
            "Skills section missing"
    })

    total_score += skills_score

    # Projects
    projects_score = 15 if "project" in text else 0

    breakdown.append({
        "category": "Projects",
        "score": projects_score,
        "max_score": 15,
        "reason":
            "Projects section detected"
            if projects_score
            else
            "Projects section missing"
    })

    total_score += projects_score

    # Experience
    experience_score = 15 if "experience" in text else 0

    breakdown.append({
        "category": "Experience",
        "score": experience_score,
        "max_score": 15,
        "reason":
            "Experience section detected"
            if experience_score
            else
            "Experience section missing"
    })

    total_score += experience_score

    # Certifications
    certifications = extract_certifications(
        resume_text
    )

    certification_score = (
        10 if certifications else 0
    )

    breakdown.append({
        "category": "Certifications",
        "score": certification_score,
        "max_score": 10,
        "reason":
            f"{len(certifications)} certification(s) detected"
            if certifications
            else
            "No certifications detected"
    })

    total_score += certification_score

    # Resume Length
    length_score = 10 if len(text) > 1000 else 5

    breakdown.append({
        "category": "Resume Length",
        "score": length_score,
        "max_score": 10,
        "reason":
            "Resume length looks good"
            if len(text) > 1000
            else
            "Resume appears short"
    })

    total_score += length_score

    # Technical Skills
    detected_skills = extract_skills(
        resume_text
    )

    technical_score = min(
        len(detected_skills),
        10
    )

    breakdown.append({
        "category": "Technical Skills",
        "score": technical_score,
        "max_score": 10,
        "reason":
            f"{len(detected_skills)} technical skill(s) detected"
    })

    total_score += technical_score

    # Contact Information
    contact_score = 10

    breakdown.append({
        "category": "Contact Information",
        "score": contact_score,
        "max_score": 10,
        "reason":
            "Basic contact information assumed present"
    })

    total_score += contact_score

    return {
        "ats_score": min(total_score, 100),
        "score_breakdown": breakdown
    }