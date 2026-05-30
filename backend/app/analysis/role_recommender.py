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
    ]
}
def recommend_roles(
    resume_skills
):

    role_scores = []

    resume_skills = set(
        resume_skills
    )

    for role, role_skills in (
        ROLE_SKILL_MAPPING.items()
    ):

        matched = len(

            resume_skills.intersection(
                role_skills
            )
        )

        score = round(

            (
                matched /
                len(role_skills)
            ) * 100,

            2
        )

        role_scores.append({

            "role": role,

            "score": score
        })

    role_scores.sort(

        key=lambda x: x["score"],

        reverse=True
    )

    return [
        role
        for role in role_scores
        if role["score"] >= 30
    ]