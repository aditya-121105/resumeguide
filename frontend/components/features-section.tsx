'use client';

import { Card } from '@/components/ui/card';
import {
  BarChart,
  Target,
  MapPin,
  Briefcase,
  BookOpen,
  Award,
} from 'lucide-react';

const features = [
  {
    icon: BarChart,
    title: 'ATS Resume Analysis',
    description:
      'See your resume the way applicant tracking systems see it. Get an instant score and actionable improvements.',
  },
  {
    icon: Target,
    title: 'Skill Gap Detection',
    description:
      'Identify missing skills for your target role and get prioritized recommendations to upskill.',
  },
  {
    icon: MapPin,
    title: 'Career Roadmaps',
    description:
      'Get personalized step-by-step career progression paths based on market demand and your profile.',
  },
  {
    icon: Briefcase,
    title: 'Role Recommendations',
    description:
      'Discover suitable job titles and positions that match your skills and experience level.',
  },
  {
    icon: BookOpen,
    title: 'Project Recommendations',
    description:
      'Learn which projects to build to strengthen your resume and stand out to hiring managers.',
  },
  {
    icon: Award,
    title: 'Certification Recommendations',
    description:
      'Get suggestions for industry-recognized certifications that boost your career prospects.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="w-full bg-background py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Comprehensive Career Intelligence
          </h2>
          <p className="mt-3 text-lg text-foreground/70">
            Everything you need to advance your career in one platform
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-border bg-card p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-foreground/70">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
