function AiSummaryCard({ summary }) {
  if (!summary) return null;

  return (
    <div className="ai-summary-card">
      <div className="ai-summary-badge">AI Coach</div>
      <h3>Strategic Team Summary</h3>
      <p>{summary}</p>
    </div>
  );
}

export default AiSummaryCard;