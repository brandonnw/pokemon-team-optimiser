import AiSummaryCard from "./AiSummaryCard";

function RecommendationList({ recommendations, aiSummary }) {
  return (
    <section className="card">
      <h2>Recommendations</h2>

      <AiSummaryCard summary={aiSummary} />

      {!recommendations || recommendations.length === 0 ? (
        <p className="empty-text">No major issues found. Your team looks balanced.</p>
      ) : (
        recommendations.map((recommendation, index) => (
          <div key={index} className="analysis-card info-card">
            <p>
              <strong>{recommendation.issue}</strong>
            </p>
            <p>{recommendation.suggestion}</p>
          </div>
        ))
      )}
    </section>
  );
}

export default RecommendationList;