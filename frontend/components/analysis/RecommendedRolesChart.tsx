'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

type RecommendedRolesChartProps = {
  recommendedRoles: {
    role: string;
    score: number;
  }[];
};

export function RecommendedRolesChart({
  recommendedRoles,
}: RecommendedRolesChartProps) {

  const getColor = (
    score: number
  ) => {

    if (score >= 80)
      return '#22C55E';

    if (score >= 60)
      return '#3B82F6';

    return '#F59E0B';
  };

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

      <div>

        <h2
          className="
            text-xl
            font-semibold
          "
        >
          Recommended Career Matches
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-muted-foreground
          "
        >
          Roles best aligned with
          your resume profile
        </p>

      </div>

      <div
        className="
          mt-6
          h-[320px]
        "
      >

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            layout="vertical"
            data={recommendedRoles}
            margin={{
              left: 50,
              right: 20,
            }}
          >

            <XAxis
              type="number"
              domain={[0, 100]}
            />

            <YAxis
              type="category"
              dataKey="role"
              width={150}
            />

            <Tooltip
              formatter={(
                value: any
              ) => [
                `${value}%`,
                'Match Score',
              ]}
            />

            <Bar
              dataKey="score"
              radius={[
                0,
                8,
                8,
                0,
              ]}
            >

              {recommendedRoles.map(
                (
                  role,
                  index
                ) => (

                  <Cell
                    key={index}
                    fill={getColor(
                      role.score
                    )}
                  />

                )
              )}

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}