function PokemonRecommendations({ recommendations }) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <section className="card">
      <div className="section-header">
        <div>
          <p className="section-kicker">Recommendation Engine</p>
          <h2>Suggested Team Additions</h2>
        </div>
      </div>

      <div className="recommended-grid">
        {recommendations.map((pokemon) => (
          <article key={pokemon.name} className="recommended-card">
            <div className="recommended-top">
              {pokemon.sprite && (
                  <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  className="recommended-sprite"
                  />
              )}

              <div className="recommended-title-block">
                  <p className="recommended-role">{pokemon.role || "team fit"}</p>
                  <h3>{pokemon.name}</h3>
                  <span className="score-pill">{pokemon.score}/100 team fit</span>
              </div>
            </div>

            <div className="type-pill-wrap">
              {pokemon.types.map((type) => (
                <span key={type} className={`type-badge type-glow-${type}`}>
                  {type}
                </span>
              ))}
            </div>

            <div className="recommendation-details">
              {pokemon.fixesWeaknesses.length > 0 && (
                <p>
                  <strong>Fixes:</strong> {pokemon.fixesWeaknesses.join(", ")}
                </p>
              )}

              {pokemon.addsCoverage.length > 0 && (
                <p>
                  <strong>Adds:</strong> {pokemon.addsCoverage.join(", ")}
                </p>
              )}

              {pokemon.newRisks.length > 0 && (
                <p>
                  <strong>Risks:</strong> {pokemon.newRisks.join(", ")}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PokemonRecommendations;