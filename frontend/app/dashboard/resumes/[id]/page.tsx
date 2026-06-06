'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';

import Link from 'next/link';

import { DashboardLayout }
from '@/components/dashboard-layout';
interface ResumeDetails {

  resume_id: number;

  file_name: string;

  uploaded_at: string;

  analysis_count: number;
}

interface AnalysisHistory {

  analysis_id: number;

  resume_id: number;

  resume_name: string;

  analysis_type: string;

  score: number;

  created_at: string;
}
export default function ResumeDetailPage() {

  const params =
    useParams();

  const resumeId =
    Number(params.id);

  const [resume,
    setResume] =
    useState<ResumeDetails | null>(
      null
    );

  const [analyses,
    setAnalyses] =
    useState<
      AnalysisHistory[]
    >([]);

  const [loading,
    setLoading] =
    useState(true);

  const [error,
    setError] =
    useState('');
    const getTypeLabel = (
    type: string
  ) => {

    switch (type) {

      case 'general':
        return 'General ATS';

      case 'role':
        return 'Role Analysis';

      case 'job_description':
        return 'JD Match';

      default:
        return type;
    }
  };

  const getScoreColor = (
    score: number
  ) => {

    if (score >= 80)
      return 'bg-green-100 text-green-700';

    if (score >= 60)
      return 'bg-yellow-100 text-yellow-700';

    return 'bg-red-100 text-red-700';
  };
    useEffect(() => {

    fetchData();

  }, []);

  const fetchData =
    async () => {

      try {

        const token =
          localStorage.getItem(
            'access_token'
          );

        const [
          resumeResponse,
          historyResponse,
        ] = await Promise.all([
          fetch(
            `http://127.0.0.1:8000/api/v1/resume/${resumeId}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          ),

          fetch(
            'http://127.0.0.1:8000/api/v1/analysis/history',
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          ),
        ]);

        const resumeData =
          await resumeResponse.json();

        const historyData =
          await historyResponse.json();

        if (
          !resumeResponse.ok ||
          !historyResponse.ok
        ) {

          throw new Error(
            'Failed to load data'
          );
        }

        setResume(
          resumeData
        );

        setAnalyses(
          historyData
        );

      } catch (err: any) {

        setError(
          err.message
        );

      } finally {

        setLoading(false);
      }
    };
    const resumeAnalyses =
    analyses.filter(
      (analysis) =>
        analysis.resume_id ===
        resumeId
    );
      if (loading) {

    return (

      <DashboardLayout>

        <div className="p-8">
          Loading resume...
        </div>

      </DashboardLayout>

    );
  }

  if (error || !resume) {

    return (

      <DashboardLayout>

        <div className="p-8 text-red-500">
          {error || 'Resume not found'}
        </div>

      </DashboardLayout>

    );
  }
    const bestATS =
    resumeAnalyses
      .filter(
        (a) =>
          a.analysis_type ===
          'general'
      )
      .reduce(
        (max, current) =>
          current.score > max
            ? current.score
            : max,
        0
      );

  const bestRole =
    resumeAnalyses
      .filter(
        (a) =>
          a.analysis_type ===
          'role'
      )
      .reduce(
        (max, current) =>
          current.score > max
            ? current.score
            : max,
        0
      );

  const bestJD =
    resumeAnalyses
      .filter(
        (a) =>
          a.analysis_type ===
          'job_description'
      )
      .reduce(
        (max, current) =>
          current.score > max
            ? current.score
            : max,
        0
      );
    return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* Hero */}

        <div
          className="
            rounded-3xl
            border
            bg-gradient-to-br
            from-blue-100

            shadow-sm
            p-8
          "
        >

          <div
            className="
              flex
              flex-col
              gap-6
              md:flex-row
              md:items-center
              md:justify-between
            "
          >

            <div>
              <div
                className="
                  inline-flex
                  rounded-full
                  bg-blue-50
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-blue-700
                "
              >
                Resume Workspace
              </div>
              <h1
                className="
                  text-3xl
                  font-bold
                "
              >
                {resume.file_name}
              </h1>

              <p
                className="
                  mt-3
                  text-muted-foreground
                "
              >
                Uploaded on{' '}
                {new Date(
                  resume.uploaded_at
                ).toLocaleDateString(
                  'en-GB',
                  {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  }
                )}
              </p>

              <p
                className="
                  mt-2
                  text-sm
                  text-muted-foreground
                "
              >
                {resume.analysis_count}
                {' '}
                analyses completed
              </p>

            </div>

            <Link
              href={`/dashboard/analyses/new?resume=${resume.resume_id}`}
              className="
                rounded-xl
                bg-blue-600
                px-5
                py-3
                text-white
                hover:bg-blue-700
              "
            >
              Run New Analysis
            </Link>

          </div>

        </div>
                {/* Summary */}

        <div
          className="
            grid
            gap-4
            md:grid-cols-3
          "
        >

          <div
            className="
              rounded-3xl
              border
              bg-white
              p-6
              bg-gradient-to-br
              from-green-100
            "
          >

            <p className="text-sm text-muted-foreground">
              Best ATS Score
            </p>

            <h2
              className="
                mt-2
                text-4xl
                font-bold
              "
            >
              {Math.round(bestATS)}
            </h2>

          </div>

          <div
            className="
              rounded-3xl
              border
              bg-white
              p-6
              bg-gradient-to-br
            from-blue-100
            to-white
            "
          >

            <p className="text-sm text-muted-foreground">
              Best Role Match
            </p>

            <h2
              className="
                mt-2
                text-4xl
                font-bold

              "
            >
              {Math.round(bestRole)}
            </h2>

          </div>

          <div
            className="
              rounded-3xl
              border
              bg-white
              bg-gradient-to-br
            from-purple-100
              to-white
              p-6
            "
          >

            <p className="text-sm text-muted-foreground">
              Best JD Match
            </p>

            <h2
              className="
                mt-2
                text-4xl
                font-bold
              "
            >
              {Math.round(bestJD)}
            </h2>

          </div>

        </div>
                {/* Analysis History */}

        <div>

          <h2
            className="
              text-2xl
              font-bold
            "
          >
            Analysis History  📊

          </h2>


          <p
            className="
              mt-2
              text-muted-foreground
            "
          >
            All analyses generated
            for this resume.
          </p>

        </div>
                {resumeAnalyses.length === 0 && (

          <div
            className="
              rounded-3xl
              border
              bg-white
              p-10
              text-center
            "
          >

            <h3
              className="
                text-xl
                font-semibold
              "
            >
              No analyses found
            </h3>

            <p
              className="
                mt-2
                text-muted-foreground
              "
            >
              Run your first analysis
              for this resume.
            </p>

          </div>

        )}
                <div className="space-y-4">

          {resumeAnalyses.map(
            (analysis) => (

              <div
                key={
                  analysis.analysis_id
                }
                className="
                  rounded-3xl
                  border
                  bg-white
                  p-5
                  shadow-sm
                  transition-all
                  hover:shadow-md
                "
              >

                <div
                  className="
                    flex
                    flex-col
                    gap-4
                    md:flex-row
                    md:items-center
                    md:justify-between
                  "
                >

                  <div>

                    <div className="flex items-center gap-3">

                      <h3
                        className="
                          text-lg
                          font-semibold
                        "
                      >
                        {getTypeLabel(
                          analysis.analysis_type
                        )}
                      </h3>

                      <span
                        className={`
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-medium
                          ${getScoreColor(
                            analysis.score
                          )}
                        `}
                      >
                        {Math.round(
                          analysis.score
                        )}
                        %
                      </span>

                    </div>

                    <p
                      className="
                        mt-2
                        text-sm
                        text-muted-foreground
                      "
                    >
                      Analysis ID #
                      {
                        analysis.analysis_id
                      }
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-muted-foreground
                      "
                    >
                      {new Date(
                        analysis.created_at
                      ).toLocaleString()}
                    </p>

                  </div>

                  <Link
                    href={`/dashboard/analyses/${analysis.analysis_id}`}
                    className="
                      rounded-xl
                      bg-blue-600
                      px-4
                      py-2
                      text-white
                      hover:bg-blue-700
                    "
                  >
                    View Details
                  </Link>

                </div>

              </div>

            )
          )}

        </div>
              </div>

    </DashboardLayout>

  );
}