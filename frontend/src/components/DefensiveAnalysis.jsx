function getSeverity(item) {
  const hasSevereWeakness = item.weakPokemon.some(
    (pokemon) => pokemon.multiplier >= 4
  );

  if (hasSevereWeakness || item.weakCount >= 3) {
    return "severe";
  }

  if (item.weakCount >= 2) {
    return "moderate";
  }

  return "low";
}

function DefensiveAnalysis({ defensiveAnalysis }) {
  if (!defensiveAnalysis) return null;

  const mainWeaknesses = defensiveAnalysis
    .filter((item) => item.weakCount > 0)
    .sort((a, b) => {
      const maxA = Math.max(...a.weakPokemon.map((p) => p.multiplier));
      const maxB = Math.max(...b.weakPokemon.map((p) => p.multiplier));

      if (maxB !== maxA) return maxB - maxA;
      return b.weakCount - a.weakCount;
    })
    .slice(0, 6);

  return (
    <section className="card">
      <div className="section-header">
        <div>
          <p className="section-kicker">Defensive Profile</p>
          <h2>Top Defensive Weaknesses</h2>
        </div>
      </div>

      {mainWeaknesses.length === 0 ? (
        <p className="empty-text">No major defensive weaknesses found.</p>
      ) : (
        <div className="insight-grid">
          {mainWeaknesses.map((item) => {
            const severity = getSeverity(item);

            return (
              <article
                key={item.attackingType}
                className={`type-insight-card type-glow-${item.attackingType}`}
              >
                <div className="insight-top-row">
                  <div>
                    <span className="type-label">{item.attackingType}</span>
                    <h3>{item.attackingType.toUpperCase()}</h3>
                  </div>

                  <span className={`severity-pill severity-${severity}`}>
                    {severity}
                  </span>
                </div>

                <div className="mini-stat-row">
                  <span>{item.weakCount} weak</span>
                  <span>{item.resistCount} resist</span>
                  <span>{item.immuneCount} immune</span>
                </div>

                <div className="pokemon-chip-list">
                  {item.weakPokemon.map((pokemon) => (
                    <span
                      key={pokemon.name}
                      className={
                        pokemon.multiplier >= 4
                          ? "pokemon-chip danger-chip"
                          : "pokemon-chip"
                      }
                    >
                      {pokemon.name} · {pokemon.multiplier}x
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default DefensiveAnalysis;