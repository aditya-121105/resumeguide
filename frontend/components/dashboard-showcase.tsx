'use client';

import { Card } from '@/components/ui/card';

export function DashboardShowcase() {
  return (
    <section className="w-full bg-background py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Powerful Dashboard
          </h2>
          <p className="mt-3 text-lg text-foreground/70">
            Everything you need to track and advance your career in one place
          </p>
        </div>

        {/* Main Dashboard Card */}
        <div 
          className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all duration-700 hover:shadow-3xl hover:border-primary/20"
          style={{
            transform: 'perspective(1500px) rotateY(-1deg) rotateX(1deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Browser Header */}
          <div className="border-b border-border bg-secondary/30 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs font-medium text-foreground/50">dashboard.resumeguide.ai</span>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-8">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-foreground">Welcome Back, Sarah</h3>
                <p className="text-sm text-foreground/60 mt-1">Your career analysis from today</p>
              </div>
              <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
                New Analysis
              </button>
            </div>

            {/* Main Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* ATS Score Card */}
              <div className="rounded-lg border border-border bg-background p-5 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-foreground/70">ATS Score</span>
                  <span className="text-xs bg-green-500/20 text-green-700 px-2 py-1 rounded">+12%</span>
                </div>
                <div className="mb-3">
                  <div className="text-4xl font-bold text-primary animate-counterUp">87</div>
                  <p className="text-xs text-foreground/60 mt-0.5">out of 100</p>
                </div>
                <div className="h-3 w-full rounded-full bg-border overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-1000 ease-out"
                    style={{
                      width: '87%',
                      animation: 'progressBar 1.2s ease-out forwards',
                    }}
                  ></div>
                </div>
              </div>

              {/* Skill Breakdown Card */}
              <div className="rounded-lg border border-border bg-background p-5 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <span className="text-sm font-semibold text-foreground/70 block mb-3">Skill Strength</span>
                <div className="space-y-2.5">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium text-foreground">Technical</span>
                      <span className="text-xs font-semibold text-foreground animate-counterUp">92%</span>
                    </div>
                    <div className="h-2 rounded-full bg-border overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-1000 ease-out"
                        style={{
                          width: '92%',
                          animation: 'progressBar 1s ease-out forwards 0.2s both',
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium text-foreground">Leadership</span>
                      <span className="text-xs font-semibold text-foreground animate-counterUp">78%</span>
                    </div>
                    <div className="h-2 rounded-full bg-border overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-1000 ease-out"
                        style={{
                          width: '78%',
                          animation: 'progressBar 1s ease-out forwards 0.4s both',
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium text-foreground">Communication</span>
                      <span className="text-xs font-semibold text-foreground animate-counterUp">85%</span>
                    </div>
                    <div className="h-2 rounded-full bg-border overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-1000 ease-out"
                        style={{
                          width: '85%',
                          animation: 'progressBar 1s ease-out forwards 0.6s both',
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Actions */}
              <div className="rounded-lg border border-border bg-background p-5 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <span className="text-sm font-semibold text-foreground/70 block mb-3">Next Steps</span>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-green-700">✓</span>
                    </div>
                    <span className="text-sm text-foreground/70">Learn Kubernetes</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-yellow-700">!</span>
                    </div>
                    <span className="text-sm text-foreground/70">Get AWS cert</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-blue-700">→</span>
                    </div>
                    <span className="text-sm text-foreground/70">Build ML project</span>
                  </div>
                </div>
              </div>

              {/* Missing Skills */}
              <div className="rounded-lg border border-border bg-background p-5 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <span className="text-sm font-semibold text-foreground/70 block mb-3">Missing Skills</span>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-700 border border-red-200/50">
                    Docker Compose
                  </span>
                  <span className="inline-flex items-center rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-700 border border-red-200/50">
                    CI/CD Pipelines
                  </span>
                  <span className="inline-flex items-center rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-700 border border-orange-200/50">
                    Terraform
                  </span>
                </div>
              </div>

              {/* Recommended Roles */}
              <div className="rounded-lg border border-border bg-background p-5 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <span className="text-sm font-semibold text-foreground/70 block mb-3">Recommended Roles</span>
                <div className="space-y-2">
                  <div className="rounded-lg bg-primary/5 border border-primary/30 p-3">
                    <div className="font-semibold text-sm text-primary">Senior Engineer</div>
                    <p className="text-xs text-foreground/60 mt-1">Match: 94%</p>
                  </div>
                  <div className="rounded-lg bg-primary/5 border border-primary/30 p-3">
                    <div className="font-semibold text-sm text-primary">Tech Lead</div>
                    <p className="text-xs text-foreground/60 mt-1">Match: 89%</p>
                  </div>
                </div>
              </div>

              {/* Career Timeline */}
              <div className="rounded-lg border border-border bg-background p-5 md:col-span-2 lg:col-span-1 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <span className="text-sm font-semibold text-foreground/70 block mb-3">Career Roadmap</span>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <div className="h-3 w-3 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">Now</p>
                      <p className="text-xs text-foreground/60">Senior Dev</p>
                    </div>
                  </div>
                  <div className="ml-3.5 h-4 w-0.5 bg-border"></div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <div className="h-3 w-3 rounded-full bg-primary/60"></div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">6 months</p>
                      <p className="text-xs text-foreground/60">Tech Lead</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
