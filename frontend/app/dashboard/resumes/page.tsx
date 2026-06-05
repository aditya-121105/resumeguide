'use client';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import Link from 'next/link';

interface Resume {
  resume_id: number;
  file_name: string;
  uploaded_at: string;
}

export default function ResumesPage() {

  const [resumes, setResumes] =
    useState<Resume[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  useEffect(() => {

    fetchResumes();

  }, []);

  const fetchResumes =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "access_token"
          );

        const response =
          await fetch(
            "http://127.0.0.1:8000/api/v1/resume/my-resumes",
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
            "Failed to load resumes"
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

  return (
    <DashboardLayout>

      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            Resumes
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage your uploaded resumes
          </p>
        </div>

        {loading && (
          <p>Loading resumes...</p>
        )}

        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        {!loading &&
          resumes.length === 0 && (
            <div className="rounded-xl border p-6">
              No resumes uploaded yet.
            </div>
          )}

        <div className="space-y-4">

          {resumes.map(
            (resume) => (
              <div
                key={
                  resume.resume_id
                }
                className="rounded-xl border p-6"
              >
                <h2 className="text-lg font-semibold">
                  {resume.file_name}
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Uploaded:
                  {" "}
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
                <Link
                  href={`/dashboard/resumes/${resume.resume_id}`}
                  className="mt-4 inline-block rounded-lg border px-4 py-2"
                >
                  View
                </Link>
              </div>

            )
          )}

        </div>

      </div>

    </DashboardLayout>
  );
}