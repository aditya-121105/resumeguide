
import { AnalysisHero } from './AnalysisHero';
import { SummaryCards } from './SummaryCards';
import { ATSBreakdownChart } from './ATSBreakdownChart';
import { CategoryCard } from './CategoryCard';
import { RecommendedRolesChart } from './RecommendedRolesChart';

export function JobDescriptionAnalysisView({
  analysis,
}: {
  analysis: any;
}) {
  const generalData =
      analysis.analysis_result
          ?.general_analysis;

  const jdData =
      analysis.analysis_result
          ?.job_description_analysis;

  const atsScore =
      generalData?.ats_score ?? 0;

  const matchScore =
      jdData?.match_percentage ?? 0;

  const readinessLevel =
      jdData?.summary
          ?.readiness_level ??
      'Unknown';

  const scoreBreakdown =
      generalData?.score_breakdown ??
      [];

  const recommendedRoles =
      generalData?.recommended_roles ??
      [];
  const getReadinessColor = (
      level: string
  ) => {

    switch (
        level.toLowerCase()
        ) {

      case 'job ready':
        return 'text-green-600';

      case 'developing':
        return 'text-yellow-600';

      case 'early learning':
        return 'text-red-600';

      default:
        return 'text-muted-foreground';
    }
  };
  return (

      <div className="space-y-8">

        <AnalysisHero
            title="Job Description Match Report"
            subtitle={analysis.resume_name}
            score={matchScore}
            status={readinessLevel}
            createdAt={analysis.created_at}
            scoreLabel="JOB MATCH"
        />
        {/* Job Description */}

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold mb-4">
            Target Job Description
          </h2>

          <p className="text-muted-foreground leading-7 whitespace-pre-wrap">
            {analysis.job_description}
          </p>

        </div>

        {/* Match Summary */}

        <div className="grid gap-4 md:grid-cols-3">

          <div className="rounded-3xl border bg-white p-6 shadow-sm">

            <p className="text-sm text-muted-foreground">
              Matched Skills
            </p>

            <h3 className="mt-2 text-4xl font-bold text-green-600">
              {jdData?.matched_skills?.length || 0}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Skills found in your resume
            </p>

          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">

            <p className="text-sm text-muted-foreground">
              Missing Skills
            </p>

            <h3 className="mt-2 text-4xl font-bold text-red-600">
              {jdData?.missing_skills?.length || 0}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Skills missing from your resume
            </p>

          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">

            <p className="text-sm text-muted-foreground">
              Readiness Level
            </p>

            <h3
                className={`mt-2 text-2xl font-bold ${getReadinessColor(
                    readinessLevel
                )}`}
            >
              {readinessLevel}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Current job readiness status
            </p>

          </div>

        </div>
        {/* Skills Match Overview */}

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div>

            <h2 className="text-2xl font-bold">
              Skills Match Overview
            </h2>

            <p className="mt-1 text-muted-foreground">
              Comparison between your resume and the job requirements.
            </p>

          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">

            {/* Matched Skills */}

            <div>

              <h3 className="mb-4 text-lg font-semibold text-green-700">
                Matched Skills
              </h3>

              <div className="flex flex-wrap gap-2">

                {jdData?.matched_skills?.map(
                    (skill: string) => (

                        <span
                            key={skill}
                            className="
                rounded-full
                bg-green-100
                px-3
                py-1
                text-sm
                font-medium
                text-green-700
              "
                        >
              ✓ {skill}
            </span>

                    )
                )}

              </div>

            </div>

            {/* Missing Skills */}

            <div>

              <h3 className="mb-4 text-lg font-semibold text-red-700">
                Missing Skills
              </h3>

              <div className="flex flex-wrap gap-2">

                {jdData?.missing_skills?.map(
                    (skill: string) => (

                        <span
                            key={skill}
                            className="
                rounded-full
                bg-red-100
                px-3
                py-1
                text-sm
                font-medium
                text-red-700
              "
                        >
              ✕ {skill}
            </span>

                    )
                )}

              </div>

            </div>

          </div>

        </div>
        {/* Skill Gap Analysis */}

        <div>

          <div className="mb-5">

            <h2 className="text-2xl font-bold">
              Skill Gap Analysis
            </h2>

            <p className="mt-1 text-muted-foreground">
              Critical skills missing for this job and why they matter.
            </p>

          </div>

          <div className="grid gap-6 lg:grid-cols-2">

            {jdData?.skill_gaps?.map(
                (
                    gap: any,
                    index: number
                ) => (

                    <div
                        key={index}
                        className="
            rounded-3xl
            border
            bg-white
            p-6
            shadow-sm
          "
                    >

                      <div className="flex items-center justify-between">

                        <h3 className="text-xl font-semibold">
                          {gap.skill}
                        </h3>

                        <span
                            className="
                rounded-full
                bg-red-100
                px-3
                py-1
                text-xs
                font-medium
                text-red-700
              "
                        >
              {gap.priority} Priority
            </span>

                      </div>

                      <p className="mt-4 text-sm text-muted-foreground">
                        {gap.why_it_matters}
                      </p>

                    </div>

                )
            )}

          </div>

        </div>
        {/* Readiness Summary */}

        <div>

          <div className="mb-5">

            <h2 className="text-2xl font-bold">
              Readiness Summary
            </h2>

            <p className="mt-1 text-muted-foreground">
              Key strengths, weaknesses and next actions.
            </p>

          </div>

          <div className="grid gap-6 lg:grid-cols-3">

            {/* Strengths */}

            <div className="rounded-3xl border bg-white p-6 shadow-sm">

              <h3 className="text-lg font-semibold text-green-700">
                Strengths
              </h3>

              <div className="mt-4 space-y-3">

                {jdData?.summary?.strengths?.map(
                    (
                        item: string,
                        index: number
                    ) => (

                        <div
                            key={index}
                            className="flex gap-3"
                        >

              <span className="text-green-600">
                ✓
              </span>

                          <span className="text-sm">
                {item}
              </span>

                        </div>

                    )
                )}

              </div>

            </div>

            {/* Weaknesses */}

            <div className="rounded-3xl border bg-white p-6 shadow-sm">

              <h3 className="text-lg font-semibold text-red-700">
                Weaknesses
              </h3>

              <div className="mt-4 space-y-3">

                {jdData?.summary?.weaknesses?.map(
                    (
                        item: string,
                        index: number
                    ) => (

                        <div
                            key={index}
                            className="flex gap-3"
                        >

              <span className="text-red-600">
                ✕
              </span>

                          <span className="text-sm">
                {item}
              </span>

                        </div>

                    )
                )}

              </div>

            </div>

            {/* Next Steps */}

            <div className="rounded-3xl border bg-white p-6 shadow-sm">

              <h3 className="text-lg font-semibold text-blue-700">
                Next Steps
              </h3>

              <div className="mt-4 space-y-3">

                {jdData?.summary?.next_steps?.map(
                    (
                        item: string,
                        index: number
                    ) => (

                        <div
                            key={index}
                            className="flex gap-3"
                        >

              <span className="text-blue-600">
                →
              </span>

                          <span className="text-sm">
                {item}
              </span>

                        </div>

                    )
                )}

              </div>

            </div>

          </div>

        </div>
        {/* Improvement Plan */}

        <div>

          <div className="mb-5">

            <h2 className="text-2xl font-bold">
              Improvement Plan
            </h2>

            <p className="mt-1 text-muted-foreground">
              Recommended actions to increase your job match score.
            </p>

          </div>

          <div className="grid gap-6 lg:grid-cols-2">

            {jdData?.improvement_plan?.map(
                (
                    item: any,
                    index: number
                ) => (

                    <div
                        key={index}
                        className="
            rounded-3xl
            border
            bg-white
            p-6
            shadow-sm
          "
                    >

                      <div className="flex items-center justify-between">

                        <h3 className="text-lg font-semibold">
                          {item.skill}
                        </h3>

                        <span
                            className="
                rounded-full
                bg-blue-100
                px-3
                py-1
                text-xs
                font-medium
                text-blue-700
              "
                        >
              {item.priority}
            </span>

                      </div>

                      <p className="mt-4 text-sm text-muted-foreground">
                        {item.action}
                      </p>

                    </div>

                )
            )}

          </div>

        </div>
        {/* Learning Roadmap */}

        <div>

          <div className="mb-5">

            <h2 className="text-2xl font-bold">
              Learning Roadmap
            </h2>

            <p className="mt-1 text-muted-foreground">
              Recommended learning sequence to improve your job match.
            </p>

          </div>

          <div
              className="
      rounded-3xl
      border
      bg-white
      p-8
      shadow-sm
    "
          >

            <div className="space-y-8">

              {jdData?.roadmap?.map(
                  (
                      item: any,
                      index: number
                  ) => (

                      <div
                          key={item.step}
                          className="flex gap-5"
                      >

                        <div
                            className="
                flex
                flex-col
                items-center
              "
                        >

                          <div
                              className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-600
                  text-sm
                  font-bold
                  text-white
                "
                          >
                            {item.step}
                          </div>

                          {index !==
                              jdData.roadmap.length - 1 && (

                                  <div
                                      className="
                    mt-2
                    h-16
                    w-[2px]
                    bg-blue-200
                  "
                                  />

                              )}

                        </div>

                        <div className="pt-1">

                          <h3 className="font-semibold">
                            Step {item.step}
                          </h3>

                          <p className="mt-1 text-sm text-muted-foreground">
                            {item.description}
                          </p>

                        </div>

                      </div>

                  )
              )}

            </div>

          </div>

        </div>
        {/* Projects & Certifications */}

        <div
            className="
    grid
    gap-6
    lg:grid-cols-2
  "
        >

          {/* Projects */}

          <div
              className="
      rounded-3xl
      border
      bg-white
      p-6
      shadow-sm
    "
          >

            <h2 className="text-xl font-semibold">
              Recommended Projects
            </h2>

            <div className="mt-6 space-y-4">

              {jdData?.recommended_projects?.map(
                  (
                      project: string,
                      index: number
                  ) => (

                      <div
                          key={index}
                          className="
              rounded-2xl
              border
              p-4
            "
                      >
                        {project}
                      </div>

                  )
              )}

            </div>

          </div>

          {/* Certifications */}

          <div
              className="
      rounded-3xl
      border
      bg-white
      p-6
      shadow-sm
    "
          >

            <h2 className="text-xl font-semibold">
              Recommended Certifications
            </h2>

            <div
                className="
        mt-6
        flex
        flex-wrap
        gap-3
      "
            >

              {jdData?.recommended_certifications?.map(
                  (
                      cert: string,
                      index: number
                  ) => (

                      <span
                          key={index}
                          className="
              rounded-full
              bg-blue-100
              px-4
              py-2
              text-sm
              font-medium
              text-blue-700
            "
                      >
            {cert}
          </span>

                  )
              )}

            </div>

          </div>

        </div>
        {/* ATS Analysis */}

<div className="space-y-8">

  <div>

    <h2
      className="
        text-2xl
        font-bold
      "
    >
      Resume Quality Analysis
    </h2>

    <p
      className="
        mt-1
        text-muted-foreground
      "
    >
      ATS evaluation of your resume
      independent of this job description.
    </p>

  </div>

  <SummaryCards
    scoreBreakdown={
      scoreBreakdown
    }
    recommendedRoles={
      recommendedRoles
    }
  />

  <ATSBreakdownChart
    scoreBreakdown={
      scoreBreakdown
    }
  />

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

  <RecommendedRolesChart
    recommendedRoles={
      recommendedRoles
    }
  />

</div>
      </div>
  );
}


