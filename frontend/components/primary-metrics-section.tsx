'use client';

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ScoresData {
  resumeHealth: number;
  careerReadiness: number;
  marketCompetitiveness: number;
}

interface ScoreTrendsData {
  resumeHealth: 'up' | 'down' | 'stable';
  careerReadiness: 'up' | 'down' | 'stable';
  marketCompetitiveness: 'up' | 'down' | 'stable';
}

interface PrimaryMetricsSectionProps {
  scores: ScoresData;
  trends: ScoreTrendsData;
}

function AnimatedCounter({ from, to, duration = 1 }: { from: number; to: number; duration?: number }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const diff = to - from;
    const steps = 60;
    const stepValue = diff / steps;
    let current = from;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += stepValue;
      setCount(step === steps ? to : Math.round(current));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, (duration * 1000) / steps);

    return () => clearInterval(timer);
  }, [from, to, duration]);

  return <span>{count}</span>;
}

export function PrimaryMetricsSection({ scores, trends }: PrimaryMetricsSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-foreground/60';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="h-4 w-4" />;
      case 'down':
        return <ArrowDown className="h-4 w-4" />;
      default:
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  const metrics = [
    {
      title: 'Resume Health Score',
      value: scores.resumeHealth,
      trend: trends.resumeHealth,
      description: 'Quality and optimization',
      color: 'from-blue-500/10 to-blue-500/5',
      accentColor: 'text-blue-600',
    },
    {
      title: 'Career Readiness Score',
      value: scores.careerReadiness,
      trend: trends.careerReadiness,
      description: 'Prepared for target roles',
      color: 'from-purple-500/10 to-purple-500/5',
      accentColor: 'text-purple-600',
    },
    {
      title: 'Market Competitiveness Score',
      value: scores.marketCompetitiveness,
      trend: trends.marketCompetitiveness,
      description: 'Competitive position',
      color: 'from-emerald-500/10 to-emerald-500/5',
      accentColor: 'text-emerald-600',
    },
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <div className="grid gap-6 md:grid-cols-3">
        {metrics.map((metric, index) => (
          <motion.div key={index} variants={cardVariants}>
            <Card className={`relative overflow-hidden border-border bg-gradient-to-br ${metric.color} p-6 hover:shadow-lg transition-all duration-300 group`}>
              {/* Background accent */}
              <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl opacity-30 ${metric.accentColor}`}></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-foreground/70">{metric.title}</p>
                    <p className="text-xs text-foreground/50 mt-1">{metric.description}</p>
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${getTrendColor(
                      metric.trend
                    )} bg-black/5`}
                  >
                    {getTrendIcon(metric.trend)}
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <div className="text-4xl font-bold text-foreground">
                    <AnimatedCounter from={0} to={metric.value} duration={1} />
                  </div>
                  <span className="text-lg font-semibold text-foreground/60">/100</span>
                </div>

                {/* Progress bar */}
                <div className="mt-4 h-2 w-full rounded-full bg-background/50 overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${
                      metric.accentColor === 'text-blue-600'
                        ? 'from-blue-500 to-blue-600'
                        : metric.accentColor === 'text-purple-600'
                        ? 'from-purple-500 to-purple-600'
                        : 'from-emerald-500 to-emerald-600'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
