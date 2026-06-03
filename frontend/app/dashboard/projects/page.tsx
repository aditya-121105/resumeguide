'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

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

export default function ProjectsPage() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce application with real-time inventory management',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      impact: 'Increased conversion by 23%',
      link: '#',
    },
    {
      title: 'Real-Time Analytics Dashboard',
      description: 'Interactive dashboard for tracking user behavior and metrics',
      tech: ['React', 'WebSocket', 'D3.js', 'AWS'],
      impact: 'Reduced data retrieval time by 40%',
      link: '#',
    },
    {
      title: 'Mobile App - Task Manager',
      description: 'Cross-platform task management application with collaboration features',
      tech: ['React Native', 'Firebase', 'Redux', 'TypeScript'],
      impact: '15K+ downloads in first month',
      link: '#',
    },
  ];

  return (
    <DashboardLayout>
      <motion.div variants={pageVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Portfolio Projects</h1>
          <p className="mt-2 text-foreground/60">
            Showcase your technical expertise through meaningful projects
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <motion.div key={project.title} variants={itemVariants}>
              <Card className="border-border bg-card p-6 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                <h3 className="text-lg font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-sm text-foreground/70 mb-4 flex-1">{project.description}</p>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-foreground/60 mb-2">Technology Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-xs font-semibold text-foreground/70">Impact</p>
                  <p className="text-sm font-bold text-primary mt-1">{project.impact}</p>
                </div>

                <a
                  href={project.link}
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
                >
                  View Project
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
