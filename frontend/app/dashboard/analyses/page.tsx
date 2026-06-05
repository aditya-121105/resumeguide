import { DashboardLayout } from '@/components/dashboard-layout';

export default function AnalysesPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">
        Analyses
      </h1>

      <p className="mt-2 text-muted-foreground">
        View all your previous resume analyses.
      </p>
    </DashboardLayout>
  );
}