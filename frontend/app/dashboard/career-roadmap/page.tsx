'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle } from 'lucide-react';

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

export default function CareerRoadmapPage() {
  const milestones = [
    {
      week: 'Week 1-2',
      title: 'Foundation Assessment',
      status: 'completed',
      tasks: ['Review skill inventory', 'Identify gaps', 'Set goals'],
    },
    {
      week: 'Week 3-4',
      title: 'Skill Development Plan',
      status: 'completed',
      tasks: ['Create learning path', 'Find resources', 'Plan schedule'],
    },
    {
      week: 'Week 5-8',
      title: 'Active Learning Phase',
      status: 'in-progress',
      tasks: ['Complete courses', 'Build projects', 'Practice daily'],
    },
    {
      week: 'Week 9-12',
      title: 'Project Implementation',
      status: 'upcoming',
      tasks: ['Build portfolio projects', 'Document work', 'Prepare portfolio'],
    },
    {
      week: 'Week 13+',
      title: 'Job Search & Applications',
      status: 'upcoming',
      tasks: ['Update resume', 'Apply to roles', 'Interview prep'],
    },
  ];

  return (
    <DashboardLayout>
      <motion.div variants={pageVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Career Roadmap</h1>
          <p className="mt-2 text-foreground/60">
            Your 12-week journey to your next career opportunity
          </p>
        </motion.div>

        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <motion.div key={milestone.week} variants={itemVariants}>
              <Card className="border-border bg-card p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    {milestone.status === 'completed' ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    ) : milestone.status === 'in-progress' ? (
                      <div className="h-6 w-6 rounded-full border-2 border-blue-600 bg-blue-500/20" />
                    ) : (
                      <Circle className="h-6 w-6 text-foreground/30" />
                    )}
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-16 bg-border mt-2" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs font-semibold text-foreground/60">{milestone.week}</p>
                        <h3 className="text-lg font-bold text-foreground mt-1">{milestone.title}</h3>
                      </div>
                      <Badge
                        variant={
                          milestone.status === 'completed'
                            ? 'default'
                            : milestone.status === 'in-progress'
                            ? 'secondary'
                            : 'outline'
                        }
                        className="text-xs capitalize"
                      >
                        {milestone.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <ul className="mt-3 space-y-1 text-sm text-foreground/70">
                      {milestone.tasks.map((task) => (
                        <li key={task} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-foreground/30" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
