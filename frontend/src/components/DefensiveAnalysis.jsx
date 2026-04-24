function DefensiveAnalysis({ defensiveAnalysis }) {
  if (!defensiveAnalysis) return null;

  const mainWeaknesses = defensiveAnalysis
    .filter((item) => item.weakCount > 0)
    .sort((a, b) => b.weakCount - a.weakCount)
    .slice(0, 5);

  return (
    <section>
      <h2>Top Defensive Weaknesses</h2>

      {mainWeaknesses.length === 0 ? (
        <p>No major defensive weaknesses found.</p>
      ) : (
        <div>
          {mainWeaknesses.map((item) => (
            <div
              key={item.attackingType}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "1rem",
                background: "#fff7f7"
              }}
            >
              <h3>{item.attackingType.toUpperCase()}</h3>
              <p>
                {item.weakCount} Pokémon weak, {item.resistCount} resist,{" "}
                {item.immuneCount} immune
              </p>

              {item.weakPokemon.length > 0 && (
                <ul>
                  {item.weakPokemon.map((pokemon) => (
                    <li key={pokemon.name}>
                      {pokemon.name} — {pokemon.multiplier}x damage
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default DefensiveAnalysis;