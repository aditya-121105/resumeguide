ROLE_ROADMAPS = {

    "Backend Engineer": {

        "docker": [
            "Learn Docker fundamentals",
            "Containerize a FastAPI application"
        ],

        "fastapi": [
            "Build a REST API using FastAPI",
            "Implement JWT authentication"
        ],

        "aws": [
            "Learn AWS EC2 basics",
            "Deploy a FastAPI application on EC2"
        ],

        "redis": [
            "Learn Redis caching",
            "Integrate Redis with FastAPI"
        ]
    },

    "Machine Learning Engineer": {

        "nlp": [
            "Learn NLP fundamentals",
            "Build a sentiment analysis project"
        ],

        "tensorflow": [
            "Complete TensorFlow tutorials",
            "Build an image classification project"
        ],

        "deep learning": [
            "Learn CNN architecture",
            "Build a computer vision project"
        ]
    },

    "DevOps Engineer": {

        "docker": [
            "Learn Docker fundamentals",
            "Containerize a microservice"
        ],

        "kubernetes": [
            "Learn Kubernetes basics",
            "Deploy a Kubernetes cluster"
        ],

        "terraform": [
            "Learn Infrastructure as Code",
            "Provision AWS resources with Terraform"
        ]
    }
}

def generate_roadmap(
    target_role,
    missing_skills
):

    role_roadmap = (
        ROLE_ROADMAPS.get(
            target_role,
            {}
        )
    )

    roadmap_steps = []

    step_number = 1

    for skill in missing_skills:

        skill_steps = role_roadmap.get(
            skill,
            []
        )

        for step in skill_steps:

            roadmap_steps.append({

                "step":
                    step_number,

                "description":
                    step
            })

            step_number += 1

    return roadmap_steps