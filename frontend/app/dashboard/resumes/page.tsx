'use client';

import { useEffect, useMemo, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import Link from 'next/link';
import { ResumeUploadModal }
from '@/components/resume-upload-modal';
interface Resume {
  resume_id: number;
  file_name: string;
  uploaded_at: string;
}
export default function ResumesPage() {

  const [resumes, setResumes] =
    useState<Resume[]>([]);
  const [
  uploadModalOpen,
  setUploadModalOpen
] = useState(false);
  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const [searchTerm, setSearchTerm] =
    useState('');

  const [sortBy, setSortBy] =
    useState('newest');

  const [currentPage, setCurrentPage] =
    useState(1);

  const ITEMS_PER_PAGE = 5;
    useEffect(() => {

    fetchResumes();

  }, []);

  const fetchResumes =
    async () => {

      try {

        const token =
          localStorage.getItem(
            'access_token'
          );

        const response =
          await fetch(
            'http://127.0.0.1:8000/api/v1/resume/my-resumes',
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          throw new Error(
            data.detail ||
            'Failed to load resumes'
          );
        }

        setResumes(data);

      } catch (err: any) {

        setError(
          err.message
        );

      } finally {

        setLoading(false);
      }
    };
    const filteredResumes =
    useMemo(() => {

      const filtered =
        resumes.filter((resume) =>
          resume.file_name
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            )
        );

      switch (sortBy) {

        case 'oldest':

          filtered.sort(
            (a, b) =>
              new Date(a.uploaded_at).getTime()
              -
              new Date(b.uploaded_at).getTime()
          );

          break;

        case 'name-asc':

          filtered.sort(
            (a, b) =>
              a.file_name.localeCompare(
                b.file_name
              )
          );

          break;

        case 'name-desc':

          filtered.sort(
            (a, b) =>
              b.file_name.localeCompare(
                a.file_name
              )
          );

          break;

        default:

          filtered.sort(
            (a, b) =>
              new Date(b.uploaded_at).getTime()
              -
              new Date(a.uploaded_at).getTime()
          );
      }

      return filtered;

    }, [
      resumes,
      searchTerm,
      sortBy,
    ]);
      const totalPages =
    Math.ceil(
      filteredResumes.length
      /
      ITEMS_PER_PAGE
    );

  const paginatedResumes =
    filteredResumes.slice(
      (currentPage - 1)
      * ITEMS_PER_PAGE,

      currentPage
      * ITEMS_PER_PAGE
    );
    return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              My Resumes
            </h1>

            <p className="mt-2 text-muted-foreground">
              Manage uploaded resumes and run ATS analyses.
            </p>

          </div>

          <button
  onClick={() =>
    setUploadModalOpen(true)
  }
  className="
    rounded-xl
    bg-blue-600
    px-4
    py-2
    font-medium
    text-white
    transition
    hover:bg-blue-700
  "
>
  Upload Resume
</button>

        </div>
                {/* Search + Sort */}

        <div className="flex flex-col gap-4 md:flex-row">

          <input
            type="text"
            placeholder="Search resumes..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            className="
              flex-1
              rounded-2xl
              border
              bg-white
              px-4
              py-2
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value
              )
            }
            className="
              rounded-2xl
              border
              bg-white
              px-4
              py-2
              outline-none
            "
          >
            <option value="newest">
              Newest First
            </option>

            <option value="oldest">
              Oldest First
            </option>

            <option value="name-asc">
              Name A-Z
            </option>

            <option value="name-desc">
              Name Z-A
            </option>

          </select>

        </div>
                {loading && (

          <div className="rounded-3xl border bg-white p-10 text-center">

            Loading resumes...

          </div>

        )}

        {error && (

          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-600">

            {error}

          </div>

        )}

        {!loading &&
          !error &&
          filteredResumes.length === 0 && (

          <div className="rounded-3xl border bg-white p-12 text-center">

            <h2 className="text-lg font-semibold">
              No resumes found
            </h2>

            <p className="mt-3 text-muted-foreground">
              Try changing your search criteria.
            </p>

          </div>

        )}
                {!loading &&
          !error &&
          paginatedResumes.length > 0 && (

          <div className="space-y-5">

            {paginatedResumes.map(
              (resume) => (

                <div
                  key={resume.resume_id}
                  className="
                    rounded-3xl
                    border
                    bg-white
                    p-6
                    shadow-sm
                    transition-all
                    hover:shadow-md
                  "
                >

                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                    <div className="flex-1">

                      <div className="mb-3 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">

                        PDF Resume

                      </div>

                      <h2 className="text-xl font-semibold truncate" title={resume.file_name}>

                        {resume.file_name}

                      </h2>

                      <p className="mt-1 text-xs text-muted-foreground">

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

                      <p className="mt-2 text-sm text-muted-foreground">

                        Resume ID #{resume.resume_id}

                      </p>

                    </div>

                    <div className="flex gap-3">

                      <Link
                        href={`/dashboard/resumes/${resume.resume_id}`}
                        className="
                          rounded-xl
                          border
                          px-4
                          py-2
                          font-medium
                        "
                      >
                        View Details
                      </Link>

                      <Link
                        href={`/dashboard/analyses/new?resume=${resume.resume_id}`}
                        className="
                          rounded-xl
                          bg-blue-600
                          px-4
                          py-2
                          font-medium
                          text-white
                          hover:bg-blue-700
                        "
                      >
                        Analyze
                      </Link>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}
              </div>
  <ResumeUploadModal
  isOpen={uploadModalOpen}
  onClose={() =>
    setUploadModalOpen(false)
  }
/>
    </DashboardLayout>

  );
}