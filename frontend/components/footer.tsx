'use client';

import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">
                  RG
                </span>
              </div>
              <span className="text-xl font-bold text-foreground">
                ResumeGuide
              </span>
            </div>

            <p className="max-w-md text-sm leading-7 text-foreground/70">
              AI-powered resume analysis and career guidance platform helping
              students and professionals improve resumes, identify skill gaps,
              discover suitable roles, and build targeted career roadmaps.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <a
                  href="#features"
                  className="text-sm text-foreground/70 transition hover:text-primary"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#how-it-works"
                  className="text-sm text-foreground/70 transition hover:text-primary"
                >
                  How It Works
                </a>
              </li>

            </ul>
          </div>



        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-foreground/60">
            © 2026 ResumeGuide. Built by Aditya Kumarkhaniya.
          </p>

          <p className="text-sm text-foreground/50">
            Next.js • TypeScript • Tailwind CSS • Python
          </p>
        </div>
      </div>
    </footer>
  );
}