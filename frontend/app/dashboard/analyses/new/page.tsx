'use client';

import { useEffect, useState }
from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout }
from '@/components/dashboard-layout';
interface Resume {

  resume_id: number;

  file_name: string;
}
export default function NewAnalysisPage() {

  const [resumes,
    setResumes] =
    useState<Resume[]>([]);

  const [analysisType,
    setAnalysisType] =
    useState(
      'general'
    );
  const router =
  useRouter();

const [isAnalyzing,
  setIsAnalyzing] =
  useState(false);

  const [selectedResume,
    setSelectedResume] =
    useState('');
  const AVAILABLE_ROLES = [

  'Frontend Developer',

  'Full Stack Developer',

  'Software Engineer',

  'Python Developer',

  'Java Developer',

  'Data Engineer',

  'AI Engineer',

  'Mobile App Developer',

  'Cybersecurity Engineer',

  'Backend Engineer',

  'Machine Learning Engineer',

  'Data Analyst',

  'DevOps Engineer',

  'Cloud Engineer',
];

  const [targetRole,
    setTargetRole] =
    useState('');

  const [jobDescription,
    setJobDescription] =
    useState('');

  const [loading,
    setLoading] =
    useState(true);

    useEffect(() => {

    fetchResumes();

  }, []);

    const handleStartAnalysis =
  async () => {

    if (!selectedResume) {

      alert(
        'Please select a resume'
      );

      return;
    }

    if (
      analysisType === 'role'
      &&
      !targetRole
    ) {

      alert(
        'Please select a role'
      );

      return;
    }

    if (
      analysisType ===
      'job_description'
      &&
      !jobDescription.trim()
    ) {

      alert(
        'Please enter a job description'
      );

      return;
    }

    try {

      setIsAnalyzing(
        true
      );

      const token =
        localStorage.getItem(
          'access_token'
        );

      const response =
        await fetch(
          'http://127.0.0.1:8000/api/v1/analysis/create',
          {
            method: 'POST',

            headers: {

              'Content-Type':
                'application/json',

              Authorization:
                `Bearer ${token}`,
            },

            body:
              JSON.stringify({

                resume_id:
                  Number(
                    selectedResume
                  ),

                analysis_type:
                  analysisType,

                target_role:
                  analysisType ===
                  'role'
                    ? targetRole
                    : null,

                job_description:
                  analysisType ===
                  'job_description'
                    ? jobDescription
                    : null,
              }),
          }
        );

      const data =
        await response.json();

      if (
        !response.ok
      ) {

        throw new Error(
          data.detail ||
          'Analysis failed'
        );
      }

      router.push(
        `/dashboard/analyses/${data.analysis_id}`
      );

    } catch (error: any) {

      alert(
        error.message
      );

    } finally {

      setIsAnalyzing(
        false
      );
    }
  };

  const fetchResumes =
    async () => {

      try {

        const token =
          localStorage.getItem(
            'access_token'
          );

        const response =
          await fetch(
            'http://127.0.0.1:8000/api/v1/resume/my-resumes',
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data =
          await response.json();

        setResumes(
          data
        );

      } catch (error) {

        console.error(
          error
        );

      } finally {

        setLoading(false);
      }
    };
    return (

    <DashboardLayout>

      <div className="space-y-8">
                <div>

          <div
            className="
              inline-flex
              rounded-full
              bg-blue-100
              px-3
              py-1
              text-xs
              font-medium
              text-blue-700
            "
          >
            Resume Analyzer
          </div>

          <h1
            className="
              mt-4
              text-4xl
              font-bold
            "
          >
            New Analysis
          </h1>

          <p
            className="
              mt-2
              text-muted-foreground
            "
          >
            Select a resume and
            choose the type of
            analysis you want to run.
          </p>

        </div>
                <div>

          <h2
            className="
              mb-4
              text-xl
              font-semibold
            "
          >
            Choose Analysis Type
          </h2>

          <div
            className="
              grid
              gap-4
              md:grid-cols-3
            "
          >

            <button
              onClick={() =>
                setAnalysisType(
                  'general'
                )
              }
              className={`
                rounded-3xl
                border
                p-6
                text-left
                transition
                ${
                  analysisType ===
                  'general'
                    ? 'border-blue-600\n' +
                      'bg-gradient-to-br\n' +
                      'from-blue-50\n' +
                      'to-indigo-50\n' +
                      'shadow-sm'
                    : 'bg-white'
                }
              `}
            >

              <h3 className="font-semibold">
                General ATS
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  text-muted-foreground
                "
              >
                ATS score and
                resume quality.
              </p>

            </button>

            <button
              onClick={() =>
                setAnalysisType(
                  'role'
                )
              }
              className={`
                rounded-3xl
                border
                p-6
                text-left
                transition
                ${
                  analysisType ===
                  'role'
                    ? 'border-blue-600\n' +
                      'bg-gradient-to-br\n' +
                      'from-blue-50\n' +
                      'to-indigo-50\n' +
                      'shadow-sm'
                    : 'bg-white'
                }
              `}
            >

              <h3 className="font-semibold">
                Role Analysis
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  text-muted-foreground
                "
              >
                Match resume
                against a role.
              </p>

            </button>

            <button
              onClick={() =>
                setAnalysisType(
                  'job_description'
                )
              }
              className={`
                rounded-3xl
                border
                p-6
                text-left
                transition
                ${
                  analysisType ===
                  'job_description'
                    ? 'border-blue-600\n' +
                      'bg-gradient-to-br\n' +
                      'from-blue-50\n' +
                      'to-indigo-50\n' +
                      'shadow-sm'
                    : 'bg-white'
                }
              `}
            >

              <h3 className="font-semibold">
                JD Match
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  text-muted-foreground
                "
              >
                Compare resume
                against a job
                description.
              </p>

            </button>

          </div>

        </div>
                <div
          className="
            rounded-3xl
            border
            bg-white
            p-6
          "
        >

          <h2
            className="
              mb-4
              text-xl
              font-semibold
            "
          >
            Select Resume
          </h2>

          {loading ? (

            <p>
              Loading resumes...
            </p>

          ) : (

            <select
              value={
                selectedResume
              }
              onChange={(e) =>
                setSelectedResume(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
                outline-none
              "
            >

              <option value="">
                Choose a resume
              </option>

              {resumes.map(
                (resume) => (

                  <option
                    key={
                      resume.resume_id
                    }
                    value={
                      resume.resume_id
                    }
                  >
                    {
                      resume.file_name
                    }
                  </option>

                )
              )}

            </select>

          )}

        </div>

                {analysisType ===
          'role' && (

          <div
            className="
              rounded-3xl
              border
              bg-white
              p-6
            "
          >

            <h2
              className="
                mb-4
                text-xl
                font-semibold
              "
            >
              Target Role
            </h2>

            <select
          value={targetRole}
          onChange={(e) =>
            setTargetRole(
              e.target.value
            )
          }
          className="
            w-full
            rounded-xl
            border
            px-4
            py-3
            outline-none
          "
        >

          <option value="">
            Select a target role
          </option>

          {AVAILABLE_ROLES.map(
            (role) => (

              <option
                key={role}
                value={role}
              >
                {role}
              </option>

            )
          )}

        </select>

          </div>

        )}
                {analysisType ===
          'job_description' && (

          <div
            className="
              rounded-3xl
              border
              bg-white
              p-6
            "
          >

            <h2
              className="
                mb-4
                text-xl
                font-semibold
              "
            >
              Job Description
            </h2>

            <textarea
              value={
                jobDescription
              }
              onChange={(e) =>
                setJobDescription(
                  e.target.value
                )
              }
              rows={10}
              placeholder="Paste the complete job description here..."
              className="
                w-full
                rounded-xl
                border
                p-4
                outline-none
                resize-none
              "
            />

          </div>

        )}
                <div
          className="
            rounded-3xl
            border
            bg-gradient-to-br
            from-slate-50
            to-white
            p-6
          "
        >

          <h2
            className="
              mb-4
              text-xl
              font-semibold
            "
          >
            Analysis Summary
          </h2>

          <div className="space-y-3">

            <p>

              <span className="font-medium">
                Analysis Type:
              </span>

              {' '}

              {analysisType ===
              'general'
                ? 'General ATS'
                : analysisType ===
                  'role'
                ? 'Role Analysis'
                : 'JD Match'}

            </p>

            <p>

              <span className="font-medium">
                Resume:
              </span>

              {' '}

              {selectedResume ||
                'Not Selected'}

            </p>

            {analysisType ===
              'role' && (

              <p>

                <span className="font-medium">
                  Target Role:
                </span>

                {' '}

                {targetRole ||
                  'Not Provided'}

              </p>

            )}

            {analysisType ===
              'job_description' && (

              <p>

                <span className="font-medium">
                  Job Description:
                </span>

                {' '}

                {jobDescription
                  ? `${jobDescription.length} characters`
                  : 'Not Provided'}

              </p>

            )}

          </div>

        </div>
                <div
          className="
            flex
            justify-end
          "
        >

         <button
  onClick={
    handleStartAnalysis
  }
            className="
  rounded-2xl
  bg-blue-600
  px-8
  py-4
  font-medium
  text-white
  transition
  hover:bg-blue-700
  disabled:cursor-not-allowed
  disabled:opacity-50
"
  disabled={
  isAnalyzing
}
          >
           {
  isAnalyzing
    ? 'Analyzing...'
    : 'Start Analysis'
}

          </button>

        </div>
              </div>

    </DashboardLayout>

  );
}