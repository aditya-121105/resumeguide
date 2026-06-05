'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { useState } from 'react';
import { ResumeUploadModal } from '@/components/resume-upload-modal';

export default function DashboardPage() {
  const [isUploadModalOpen,
setIsUploadModalOpen] =
useState(false);
  return (
    <DashboardLayout>

      <div className="space-y-8">

        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-bold">
            Hello Aditya 👋
          </h1>

          <p className="mt-2 text-muted-foreground">
            Welcome back to ResumeGuide
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl border p-6">
            <p className="text-sm text-muted-foreground">
              Total Resumes
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              3
            </h2>
          </div>

          <div className="rounded-xl border p-6">
            <p className="text-sm text-muted-foreground">
              Total Analyses
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              12
            </h2>
          </div>

          <div className="rounded-xl border p-6">
            <p className="text-sm text-muted-foreground">
              Average Score
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              82%
            </h2>
          </div>

          <div className="rounded-xl border p-6">
            <p className="text-sm text-muted-foreground">
              Best Score
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              91%
            </h2>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border p-6">

          <h2 className="text-xl font-semibold">
            Quick Actions
          </h2>

          <div className="mt-4 flex flex-wrap gap-4">

            <button
              className="rounded-lg border px-4 py-2"
              onClick={() =>
                setIsUploadModalOpen(true)
              }
            >
              Upload Resume
            </button>

            <button className="rounded-lg border px-4 py-2">
              New Analysis
            </button>

            <button className="rounded-lg border px-4 py-2">
              View Analyses
            </button>

          </div>

        </div>

        {/* Getting Started */}
        <div className="rounded-xl border p-6">

          <h2 className="text-xl font-semibold">
            Getting Started
          </h2>

          <ol className="mt-4 space-y-3 list-decimal list-inside">

            <li>Upload a resume</li>

            <li>Choose an analysis type</li>

            <li>Generate analysis</li>

            <li>Review recommendations</li>

            <li>Improve your resume</li>

          </ol>

        </div>

      </div>
      <ResumeUploadModal
        isOpen={isUploadModalOpen}
        onClose={() =>
          setIsUploadModalOpen(false)
        }
      />

    </DashboardLayout>
  );
}