'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { GeneralAnalysisView } from '@/components/analysis/GeneralAnalysisView';
import { getAnalysisDetails } from '@/lib/analysis-api';

import {
  useEffect,
  useState,
} from 'react';

import {
  useParams,
} from 'next/navigation';

export default function AnalysisDetailsPage() {

  const params =
    useParams();

  const analysisId =
    Number(params.id);

  const [analysis,
    setAnalysis] =
    useState<any>(null);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    const fetchAnalysis =
      async () => {

        try {

          const data =
            await getAnalysisDetails(
              analysisId
            );

          setAnalysis(data);

        } catch (error) {

          console.error(
            'Failed to load analysis',
            error
          );

        } finally {

          setLoading(false);
        }
      };

    if (analysisId) {

      fetchAnalysis();
    }

  }, [analysisId]);

  if (loading) {

    return (

      <DashboardLayout>

        <div className="p-8">
          Loading analysis...
        </div>

      </DashboardLayout>

    );
  }

  if (!analysis) {

    return (

      <DashboardLayout>

        <div className="p-8">
          Analysis not found
        </div>

      </DashboardLayout>

    );
  }

  return (

    <DashboardLayout>

      <GeneralAnalysisView
        analysis={analysis}
      />

    </DashboardLayout>

  );
}