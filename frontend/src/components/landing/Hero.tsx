import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-blue-50">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6">

        <div className="grid w-full gap-12 lg:grid-cols-2 lg:items-center">

          {/* Left Side */}
          <div>

            <Badge
              variant="secondary"
              className="mb-6 px-4 py-2 text-blue-600"
            >
              AI-Powered Resume Analysis
            </Badge>

            <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-slate-900 lg:text-5xl">
              Land More Interviews
              <br />
              With
              <span className="text-blue-600">
                {" "}Smarter{" "}
              </span>
              Resume Analysis
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Analyze your resume against job descriptions,
              identify skill gaps, discover suitable roles,
              and get a personalized roadmap to become
              job-ready.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Button size="lg">
                Start Free Analysis
              </Button>

              <Button
                size="lg"
                variant="outline"
              >
                View Demo
              </Button>

            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">

              <span>✓ Instant Results</span>

              <span>✓ Career Roadmaps</span>

              <span>✓ Skill Gap Analysis</span>

            </div>

          </div>

          {/* Right Side */}

          <div className="flex justify-center lg:justify-end">

            <div className="w-full max-w-lg overflow-hidden rounded-3xl border bg-white shadow-xl">

              {/* Header */}

              <div className="flex items-center gap-2 border-b px-5 py-4">

                <div className="h-3 w-3 rounded-full bg-red-400" />

                <div className="h-3 w-3 rounded-full bg-yellow-400" />

                <div className="h-3 w-3 rounded-full bg-green-400" />

                <span className="ml-3 text-sm font-medium text-slate-500">
                  Resume Analysis
                </span>

              </div>

              <div className="space-y-6 p-6">

                {/* Score */}

                <div>

                  <div className="flex items-end justify-between">

                    <div>

                      <p className="text-sm text-slate-500">
                        Match Score
                      </p>

                      <h2 className="text-4xl font-bold text-blue-600">
                        82%
                      </h2>

                    </div>

                    <div className="rounded-lg bg-green-100 px-3 py-2 text-sm font-medium text-green-700">
                      Great Match
                    </div>

                  </div>

                  <div className="mt-3 h-2 rounded-full bg-slate-200">

                    <div className="h-2 w-[82%] rounded-full bg-blue-600" />

                  </div>

                </div>

                {/* Role */}

                <div className="rounded-xl border p-4">

                  <p className="text-sm text-slate-500">
                    Target Role
                  </p>

                  <h3 className="mt-1 text-lg font-semibold">
                    Backend Engineer
                  </h3>

                </div>

                {/* Skills */}

                <div className="grid grid-cols-2 gap-4">

                  <div className="rounded-xl border p-4">

                    <p className="mb-3 text-sm text-slate-500">
                      Matched Skills
                    </p>

                    <div className="space-y-2 text-sm">

                      <div>✓ Python</div>

                      <div>✓ AWS</div>

                      <div>✓ SQL</div>

                    </div>

                  </div>

                  <div className="rounded-xl border p-4">

                    <p className="mb-3 text-sm text-slate-500">
                      Missing Skills
                    </p>

                    <div className="space-y-2 text-sm">

                      <div>• Docker</div>

                      <div>• Kubernetes</div>

                      <div>• FastAPI</div>

                    </div>

                  </div>

                </div>

                {/* Roadmap */}

                <div className="rounded-xl border p-4">

                  <p className="mb-3 text-sm text-slate-500">
                    Career Roadmap
                  </p>

                  <div className="space-y-2 text-sm">

                    <div>1. Learn Docker Fundamentals</div>

                    <div>2. Build Containerized Project</div>

                    <div>3. Deploy on AWS</div>

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