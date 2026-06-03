'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Target, TrendingUp, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import type { AiCoachInsight } from '@/types/dashboard';

interface AiCoachCardProps {
  insight: AiCoachInsight;
}

export function AiCoachCard({ insight }: AiCoachCardProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
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
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/10 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Decorative gradient background */}
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-primary" />
                AI Career Coach
              </h2>
              <p className="mt-1 text-sm text-foreground/60">Personalized insights to advance your career</p>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Main Advice */}
            <motion.div variants={itemVariants} className="md:col-span-2">
              <div className="rounded-lg bg-background/50 backdrop-blur-sm border border-primary/10 p-4">
                <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Current Focus
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed">{insight.advice}</p>
              </div>
            </motion.div>

            {/* Next Learning Step */}
            <motion.div variants={itemVariants}>
              <div className="rounded-lg bg-background/50 backdrop-blur-sm border border-primary/10 p-4">
                <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Next Step
                </h3>
                <p className="text-sm text-foreground/80">{insight.nextLearningStep}</p>
              </div>
            </motion.div>

            {/* Weekly Focus */}
            <motion.div variants={itemVariants}>
              <div className="rounded-lg bg-background/50 backdrop-blur-sm border border-primary/10 p-4">
                <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Weekly Focus
                </h3>
                <p className="text-sm text-foreground/80">{insight.weeklyFocus}</p>
              </div>
            </motion.div>
          </div>

          {/* Recent Improvements */}
          <motion.div variants={itemVariants} className="mt-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Recent Improvements</h3>
            <ul className="space-y-2">
              {insight.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                  {improvement}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="mt-6 flex gap-3">
            <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              View Full Analysis
            </Button>
            <Button variant="outline" className="flex-1">
              Schedule Review
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
