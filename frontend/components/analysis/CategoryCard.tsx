type CategoryCardProps = {
  category: string;
  score: number;
  maxScore: number;
  evidence: string[];
  missing: string[];
  recommendedCertifications?: string[];
};

export function CategoryCard({
  category,
  score,
  maxScore,
  evidence,
  missing,
  recommendedCertifications,
}: CategoryCardProps) {

  const percentage =
    Math.round(
      (score / maxScore) * 100
    );

  const getStatusColor =
    () => {

      if (percentage >= 90)
        return {
          badge:
            'bg-green-100 text-green-700',
          progress:
            'bg-green-500',
        };

      if (percentage >= 70)
        return {
          badge:
            'bg-blue-100 text-blue-700',
          progress:
            'bg-blue-500',
        };

      if (percentage >= 50)
        return {
          badge:
            'bg-yellow-100 text-yellow-700',
          progress:
            'bg-yellow-500',
        };

      return {
        badge:
          'bg-red-100 text-red-700',
        progress:
          'bg-red-500',
      };
    };

  const colors =
    getStatusColor();

  return (

    <div
      className="
        rounded-3xl
        border
        bg-white
        p-6
        shadow-sm
      "
    >

      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <h3
          className="
            text-xl
            font-semibold
          "
        >
          {category}
        </h3>

        <span
          className={`
            rounded-full
            px-3
            py-1
            text-sm
            font-medium
            ${colors.badge}
          `}
        >
          {score}/{maxScore}
        </span>

      </div>

      {/* Progress */}

      <div
        className="
          mt-4
          h-2
          overflow-hidden
          rounded-full
          bg-gray-200
        "
      >

        <div
          className={`
            h-full
            ${colors.progress}
          `}
          style={{
            width:
              `${percentage}%`,
          }}
        />

      </div>

      {/* Evidence */}

      <div className="mt-6">

        <h4
          className="
            text-sm
            font-medium
            text-muted-foreground
          "
        >
          Detected
        </h4>

        <div className="mt-3 space-y-2">

          {evidence.map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className="
                  flex
                  gap-3
                "
              >

                <span
                  className="
                    text-green-600
                  "
                >
                  ✓
                </span>

                <span
                  className="
                    text-sm
                  "
                >
                  {item}
                </span>

              </div>
            )
          )}

        </div>

      </div>

      {/* Missing */}

      {missing.length > 0 && (

        <div className="mt-6">

          <h4
            className="
              text-sm
              font-medium
              text-muted-foreground
            "
          >
            Missing
          </h4>

          <div className="mt-3 space-y-2">

            {missing.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="
                    flex
                    gap-3
                  "
                >

                  <span
                    className="
                      text-red-600
                    "
                  >
                    ⚠
                  </span>

                  <span
                    className="
                      text-sm
                    "
                  >
                    {item}
                  </span>

                </div>
              )
            )}

          </div>

        </div>

      )}

      {/* Certifications */}

      {recommendedCertifications &&
        recommendedCertifications
          .length > 0 && (

        <div className="mt-6">

          <h4
            className="
              text-sm
              font-medium
              text-muted-foreground
            "
          >
            Recommended Certifications
          </h4>

          <div
            className="
              mt-3
              flex
              flex-wrap
              gap-2
            "
          >

            {recommendedCertifications.map(
              (
                cert,
                index
              ) => (

                <span
                  key={index}
                  className="
                    rounded-full
                    bg-blue-100
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-blue-700
                  "
                >
                  {cert}
                </span>

              )
            )}

          </div>

        </div>

      )}

    </div>

  );
}