'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, Target, Zap } from 'lucide-react';

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

export default function SkillGapPage() {
  const strengthSkills = [
    { name: 'React', proficiency: 95, category: 'Frontend' },
    { name: 'TypeScript', proficiency: 88, category: 'Language' },
    { name: 'Node.js', proficiency: 85, category: 'Backend' },
    { name: 'System Design', proficiency: 82, category: 'Architecture' },
  ];

  const weaknessSkills = [
    { name: 'DevOps', proficiency: 45, gap: 55 },
    { name: 'Kubernetes', proficiency: 40, gap: 60 },
    { name: 'AWS Advanced', proficiency: 50, gap: 50 },
  ];

  const missingSkills = [
    { name: 'Cloud Architecture', priority: 'High', monthsToLearn: 3 },
    { name: 'ML/AI Fundamentals', priority: 'Medium', monthsToLearn: 4 },
    { name: 'GraphQL Advanced', priority: 'Medium', monthsToLearn: 2 },
    { name: 'Microservices Patterns', priority: 'High', monthsToLearn: 2 },
  ];

  return (
    <DashboardLayout>
      <motion.div variants={pageVariants} initial="hidden" animate="visible">
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Skill Gap Analysis</h1>
          <p className="mt-2 text-foreground/60">
            Understand your strengths, weaknesses, and learning opportunities
          </p>
        </motion.div>

        {/* Strengths */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card className="border-border bg-card p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <ArrowUp className="h-5 w-5 text-green-600" />
              Core Strengths
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {strengthSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{skill.name}</p>
                      <Badge variant="outline" className="text-xs mt-1">{skill.category}</Badge>
                    </div>
                    <span className="text-sm font-bold text-primary">{skill.proficiency}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Weaknesses */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card className="border-border bg-card p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-yellow-600" />
              Development Areas
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {weaknessSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <p className="text-sm font-semibold text-foreground">{skill.name}</p>
                    <span className="text-sm font-bold text-yellow-600">Gap: {skill.gap}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full bg-yellow-500"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Missing Skills & Learning Priorities */}
        <motion.div variants={itemVariants}>
          <Card className="border-border bg-card p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              Learning Priorities
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 font-semibold text-foreground/70">Skill</th>
                    <th className="text-left py-2 px-2 font-semibold text-foreground/70">Priority</th>
                    <th className="text-left py-2 px-2 font-semibold text-foreground/70">Est. Learning Time</th>
                  </tr>
                </thead>
                <tbody>
                  {missingSkills.map((skill) => (
                    <tr key={skill.name} className="border-b border-border/50 hover:bg-background/50">
                      <td className="py-3 px-2 text-foreground">{skill.name}</td>
                      <td className="py-3 px-2">
                        <Badge
                          variant={skill.priority === 'High' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {skill.priority}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 text-foreground/70">{skill.monthsToLearn} months</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
