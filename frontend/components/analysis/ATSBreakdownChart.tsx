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

type ATSBreakdownChartProps = {
  scoreBreakdown: any[];
};

export function ATSBreakdownChart({
  scoreBreakdown,
}: ATSBreakdownChartProps) {

  const chartData =
    scoreBreakdown.map(
      (item) => ({

        category:
          item.category,

        percentage:
          Math.round(
            (
              item.score /
              item.max_score
            ) * 100
          ),

        score:
          item.score,

        maxScore:
          item.max_score,
      })
    );

  const getBarColor = (
    value: number
  ) => {

    if (value >= 90)
      return '#22C55E';

    if (value >= 70)
      return '#3B82F6';

    if (value >= 50)
      return '#F59E0B';

    return '#EF4444';
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
          ATS Score Breakdown
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-muted-foreground
          "
        >
          Performance across
          different resume sections
        </p>

      </div>

      <div
        className="
          mt-6
          h-[400px]
        "
      >

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            data={chartData}
          >

            <XAxis
              dataKey="category"
              tick={{
                fontSize: 12,
              }}
            />

            <YAxis
              domain={[0, 100]}
            />

            <Tooltip
              formatter={(
                value: any,
                _name: any,
                props: any
              ) => [

                `${props.payload.score}/${props.payload.maxScore}`,

                'Score',
              ]}
            />

            <Bar
              dataKey="percentage"
              radius={[
                8,
                8,
                0,
                0,
              ]}
            >

              {chartData.map(
                (
                  entry,
                  index
                ) => (

                  <Cell
                    key={index}
                    fill={getBarColor(
                      entry.percentage
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