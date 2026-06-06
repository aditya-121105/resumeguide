import { AnalysisHero } from './AnalysisHero';
import { SummaryCards } from './SummaryCards';
import { ATSBreakdownChart } from './ATSBreakdownChart';
import { CategoryCard } from './CategoryCard';
import { RecommendedRolesChart } from './RecommendedRolesChart';

type GeneralAnalysisViewProps = {
  analysis: any;
};

export function GeneralAnalysisView({
  analysis,
}: GeneralAnalysisViewProps) {

  const result =
    analysis.analysis_result;

  const atsScore =
    result.ats_score;

  const scoreBreakdown =
    result.score_breakdown || [];

  const recommendedRoles =
    result.recommended_roles || [];

  const getStatus = (
  score: number
) => {

  if (score >= 90)
    return 'Excellent ATS Compatibility';

  if (score >= 75)
    return 'Strong ATS Compatibility';

  if (score >= 60)
    return 'Moderate ATS Compatibility';

  return 'Needs Improvement';
};
  return (

    <div className="space-y-8">

      {/* Hero */}

      <AnalysisHero
        title="Resume Analysis Report"
        resumeName={
          analysis.resume_name
        }
        score={atsScore}
        status={getStatus(atsScore)}
        createdAt={
          analysis.created_at
        }
      />

      {/* Summary */}

      <SummaryCards
        scoreBreakdown={
          scoreBreakdown
        }
        recommendedRoles={
          recommendedRoles
        }
      />

      {/* ATS Breakdown */}

      <ATSBreakdownChart
        scoreBreakdown={
          scoreBreakdown
        }
      />

      {/* Detailed Analysis */}

      <div>

        <div className="mb-5">

          <h2
            className="
              text-2xl
              font-bold
            "
          >
            Detailed Analysis
          </h2>

          <p
            className="
              mt-1
              text-muted-foreground
            "
          >
            Section-by-section
            evaluation of your
            resume
          </p>

        </div>

        <div
          className="
            grid
            gap-6
            lg:grid-cols-2
          "
        >

          {scoreBreakdown.map(
            (
              section: any,
              index: number
            ) => (

              <CategoryCard
                key={index}
                category={
                  section.category
                }
                score={
                  section.score
                }
                maxScore={
                  section.max_score
                }
                evidence={
                  section.evidence
                }
                missing={
                  section.missing
                }
                recommendedCertifications={
                  section.recommended_certifications
                }
              />

            )
          )}

        </div>

      </div>

      {/* Career Matches */}

      <RecommendedRolesChart
        recommendedRoles={
          recommendedRoles
        }
      />

    </div>

  );
}