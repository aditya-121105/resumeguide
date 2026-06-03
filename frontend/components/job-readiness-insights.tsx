'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Target, ArrowRight } from 'lucide-react';

interface JobRole {
  id: string;
  title: string;
  company?: string;
  matchPercentage: number;
  category: 'ready' | 'nearlyReady' | 'longTerm';
  requiredSkills: string[];
  skillGaps: string[];
  estimatedMonthsToReady?: number;
  salary?: {
    min: number;
    max: number;
  };
}

interface JobReadinessCategory {
  category: 'ready' | 'nearlyReady' | 'longTerm';
  label: string;
  description: string;
  roles: JobRole[];
}

interface JobReadinessInsightsProps {
  categories: JobReadinessCategory[];
}

function JobReadinessCard({
  label,
  description,
  roles,
  icon: Icon,
  color,
}: {
  label: string;
  description: string;
  roles: JobRole[];
  icon: React.ReactNode;
  color: string;
}) {
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

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="border-border bg-card p-6 hover:shadow-lg transition-all duration-300">
        <div className="mb-6 flex items-center gap-3">
          <div className={`p-2 rounded-lg ${color}`}>{Icon}</div>
          <div>
            <h3 className="font-semibold text-foreground">{label}</h3>
            <p className="text-xs text-foreground/60">{description}</p>
          </div>
        </div>

        <div className="space-y-3">
          {roles.map((role, index) => (
            <motion.div key={index} variants={itemVariants} className="rounded-lg bg-background/50 p-3 hover:bg-background transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-foreground">{role.title}</h4>
                  <p className="text-xs text-foreground/60">{role.company}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  role.matchPercentage >= 90
                    ? 'bg-green-500/20 text-green-700'
                    : role.matchPercentage >= 70
                    ? 'bg-blue-500/20 text-blue-700'
                    : 'bg-yellow-500/20 text-yellow-700'
                }`}>
                  {role.matchPercentage}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full rounded-full bg-border overflow-hidden mb-2">
                <motion.div
                  className={`h-full ${
                    role.matchPercentage >= 90
                      ? 'bg-green-500'
                      : role.matchPercentage >= 70
                      ? 'bg-blue-500'
                      : 'bg-yellow-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${role.matchPercentage}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 * index }}
                />
              </div>

              {/* Skills needed */}
              <div className="flex flex-wrap gap-1">
                {role.requiredSkills.slice(0, 3).map((skill, idx) => (
                  <span key={idx} className="text-xs bg-foreground/5 text-foreground/70 px-2 py-0.5 rounded">
                    {skill}
                  </span>
                ))}
                {role.requiredSkills.length > 3 && (
                  <span className="text-xs text-foreground/60 px-2 py-0.5">
                    +{role.requiredSkills.length - 3} more
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-4" size="sm">
          View All Opportunities <ArrowRight className="ml-2 h-3 w-3" />
        </Button>
      </Card>
    </motion.div>
  );
}

const categoryIconMap = {
  ready: <CheckCircle2 className="h-5 w-5 text-green-600" />,
  nearlyReady: <Clock className="h-5 w-5 text-blue-600" />,
  longTerm: <Target className="h-5 w-5 text-purple-600" />,
};

const categoryColorMap = {
  ready: 'bg-green-500/10',
  nearlyReady: 'bg-blue-500/10',
  longTerm: 'bg-purple-500/10',
};

export function JobReadinessInsights({ categories }: JobReadinessInsightsProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-2">
          <Target className="h-6 w-6 text-primary" />
          Job Readiness by Category
        </h2>
        <p className="text-foreground/60">See which roles align with your current skillset</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((categoryData) => (
          <motion.div key={categoryData.category} variants={sectionVariants}>
            <JobReadinessCard
              label={categoryData.label}
              description={categoryData.description}
              roles={categoryData.roles}
              icon={categoryIconMap[categoryData.category]}
              color={categoryColorMap[categoryData.category]}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
