from sqlalchemy.orm import Session
from app.models.resume import Resume
from app.models.analysis import Analysis


def get_dashboard_data(
    db: Session,
    user_id: int
):

    total_resumes = (
        db.query(Resume)
        .filter(
            Resume.owner_id == user_id
        )
        .count()
    )

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

    average_score = (
        round(
            sum(
                analysis.score
                for analysis in analyses
            ) / total_analyses,
            2
        )
        if total_analyses > 0
        else 0
    )

    highest_score = (
        max(
            analysis.score
            for analysis in analyses
        )
        if total_analyses > 0
        else 0
    )

    recent_analyses = sorted(
        analyses,
        key=lambda x: x.created_at,
        reverse=True
    )[:5]

    analysis_type_counts = {}

    for analysis in analyses:

        analysis_type_counts[
            analysis.analysis_type
        ] = (
            analysis_type_counts.get(
                analysis.analysis_type,
                0
            ) + 1
        )

    latest_score = (
        recent_analyses[0].score
        if recent_analyses
        else 0
    )

    return {

        "total_resumes":
            total_resumes,

        "total_analyses":
            total_analyses,

        "average_score":
            average_score,

        "highest_score":
            highest_score,

        "latest_score":
            latest_score,

        "analysis_type_counts":
            analysis_type_counts,

        "recent_analyses": [

            {
                "id":
                    analysis.id,

                "type":
                    analysis.analysis_type,

                "score":
                    analysis.score,

                "created_at":
                    analysis.created_at
            }

            for analysis in recent_analyses
        ]
    }