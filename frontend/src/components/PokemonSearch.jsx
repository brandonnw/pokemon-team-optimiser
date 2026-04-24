function PokemonSearch({
  searchTerm,
  setSearchTerm,
  onAddPokemon,
  loadingPokemon
}) {
  return (
    <form onSubmit={onAddPokemon}>
      <input
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search Pokémon e.g. pikachu"
        style={{ padding: "0.6rem", marginRight: "0.5rem" }}
      />

      <button type="submit" disabled={loadingPokemon}>
        {loadingPokemon ? "Adding..." : "Add Pokémon"}
      </button>
    </form>
  );
}

export default PokemonSearch;