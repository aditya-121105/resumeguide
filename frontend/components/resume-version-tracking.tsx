'use client';

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { FileText, TrendingUp, Zap } from 'lucide-react';
import type { ResumeVersion } from '@/types/dashboard';

interface ResumeVersionTrackingProps {
  versions: ResumeVersion[];
}

export function ResumeVersionTracking({ versions }: ResumeVersionTrackingProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  const getImprovement = (current: number, previous: number) => {
    const change = current - previous;
    return {
      value: change,
      percentage: ((change / previous) * 100).toFixed(0),
      isPositive: change >= 0,
    };
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="border-border bg-card p-8 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Resume Version History
        </h2>

        <div className="space-y-4">
          {versions.map((version, index) => {
            const previousVersion = versions[index + 1];
            const resumeHealthChange = previousVersion
              ? getImprovement(version.scores.resumeHealth, previousVersion.scores.resumeHealth)
              : null;
            const careerReadinessChange = previousVersion
              ? getImprovement(version.scores.careerReadiness, previousVersion.scores.careerReadiness)
              : null;

            const uploadDate = new Date(version.uploadedAt);
            const isToday =
              uploadDate.toDateString() === new Date().toDateString();
            const daysAgo = Math.floor(
              (Date.now() - uploadDate.getTime()) / (1000 * 60 * 60 * 24)
            );

            return (
              <motion.div
                key={version.id}
                variants={itemVariants}
                className="rounded-lg border border-border bg-background/50 p-4 hover:bg-background/80 transition-colors duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">{version.fileName}</h3>
                      {isToday && (
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                          Latest
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-foreground/60 mb-3">
                      {isToday ? 'Today' : `${daysAgo} days ago`} • {uploadDate.toLocaleDateString()}
                    </p>

                    {/* Score improvements */}
                    {resumeHealthChange && (
                      <div className="grid gap-2 sm:grid-cols-3 text-xs">
                        <div className="flex items-center gap-1">
                          <span className="text-foreground/60">Resume Health:</span>
                          <span className="font-semibold text-foreground">{version.scores.resumeHealth}</span>
                          <span
                            className={`flex items-center gap-0.5 ${
                              resumeHealthChange.isPositive
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {resumeHealthChange.isPositive ? '+' : ''}
                            {resumeHealthChange.percentage}%
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-foreground/60">Career Ready:</span>
                          <span className="font-semibold text-foreground">{version.scores.careerReadiness}</span>
                          <span
                            className={`flex items-center gap-0.5 ${
                              careerReadinessChange?.isPositive
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {careerReadinessChange?.isPositive ? '+' : ''}
                            {careerReadinessChange?.percentage}%
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-foreground/60">Market Score:</span>
                          <span className="font-semibold text-foreground">{version.scores.marketCompetitiveness}</span>
                        </div>
                      </div>
                    )}

                    {/* Skill changes */}
                    {(version.skillChanges.added.length > 0 ||
                      version.skillChanges.improved.length > 0) && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {version.skillChanges.added.length > 0 && (
                          <div className="flex items-center gap-1 text-xs">
                            <Zap className="h-3 w-3 text-primary" />
                            <span className="text-foreground/70">
                              +{version.skillChanges.added.length} new:{' '}
                              {version.skillChanges.added.slice(0, 2).join(', ')}
                              {version.skillChanges.added.length > 2 ? '...' : ''}
                            </span>
                          </div>
                        )}
                        {version.skillChanges.improved.length > 0 && (
                          <div className="flex items-center gap-1 text-xs">
                            <TrendingUp className="h-3 w-3 text-green-600" />
                            <span className="text-foreground/70">
                              {version.skillChanges.improved.slice(0, 2).join(', ')} improved
                              {version.skillChanges.improved.length > 2
                                ? ` +${version.skillChanges.improved.length - 2} more`
                                : ''}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
