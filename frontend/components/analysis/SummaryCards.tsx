type SummaryCardsProps = {
  scoreBreakdown: any[];
  recommendedRoles: any[];
};

export function SummaryCards({
  scoreBreakdown,
  recommendedRoles,
}: SummaryCardsProps) {

  const sectionsAnalyzed =
    scoreBreakdown.length;

  const strongAreas =
    scoreBreakdown.filter(
      (item) =>
        item.score ===
        item.max_score
    ).length;

  const improvementsNeeded =
    scoreBreakdown.filter(
      (item) =>
        item.missing?.length > 0
    ).length;

  const careerMatches =
    recommendedRoles.length;

  const cards = [
    {
      title:
        'Sections Analyzed',
      value:
        sectionsAnalyzed,
      description:
        'Resume categories reviewed',
    },
    {
      title:
        'Strong Areas',
      value:
        strongAreas,
      description:
        'Sections with full score',
    },
    {
      title:
        'Needs Improvement',
      value:
        improvementsNeeded,
      description:
        'Areas requiring attention',
    },
    {
      title:
        'Career Matches',
      value:
        careerMatches,
      description:
        'Recommended job roles',
    },
  ];

  return (

    <div
      className="
        grid
        gap-4
        md:grid-cols-2
        xl:grid-cols-4
      "
    >

      {cards.map(
        (card) => (

          <div
            key={card.title}
            className="
              rounded-2xl
              border
              bg-white
              p-5
              shadow-sm
              transition-all
              hover:shadow-md
            "
          >

            <p
              className="
                text-sm
                text-muted-foreground
              "
            >
              {card.title}
            </p>

            <h3
              className="
                mt-3
                text-3xl
                font-bold
              "
            >
              {card.value}
            </h3>

            <p
              className="
                mt-2
                text-xs
                text-muted-foreground
              "
            >
              {card.description}
            </p>

          </div>
        )
      )}

    </div>

  );
}