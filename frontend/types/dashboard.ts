// Primary Score Types
export interface PrimaryScores {
  resumeHealth: number;
  careerReadiness: number;
  marketCompetitiveness: number;
}

export interface ScoreTrend {
  resumeHealth: 'up' | 'down' | 'stable';
  careerReadiness: 'up' | 'down' | 'stable';
  marketCompetitiveness: 'up' | 'down' | 'stable';
}

// AI Coach Types
export interface AiCoachInsight {
  advice: string;
  nextLearningStep: string;
  weeklyFocus: string;
  improvements: string[];
}

// Resume Version Types
export interface ResumeVersion {
  id: string;
  uploadedAt: Date;
  fileName: string;
  scores: PrimaryScores;
  skillChanges: {
    added: string[];
    improved: string[];
  };
}

// Skill Matrix Types
export interface SkillMatrixData {
  strengths: Skill[];
  weaknesses: Skill[];
  missingSkills: Skill[];
  learningPriorities: Skill[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
  yearsOfExperience?: number;
}

// Industry Benchmark Types
export interface IndustryBenchmark {
  metric: string;
  userScore: number;
  marketAverage: number;
  percentile: number; // 0-100
  trend: 'up' | 'down' | 'stable';
}

// Job Readiness Types
export interface JobReadinessCategory {
  category: 'ready' | 'nearlyReady' | 'longTerm';
  label: string;
  description: string;
  roles: JobRole[];
}

export interface JobRole {
  id: string;
  title: string;
  company?: string;
  matchPercentage: number;
  category: 'ready' | 'nearlyReady' | 'longTerm';
  requiredSkills: string[];
  skillGaps: string[];
  estimatedMonthsToReady?: number;
  salary?: {
    min: number;
    max: number;
  };
}

// Trend Data Types
export interface TrendDataPoint {
  date: string;
  resumeHealth: number;
  careerReadiness: number;
  marketCompetitiveness: number;
}

// Roadmap Types
export interface CareerRoadmapWeek {
  week: number;
  milestone: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  skills?: string[];
  estimatedHours?: number;
}

// Quick Action Types
export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string; // Icon name from lucide-react
  action: 'upload' | 'analyze' | 'roadmap' | 'analysis';
  href?: string;
}

// Dashboard Data Types
export interface DashboardData {
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  scores: PrimaryScores;
  scoreTrends: ScoreTrend;
  aiCoachInsights: AiCoachInsight;
  resumeVersions: ResumeVersion[];
  trendData: TrendDataPoint[];
  skillMatrix: SkillMatrixData;
  industryBenchmarks: IndustryBenchmark[];
  jobReadiness: JobReadinessCategory[];
  careerRoadmap: CareerRoadmapWeek[];
  quickActions: QuickAction[];
}
