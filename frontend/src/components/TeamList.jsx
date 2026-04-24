function TeamList({ team, onRemovePokemon }) {
  if (team.length === 0) {
    return <p className="empty-text">No Pokémon added yet.</p>;
  }

  return (
    <div className="team-grid">
      {team.map((pokemon) => (
        <div key={pokemon.id} className="pokemon-card">
          {pokemon.sprite && <img src={pokemon.sprite} alt={pokemon.name} />}

          <h3>{pokemon.name}</h3>

          <div>
            {pokemon.types.map((type) => (
              <span key={type} className="type-badge">
                {type}
              </span>
            ))}
          </div>

          <button
            className="remove-button"
            onClick={() => onRemovePokemon(pokemon.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default TeamList;