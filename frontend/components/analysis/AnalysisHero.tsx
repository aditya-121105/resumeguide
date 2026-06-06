type AnalysisHeroProps = {
  title: string;
  subtitle?: string;
  score: number;
  status: string;
  createdAt: string;
  scoreLabel?: string;
};

export function AnalysisHero({
  title,
 subtitle,
  score,
  status,
  createdAt,
    scoreLabel
}: AnalysisHeroProps) {

  const radius = 72;
const circumference =
  2 * Math.PI * radius;

const progress =
  (score / 100) *
  circumference;

const getProgressColor =
  () => {

    if (score >= 85)
      return '#22C55E';

    if (score >= 70)
      return '#3B82F6';

    if (score >= 50)
      return '#F59E0B';

    return '#EF4444';
  };
  const getScoreColor = () => {

    if (score >= 85)
      return 'text-green-600';

    if (score >= 70)
      return 'text-blue-600';

    if (score >= 50)
      return 'text-yellow-600';

    return 'text-red-600';
  };

  const getStatusBadgeColor =
    () => {

      if (score >= 85)
        return
          'bg-green-100 text-green-700';

      if (score >= 70)
        return
          'bg-blue-100 text-blue-700';

      if (score >= 50)
        return
          'bg-yellow-100 text-yellow-700';

      return
        'bg-red-100 text-red-700';
    };

  return (

    <div
      className="
        rounded-3xl
        border
        bg-gradient-to-r
        from-blue-50
        via-white
        to-indigo-50
        p-8
      "
    >

      <div
        className="
          flex
          flex-col
          gap-8
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        {/* Left Side */}

        <div>

          <div
  className="
    inline-flex
    items-center
    rounded-full
    bg-blue-100
    px-3
    py-1
    text-xs
    font-semibold
    text-blue-700
  "
>
  Resume Evaluation Report
</div>

          <h1
            className="
              mt-2
              text-3xl
              font-bold
            "
          >
            {title}
          </h1>
            {subtitle && (

  <p
    className="
      mt-4
      text-xl
      text-muted-foreground
    "
  >
    {subtitle}
  </p>

)}



          <div
            className="
              mt-5
              flex
              flex-wrap
              items-center
              gap-3
            "
          >

            <span
              className={`
                rounded-full
                px-3
                py-1
                text-sm
                font-medium
                ${getStatusBadgeColor()}
              `}
            >
              {status}
            </span>

            <span
              className="
                text-sm
                text-muted-foreground
              "
            >
              Generated on{' '}
              {new Date(
                createdAt
              ).toLocaleString()}
            </span>

          </div>

        </div>

        {/* Right Side */}

        <div className="flex justify-center">

  <div className="relative">

    <svg
      width="180"
      height="180"
      className="-rotate-90"
    >

      {/* Background */}

      <circle
        cx="90"
        cy="90"
        r={radius}
        stroke="#E5E7EB"
        strokeWidth="10"
        fill="none"
      />

      {/* Progress */}

      <circle
        cx="90"
        cy="90"
        r={radius}
        stroke={
          getProgressColor()
        }
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={
          circumference
        }
        strokeDashoffset={
          circumference -
          progress
        }
      />

    </svg>

    <div
      className="
        absolute
        inset-0
        flex
        flex-col
        items-center
        justify-center
      "
    >

      <span
        className={`
          text-4xl
          font-bold
          ${getScoreColor()}
        `}
      >
        {Math.round(score)}/100
      </span>

      <span
        className="
          text-xs
          text-muted-foreground
        "
      >
        {scoreLabel ?? 'ATS SCORE'}
      </span>

    </div>

  </div>

</div>

      </div>

    </div>

  );
}