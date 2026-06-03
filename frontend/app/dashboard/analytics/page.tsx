'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Target } from 'lucide-react';

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AnalyticsPage() {
  const trendData = [
    { month: 'Jan', resumeHealth: 72, careerReadiness: 65, marketScore: 70 },
    { month: 'Feb', resumeHealth: 75, careerReadiness: 68, marketScore: 72 },
    { month: 'Mar', resumeHealth: 78, careerReadiness: 70, marketScore: 75 },
    { month: 'Apr', resumeHealth: 82, careerReadiness: 73, marketScore: 78 },
    { month: 'May', resumeHealth: 85, careerReadiness: 76, marketScore: 80 },
    { month: 'Jun', resumeHealth: 87, careerReadiness: 78, marketScore: 82 },
  ];

  const benchmarkData = [
    { metric: 'Resume Health Score', yourScore: 87, marketAvg: 72, percentile: 78 },
    { metric: 'Career Readiness', yourScore: 78, marketAvg: 65, percentile: 72 },
    { metric: 'Market Competitiveness', yourScore: 82, marketAvg: 70, percentile: 75 },
    { metric: 'Skill Proficiency', yourScore: 81, marketAvg: 68, percentile: 80 },
  ];

  return (
    <DashboardLayout>
      <motion.div variants={pageVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Analytics & Insights</h1>
          <p className="mt-2 text-foreground/60">
            Track your career progress and compare against industry benchmarks
          </p>
        </motion.div>

        {/* Trend Summary */}
        <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Career Progress</p>
                <p className="text-2xl font-bold text-foreground mt-2">+15%</p>
                <p className="text-xs text-foreground/50 mt-1">Last 6 months</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </Card>

          <Card className="border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Skills Learned</p>
                <p className="text-2xl font-bold text-foreground mt-2">12</p>
                <p className="text-xs text-foreground/50 mt-1">New competencies</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </Card>

          <Card className="border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Percentile Rank</p>
                <p className="text-2xl font-bold text-foreground mt-2">78th</p>
                <p className="text-xs text-foreground/50 mt-1">vs. peers</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </Card>
        </motion.div>

        {/* Trend Chart (Table representation) */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card className="border-border bg-card p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Career Metrics Trend</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 font-semibold text-foreground/70">Month</th>
                    <th className="text-left py-2 px-2 font-semibold text-foreground/70">Resume Health</th>
                    <th className="text-left py-2 px-2 font-semibold text-foreground/70">Career Readiness</th>
                    <th className="text-left py-2 px-2 font-semibold text-foreground/70">Market Score</th>
                  </tr>
                </thead>
                <tbody>
                  {trendData.map((row) => (
                    <tr key={row.month} className="border-b border-border/50 hover:bg-background/50">
                      <td className="py-3 px-2 text-foreground font-medium">{row.month}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 bg-border rounded overflow-hidden">
                            <div
                              className="h-full bg-blue-500"
                              style={{ width: `${row.resumeHealth}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-foreground">{row.resumeHealth}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 bg-border rounded overflow-hidden">
                            <div
                              className="h-full bg-purple-500"
                              style={{ width: `${row.careerReadiness}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-foreground">{row.careerReadiness}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 bg-border rounded overflow-hidden">
                            <div
                              className="h-full bg-emerald-500"
                              style={{ width: `${row.marketScore}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-foreground">{row.marketScore}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Benchmarking */}
        <motion.div variants={itemVariants}>
          <Card className="border-border bg-card p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Industry Benchmarking</h2>
            <div className="space-y-4">
              {benchmarkData.map((benchmark) => (
                <div key={benchmark.metric} className="pb-4 border-b border-border/50 last:border-0 last:pb-0">
                  <p className="text-sm font-semibold text-foreground mb-3">{benchmark.metric}</p>
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <p className="text-foreground/60">Your Score</p>
                      <p className="text-lg font-bold text-primary mt-1">{benchmark.yourScore}</p>
                    </div>
                    <div>
                      <p className="text-foreground/60">Market Avg</p>
                      <p className="text-lg font-bold text-foreground/70 mt-1">{benchmark.marketAvg}</p>
                    </div>
                    <div>
                      <p className="text-foreground/60">Percentile</p>
                      <Badge variant="default" className="mt-1 text-xs font-bold">
                        {benchmark.percentile}th
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
