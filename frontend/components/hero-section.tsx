'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
import { useAuthModal } from '@/contexts/auth-modal-context';

export function HeroSection() {
  const { openLogin } = useAuthModal();
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-white via-blue-50/40 to-blue-100/60">
      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-200/30 blur-3xl"></div>
      <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-blue-100/20 blur-3xl"></div>
      <div className="mx-auto max-w-7xl px-4 py-0 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-10 lg:py-12">
          {/* Left Side - Content */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-foreground/70">AI-Powered Career Intelligence</span>
              </div>
              <h1 className="text-5xl font-bold leading-tight text-foreground sm:text-6xl lg:text-5xl">
                Transform Your Resume Into a{" "}
                <span className="text-primary">Career Strategy</span>
              </h1>
            </div>

            <p className="text-lg text-foreground/70">
              Analyze your resume, uncover skill gaps, discover career opportunities,
              and receive AI-powered guidance tailored to your professional goals.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={openLogin}>
                Start Free Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

            </div>

            <div className="flex gap-8 pt-4 text-sm">
              <div>
                <div className="font-semibold text-foreground">ATS Analysis</div>
                <div className="text-foreground/60">Resume Optimization</div>
              </div>

              <div>
                <div className="font-semibold text-foreground">Skill Gap Detection</div>
                <div className="text-foreground/60">Learning Priorities</div>
              </div>

              <div>
                <div className="font-semibold text-foreground">Career Roadmaps</div>
                <div className="text-foreground/60">Growth Planning</div>
              </div>
            </div>
          </div>

          {/* Right Side - Dashboard Preview */}
            <div className="relative flex items-center justify-center lg:pr-12" style={{ perspective: '1200px' }}>
            <div 
              className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-2xl transition-all duration-700 hover:shadow-3xl w-full"
              style={{
                animation: 'float 6s ease-in-out infinite',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Dashboard Header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs font-medium text-foreground/50">ResumeGuide Dashboard</span>
              </div>

              {/* Dashboard Content */}
              <div className="space-y-4">
                {/* ATS Score */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">ATS Score</span>
                    <span className="text-2xl font-bold text-primary animate-counterUp">87%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-border">
                    <div 
                      className="h-full bg-primary transition-all duration-1000 ease-out"
                      style={{
                        width: '87%',
                        animation: 'progressBar 1.2s ease-out forwards',
                      }}
                    ></div>
                  </div>
                </div>

                {/* Skill Breakdown */}
                <div className="space-y-2">
                  <span className="text-sm font-semibold text-foreground">Skill Breakdown</span>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-foreground/70">Technical Skills</span>
                      <span className="text-xs font-semibold text-foreground">85%</span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-border">
                      <div className="h-full w-[85%] bg-primary"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-foreground/70">Leadership</span>
                      <span className="text-xs font-semibold text-foreground">72%</span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-border">
                      <div className="h-full w-[72%] bg-primary"></div>
                    </div>
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="rounded-lg bg-secondary/30 p-3">
                  <div className="text-xs font-semibold text-foreground/70 mb-2">Missing Skills</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-background/50 px-2 py-1 text-xs font-medium text-foreground/70">
                      Kubernetes
                    </span>
                    <span className="inline-flex items-center rounded-full bg-background/50 px-2 py-1 text-xs font-medium text-foreground/70">
                      Cloud Architecture
                    </span>
                  </div>
                </div>

                {/* Recommended Roles */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-foreground/70">Recommended Roles</span>
                  <div className="flex gap-2 text-xs font-medium">
                    <div className="rounded border border-primary/20 bg-primary/5 px-2 py-1 text-primary">
                      Senior Engineer
                    </div>
                    <div className="rounded border border-primary/20 bg-primary/5 px-2 py-1 text-primary">
                      Tech Lead
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative gradient orb */}
            <div className="absolute -top-20 -right-20 h-[450px] w-[450px] rounded-full bg-primary/10 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
