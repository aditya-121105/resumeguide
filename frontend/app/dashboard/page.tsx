'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { useEffect, useState } from 'react';
import { ResumeUploadModal } from '@/components/resume-upload-modal';
import { getDashboardData } from '@/lib/dashboard-api';
import {
  FileText,
  BarChart3,
  Target,
  Trophy
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import api from "@/lib/api";

export default function DashboardPage() {
  const [isUploadModalOpen,
setIsUploadModalOpen] =
useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

const [loading,
setLoading] =
useState(true);
useEffect(() => {


  const fetchDashboard = async () => {

    try {

      const data =
        await getDashboardData();

      setDashboardData(data);

    } catch (error) {

      console.error(
        "Failed to load dashboard",
        error
      );

    } finally {

      setLoading(false);

    }

  };
  const fetchUser = async () => {

    try {

      const response = await api.get(
        "/auth/me"
      );

      setUser(response.data);

    } catch (error) {

      console.error(
        "Failed to load user",
        error
      );

    }
  };

  const loadData = async () => {

    await Promise.all([
      fetchDashboard(),
      fetchUser()
    ]);

    setLoading(false);
  };

  loadData();

  fetchUser();
  fetchDashboard();

}, []);
const chartData =
  dashboardData?.recent_analyses
    ?.slice()
    .reverse()
    .map(
      (
        analysis: any,
        index: number
      ) => ({
        name: `A${index + 1}`,
        score: analysis.score
      })
    ) || [];
const distributionData = [

  {
    name: "General ATS",
    value:
      dashboardData
        ?.analysis_type_counts
        ?.general || 0
  },

  {
    name: "Role Analysis",
    value:
      dashboardData
        ?.analysis_type_counts
        ?.role || 0
  },

  {
    name: "JD Match",
    value:
      dashboardData
        ?.analysis_type_counts
        ?.job_description || 0
  }

];
const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b"
];
const fetchUser = async () => {

  try {

    const response = await api.get(
      "/auth/me"
    );

    setUser(response.data);

  } catch (error) {

    console.error(error);

  }
};

  if (loading) {

  return (

    <DashboardLayout>

      <div className="p-8">

        Loading dashboard...

      </div>

    </DashboardLayout>
  );
}
  return (
    <DashboardLayout>

      <div className="space-y-8">

  {/* Hero Section */}

  <div className="rounded-3xl border bg-gradient-to-r from-blue-50 to-indigo-50 p-6">

       <h1 className="text-3xl font-bold">
      Welcome back, {user?.full_name || "User"} 👋
    </h1>

    <p className="mt-2 max-w-xl text-base text-muted-foreground">
      Track your resume performance, identify skill gaps,
      and improve your chances of landing interviews.
    </p>

    <div className="mt-6 flex flex-wrap gap-4">

      <button
        onClick={() =>
          setIsUploadModalOpen(true)
        }
        className="
          rounded-xl
          bg-blue-600
          px-5
          py-3
          font-medium
          text-white
          hover:bg-blue-700
        "
      >
        Upload Resume
      </button>



    </div>

  </div>

  {/* Statistics */}

  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

    <div className="rounded-3xl border bg-white p-6 shadow-sm transition-all hover:shadow-lg">

      <div className="flex items-center justify-between">

        <p className="text-sm text-muted-foreground">
          Total Resumes
        </p>

        <FileText
          className="h-6 w-6 text-blue-600"
        />

      </div>

      <h2 className="mt-4 text-3xl font-bold">
        {dashboardData?.total_resumes ?? 0}
      </h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Uploaded resumes
      </p>

    </div>

    <div className="rounded-3xl border bg-white p-6 shadow-sm transition-all hover:shadow-lg">

      <div className="flex items-center justify-between">

        <p className="text-sm text-muted-foreground">
          Total Analyses
        </p>

        <BarChart3
          className="h-6 w-6 text-violet-600"
        />

      </div>

      <h2 className="mt-4 text-3xl font-bold">
        {dashboardData?.total_analyses ?? 0}
      </h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Resume evaluations
      </p>

    </div>

    <div className="rounded-3xl border bg-white p-6 shadow-sm transition-all hover:shadow-lg">

      <div className="flex items-center justify-between">

        <p className="text-sm text-muted-foreground">
          Average Score
        </p>

        <Target
            className="h-6 w-6 text-emerald-600"
          />

      </div>

      <h2 className="mt-4 text-3xl font-bold">
        {dashboardData?.average_score ?? 0}%
      </h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Across all analyses
      </p>

    </div>

    <div className="rounded-3xl border bg-white p-6 shadow-sm transition-all hover:shadow-lg">

      <div className="flex items-center justify-between">

        <p className="text-sm text-muted-foreground">
          Best Score
        </p>

        <Trophy
          className="h-6 w-6 text-amber-600"
        />

      </div>

      <h2 className="mt-4 text-3xl font-bold">
        {dashboardData?.highest_score ?? 0}%
      </h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Highest result achieved
      </p>

    </div>

  </div>

  {/* Recent Activity + Getting Started */}
{dashboardData?.total_analyses > 0 ? (

     <div className="grid gap-6 lg:grid-cols-2">

      {/* ATS Journey */}

      <div className="rounded-3xl border bg-white p-6 shadow-sm">

        <h2 className="text-xl font-semibold">
          ATS Score Journey
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Track your improvement over time
        </p>

        <div className="mt-6 h-[300px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart data={chartData}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="name" />

              <YAxis
                domain={[0, 100]}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="score"
                stroke="#2563eb"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Journey */}

      <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <h2 className="text-xl font-semibold">
        Analysis Distribution
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Breakdown of your analysis activity
      </p>

      <div className="mt-4 h-[300px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={distributionData}
              cx="50%"
              cy="50%"
              outerRadius={90}
              dataKey="value"
              label
            >

              {distributionData.map(
                (
                  entry,
                  index
                ) => (

                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS[
                        index %
                        COLORS.length
                      ]
                    }
                  />

                )
              )}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="grid grid-cols-3 gap-3 text-center">

        <div>

          <p className="text-2xl font-bold">
            {
              dashboardData
                ?.analysis_type_counts
                ?.general || 0
            }
          </p>

          <p className="text-xs text-muted-foreground">
            General
          </p>

        </div>

        <div>

          <p className="text-2xl font-bold">
            {
              dashboardData
                ?.analysis_type_counts
                ?.role || 0
            }
          </p>

          <p className="text-xs text-muted-foreground">
            Role
          </p>

        </div>

        <div>

          <p className="text-2xl font-bold">
            {
              dashboardData
                ?.analysis_type_counts
                ?.job_description || 0
            }
          </p>

          <p className="text-xs text-muted-foreground">
            JD Match
          </p>

        </div>

      </div>

    </div>

  </div>
    ) : (
          <div className="grid gap-6 lg:grid-cols-2">

    {/* Getting Started */}

    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <h2 className="text-xl font-semibold">
        Getting Started
      </h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Complete these steps to unlock powerful resume insights.
      </p>

      <div className="mt-6 space-y-4">

        <div className="flex items-center gap-3">
          <span>1️⃣</span>
          <span>Upload your resume</span>
        </div>

        <div className="flex items-center gap-3">
          <span>2️⃣</span>
          <span>Run your first ATS analysis</span>
        </div>

        <div className="flex items-center gap-3">
          <span>3️⃣</span>
          <span>Explore skill gaps</span>
        </div>

        <div className="flex items-center gap-3">
          <span>4️⃣</span>
          <span>Improve your resume score</span>
        </div>

      </div>

    </div>

    {/* Available Analyses */}

    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <h2 className="text-xl font-semibold">
        Available Analyses
      </h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Choose the right analysis based on your goal.
      </p>

      <div className="mt-6 space-y-4">

        <div className="rounded-xl border p-4">
          <h3 className="font-medium">
            ATS Analysis
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Check resume quality and ATS compatibility.
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-medium">
            Role Analysis
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Match your resume against a target role.
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-medium">
            Job Description Match
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Compare your resume with a specific job posting.
          </p>
        </div>

      </div>

    </div>

  </div>

)}

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