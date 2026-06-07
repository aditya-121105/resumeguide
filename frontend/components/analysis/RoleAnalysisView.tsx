'use client';

import { AnalysisHero } from './AnalysisHero';
import { SummaryCards } from './SummaryCards';
import { ATSBreakdownChart } from './ATSBreakdownChart';
import { CategoryCard } from './CategoryCard';
import { RecommendedRolesChart } from './RecommendedRolesChart';

interface Props {
  analysis: any;
}
function EmptyMessage({
  text,
}: {
  text: string;
}) {
  return (
    <p className="text-sm text-muted-foreground">
      {text}
    </p>
  );
}

export function RoleAnalysisView({
  analysis,
}: Props) {

  const roleData =
    analysis.analysis_result.role_analysis;

  const generalData =
    analysis.analysis_result.general_analysis;

  const roleScore =
    roleData?.score ?? 0;

  const atsScore =
    generalData?.ats_score ?? 0;

  const getReadinessLevel =
    (score: number) => {

      if (score >= 85)
        return 'Strong Candidate';

      if (score >= 70)
        return 'Job Ready';

      if (score >= 40)
        return 'Developing';

      return 'Beginner';
    };

  const readinessLevel =
    getReadinessLevel(
      roleScore
    );
    return (

    <div className="space-y-8">

      <AnalysisHero
        scoreLabel="ROLE MATCH"
        title={
          `${roleData.role} Role Analysis`
        }
        subtitle={
          analysis.resume_name
        }
        score={roleScore}
        status={
          `${readinessLevel}`
        }
        createdAt={
          analysis.created_at
        }
      />
              {/* Score Explanation */}

      <div
        className="
          grid
          gap-6
          lg:grid-cols-2
        "
      >

        <div
          className="
            rounded-3xl
            border
            bg-white
            p-6
            shadow-sm
          "
        >

          <h3
            className="
              text-lg
              font-semibold
            "
          >
            ATS Score
          </h3>

          <p
            className="
              mt-3
              text-3xl
              font-bold
              text-blue-600
            "
          >
            {atsScore}/100
          </p>

          <p
            className="
              mt-3
              text-sm
              text-muted-foreground
            "
          >
            Measures resume quality,
            structure, formatting,
            keywords, and ATS
            compatibility.
          </p>

        </div>

        <div
          className="
            rounded-3xl
            border
            bg-white
            p-6
            shadow-sm
          "
        >

          <h3
            className="
              text-lg
              font-semibold
            "
          >
            Role Match Score
          </h3>

          <p
            className="
              mt-3
              text-3xl
              font-bold
              text-green-600
            "
          >
            {Math.round(roleScore)}/100
          </p>

          <p
            className="
              mt-3
              text-sm
              text-muted-foreground
            "
          >
            Measures how closely
            your skills, projects,
            and experience align
            with the selected role.
          </p>

        </div>

      </div>
              {/* Skills Match Overview */}

      <div
        className="
          rounded-3xl
          border
          bg-white
          p-6
          shadow-sm
        "
      >

        <div>

          <h2
            className="
              text-2xl
              font-bold
            "
          >
            Skills Match Overview
          </h2>

          <p
            className="
              mt-1
              text-muted-foreground
            "
          >
            Skills identified from
            your resume compared to
            the Backend Engineer role.
          </p>

        </div>

        <div
          className="
            mt-8
            grid
            gap-8
            lg:grid-cols-2
          "
        >

          {/* Matched Skills */}

          <div>

            <h3
              className="
                mb-4
                text-lg
                font-semibold
                text-green-700
              "
            >
              Matched Skills
            </h3>

            <div
              className="
                flex
                flex-wrap
                gap-2
              "
            >

              {roleData?.matched_skills?.length ? (

                roleData.matched_skills.map(
                  (
                    skill: string
                  ) => (

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
                )

              ) : (

                <EmptyMessage
                  text="No matched skills found"
                />

              )}

            </div>

          </div>

          {/* Missing Skills */}

          <div>

            <h3
              className="
                mb-4
                text-lg
                font-semibold
                text-red-700
              "
            >
              Missing Skills
            </h3>

            <div
              className="
                flex
                flex-wrap
                gap-2
              "
            >

              {roleData?.missing_skills?.length ? (

                roleData.missing_skills.map(
                  (
                    skill: string
                  ) => (

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
                )

              ) : (

                <EmptyMessage
                  text="No missing skills identified"
                />

              )}
            </div>

          </div>

        </div>

      </div>
              {/* Role Readiness */}

      <div>

        <div className="mb-5">

          <h2
            className="
              text-2xl
              font-bold
            "
          >
            Role Readiness
          </h2>

          <p
            className="
              mt-1
              text-muted-foreground
            "
          >
            Key strengths, weaknesses,
            and recommended next steps
            for becoming a stronger
            Backend Engineer candidate.
          </p>

        </div>

        <div
          className="
            grid
            gap-6
            lg:grid-cols-3
          "
        >

          {/* Strengths */}

          <div
            className="
              rounded-3xl
              border
              bg-white
              p-6
              shadow-sm
            "
          >

            <h3
              className="
                text-lg
                font-semibold
                text-green-700
              "
            >
              Strengths
            </h3>

            <div
              className="
                mt-4
                space-y-3
              "
            >

              {roleData?.role_summary?.strengths?.length ? (

              roleData.role_summary.strengths.map(
                (
                  item: string,
                  index: number
                ) => (

                  <div
                    key={index}
                    className="
                      flex
                      gap-3
                    "
                  >

                    <span className="text-green-600">
                      ✓
                    </span>

                    <span className="text-sm">
                      {item}
                    </span>

                  </div>

                )
              )

            ) : (

              <EmptyMessage
                text="No strengths available"
              />

            )}

            </div>

          </div>

          {/* Weaknesses */}

          <div
            className="
              rounded-3xl
              border
              bg-white
              p-6
              shadow-sm
            "
          >

            <h3
              className="
                text-lg
                font-semibold
                text-red-700
              "
            >
              Weaknesses
            </h3>

            <div
              className="
                mt-4
                space-y-3
              "
            >

              {roleData?.role_summary?.weaknesses?.length ? (

              roleData.role_summary.weaknesses.map(
                (
                  item: string,
                  index: number
                ) => (

                  <div
                    key={index}
                    className="
                      flex
                      gap-3
                    "
                  >

                    <span className="text-red-600">
                      ✕
                    </span>

                    <span className="text-sm">
                      {item}
                    </span>

                  </div>

                )
              )

            ) : (

              <EmptyMessage
                text="No weaknesses available"
              />

            )}

            </div>

          </div>

          {/* Next Steps */}

          <div
            className="
              rounded-3xl
              border
              bg-white
              p-6
              shadow-sm
            "
          >

            <h3
              className="
                text-lg
                font-semibold
                text-blue-700
              "
            >
              Next Steps
            </h3>

            <div
              className="
                mt-4
                space-y-3
              "
            >

                {roleData?.role_summary?.next_steps?.length ? (

                roleData.role_summary.next_steps.map(
                  (
                    item: string,
                    index: number
                  ) => (

                    <div
                      key={index}
                      className="
                        flex
                        gap-3
                      "
                    >

                      <span className="text-blue-600">
                        →
                      </span>

                      <span className="text-sm">
                        {item}
                      </span>

                    </div>

                  )
                )

              ) : (

                <EmptyMessage
                  text="No next steps available"
                />

              )}

            </div>

          </div>

        </div>

      </div>
              {/* Skill Gap Analysis */}

      <div>

        <div className="mb-5">

          <h2
            className="
              text-2xl
              font-bold
            "
          >
            Skill Gap Analysis
          </h2>

          <p
            className="
              mt-1
              text-muted-foreground
            "
          >
            Critical skills missing for
            the selected role and why
            they matter.
          </p>

        </div>

        <div
          className="
            grid
            gap-6
            lg:grid-cols-2
          "
        >

          {roleData?.skill_gaps?.length ? (

              roleData.skill_gaps.map(
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

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                      "
                    >

                      <h3
                        className="
                          text-xl
                          font-semibold
                        "
                      >
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
                        {gap.priority}
                        {' '}
                        Priority
                      </span>

                    </div>

                    <p
                      className="
                        mt-4
                        text-sm
                        text-muted-foreground
                      "
                    >
                      {gap.why_it_matters}
                    </p>

                  </div>

                )
              )

            ) : (

              <div
                className="
                  rounded-3xl
                  border
                  bg-white
                  p-6
                  shadow-sm
                "
              >
                <EmptyMessage
                  text="No skill gaps identified"
                />
              </div>

            )}
        </div>

      </div>
              {/* Learning Roadmap */}

      <div>

        <div className="mb-5">

          <h2
            className="
              text-2xl
              font-bold
            "
          >
            Learning Roadmap
          </h2>

          <p
            className="
              mt-1
              text-muted-foreground
            "
          >
            Recommended path to
            become a stronger
            {` ${roleData.role}`} candidate.
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

            {roleData?.roadmap?.length ? (

              roleData.roadmap.map(
                (
                  item: any,
                  index: number
                ) => (

                  <div
                    key={item.step}
                    className="
                      flex
                      gap-5
                    "
                  >

                    {/* Step Number */}

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
                        roleData.roadmap.length - 1 && (

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

                    {/* Content */}

                    <div className="pt-1">

                      <h3
                        className="
                          font-semibold
                        "
                      >
                        Step {item.step}
                      </h3>

                      <p
                        className="
                          mt-1
                          text-sm
                          text-muted-foreground
                        "
                      >
                        {item.description}
                      </p>

                    </div>

                  </div>

                )
              )

            ) : (

              <EmptyMessage
                text="No learning roadmap available"
              />

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

        {/* Recommended Projects */}

        <div
          className="
            rounded-3xl
            border
            bg-white
            p-6
            shadow-sm
          "
        >

          <h2
            className="
              text-xl
              font-semibold
            "
          >
            Recommended Projects
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-muted-foreground
            "
          >
            Projects that can improve
            your role match score.
          </p>

          <div
            className="
              mt-6
              space-y-4
            "
          >

            {roleData?.recommended_projects?.length ? (

  roleData.recommended_projects.map(
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

        <h3
          className="
            font-medium
          "
        >
          {project}
        </h3>

      </div>

    )
  )

) : (

  <div
    className="
      rounded-2xl
      border
      p-4
    "
  >
    <EmptyMessage
      text="No project recommendations available"
    />
  </div>

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

          <h2
            className="
              text-xl
              font-semibold
            "
          >
            Recommended Certifications
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-muted-foreground
            "
          >
            Certifications aligned
            with this role.
          </p>

          <div
            className="
              mt-6
              flex
              flex-wrap
              gap-3
            "
          >

            {roleData?.recommended_certifications?.length ? (

            roleData.recommended_certifications.map(
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
            )

          ) : (

            <div className="w-full">
              <EmptyMessage
                text="No certification recommendations available"
              />
            </div>

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
            ATS evaluation of your
            resume independent of
            the selected role.
          </p>

        </div>

        <SummaryCards
          scoreBreakdown={
            generalData.score_breakdown
          }
          recommendedRoles={
            generalData.recommended_roles
          }
        />

        <ATSBreakdownChart
          scoreBreakdown={
            generalData.score_breakdown
          }
        />

        <div
          className="
            grid
            gap-6
            lg:grid-cols-2
          "
        >

          {generalData.score_breakdown.map(
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
            generalData.recommended_roles
          }
        />

      </div>
        </div>
    );}