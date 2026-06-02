'use client';

import { Card } from '@/components/ui/card';
import { Lock, Zap, Lightbulb, Clock } from 'lucide-react';

const trustPoints = [
  {
    icon: Lock,
    title: 'Secure Resume Processing',
    description: 'Your resume data is encrypted and never stored. 100% privacy-first approach.',
  },
  {
    icon: Zap,
    title: 'AI-Powered Analysis',
    description: 'Advanced machine learning algorithms analyze your resume against industry standards.',
  },
  {
    icon: Lightbulb,
    title: 'Personalized Guidance',
    description: 'Get tailored recommendations based on your unique skills and career goals.',
  },
  {
    icon: Clock,
    title: 'Instant Results',
    description: 'Complete analysis in seconds. No waiting, no delays.',
  },
];

export function TrustSection() {
  return (
    <section className="w-full bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Why Professionals Trust ResumeGuide
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Built for career seekers who demand precision, privacy, and results
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <Card
                key={index}
                className="border-border bg-card p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{point.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{point.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
