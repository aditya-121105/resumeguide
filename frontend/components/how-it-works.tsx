'use client';

import { Card } from '@/components/ui/card';
import { FileText, FileSearch, Zap, Map } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: FileText,
    title: 'Upload Resume',
    description: 'Share your resume in PDF, DOC, or TXT format. Your data stays secure and private.',
  },
  {
    number: 2,
    icon: FileSearch,
    title: 'Add Job Description',
    description:
      'Paste the job description or role you&apos;re targeting. Our AI analyzes the match.',
  },
  {
    number: 3,
    icon: Zap,
    title: 'Analyze Match',
    description:
      'Get instant analysis of how well your resume fits the role with a detailed ATS score.',
  },
  {
    number: 4,
    icon: Map,
    title: 'Get Roadmap',
    description:
      'Receive a personalized career roadmap with specific actions to land your dream role.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full bg-gradient-to-b from-background to-background/50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-lg text-foreground/70">
            Get your career analysis in 4 simple steps
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative">
                <Card className="border-border bg-card p-6 text-center h-full flex flex-col hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 mx-auto">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-primary text-primary-foreground mx-auto font-bold text-sm">
                    {step.number}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="flex-grow text-sm text-foreground/70">{step.description}</p>
                </Card>
                {step.number < 4 && (
                  <div className="absolute -right-4 top-1/3 hidden h-1 w-8 bg-gradient-to-r from-primary/50 to-transparent lg:block"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
