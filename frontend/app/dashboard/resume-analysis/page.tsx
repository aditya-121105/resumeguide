'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';

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

export default function ResumeAnalysisPage() {
  return (
    <DashboardLayout>
      <motion.div variants={pageVariants} initial="hidden" animate="visible">
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Resume Analysis</h1>
          <p className="mt-2 text-foreground/60">
            Detailed insights on your resume strength and improvement opportunities
          </p>
        </motion.div>

        {/* ATS Breakdown */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card className="border-border bg-card p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">ATS Score Breakdown</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Keyword Optimization</span>
                  <span className="text-sm font-bold text-primary">92%</span>
                </div>
                <div className="h-2 rounded-full bg-border overflow-hidden">
                  <div className="h-full w-[92%] bg-primary transition-all duration-300" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Format Compatibility</span>
                  <span className="text-sm font-bold text-primary">88%</span>
                </div>
                <div className="h-2 rounded-full bg-border overflow-hidden">
                  <div className="h-full w-[88%] bg-primary transition-all duration-300" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Structure Quality</span>
                  <span className="text-sm font-bold text-primary">85%</span>
                </div>
                <div className="h-2 rounded-full bg-border overflow-hidden">
                  <div className="h-full w-[85%] bg-primary transition-all duration-300" />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Strengths and Improvements */}
        <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2">
          {/* Strengths */}
          <Card className="border-border bg-card p-6">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Resume Strengths
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-foreground/80">Clear job title and responsibilities</li>
              <li className="text-sm text-foreground/80">Quantifiable achievements with metrics</li>
              <li className="text-sm text-foreground/80">Relevant technical skills highlighted</li>
              <li className="text-sm text-foreground/80">Professional formatting and layout</li>
              <li className="text-sm text-foreground/80">Consistent date formatting throughout</li>
            </ul>
          </Card>

          {/* Improvement Suggestions */}
          <Card className="border-border bg-card p-6">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              Improvement Suggestions
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-foreground/80">Add more action verbs to descriptions</li>
              <li className="text-sm text-foreground/80">Include relevant keywords from job postings</li>
              <li className="text-sm text-foreground/80">Add certifications and achievements section</li>
              <li className="text-sm text-foreground/80">Consider adding a professional summary</li>
              <li className="text-sm text-foreground/80">Expand project descriptions with metrics</li>
            </ul>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="mt-8">
          <Card className="border-border bg-card p-6 text-center">
            <h3 className="text-lg font-bold text-foreground mb-2">Ready to Improve?</h3>
            <p className="text-sm text-foreground/60 mb-4">
              Get detailed recommendations and download an improved version of your resume
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <TrendingUp className="mr-2 h-4 w-4" />
              Get Improvement Plan
            </Button>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
