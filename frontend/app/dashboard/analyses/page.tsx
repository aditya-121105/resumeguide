'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { getAnalysisHistory } from '@/lib/analysis-api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AnalysesPage() {

  const [analyses, setAnalyses] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [filter, setFilter] =
    useState('all');

  const [searchTerm, setSearchTerm] =
    useState('');

  const [currentPage, setCurrentPage] =
    useState(1);

  const ITEMS_PER_PAGE = 10;

  const router = useRouter();
    useEffect(() => {

    const fetchAnalyses = async () => {

      try {

        const data =
          await getAnalysisHistory();

        setAnalyses(data);

      } catch (error) {

        console.error(
          'Failed to load analyses',
          error
        );

      } finally {

        setLoading(false);
      }
    };

    fetchAnalyses();

  }, []);
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

  const totalAnalyses =
    analyses.length;

  const averageScore =
    analyses.length > 0
      ? (
          analyses.reduce(
            (sum, analysis) =>
              sum + analysis.score,
            0
          ) / analyses.length
        ).toFixed(2)
      : '0';

  const bestScore =
    analyses.length > 0
      ? Math.max(
          ...analyses.map(
            (analysis) =>
              analysis.score
          )
        )
      : 0;

  const generalCount =
    analyses.filter(
      (analysis) =>
        analysis.analysis_type ===
        'general'
    ).length;

  const roleCount =
    analyses.filter(
      (analysis) =>
        analysis.analysis_type ===
        'role'
    ).length;

  const jdCount =
    analyses.filter(
      (analysis) =>
        analysis.analysis_type ===
        'job_description'
    ).length;
    const filteredAnalyses =
    analyses.filter((analysis) => {

      const matchesFilter =
        filter === 'all'
          ? true
          : analysis.analysis_type ===
            filter;

      const matchesSearch =

        analysis.resume_name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

        ||

        getTypeLabel(
          analysis.analysis_type
        )
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      return (
        matchesFilter &&
        matchesSearch
      );
    });

  const totalPages =
    Math.ceil(
      filteredAnalyses.length /
        ITEMS_PER_PAGE
    );

  const paginatedAnalyses =
    filteredAnalyses.slice(

      (currentPage - 1) *
        ITEMS_PER_PAGE,

      currentPage *
        ITEMS_PER_PAGE
    );
    if (loading) {

    return (

      <DashboardLayout>

        <div className="p-8">

          Loading analyses...

        </div>

      </DashboardLayout>

    );
  }
      return (

    <DashboardLayout>

      <div className="space-y-6">

        {/* Header */}

        <div>

          <h1 className="text-3xl font-bold">
            Analyses
          </h1>

          <p className="mt-2 text-muted-foreground">
            View and manage all your
            resume evaluations.
          </p>

        </div>

        {/* Summary Cards */}

        <div className="grid gap-4 md:grid-cols-3">

          <div className="rounded-2xl border bg-white p-5 shadow-sm">

            <p className="text-sm text-muted-foreground">
              Total Analyses
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {totalAnalyses}
            </h2>

          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">

            <p className="text-sm text-muted-foreground">
              Average Score
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {averageScore}%
            </h2>

          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">

            <p className="text-sm text-muted-foreground">
              Best Score
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {bestScore}%
            </h2>

          </div>

        </div>
                  {/* Analysis Distribution */}

        <div className="rounded-2xl border bg-white p-5 shadow-sm">

          <h2 className="font-semibold text-lg">
            Analysis Distribution
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Breakdown of your analysis activity
          </p>

          <div className="mt-4 flex flex-wrap gap-3">

            <div className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2">

              <span className="font-medium text-blue-700">
                General ATS
              </span>

              <span className="ml-2 rounded-full bg-blue-600 px-2 py-1 text-xs text-white">
                {generalCount}
              </span>

            </div>

            <div className="rounded-full border border-green-100 bg-green-50 px-4 py-2">

              <span className="font-medium text-green-700">
                Role Analysis
              </span>

              <span className="ml-2 rounded-full bg-green-600 px-2 py-1 text-xs text-white">
                {roleCount}
              </span>

            </div>

            <div className="rounded-full border border-orange-100 bg-orange-50 px-4 py-2">

              <span className="font-medium text-orange-700">
                JD Match
              </span>

              <span className="ml-2 rounded-full bg-orange-600 px-2 py-1 text-xs text-white">
                {jdCount}
              </span>

            </div>

          </div>

        </div>
                  {/* Search */}

        <input
          type="text"
          placeholder="Search by resume name or analysis type..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="
            w-full
            rounded-xl
            border
            px-4
            py-3
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />
                  {/* Filters */}

        <div className="flex flex-wrap gap-3">

          <button
            onClick={() => {
              setFilter('all');
              setCurrentPage(1);
            }}
            className={`rounded-lg border px-4 py-2 ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : ''
            }`}
          >
            All
          </button>

          <button
            onClick={() => {
              setFilter('general');
              setCurrentPage(1);
            }}
            className={`rounded-lg border px-4 py-2 ${
              filter === 'general'
                ? 'bg-blue-600 text-white'
                : ''
            }`}
          >
            General ATS
          </button>

          <button
            onClick={() => {
              setFilter('role');
              setCurrentPage(1);
            }}
            className={`rounded-lg border px-4 py-2 ${
              filter === 'role'
                ? 'bg-blue-600 text-white'
                : ''
            }`}
          >
            Role Analysis
          </button>

          <button
            onClick={() => {
              setFilter(
                'job_description'
              );
              setCurrentPage(1);
            }}
            className={`rounded-lg border px-4 py-2 ${
              filter ===
              'job_description'
                ? 'bg-blue-600 text-white'
                : ''
            }`}
          >
            JD Match
          </button>

        </div>
                  {filteredAnalyses.length === 0 && (

          <div className="rounded-2xl border p-10 text-center">

            <h2 className="text-xl font-semibold">
              No analyses found
            </h2>

            <p className="mt-2 text-muted-foreground">
              Try a different search
              or create a new analysis.
            </p>

          </div>

        )}
                  <div className="grid gap-4">

          {paginatedAnalyses.map(
            (analysis) => (

              <div
                key={
                  analysis.analysis_id
                }
                className="
                  rounded-2xl
                  border
                  bg-white
                  p-5
                  shadow-sm
                  transition-all
                  hover:shadow-md
                "
              >

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  <div>

                    <div className="flex items-center gap-3">

                      <h3 className="text-lg font-semibold">

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
                        {analysis.score}%
                      </span>

                    </div>

                    <div className="mt-3">

                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Resume
                      </p>

                      <p className="font-medium">
                        {
                          analysis.resume_name
                        }
                      </p>

                    </div>

                    <div className="mt-3">

                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Created
                      </p>

                      <p className="text-sm">
                        {new Date(
                          analysis.created_at
                        ).toLocaleString()}
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      router.push(
                        `/dashboard/analyses/${analysis.analysis_id}`
                      )
                    }
                    className="
                      rounded-lg
                      bg-blue-600
                      px-4
                      py-2
                      text-white
                      hover:bg-blue-700
                    "
                  >
                    View Details
                  </button>

                </div>

              </div>

            )
          )}

        </div>
                  {filteredAnalyses.length > 0 && (

          <div className="flex flex-col gap-4 pt-2 md:flex-row md:items-center md:justify-between">

            <p className="text-sm text-muted-foreground">

              Showing

              {' '}

              {(currentPage - 1) *
                ITEMS_PER_PAGE +
                1}

              {' '}

              -

              {' '}

              {Math.min(
                currentPage *
                  ITEMS_PER_PAGE,
                filteredAnalyses.length
              )}

              {' '}

              of

              {' '}

              {filteredAnalyses.length}

              analyses

            </p>

            <div className="flex gap-2">

              <button
                disabled={
                  currentPage === 1
                }
                onClick={() =>
                  setCurrentPage(
                    currentPage - 1
                  )
                }
                className="
                  rounded-lg
                  border
                  px-4
                  py-2
                  disabled:opacity-50
                "
              >
                Previous
              </button>

              <button
                disabled={
                  currentPage ===
                  totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    currentPage + 1
                  )
                }
                className="
                  rounded-lg
                  border
                  px-4
                  py-2
                  disabled:opacity-50
                "
              >
                Next
              </button>

            </div>

          </div>

        )}

      </div>

    </DashboardLayout>

  );
}