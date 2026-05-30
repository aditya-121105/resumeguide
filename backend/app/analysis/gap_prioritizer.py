HIGH_PRIORITY_SKILLS = [

    "python",

    "sql",

    "docker",

    "aws",

    "fastapi",

    "kubernetes",

    "machine learning",

    "deep learning",

    "tensorflow"
]

MEDIUM_PRIORITY_SKILLS = [

    "git",

    "github",

    "redis",

    "flask",

    "computer vision",

    "nlp"
]

def prioritize_skill_gaps(
    missing_skills
):

    prioritized_gaps = []

    for skill in missing_skills:

        if skill in HIGH_PRIORITY_SKILLS:

            priority = "High"

        elif skill in MEDIUM_PRIORITY_SKILLS:

            priority = "Medium"

        else:

            priority = "Low"

        prioritized_gaps.append({

            "skill": skill,

            "priority": priority
        })

    return prioritized_gaps