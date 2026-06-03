'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard-layout';
import { QuickActionsSection } from '@/components/quick-actions-section';
import { AiCoachCard } from '@/components/ai-coach-card';
import { ResumeVersionTracking } from '@/components/resume-version-tracking';
import { PrimaryMetricsSection } from '@/components/primary-metrics-section';
import { JobReadinessInsights } from '@/components/job-readiness-insights';
import { ResumeUploadModal } from '@/components/resume-upload-modal';
import { mockDashboardData } from '@/lib/mock-dashboard-data';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(mockDashboardData);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <DashboardLayout>
      <motion.div variants={pageVariants} initial="hidden" animate="visible">
        {/* Welcome Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {data.user.name}
          </h1>
          <p className="mt-2 text-foreground/60">
            Here&apos;s your career intelligence overview
          </p>
        </motion.div>

        {/* Quick Actions Section */}
        <motion.div variants={itemVariants}>
          <QuickActionsSection
            actions={data.quickActions}
            onUploadClick={() => setIsUploadModalOpen(true)}
          />
        </motion.div>

        {/* AI Career Coach Card */}
        <motion.div variants={itemVariants} className="mt-12">
          <AiCoachCard insight={data.aiCoachInsights} />
        </motion.div>

        {/* Resume Version Tracking */}
        <motion.div variants={itemVariants} className="mt-8">
          <ResumeVersionTracking versions={data.resumeVersions} />
        </motion.div>

        {/* Primary Metrics Section */}
        <motion.div variants={itemVariants} className="mt-8">
          <PrimaryMetricsSection scores={data.scores} trends={data.scoreTrends} />
        </motion.div>

        {/* Job Readiness Insights */}
        <motion.div variants={itemVariants} className="mt-8">
          <JobReadinessInsights categories={data.jobReadiness} />
        </motion.div>
      </motion.div>

      {/* Resume Upload Modal */}
      <ResumeUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </DashboardLayout>
  );
}
