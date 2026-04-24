function PokemonSearch({
  searchTerm,
  setSearchTerm,
  onAddPokemon,
  loadingPokemon
}) {
  return (
    <form className="search-form" onSubmit={onAddPokemon}>
      <input
        className="input"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search Pokémon e.g. pikachu"
      />

      <button className="button" type="submit" disabled={loadingPokemon}>
        {loadingPokemon ? "Adding..." : "Add Pokémon"}
      </button>
    </form>
  );
}

export default PokemonSearch;