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

        average_score = round(

            sum(
                analysis.score

                for analysis in analyses
            )

            / len(analyses),

            2
        )

    else:

        average_score = 0
    if analyses:

        highest_score = max(

            analysis.match_percentage

            for analysis in analyses
        )

    else:

        highest_score = 0
        return {

        "total_resumes":
            total_resumes,

        "total_analyses":
            total_analyses,

        "average_score":
            average_score,

        "highest_score":
            highest_score,


    }