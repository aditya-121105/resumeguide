from sqlalchemy.orm import Session
from collections import Counter
from app.models.resume import Resume
from app.models.analysis import Analysis


def get_dashboard_data(
    db: Session,
    user_id: int
):
    total_resumes = db.query(
        Resume
    ).filter(
        Resume.owner_id == user_id
    ).count()
    analyses = (

        db.query(Analysis)

        .join(Resume)

        .filter(
            Resume.owner_id == user_id
        )

        .all()
    )
    total_analyses = len(
        analyses
    )
    if analyses:

        average_match_score = round(

            sum(
                analysis.match_percentage

                for analysis in analyses
            )

            / len(analyses),

            2
        )

    else:

        average_match_score = 0
    if analyses:

        highest_match_score = max(

            analysis.match_percentage

            for analysis in analyses
        )

    else:

        highest_match_score = 0
    all_missing_skills = []
    for analysis in analyses:

        if analysis.missing_skills:
            skills = (
                analysis.missing_skills
                .split(",")
            )

            all_missing_skills.extend(
                skills
            )
    common_skills = Counter(

        all_missing_skills

    ).most_common(5)
    most_common_missing_skills = [

        skill

        for skill, count

        in common_skills
    ]
    return {

        "total_resumes":
            total_resumes,

        "total_analyses":
            total_analyses,

        "average_match_score":
            average_match_score,

        "highest_match_score":
            highest_match_score,

        "most_common_missing_skills":
            most_common_missing_skills
    }