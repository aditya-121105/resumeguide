'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Clock } from 'lucide-react';

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

export default function CertificationsPage() {
  const certifications = [
    {
      name: 'AWS Solutions Architect Associate',
      issuer: 'Amazon Web Services',
      earned: '2024-01-15',
      expires: '2026-01-15',
      credentialUrl: '#',
    },
    {
      name: 'Google Cloud Professional Data Engineer',
      issuer: 'Google Cloud',
      earned: '2023-08-20',
      expires: '2025-08-20',
      credentialUrl: '#',
    },
    {
      name: 'Certified Kubernetes Administrator',
      issuer: 'Linux Foundation',
      earned: '2023-05-10',
      expires: '2026-05-10',
      credentialUrl: '#',
    },
  ];

  const recommendedCertifications = [
    { name: 'AWS Solutions Architect Professional', duration: '3 months', difficulty: 'Advanced' },
    { name: 'Azure Administrator Certified', duration: '2 months', difficulty: 'Intermediate' },
    { name: 'HashiCorp Certified: Terraform Associate', duration: '6 weeks', difficulty: 'Intermediate' },
  ];

  return (
    <DashboardLayout>
      <motion.div variants={pageVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Certifications</h1>
          <p className="mt-2 text-foreground/60">
            Validate your expertise with industry-recognized credentials
          </p>
        </motion.div>

        {/* Current Certifications */}
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Current Certifications
          </h2>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <Card key={cert.name} className="border-border bg-card p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground">{cert.name}</h3>
                    <p className="text-sm text-foreground/60 mt-1">{cert.issuer}</p>
                    <p className="text-xs text-foreground/50 mt-2">Earned: {new Date(cert.earned).toLocaleDateString()}</p>
                  </div>
                  <Badge variant="default" className="w-fit flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Valid until {new Date(cert.expires).toLocaleDateString()}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Recommended Certifications */}
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-bold text-foreground mb-4">Recommended Next Certifications</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendedCertifications.map((cert) => (
              <Card key={cert.name} className="border-border bg-card p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-foreground">{cert.name}</h3>
                <div className="mt-4 space-y-2 text-sm text-foreground/70">
                  <p>Duration: {cert.duration}</p>
                  <p>Difficulty: {cert.difficulty}</p>
                </div>
                <Badge variant="secondary" className="mt-4 text-xs">
                  Recommended
                </Badge>
              </Card>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
