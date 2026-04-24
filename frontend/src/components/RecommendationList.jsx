function RecommendationList({ recommendations }) {
  if (!recommendations || recommendations.length === 0) {
    return <p>No major issues found. Your team looks fairly balanced.</p>;
  }

  return (
    <section>
      <h2>Recommendations</h2>

      <div>
        {recommendations.map((recommendation, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
              background: "#fafafa"
            }}
          >
            <p>
              <strong>{recommendation.issue}</strong>
            </p>
            <p>{recommendation.suggestion}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecommendationList;