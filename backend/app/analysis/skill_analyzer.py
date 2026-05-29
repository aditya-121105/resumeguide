SKILLS = [

    "python",
    "java",
    "c++",
    "fastapi",
    "flask",
    "django",
    "react",
    "node.js",
    "docker",
    "kubernetes",
    "aws",
    "sql",
    "postgresql",
    "mongodb",
    "git",
    "github",
    "tensorflow",
    "pytorch",
    "machine learning",
    "deep learning",
    "nlp",
    "computer vision",
    "linux",
    "redis",
    "ci/cd",
]

def extract_skills(
    text: str
):

    text = text.lower()

    found_skills = []

    for skill in SKILLS:

        if skill.lower() in text:

            found_skills.append(skill)

    return list(set(found_skills))

def compare_skills(
    resume_text: str,
    job_description: str
):

    resume_skills = extract_skills(
        resume_text
    )

    job_skills = extract_skills(
        job_description
    )

    matched_skills = list(
        set(resume_skills) &
        set(job_skills)
    )

    missing_skills = list(
        set(job_skills) -
        set(resume_skills)
    )

    match_percentage = 0

    if job_skills:

        match_percentage = (
            len(matched_skills)
            /
            len(job_skills)
        ) * 100

    return {

        "resume_skills": resume_skills,

        "job_skills": job_skills,

        "matched_skills": matched_skills,

        "missing_skills": missing_skills,

        "match_percentage": round(
            match_percentage,
            2
        )
    }