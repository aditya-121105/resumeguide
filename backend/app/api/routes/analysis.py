from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)
from app.services.analysis_service import (
    get_analysis_history_service,
    get_analysis_detail_service,
    create_analysis_service
)
from sqlalchemy.orm import Session
from app.db.dependencies import get_db
from app.auth.dependencies import (
    get_current_user


)
from app.services.dashboard_service import (
    get_dashboard_data
)
from app.models.user import User



from app.schemas.analysis import (
    AnalysisCreateRequest
)
from app.services.analysis_service import (
    create_analysis_service
)



router = APIRouter(
    prefix="/analysis",
    tags=["Analysis"]
)

@router.get("/history")
def get_analysis_history(

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    return get_analysis_history_service(

        db=db,

        current_user=current_user
    )
@router.get("/details/{analysis_id}")
def get_analysis_detail(

    analysis_id: int,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    return get_analysis_detail_service(

        analysis_id=analysis_id,

        db=db,

        current_user=current_user
    )

@router.get("/dashboard")
def dashboard(

    db: Session = Depends(
        get_db
    ),

    current_user: User = Depends(
        get_current_user
    )
):

    return get_dashboard_data(

        db,

        current_user.id
    )

@router.post("/create")
def create_analysis(

    request: AnalysisCreateRequest,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    return create_analysis_service(

        resume_id=request.resume_id,

        analysis_type=request.analysis_type,

        target_role=request.target_role,

        job_description=request.job_description,

        db=db,

        current_user=current_user
    )