import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-24">

        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* Left Side */}
          <div>

            <Badge
              variant="secondary"
              className="mb-6 px-4 py-2 text-blue-600"
            >
              AI-Powered Resume Analysis
            </Badge>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 lg:text-5xl xl:text-6xl">
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
                variant="outline"
                size="lg"
              >
                View Demo
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-600">

              <div className="flex items-center gap-2">
                ✓ Instant Results
              </div>

              <div className="flex items-center gap-2">
                ✓ Career Roadmaps
              </div>

              <div className="flex items-center gap-2">
                ✓ Skill Gap Analysis
              </div>

            </div>

          </div>

          {/* Right Side */}
          <div className="relative">

            <div className="rotate-0 lg:-rotate-3">

              <div className="overflow-hidden rounded-3xl border bg-white shadow-2xl">

                {/* Browser Header */}
                <div className="flex items-center gap-2 border-b px-6 py-4">

                  <div className="h-3 w-3 rounded-full bg-red-400" />

                  <div className="h-3 w-3 rounded-full bg-yellow-400" />

                  <div className="h-3 w-3 rounded-full bg-green-400" />

                  <span className="ml-4 text-sm font-medium text-slate-500">
                    Resume Analysis
                  </span>

                </div>

                <div className="space-y-8 p-8">

                  {/* Match Score */}
                  <div>

                    <p className="text-sm text-slate-500">
                      Match Score
                    </p>

                    <h2 className="mt-2 text-5xl font-bold text-blue-600">
                      82%
                    </h2>

                    <div className="mt-4 h-3 rounded-full bg-slate-200">
                      <div className="h-3 w-[82%] rounded-full bg-blue-600" />
                    </div>

                  </div>

                  {/* Role */}
                  <div>

                    <p className="text-sm text-slate-500">
                      Target Role
                    </p>

                    <p className="mt-1 text-xl font-semibold">
                      Backend Engineer
                    </p>

                  </div>

                  {/* Missing Skills */}
                  <div>

                    <p className="text-sm text-slate-500">
                      Missing Skills
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">

                      <Badge variant="secondary">
                        Docker
                      </Badge>

                      <Badge variant="secondary">
                        Kubernetes
                      </Badge>

                    </div>

                  </div>

                  {/* Roadmap */}
                  <div>

                    <p className="text-sm text-slate-500">
                      Career Roadmap
                    </p>

                    <div className="mt-4 space-y-3">

                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        Learn Docker Fundamentals
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        Build Containerized Project
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        Deploy on AWS
                      </div>

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