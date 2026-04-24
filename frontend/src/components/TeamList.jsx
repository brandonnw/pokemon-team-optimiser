function TeamList({ team, onRemovePokemon }) {
  if (team.length === 0) {
    return <p>No Pokémon added yet.</p>;
  }

  return (
    <ul>
      {team.map((pokemon) => (
        <li key={pokemon.id} style={{ marginBottom: "1rem" }}>
          {pokemon.sprite && (
            <img
              src={pokemon.sprite}
              alt={pokemon.name}
              style={{ verticalAlign: "middle", marginRight: "0.5rem" }}
            />
          )}

          <strong>{pokemon.name}</strong> — {pokemon.types.join(", ")}

          <button
            onClick={() => onRemovePokemon(pokemon.id)}
            style={{ marginLeft: "1rem" }}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TeamList;