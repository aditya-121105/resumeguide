'use client';

import { useSearchParams } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard-layout';

export default function NewAnalysisPage() {

  const searchParams =
    useSearchParams();

  const resumeId =
    searchParams.get('resume');

  return (
    <DashboardLayout>

      <div className="space-y-6">

        <div>

          <h1 className="text-3xl font-bold">
            New Analysis
          </h1>

          <p className="mt-2 text-muted-foreground">
            Create a new analysis for your resume.
          </p>

        </div>

        <div className="rounded-xl border p-6">

          <p>
            Selected Resume ID:
            {' '}
            {resumeId}
          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}