'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign } from 'lucide-react';

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

export default function TargetRolesPage() {
  const roles = [
    {
      title: 'Senior Frontend Engineer',
      company: 'Tech Company A',
      match: 95,
      salary: { min: 180, max: 220 },
      growth: '+8% annually',
      skills: ['React', 'TypeScript', 'System Design'],
    },
    {
      title: 'Staff Engineer',
      company: 'Tech Company B',
      match: 92,
      salary: { min: 200, max: 260 },
      growth: '+10% annually',
      skills: ['Architecture', 'Leadership', 'System Design'],
    },
    {
      title: 'Lead Developer',
      company: 'Tech Company C',
      match: 88,
      salary: { min: 160, max: 200 },
      growth: '+6% annually',
      skills: ['React', 'Node.js', 'Team Leadership'],
    },
  ];

  return (
    <DashboardLayout>
      <motion.div variants={pageVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Target Roles</h1>
          <p className="mt-2 text-foreground/60">
            Matched opportunities with salary insights and growth potential
          </p>
        </motion.div>

        <div className="space-y-6">
          {roles.map((role, index) => (
            <motion.div key={role.title} variants={itemVariants}>
              <Card className="border-border bg-card p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground">{role.title}</h3>
                    <p className="text-sm text-foreground/60 mt-1">{role.company}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{role.match}%</div>
                    <p className="text-xs text-foreground/60">Match Score</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3 mb-4 py-4 border-y border-border/50">
                  <div>
                    <p className="text-xs font-semibold text-foreground/70 mb-1">
                      <DollarSign className="h-3 w-3 inline mr-1" />
                      Salary Range
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      ${role.salary.min}k - ${role.salary.max}k
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground/70 mb-1">
                      <TrendingUp className="h-3 w-3 inline mr-1" />
                      Growth Projection
                    </p>
                    <p className="text-sm font-bold text-foreground">{role.growth}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground/70 mb-1">Key Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {role.skills.slice(0, 2).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Button className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                  View Details
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
