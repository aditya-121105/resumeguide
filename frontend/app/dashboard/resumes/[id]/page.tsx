'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard-layout';
import Link from 'next/link';

interface ResumeDetails {
  resume_id: number;
  file_name: string;
  uploaded_at: string;
  analysis_count: number;
}

export default function ResumeDetailPage() {

  const params = useParams();

  const [resume, setResume] =
    useState<ResumeDetails | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  useEffect(() => {

    fetchResume();

  }, []);

  const fetchResume =
    async () => {

      try {

        const token =
          localStorage.getItem(
            'access_token'
          );

        const response =
          await fetch(
            `http://127.0.0.1:8000/api/v1/resume/${params.id}`,
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
            data.detail
          );
        }

        setResume(data);

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

      {loading && (
        <p>Loading...</p>
      )}

      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}

      {resume && (

        <div className="space-y-6">

          <div>

            <h1 className="text-3xl font-bold">
              {resume.file_name}
            </h1>

            <p className="mt-2 text-muted-foreground">
              Uploaded:
              {' '}
              {new Date(
                resume.uploaded_at
              ).toLocaleDateString()}
            </p>

          </div>

          <div className="rounded-xl border p-6">

            <h2 className="text-xl font-semibold">
              Associated Analyses
            </h2>

            <p className="mt-4">
              Total Analyses:
              {' '}
              {resume.analysis_count}
            </p>

          </div>

          <Link
            href={`/dashboard/analyses/new?resume=${resume.resume_id}`}
            className="inline-block rounded-lg border px-4 py-2"
          >
            Create New Analysis
          </Link>

        </div>

      )}

    </DashboardLayout>
  );
}